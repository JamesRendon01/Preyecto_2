from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session
from models.administrador import Administrador
from dtos.administrador_dto import iniciarSesionDTO
from db.session import SessionLocal
from utils.jwt_manager import create_access_token, verify_access_token
from datetime import datetime, timedelta
from utils.security import hash_password, verify_password

#Funcion para obtener la sesión de la base de datos
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Creacion del Router con el prefijo /administrador
router = APIRouter( prefix='/administrador' )


#Endoint para listar todos los administradores
@router.get('/')
def listar_administradores(db: session = Depends(get_session)):
    # Consulta todos los administradores
    la = db.query(Administrador).all()
    # Si no hay administradores maneja el error y muestra el siguiente mensaje "No hay administradores registrados"
    if not la:
         raise HTTPException(status_code=404, detail="No hay administradores registrados")
    return la

# Endpoint para listar administradores por id
@router.get('/{id}')
def listar_por_id(id: int,  db: session = Depends(get_session)):
    # Busca por el ID ingresado
    lpa = db.query(Administrador).filter(Administrador.id == id).first()
    # Si no hay ningun administrador con ese ID maneja el error y uestra el siguiente mensaje "Administrador no encontrado"
    if not lpa:
         raise HTTPException(status_code=404, detail="Administardor no encontrado")
    return lpa


# Endpoint para inicio de sesion del rol Administrador
@router.post("/iniciarsesion")
def iniciar_sesion(datos: iniciarSesionDTO, db: session = Depends(get_session)):
    
    # Busca Administradorpor el correo
    administrador = db.query(Administrador).filter(Administrador.correo == datos.correo).first()

    # Si no encuentra el correo maneja el error y muestra el siguiente mensaje "Correo no encontrado"
    if not administrador:
        raise HTTPException(status_code=401, detail="Correo no registrado")
    # Revisa si el correo esta bloqueado
    if administrador.bloqueado_hasta and datetime.utcnow() < administrador.bloqueado_hasta:
        # Si esta bloqueado maneja el error y muestra el siguiente mensaje "Cuenta bloqueada. Intenta de nuevo a las {administrador.bloqueado_hasta}"
        # Esto pasa si pone 5 veces la contraseña incorrecta
        raise HTTPException(status_code=403, detail = f"Cuenta bloqueada. Intenta de nuevo a las {administrador.bloqueado_hasta}")
    #Validar contrsaeña
    if not verify_password(datos.contrasena, administrador.contrasena):
        administrador.intentos_fallidos += 1
        #Si alcanza los 5 intentos, bloquea la cuenta por 5 minutos
        if administrador.intentos_fallidos >= 5:
            administrador.intentos_fallidos = 0
            administrador.bloqueado_hasta = datetime.utcnow() + timedelta(minutes = 5)
        # Guarda los cambios en la base de datos
        db.commit()
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    #Si la contraseña es correcta, reinicia los intentos y desbloquea la cuenta
    administrador.intentos_fallidos = 0
    administrador.bloqueado_hasta = None
    db.commit()

    # Crea el token con JWT con la informacion del Administrador
    access_token = create_access_token(
        data = {"sub": str (administrador.id), "correo": administrador.correo, "nombre": administrador.nombre}
    )

    #Retorna con la informacion y el token del Administrador
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "mensaje": "Inicio de sesión exitoso",
        "Administrador": {
            "id": administrador.id,
            "correo": administrador.correo
        }
    }
