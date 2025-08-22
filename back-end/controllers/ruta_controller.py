from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.ruta import Ruta
from dtos.ruta_dto import rutaCreateDTO
from dtos.ruta_dto import rutaUpdateDTO
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
router = APIRouter( prefix='/ruta' )

@router.get('/')
def listar_rutas(
                db: session = Depends(get_session)
                ):
    lr = db.query(Ruta).all()
    if not lr:
         raise HTTPException(status_code=404, detail="No hay Rutas registradas")
    return lr

#Ruta parametrizada
@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    lr = db.query(Ruta).filter(Ruta.id == id).first()
    if not lr:
         raise HTTPException(status_code=404, detail="Ruta no encontrada")
    return lr


#Ruta post
@router.post("/")
def crear_ruta(
                nuevo_ruta: rutaCreateDTO,
                db:session = Depends(get_session)
                ):
            #crear categoria
            nr = Ruta(
                    distancia = nuevo_ruta.distancia,
                    ciudad = nuevo_ruta.ciudad
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
def actualizar_ruta(
                id: int, datos: rutaUpdateDTO,
                db: session = Depends(get_session)
                ):
    ar = db.query(Ruta).filter(Ruta.id == id).first()
    if not ar:
        raise HTTPException(status_code=404, detail="Ruta no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(ar, key, value)
    db.commit()
    db.refresh(ar)
    return "Se modifico exitosamente el Ruta con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_ruta(
                id: int,
                db: session = Depends(get_session)
                ):
    er = db.query(Ruta).filter(Ruta.id == id).first()
    if not er:
         raise HTTPException(status_code=404, detail="Ruta no encontrado")
    db.delete(er)
    db.commit()
    return "Se elimino con exito la Ruta con el Id:" + str(id)