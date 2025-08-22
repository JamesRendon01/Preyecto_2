from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.notificacion import Notificacion
from dtos.notificaciones_dto import notificacionesCreateDTO
from dtos.notificaciones_dto import notificacionesUpdateDTO
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
router = APIRouter( prefix='/notificacion' )

@router.get('/')
def listar_hoteles(
                db: session = Depends(get_session)
                ):
    ln = db.query(Notificacion).all()
    if not ln:
         raise HTTPException(status_code=404, detail="No hay hoteles registrados")
    return ln

#Ruta parametrizada
@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    ln = db.query(Notificacion).filter(Notificacion.id == id).first()
    if not ln:
         raise HTTPException(status_code=404, detail="Hotel no encontrado")
    return ln


#Ruta post
@router.post("/")
def crear_notificaciones(
                nuevo_notificacion: notificacionesCreateDTO,
                db:session = Depends(get_session)
                ):
            #crear categoria
            nn = Notificacion(
                    mensaje = nuevo_notificacion.mensaje,
                    fecha_envio = nuevo_notificacion.fecha_envio,
                    id_administrador = nuevo_notificacion.id_administrador,
                    id_chat = nuevo_notificacion.id_chat
            )
            #inserto la nueva categoria
            db.add(nn)
            #confirmo la transaccion manualmente
            db.commit()
            #nueva categoria la dispongo en memoria
            db.refresh(nn)
            return nn

#Ruta update
@router.put('/{id}')
def actualizar_notifiaciones(
                id: int, datos: notificacionesUpdateDTO,
                db: session = Depends(get_session)
                ):
    an = db.query(Notificacion).filter(Notificacion.id == id).first()
    if not an:
        raise HTTPException(status_code=404, detail="Notificacion no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(an, key, value)
    db.commit()
    db.refresh(an)
    return "Se modifico exitosamente la Notificacion con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_notificaciones(
                id: int,
                db: session = Depends(get_session)
                ):
    en = db.query(Notificacion).filter(Notificacion.id == id).first()
    if not en:
         raise HTTPException(status_code=404, detail="Turista no encontrado")
    db.delete(en)
    db.commit()
    return "Se elimino con exito la Notificacion con el Id:" + str(id)