from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.instancia import Instancia
from dtos.instancia_dto import instanciaCreateDTO
from dtos.instancia_dto import instanciaUpdateDTO
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
router = APIRouter( prefix='/instancia' )

@router.get('/')
def listar_instancia(
                db: session = Depends(get_session)
                ):
    li = db.query(Instancia).all()
    if not li:
         raise HTTPException(status_code=404, detail="No hay Instancias registrados")
    return li

#Ruta parametrizada
@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    li = db.query(Instancia).filter(Instancia.id == id).first()
    if not li:
         raise HTTPException(status_code=404, detail="Instancia no encontrado")
    return li


#Ruta post
@router.post("/")
def crear_instancia(
                nuevo_instancia: instanciaCreateDTO,
                db:session = Depends(get_session)
                ):
            #crear categoria
            ni = Instancia(
                    fecha_inicio = nuevo_instancia.fecha_inicio,
                    fecha_fin = nuevo_instancia.fecha_fin,
                    costo = nuevo_instancia.costo,
                    id_plan = nuevo_instancia.id_plan
            )
            #inserto la nueva categoria
            db.add(ni)
            #confirmo la transaccion manualmente
            db.commit()
            #nueva categoria la dispongo en memoria
            db.refresh(ni)
            return ni

#Ruta update
@router.put('/{id}')
def actualizar_turista(
                id: int, datos: instanciaUpdateDTO,
                db: session = Depends(get_session)
                ):
    ai = db.query(Instancia).filter(Instancia.id == id).first()
    if not ai:
        raise HTTPException(status_code=404, detail="Instancia no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(ai, key, value)
    db.commit()
    db.refresh(ai)
    return "Se modifico exitosamente la Instancia con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_turista(
                id: int,
                db: session = Depends(get_session)
                ):
    ei = db.query(Instancia).filter(Instancia.id == id).first()
    if not ei:
         raise HTTPException(status_code=404, detail="Instancia no encontrado")
    db.delete(ei)
    db.commit()
    return "Se elimino con exito la Instancia con el Id:" + str(id)