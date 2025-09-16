from fastapi import APIRouter, Depends, HTTPException, Query, Form, UploadFile, File
from sqlalchemy.orm import Session
from models.plan import Plan
from dtos.plan_dto import planCreateDTO, planUpdateDTO, PlanOut, PlanCardOut, ListarPlanAdmin,  planUpdateIdDTO
from db.session import SessionLocal
from typing import List, Optional
import shutil
import os

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

@router.get('/listar-planes', response_model=List[ListarPlanAdmin])
def listar_plan(db: Session = Depends(get_session)):
    lp = db.query(Plan).all()
    if not lp:
         raise HTTPException(status_code=404, detail="No hay Planes registrados")
    result = []
    for plan in lp:
         result.append({
            "id": plan.id,
            "nombre": plan.nombre,
            "descripcion_corta": plan.descripcion_corta,
            "descripcion": plan.descripcion, 
            "costo_persona": plan.costo_persona,
            "id_ciudad": plan.ciudad.nombre if plan.ciudad else None,
            "ubicaciones": [ubicacion.id for ubicacion in (plan.ubicaciones or [])]
         })
    return result   

@router.get('/listar-plan-id/{id}', response_model=planUpdateIdDTO)
def obtener_plan_id(id: int, db: Session = Depends(get_session)):
     plan = db.query(Plan).filter(Plan.id == id).first()
     if not plan:
        raise HTTPException(status = 404, detail="Plan no encontrado")
     return plan


@router.post("/crear-plan")
def crear_plan(
    nombre: str = Form(...),
    descripcion_corta: str = Form(...),
    descripcion: str = Form(...),
    costo_persona: float = Form(...),
    id_ciudad: int = Form(...),
    id_informe: int = Form(...),
    imagen: UploadFile = File(None),
    db: Session = Depends(get_session)
):
    # Guardar imagen si existe
    filename = None
    if imagen:
        os.makedirs("./uploads/planes_img", exist_ok=True)
        filename = imagen.filename
        with open(f"./uploads/planes_img/{filename}", "wb") as f:
            f.write(imagen.file.read())

    # Crear plan en la DB
    nuevo_plan = Plan(
        nombre=nombre,
        descripcion_corta=descripcion_corta,
        descripcion=descripcion,
        costo_persona=costo_persona,
        id_ciudad=id_ciudad,
        id_informe=id_informe,
        imagen=filename
    )
    db.add(nuevo_plan)
    db.commit()
    db.refresh(nuevo_plan)

    return {"detail": "Plan creado correctamente", "id": nuevo_plan.id}

#Ruta update
@router.put("/update/{id}")
def actualizar_plan(
    id: int,
    nombre: str = Form(...),
    descripcion_corta: str = Form(...),
    descripcion: str = Form(...),
    costo_persona: int = Form(...),
    id_ciudad: int = Form(...),
    imagen: UploadFile = File(None),  # Puede venir vacío
    db: Session = Depends(get_session)
):
    ap = db.query(Plan).filter(Plan.id == id).first()
    if not ap:
        raise HTTPException(status_code=404, detail="Plan no encontrado")

    # Actualizar los campos
    ap.nombre = nombre
    ap.descripcion_corta = descripcion_corta
    ap.descripcion = descripcion
    ap.costo_persona = costo_persona
    ap.id_ciudad = id_ciudad

    # Si el usuario envió una nueva imagen
    if imagen:
        file_path = f"uploads/planes_img/{imagen.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(imagen.file, buffer)
        ap.imagen = imagen.filename  # guardamos solo el nombre en la BD

    db.commit()
    db.refresh(ap)

    return {"detail": f"Se modificó exitosamente el plan con Id: {id}"}

#Ruta delet
@router.delete('/delet/{id}')
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

@router.get("/buscar", response_model = List[PlanCardOut])
def buscar_planes(query: str = Query(..., min_lengh=1), db: Session = Depends (get_session)):
    resultados = db.query(Plan).filter(
        (Plan.nombre.ilike(f"%{query}%")) |
        (Plan.descripcion.ilike(f"%{query}%"))
    ).all()

    if not resultados:
        return[]
    
    planes = []
    for plan in resultados:
        planes.append({
            "id": plan.id,
            "nombre": plan.nombre,
            "descripcion_corta": plan.descripcion_corta,
            "descripcion": plan.descripcion,
            "imagen": plan.imagen
        })
    return planes