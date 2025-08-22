from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.informe import Informe
from dtos.informe_dto import informeCreateDTO
from dtos.informe_dto import informeUpdateDTO
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
router = APIRouter( prefix='/informe' )

@router.get('/')
def listar_informe(
                db: session = Depends(get_session)
                ):
    li = db.query(Informe).all()
    if not li:
         raise HTTPException(status_code=404, detail="No hay Informes registrados")
    return li

#Ruta parametrizada
@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    li = db.query(Informe).filter(Informe.id == id).first()
    if not li:
         raise HTTPException(status_code=404, detail="Informe no encontrado")
    return li


#Ruta post
@router.post("/")
def crear_informe(nuevo_informe: informeCreateDTO, db:session = Depends(get_session)):
             # Validar que el correo o identificación no se repita
            existente = db.query(Informe).filter(
                (Informe.nombre == nuevo_informe.nombre)
            ).first()

            if existente:
                raise HTTPException(status_code=400, detail="Informe ya existe")

            #crear categoria
            nf = Informe(
                    nombre=nuevo_informe.nombre,
                    fecha_creacion=nuevo_informe.fecha_creacion,
                    id_administrador=nuevo_informe.id_administrador
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
def actualizar_informe(
                id: int, datos: informeUpdateDTO,
                db: session = Depends(get_session)
                ):
    af = db.query(Informe).filter(Informe.id == id).first()
    if not af:
        raise HTTPException(status_code=404, detail="Informe no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(af, key, value)
    db.commit()
    db.refresh(af)
    return "Se modifico exitosamente el Informe con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_turista(
                id: int,
                db: session = Depends(get_session)
                ):
    ef = db.query(Informe).filter(Informe.id == id).first()
    if not ef:
         raise HTTPException(status_code=404, detail="Turista no encontrado")
    db.delete(ef)
    db.commit()
    return "Se elimino con exito el Informe con el Id:" + str(id)