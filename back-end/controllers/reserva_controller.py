from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.reserva import Reserva
from dtos.reserva_dto import reservaCreateDTO
from dtos.reserva_dto import reservaUpdateDTO
from db.session import SessionLocal

#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
#objeto que contiene este grupo
#rutas
router = APIRouter( prefix='/reserva' )

@router.get('/')
def listar_reserva(
                db: session = Depends(get_session)
                ):
    lr = db.query(Reserva).all()
    if not lr:
         raise HTTPException(status_code=404, detail="No hay Reservas registradas")
    return lr

@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    lr = db.query(Reserva).filter(Reserva.id == id).first()
    if not lr:
         raise HTTPException(status_code=404, detail="Ruta no encontrada")
    return lr

#Ruta post
@router.post("/")
def crear_reserva(
                nuevo_reserva: reservaCreateDTO,
                db:session = Depends(get_session)
                ):
            #crear categoria
            nr = Reserva(
                    fecha_inicio = nuevo_reserva.fecha_inicio,
                    fecha_fin = nuevo_reserva.fecha_fin,
                    precio = nuevo_reserva.precio,
                    id_turista = nuevo_reserva.id_turista,
                    id_hotel = nuevo_reserva.id_hotel
            )
            #inserto la nueva categoria
            db.add(nr)
            #confirmo la transaccion manualmente
            db.commit()
            #nueva categoria la dispongo en memoria
            db.refresh(nr)
            return nr

#Ruta update
@router.put('/{id}')
def actualizar_reserva(
                id: int, datos: reservaUpdateDTO,
                db: session = Depends(get_session)
                ):
    ar = db.query(Reserva).filter(Reserva.id == id).first()
    if not ar:
        raise HTTPException(status_code=404, detail="Reserva no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(ar, key, value)
    db.commit()
    db.refresh(ar)
    return "Se modifico exitosamente la Reserva con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_reserva(
                id: int,
                db: session = Depends(get_session)
                ):
    er = db.query(Reserva).filter(Reserva.id == id).first()
    if not er:
         raise HTTPException(status_code=404, detail="Reserva no encontrado")
    db.delete(er)
    db.commit()
    return "Se elimino con exito la Reserva con el Id:" + str(id)