from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from models.informe import Informe
from db.session import SessionLocal
import os
from datetime import datetime
import shutil

router = APIRouter(prefix="/informe", tags=["Informes"])

# Obtener sesión
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Carpeta donde se guardarán los PDF
CARPETA_INFORMES = os.path.join(os.getcwd(), "uploads", "informes")
os.makedirs(CARPETA_INFORMES, exist_ok=True)

# 📄 Crear informe con archivo PDF
@router.post("/")
async def crear_informe(
    nombre: str = Form(...),
    id_administrador: int = Form(...),
    archivo: UploadFile = None,
    db: Session = Depends(get_session)
):
    # Validar duplicado
    existente = db.query(Informe).filter(Informe.nombre == nombre).first()
    if existente:
        raise HTTPException(status_code=400, detail="Informe ya existe")

    # Guardar PDF
    if archivo:
        filename = f"{nombre}_{datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
        ruta_archivo = os.path.join(CARPETA_INFORMES, filename)
        with open(ruta_archivo, "wb") as buffer:
            shutil.copyfileobj(archivo.file, buffer)
    else:
        ruta_archivo = None

    # Crear registro
    nuevo_informe = Informe(
        nombre=nombre,
        fecha_creacion=datetime.now(),
        id_administrador=id_administrador,
        ruta_pdf=ruta_archivo
    )
    db.add(nuevo_informe)
    db.commit()
    db.refresh(nuevo_informe)

    return {
        "mensaje": "Informe creado correctamente",
        "informe": nuevo_informe
    }
    