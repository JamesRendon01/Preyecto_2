from fastapi import APIRouter, Depends, HTTPException, Query, Form, UploadFile, File
from sqlalchemy.orm import Session
from models.plan import Plan
from dtos.plan_dto import planCreateDTO, planUpdateDTO, PlanOut, PlanCardOut, ListarPlanAdmin,  planUpdateIdDTO
from db.session import SessionLocal
from typing import List, Optional
import shutil
import os
import uuid

# Carpeta donde se guardan las imagenes de los planes
UPLOAD_DIR = "uploads/planes_img"
os.makedirs(UPLOAD_DIR, exist_ok=True) #Crea la carpeta si no existe

#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# Creacion del Router con el prefijo /plans
router = APIRouter( prefix='/plan' )

# Endpoint para listar todos los planes
@router.get('/listar-planes', response_model=List[ListarPlanAdmin])
def listar_plan(db: Session = Depends(get_session)):
    lp = db.query(Plan).all()
    # Si no existe ningun plan maneja el error y muestra el siguiente mensaje "No hay planes registrados"
    if not lp:
         raise HTTPException(status_code=404, detail="No hay Planes registrados")
    # Transforma los datos para la respuesta
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
    # Retorna con los datos generados
    return result   

# Endpoint para listar planes por ID
@router.get('/listar-plan-id/{id}', response_model=planUpdateIdDTO)
def obtener_plan_id(id: int, db: Session = Depends(get_session)):
     # Consulta los planes por el Id ingresado
     plan = db.query(Plan).filter(Plan.id == id).first()
     if not plan:
        raise HTTPException(status = 404, detail="Plan no encontrado")
     return plan

# Endpoint para crear un nuevo plan
@router.post("/crear-plan")
def crear_plan(
    # Datos del formulario
    nombre: str = Form(...),
    descripcion_corta: str = Form(...),
    descripcion: str = Form(...),
    costo_persona: float = Form(...),
    id_ciudad: Optional[int] = Form(None),
    id_informe: Optional[int] = Form(None),
    imagen: Optional[UploadFile] = File(None),
    db: Session = Depends(get_session)
):
    filename = None

    # Guardar imagen si se envia
    if imagen:
        ext = os.path.splitext(imagen.filename)[1]  # Obtiene la extencion
        filename = f"{uuid.uuid4().hex}{ext}" #Genera un nombre unico para almacenar la imagen
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(imagen.file, buffer) # Guarda el archivo

    # Crear plan en la DB
    nuevo_plan = Plan(
        nombre=nombre,
        descripcion_corta=descripcion_corta,
        descripcion=descripcion,
        costo_persona=costo_persona,
        id_ciudad=id_ciudad,
        imagen=filename
    )
    db.add(nuevo_plan)
    # Guarda cambios
    db.commit()
    db.refresh(nuevo_plan) # Refresca objeto para obtener ID generado

    # Retorna con un mensaje y el id del nuevo plan
    return {"detail": "Plan creado correctamente", "id": nuevo_plan.id}

# Endpoint para actualizar plan existente
@router.put("/update/{id}")
def actualizar_plan(
    # Datos del formulario de actualiziacion
    id: int,
    nombre: str = Form(...),
    descripcion_corta: str = Form(...),
    descripcion: str = Form(...),
    costo_persona: float = Form(...),
    id_ciudad: int = Form(...),
    imagen: UploadFile = File(None),
    db: Session = Depends(get_session)
):
    #busca el plan
    plan = db.query(Plan).filter(Plan.id == id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan no encontrado")

    # Actualiza los campos
    plan.nombre = nombre
    plan.descripcion_corta = descripcion_corta
    plan.descripcion = descripcion
    plan.costo_persona = costo_persona
    plan.id_ciudad = id_ciudad

    # Guardar nueva imagen si se envía
    if imagen:
        import uuid
        ext = os.path.splitext(imagen.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}" # Genera un nombre unico
        file_path = os.path.join(UPLOAD_DIR, filename)
        import shutil
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(imagen.file, buffer)
        plan.imagen = filename

    db.commit() # Guarda cambios
    db.refresh(plan)

    return {"detail": f"Plan actualizado correctamente", "id": plan.id}

# Endpoint para eliminar planes existentes
@router.delete('/delet/{id}')
def eliminar_plan(id: int, db: Session = Depends(get_session)):
    # Busca el plan el plan
    ep = db.query(Plan).filter(Plan.id == id).first()
    if not ep:
         raise HTTPException(status_code=404, detail="Plan no encontrado")
    db.delete(ep) # Elimina el plan
    db.commit() # Guarda los cambios
    #Retorna con un mensaje y con el ID del plan eliminado
    return {"detail": f"Se elimino con exito el Plan con el Id: {id}"}

# Ruta para obtener planes para carrucel (No trae todos los campos de los planes)
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

    # Si no hay ningun plan maneja el error y muestra el siguiente mensaje "No hay planes disponibles"
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
# Endpoint para obtener planes para las CARDS
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
    
    # Si no hay ningun plan maneja el error y muestra el siguiente mensaje "No hay planes disponibles"
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

# Endpoint para buscar planes por nombre o desripciones
@router.get("/buscar", response_model = List[PlanCardOut])
def buscar_planes(query: str = Query(..., min_lengh=1), db: Session = Depends (get_session)):
    resultados = db.query(Plan).filter(
        (Plan.nombre.ilike(f"%{query}%")) |
        (Plan.descripcion.ilike(f"%{query}%"))
    ).all()

    if not resultados:
        return[] # Retorna lista vacia si noe encuentra resultados
    
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