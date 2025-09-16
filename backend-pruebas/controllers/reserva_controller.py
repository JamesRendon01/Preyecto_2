from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.reserva import Reserva
from dtos.reserva_dto import reservaCreateDTO
from dtos.reserva_dto import reservaUpdateDTO
from db.session import SessionLocal
from services.mercadopago_service import crear_pago
from datetime import date

#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# Creacion del Router con el prefijo /reserva
router = APIRouter( prefix='/reserva' )

#Endoint para listar todas las reservas
@router.get('/')
def listar_reserva(
                db: session = Depends(get_session)
                ):
    lr = db.query(Reserva).all()
    if not lr:
         raise HTTPException(status_code=404, detail="No hay Reservas registradas")
    # Retorna con la lista de reservas
    return lr

# Endpoint para listar reservas por id
@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    lr = db.query(Reserva).filter(Reserva.id == id).first()
    if not lr:
         raise HTTPException(status_code=404, detail="Ruta no encontrada")
    # Retorna con la lista de reservas
    return lr

# Endpoint para crear una nueva reserva
@router.post("/crear_reserva")
def crear_reserva(nuevo_reserva: reservaCreateDTO, db: session = Depends(get_session)):
    # Validación de fecha
    if not nuevo_reserva.fecha_reserva or not isinstance(nuevo_reserva.fecha_reserva, date):
        raise HTTPException(status_code=400, detail="Fecha de reserva inválida")

    # Validación token de pago
    if not nuevo_reserva.token_tarjeta:
        raise HTTPException(status_code=400, detail="Token de pago requerido")

    # Crear objeto reserva (sin commit todavía)
    reserva = Reserva(
        fecha_reserva=nuevo_reserva.fecha_reserva,
        costo_final=nuevo_reserva.costo_final,
        disponibilidad=nuevo_reserva.disponibilidad,
        numero_personas=nuevo_reserva.numero_personas,
        id_informe=nuevo_reserva.id_informe,
        id_plan=nuevo_reserva.id_plan,
        id_turista=nuevo_reserva.id_turista
    )

    try:
        # Crear pago con Mercado Pago
        pago = crear_pago(
            token_tarjeta=nuevo_reserva.token_tarjeta,
            monto=nuevo_reserva.costo_final,
            descripcion=f"Reserva ID temporal",
            email_cliente=nuevo_reserva.email_cliente
        )

        # Validar respuesta de pago
        if not pago.get("status"):
            raise HTTPException(status_code=400, detail=f"Error en respuesta de Mercado Pago: {pago.get('raw')}")

        if pago["status"] != "approved":
            raise HTTPException(
                status_code=400,
                detail=f"Pago fallido: {pago.get('status_detail')} - {pago.get('status')}"
            )

        # Guardar reserva en DB solo si pago fue aprobado
        db.add(reserva)
        db.commit()
        db.refresh(reserva)

    except HTTPException:
        db.rollback() # Revertit si hubo un HTTPExceptuion
        raise
    except Exception as e:
        db.rollback() # Revertir cambios si hubo un error inesperado
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")

    return {
        "reserva": {
            "id": reserva.id,
            "fecha_reserva": reserva.fecha_reserva,
            "costo_final": reserva.costo_final,
            "disponibilidad": reserva.disponibilidad,
            "numero_personas": reserva.numero_personas,
            "id_informe": reserva.id_informe,
            "id_plan": reserva.id_plan,
            "id_turista": reserva.id_turista
        },
        "pago": pago
    }

#Endpoint para actualizar reservas
@router.put('/{id}')
def actualizar_reserva(id: int, datos: reservaUpdateDTO,db: session = Depends(get_session)):
    #Buscar resserva por id
    ar = db.query(Reserva).filter(Reserva.id == id).first()
    # Actualizar solo los campos proporcionados
    if not ar:
        raise HTTPException(status_code=404, detail="Reserva no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(ar, key, value)
    db.commit() #Guardar cambios
    db.refresh(ar)
    return "Se modifico exitosamente la Reserva con el Id:" + str(id)

#Endpoint para eliminar reservas
@router.delete('/{id}')
def eliminar_reserva(id: int,db: session = Depends(get_session)):
    # Busca la reserva por ID
    er = db.query(Reserva).filter(Reserva.id == id).first()
    if not er:
         raise HTTPException(status_code=404, detail="Reserva no encontrado")
    db.delete(er)# Elimina la reserva
    db.commit() # Guarda cambios
    return "Se elimino con exito la Reserva con el Id:" + str(id)