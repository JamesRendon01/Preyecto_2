from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.plan import Plan
from dtos.plan_dto import planCreateDTO, planUpdateDTO, PlanOut
from db.session import SessionLocal
from typing import List
import shutil

UPLOAD_DIR = "uploads/planes_img"

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
    result = []
    for plan in lp:
         result.append({
            "id": plan.id,
            "nombre": plan.nombre,
            "descripcion": plan.descripcion,
            "descripcion_corta": plan.descripcion_corta,
            "costo_persona": plan.costo_persona,
            "id_ciudad": plan.id_ciudad, 
            "id_informe": plan.id_informe,
            "nombre_ciudad": plan.ciudad.nombre if plan.ciudad else None,
            "imagen": plan.imagen
         })
    return result


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
                    descripcion_corta = nuevo_plan.descripcion_corta,
                    costo_persona = nuevo_plan.costo_persona,
                    imagen = nuevo_plan.imagen,
                    id_ciudad = nuevo_plan.id_ciudad,
                    id_informe = nuevo_plan.id_informe,
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

@router.get("/api/planes")
def obtener_planes(db: Session = Depends(get_session)):
    """
    Devuelve todos los planes con los campos necesarios para el carrusel:
    imagen, nombre, descripcion.
    """
    resultados = db.query(
        Plan.id,
        Plan.nombre,
        Plan.descripcion_corta,
        Plan.imagen
    ).all()

    if not resultados:
        raise HTTPException(status_code=404, detail="No hay planes disponibles")
    
    planes = []
    for r in resultados:
        planes.append({
            "id": r.id,
            "nombre": r.nombre,
            "descripcion_corta": r.descripcion_corta,
            "imagen": r.imagen
        })

    return planes;

@router.get("/card_planes")
def obtener_planes_card(db: Session = Depends(get_session)):
    """
    Devuelve todos los planes con los campos necesarios para el carrusel:
    imagen, nombre, descripcion.
    """
    resultados = db.query(
        Plan.id,
        Plan.nombre,
        Plan.descripcion_corta,
        Plan.descripcion,
        Plan.imagen
    ).all()

    if not resultados:
        raise HTTPException(status_code=404, detail="No hay planes disponibles")
    
    card_planes = []
    for r in resultados:
        card_planes.append({
            "id": r.id,
            "nombre": r.nombre,
            "descripcion_corta": r.descripcion_corta,
            "descripcion": r.descripcion,
            "imagen": r.imagen
        })

    return card_planes;

