from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.administrador import Administrador
from dtos.administrador_dto import iniciarSesionDTO
from db.session import SessionLocal
from utils.security import hash_password, verify_password

#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
#objeto que contiene este grupo
#rutas
router = APIRouter( prefix='/administrador' )

@router.get('/')
def listar_administradores(
                db: session = Depends(get_session)
                ):
    la = db.query(Administrador).all()
    if not la:
         raise HTTPException(status_code=404, detail="No hay administradores registrados")
    return la

#Ruta parametrizada
@router.get('/{id}')
def listar_por_id(
                id: int, 
                db: session = Depends(get_session)
                ):
    lpa = db.query(Administrador).filter(Administrador.id == id).first()
    if not lpa:
         raise HTTPException(status_code=404, detail="Administardor no encontrado")
    return lpa

#Ruta post

@router.post("/iniciarsesion")
def iniciar_sesion(datos: iniciarSesionDTO, db: session = Depends(get_session)):
    administrador = db.query(Administrador).filter(Administrador.correo == datos.correo).first()

    if not administrador:
        raise HTTPException(status_code=401, detail="Correo no registrado")
    
    if not verify_password(datos.contrasena, administrador.contrasena):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    return {
        "mensaje": "Inicio de sesión exitoso",
        "turista": {
            "id": administrador.id,
            "correo": administrador.correo
        }
    }
