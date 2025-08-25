from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.ciudad import Ciudad
from db.session import SessionLocal

router = APIRouter(prefix="/ciudad")

# Dependency para obtener la sesión
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Listar todas las ciudades
@router.get("/")
def listar_ciudades(db: Session = Depends(get_session)):
    ciudades = db.query(Ciudad).all()
    if not ciudades:
        raise HTTPException(status_code=404, detail="No hay ciudades registradas")
    return ciudades

# Obtener una ciudad por id
@router.get("/{id}")
def obtener_ciudad(id: int, db: Session = Depends(get_session)):
    ciudad = db.query(Ciudad).filter(Ciudad.id == id).first()
    if not ciudad:
        raise HTTPException(status_code=404, detail="Ciudad no encontrada")
    return ciudad
