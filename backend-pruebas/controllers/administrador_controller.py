from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.administrador import Administrador
from dtos.administrador_dto import iniciarSesionDTO
from db.session import SessionLocal
from utils.jwt_manager import create_access_token, verify_access_token
from datetime import datetime, timedelta
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
    if administrador.bloqueado_hasta and datetime.utcnow() < administrador.bloqueado_hasta:
        raise HTTPException(status_code=403, detail = f"Cuenta bloqueada. Intenta de nuevo a las {administrador.bloqueado_hasta}")
    #Validar contrsaeña
    if not verify_password(datos.contrasena, administrador.contrasena):
        administrador.intentos_fallidos += 1
        #Si alcanza el maximo de intentos => bloquear
        if administrador.intentos_fallidos >= 5:
            administrador.intentos_fallidos = 0
            administrador.bloqueado_hasta = datetime.utcnow() + timedelta(minutes = 5)
        db.commit()
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    #Si la contraseña es correcta => resetea los intentos
    administrador.intentos_fallidos = 0
    administrador.bloqueado_hasta = None
    db.commit()

    access_token = create_access_token(
        data = {"sub": str (administrador.id), "correo": administrador.correo }
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "mensaje": "Inicio de sesión exitoso",
        "Administrador": {
            "id": administrador.id,
            "correo": administrador.correo
        }
    }
