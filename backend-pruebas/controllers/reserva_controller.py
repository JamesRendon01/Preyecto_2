from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session, joinedload
from models.reserva import Reserva
from models.plan import Plan
from dtos.reserva_dto import reservaCreateDTO, reservaUpdateDTO, ReservaOut
from db.session import SessionLocal
from datetime import date, datetime
import io
from typing import Optional
from utils.jwt_manager import verify_access_token
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from mails.mailjet_config import enviar_comprobante


# =====================================================
# 🔹 Configuración general
# =====================================================

def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Creación del Router con el prefijo /reserva
router = APIRouter(prefix="/reserva", tags=["Reserva"])


@router.get("/mis_reservas")
def listar_reservas_usuario(
    authorization: Optional[str] = Header(None, alias="Authorization"),
    db: Session = Depends(get_session)
):
    # 🔹 Verificar token
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token no proporcionado")

    token = authorization.split(" ")[1]
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    user_id = payload.get("sub")
    rol = payload.get("rol")

    # 🔹 Si es admin -> mostrar todas las reservas
    if rol == "admin":
        reservas = db.query(Reserva).options(joinedload(Reserva.plan)).all()
    else:
        # 🔹 Si es turista -> mostrar solo sus reservas
        reservas = (
            db.query(Reserva)
            .options(joinedload(Reserva.plan))
            .filter(Reserva.id_turista == user_id)
            .all()
        )

    if not reservas:
        raise HTTPException(status_code=404, detail="No tienes reservas registradas")

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
            "plan_imagen": r.plan.imagen if r.plan else None,
            "id_turista": r.id_turista,
            "turista_nombre": r.turista.nombre if r.turista else None,
            "turista_celular": r.turista.celular if r.turista else None,
            "turista_identificacion": r.turista.identificacion if r.turista else None,
            "comprobante_pdf": f"http://localhost:8000/reserva/comprobante/{r.id}" if r.comprobante_pdf else None,
        })

    return resultado

@router.get("/listar_reservas", response_model=list[ReservaOut])
def listar_reserva(db: Session = Depends(get_session)):
    reservas = (
        db.query(Reserva)
        .options(joinedload(Reserva.turista), joinedload(Reserva.plan))
        .all()
    )

    if not reservas:
        raise HTTPException(status_code=404, detail="No hay Reservas registradas")


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


@router.get("/comprobante/{reserva_id}")
def obtener_comprobante(reserva_id: int, db: Session = Depends(get_session)):
    reserva = db.query(Reserva).filter(Reserva.id == reserva_id).first()
    if not reserva or not reserva.comprobante_pdf:
        raise HTTPException(status_code=404, detail="Comprobante no encontrado")

    from fastapi.responses import Response
    return Response(content=reserva.comprobante_pdf, media_type="application/pdf")


# Endpoint para listar reservas por id
@router.get("/{id}")
def listar_por_id(id: int, db: Session = Depends(get_session)):
    reserva = db.query(Reserva).filter(Reserva.id == id).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva


# =====================================================
# 🔹 Crear nueva reserva
# =====================================================

@router.post("/crear_reserva", response_model=ReservaOut)
def crear_reserva(
    nuevo_reserva: reservaCreateDTO,
    authorization: Optional[str] = Header(None, alias="Authorization"),
    db: Session = Depends(get_session),
):
    # 🔸 Validación del token JWT
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token no proporcionado")

    token = authorization.split(" ")[1]
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    turista_id = payload.get("sub")
    if not turista_id:
        raise HTTPException(status_code=401, detail="No se pudo obtener el id del turista")

    # 🔸 Validación de la fecha
    if not nuevo_reserva.fecha_reserva or not isinstance(nuevo_reserva.fecha_reserva, date):
        raise HTTPException(status_code=400, detail="Fecha de reserva inválida")

    # 🔸 Validación del token de pago
    if not nuevo_reserva.token_tarjeta:
        raise HTTPException(status_code=400, detail="Token de pago requerido")

    # 🚫 Evitar reservas duplicadas
    reserva_existente = db.query(Reserva).filter(
        Reserva.id_turista == int(turista_id),
        Reserva.id_plan == nuevo_reserva.id_plan
    ).first()

    if reserva_existente:
        raise HTTPException(
            status_code=400,
            detail="Ya tienes una reserva activa para este plan. Solo se permite una por turista."
        )

    # =====================================================
    # ✅ Cálculo del costo final (sin adicionales)
    # =====================================================
    plan = db.query(Plan).get(nuevo_reserva.id_plan)
    if not plan:
        raise HTTPException(status_code=404, detail="El plan no existe")

    # Costo final = número de personas * costo por persona del plan
    costo_final = nuevo_reserva.numero_personas * plan.costo_persona

    # =====================================================
    # ✅ Crear y guardar la reserva
    # =====================================================
    reserva = Reserva(
        fecha_reserva=nuevo_reserva.fecha_reserva,
        costo_final=costo_final,
        disponibilidad=nuevo_reserva.disponibilidad,
        numero_personas=nuevo_reserva.numero_personas,
        id_informe=nuevo_reserva.id_informe,
        id_plan=nuevo_reserva.id_plan,
        id_turista=int(turista_id),
    )

    db.add(reserva)
    db.commit()
    db.refresh(reserva)

    # =====================================================
    # ✅ Generar comprobante PDF
    # =====================================================
    reserva = db.query(Reserva).options(
        joinedload(Reserva.turista),
        joinedload(Reserva.plan)
    ).filter(Reserva.id == reserva.id).first()


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
    pdf.drawString(50, 530, f"Precio por persona: ${plan.costo_persona:,}")
    pdf.drawString(50, 490, f"Método de pago: Tarjeta de crédito")

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, 460, f"TOTAL: ${costo_final:,}")

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, 420, "Firma del responsable: Escapade Parfaite")
    pdf.drawString(50, 400, f"Firma del Turista: {reserva.turista.nombre}")

    pdf.save()
    buffer.seek(0)
    pdf_bytes = buffer.getvalue()

    # Guarda el PDF (opcional si tu modelo tiene campo LargeBinary)
    reserva.comprobante_pdf = pdf_bytes
    db.commit()

    # =====================================================
    # ✅ Enviar comprobante por correo
    # =====================================================
    try:
        enviar_comprobante(reserva, pdf_bytes)
    except Exception as e:
        print("⚠️ Error enviando correo:", e)

    # =====================================================
    # ✅ Respuesta final
    # =====================================================
    return ReservaOut(
        id=reserva.id,
        fecha_reserva=str(reserva.fecha_reserva),
        costo_final=costo_final,
        disponibilidad=reserva.disponibilidad,
        numero_personas=reserva.numero_personas,
        id_plan=reserva.id_plan,
        plan_nombre=plan.nombre,
        id_turista=reserva.id_turista,
        turista_nombre=reserva.turista.nombre
    )



# =====================================================
# 🔹 Actualizar reserva
# =====================================================

@router.put("/{id}")
def actualizar_reserva(id: int, datos: reservaUpdateDTO, db: Session = Depends(get_session)):
    reserva = db.query(Reserva).filter(Reserva.id == id).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")

    for key, value in datos.dict(exclude_unset=True).items():
        setattr(reserva, key, value)

    db.commit()
    db.refresh(reserva)
    return {"message": f"Se modificó exitosamente la Reserva con el Id: {id}"}


# =====================================================
# 🔹 Eliminar reserva
# =====================================================

@router.delete("/{id}")
def eliminar_reserva(id: int, db: Session = Depends(get_session)):
    reserva = db.query(Reserva).filter(Reserva.id == id).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")

    db.delete(reserva)
    db.commit()
    return {"message": f"Se eliminó con éxito la Reserva con el Id: {id}"}


# =====================================================
# 🔹 Fechas ocupadas por plan
# =====================================================

@router.get("/disponibilidad/{id_plan}")
def obtener_fechas_ocupadas(id_plan: int, db: Session = Depends(get_session)):
    reservas = db.query(Reserva).filter(Reserva.id_plan == id_plan).all()
    fechas_ocupadas = [r.fecha_reserva.strftime("%Y-%m-%d") for r in reservas]
    return {"fechas_ocupadas": fechas_ocupadas}


