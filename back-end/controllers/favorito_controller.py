from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.favorito import Favorito
from dtos.favorito_dto import favoritoCreateDTO
from dtos.favorito_dto import favoritoUpdateDTO
from db.session import SessionLocal

#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#rutas
router = APIRouter( prefix='/favorito' )

@router.get('/')
def listar_favoritos(
                db: session = Depends(get_session)
                ):
    lf = db.query(Favorito).all()
    if not lf:
         raise HTTPException(status_code=404, detail="No hay Favoritos registrados")
    return lf

@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    lf = db.query(Favorito).filter(Favorito.id == id).first()
    if not lf:
         raise HTTPException(status_code=404, detail="Favorito no encontrado")
    return lf

#Ruta post
@router.post("/")
def crear_favorito(
                nuevo_favorito: favoritoCreateDTO,
                db:session = Depends(get_session)
                ):
            #crear categoria
            nf = Favorito(
                    id_turista=nuevo_favorito.id_turista,
                    id_plan=nuevo_favorito.id_plan
            )
            #inserto la nueva categoria
            db.add(nf)
            #confirmo la transaccion manualmente
            db.commit()
            #nueva categoria la dispongo en memoria
            db.refresh(nf)
            return nf

#Ruta update
@router.put('/{id}')
def actualizar_favorito(
                id: int, datos: favoritoUpdateDTO,
                db: session = Depends(get_session)
                ):
    af = db.query(Favorito).filter(Favorito.id == id).first()
    if not af:
        raise HTTPException(status_code=404, detail="Favorito no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(af, key, value)
    db.commit()
    db.refresh(af)
    return "Se modifico exitosamente el Favorito con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_favorito(
                id: int,
                db: session = Depends(get_session)
                ):
    ef = db.query(Favorito).filter(Favorito.id == id).first()
    if not ef:
         raise HTTPException(status_code=404, detail="Favorito no encontrado")
    db.delete(ef)
    db.commit()
    return "Se elimino con exito el Favorito con el Id:" + str(id)