from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session, joinedload
from models.reserva import Reserva
from dtos.reserva_dto import reservaCreateDTO, reservaUpdateDTO, ReservaOut
from db.session import SessionLocal
from datetime import date, datetime
import io
from typing import Optional
from utils.jwt_manager import verify_access_token
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from mails.mailjet_config import enviar_comprobante  # Para enviar por correo


# obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Creación del Router con el prefijo /reserva
router = APIRouter(prefix="/reserva")


@router.get("/listar_reservas", response_model=list[ReservaOut])
def listar_reserva(db: Session = Depends(get_session)):
    reservas = (
        db.query(Reserva)
        .options(joinedload(Reserva.turista), joinedload(Reserva.plan))
        .all()
    )

    if not reservas:
        raise HTTPException(status_code=404, detail="No hay Reservas registradas")

    # 🔹 Convertimos los datos a formato serializable (sin comprobante_pdf)
    resultado = []
    for r in reservas:
        resultado.append({
            "id": r.id,
            "fecha_reserva": str(r.fecha_reserva),
            "costo_final": r.costo_final,
            "disponibilidad": r.disponibilidad,
            "numero_personas": r.numero_personas,
            "id_plan": r.id_plan,
            "plan_nombre": r.plan.nombre if r.plan else None,
            "id_turista": r.id_turista,
            "turista_nombre": r.turista.nombre if r.turista else None,
        })

    return resultado


# Endpoint para listar reservas por id
@router.get("/{id}")
def listar_por_id(id: int, db: Session = Depends(get_session)):
    lr = db.query(Reserva).filter(Reserva.id == id).first()
    if not lr:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return lr


# Endpoint para crear reserva
@router.post("/crear_reserva")
def crear_reserva(
    nuevo_reserva: reservaCreateDTO,
    authorization: Optional[str] = Header(None, alias="Authorization"),
    db: Session = Depends(get_session),
):
    # 🔹 Validación de token
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token no proporcionado")

    token = authorization.split(" ")[1]
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    turista_id = payload.get("sub")
    if not turista_id:
        raise HTTPException(status_code=401, detail="No se pudo obtener el id del turista")

    # 🔹 Validación de fecha
    if not nuevo_reserva.fecha_reserva or not isinstance(nuevo_reserva.fecha_reserva, date):
        raise HTTPException(status_code=400, detail="Fecha de reserva inválida")

    # 🔹 Validación de token de pago
    if not nuevo_reserva.token_tarjeta:
        raise HTTPException(status_code=400, detail="Token de pago requerido")

    # 🚫 Validación para evitar reservas duplicadas (mismo turista + mismo plan)
    reserva_existente = db.query(Reserva).filter(
        Reserva.id_turista == int(turista_id),
        Reserva.id_plan == nuevo_reserva.id_plan
    ).first()

    if reserva_existente:
        raise HTTPException(
            status_code=400,
            detail="Ya tienes una reserva activa para este plan. Solo se permite una por turista."
        )

    # ✅ Crear nueva reserva
    reserva = Reserva(
        fecha_reserva=nuevo_reserva.fecha_reserva,
        costo_final=nuevo_reserva.costo_final,
        disponibilidad=nuevo_reserva.disponibilidad,
        numero_personas=nuevo_reserva.numero_personas,
        id_informe=nuevo_reserva.id_informe,
        id_plan=nuevo_reserva.id_plan,
        id_turista=int(turista_id),
    )

    db.add(reserva)
    db.commit()
    db.refresh(reserva)

    # 🔹 Recargar la reserva con relaciones para poder acceder a turista y plan
    reserva = db.query(Reserva).options(
        joinedload(Reserva.turista),
        joinedload(Reserva.plan)
    ).filter(Reserva.id == reserva.id).first()

    # 🔹 Generar comprobante PDF
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    pdf.setTitle("Comprobante de Pago")

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawCentredString(300, 750, "COMPROBANTE DE PAGO")
    pdf.setFont("Helvetica", 10)
    pdf.drawRightString(550, 730, f"Nº {reserva.id:05d}")
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawCentredString(300, 710, "Reservación Exitosa ✅")

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, 680, f"Fecha: Bogotá, {datetime.now().strftime('%d/%m/%Y')}")
    pdf.drawString(50, 660, f"Turista: {reserva.turista.nombre}")
    pdf.drawString(50, 640, f"CC: {reserva.turista.identificacion}")
    pdf.drawString(50, 620, f"Teléfono: {reserva.turista.celular}")
    pdf.drawString(50, 600, f"Plan: {reserva.plan.nombre}")

    pdf.drawString(50, 570, f"Fecha reserva: {reserva.fecha_reserva}")
    pdf.drawString(50, 550, f"Personas: {reserva.numero_personas}")
    pdf.drawString(50, 530, f"Precio plan: ${reserva.plan.costo_persona:,}")
    pdf.drawString(50, 510, f"Método de pago: Tarjeta de crédito")

    total = reserva.plan.costo_persona + (reserva.numero_personas * 100000)
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, 480, f"TOTAL: ${total:,}")

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, 440, "Firma del responsable: Escapade Parfaite")
    pdf.drawString(50, 420, f"Firma del Turista: {reserva.turista.nombre}")

    pdf.save()
    buffer.seek(0)
    pdf_bytes = buffer.getvalue()

    # Guardar PDF en DB
    reserva.comprobante_pdf = pdf_bytes
    db.commit()

    # 🔹 Enviar correo automáticamente con manejo de errores
    try:
        enviar_comprobante(reserva, pdf_bytes)
    except Exception as e:
        print("Error enviando correo:", e)

    return {
        "message": "Reserva creada, comprobante generado y enviado por correo",
        "reserva_id": reserva.id
    }


# Endpoint para actualizar reservas
@router.put("/{id}")
def actualizar_reserva(id: int, datos: reservaUpdateDTO, db: Session = Depends(get_session)):
    ar = db.query(Reserva).filter(Reserva.id == id).first()
    if not ar:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")

    for key, value in datos.dict(exclude_unset=True).items():
        setattr(ar, key, value)

    db.commit()
    db.refresh(ar)
    return {"message": f"Se modificó exitosamente la Reserva con el Id: {id}"}


# Endpoint para eliminar reservas
@router.delete("/{id}")
def eliminar_reserva(id: int, db: Session = Depends(get_session)):
    er = db.query(Reserva).filter(Reserva.id == id).first()
    if not er:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    db.delete(er)
    db.commit()
    return {"message": f"Se eliminó con éxito la Reserva con el Id: {id}"}


# Endpoint para generar comprobante PDF y guardarlo en DB
@router.post("/generar_comprobante/{reserva_id}")
def generar_comprobante(reserva_id: int, db: Session = Depends(get_session)):
    reserva = db.query(Reserva).options(
        joinedload(Reserva.turista),
        joinedload(Reserva.plan)
    ).filter(Reserva.id == reserva_id).first()

    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")

    # Crear PDF en memoria
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    pdf.setTitle("Comprobante de Pago")

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawCentredString(300, 750, "COMPROBANTE DE PAGO")
    pdf.setFont("Helvetica", 10)
    pdf.drawRightString(550, 730, f"Nº {reserva.id:05d}")
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawCentredString(300, 710, "Reservación Exitosa ✅")

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, 680, f"Fecha: Bogotá, {datetime.now().strftime('%d/%m/%Y')}")
    pdf.drawString(50, 660, f"Turista: {reserva.turista.nombre}")
    pdf.drawString(50, 640, f"CC: {reserva.turista.identificacion}")
    pdf.drawString(50, 620, f"Teléfono: {reserva.turista.celular}")
    pdf.drawString(50, 600, f"Plan: {reserva.plan.nombre}")

    pdf.drawString(50, 570, f"Fecha reserva: {reserva.fecha_reserva}")
    pdf.drawString(50, 550, f"Personas: {reserva.numero_personas}")
    pdf.drawString(50, 530, f"Precio plan: ${reserva.plan.precio:,}")
    pdf.drawString(50, 510, f"Precio x persona: $100,000")
    pdf.drawString(50, 490, f"Método de pago: Tarjeta de crédito")

    total = reserva.plan.precio + (reserva.numero_personas * 100000)
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, 460, f"TOTAL: ${total:,}")

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, 420, "Firma del responsable: Escapade Parfaite")
    pdf.drawString(50, 400, f"Firma del Turista: {reserva.turista.nombre}")

    pdf.save()
    buffer.seek(0)

    # Guardar en DB
    reserva.comprobante_pdf = buffer.getvalue()
    db.commit()

    # 👇 Enviar correo automáticamente
    try:
        enviar_comprobante(reserva, reserva.comprobante_pdf)
    except Exception as e:
        print("Error enviando correo:", e)

    return {"message": "Comprobante generado y guardado exitosamente"}
