from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.plan import Plan
from dtos.plan_dto import planCreateDTO, planUpdateDTO, PlanOut
from db.session import SessionLocal
from typing import List

#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
#objeto que contiene este grupo
#rutas
router = APIRouter( prefix='/plan' )

@router.get('/', response_model=List[PlanOut])
def listar_plan(db: Session = Depends(get_session)):
    lp = db.query(Plan).all()
    if not lp:
         raise HTTPException(status_code=404, detail="No hay Planes registrados")
    return lp

#Ruta parametrizada
@router.get('/{id}')
def listar_por_id(id: int, db: Session = Depends(get_session)):
    lp = db.query(Plan).filter(Plan.id == id).first()
    if not lp:
         raise HTTPException(status_code=404, detail="Plan no encontrado")
    return lp

#Ruta post
@router.post("/")
def crear_plan(nuevo_plan: planCreateDTO, db:Session = Depends(get_session)):
            
             # Validar que el correo o identificación no se repita
            existente = db.query(Plan).filter(
                (Plan.nombre == nuevo_plan.nombre) |
                (Plan.descripcion == nuevo_plan.descripcion)
            ).first()

            if existente:
                raise HTTPException(status_code=400, detail="Plan ya existe")

            #crear categoria
            np = Plan(
                    nombre = nuevo_plan.nombre,
                    descripcion = nuevo_plan.descripcion,
                    numero_dias = nuevo_plan.numero_dias,
                    numero_noches = nuevo_plan.numero_noches,
                    horario = nuevo_plan.horario,
                    id_ubicacion = nuevo_plan.id_ubicacion
            )
            #inserto la nueva categoria
            db.add(np)
            #confirmo la transaccion manualmente
            db.commit()
            #nueva categoria la dispongo en memoria
            db.refresh(np)
            return np

#Ruta update
@router.put('/{id}')
def actualizar_plan(id: int, datos: planUpdateDTO, db: Session = Depends(get_session)):
    ap = db.query(Plan).filter(Plan.id == id).first()
    if not ap:
        raise HTTPException(status_code=404, detail="Plan no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
         setattr(ap, key, value)
    db.commit()
    db.refresh(ap)
    return "Se modifico exitosamente el Plan con el Id:" + str(id)

#Ruta delet
@router.delete('/{id}')
def eliminar_plan(
                id: int,
                db: Session = Depends(get_session)
                ):
    ep = db.query(Plan).filter(Plan.id == id).first()
    if not ep:
         raise HTTPException(status_code=404, detail="Plan no encontrado")
    db.delete(ep)
    db.commit()
    return {"detail": f"Se elimino con exito el Plan con el Id: {id}"}