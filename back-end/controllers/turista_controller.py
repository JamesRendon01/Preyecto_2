from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import session
from models.turista import Turista
from dtos.turista_dto import turistaCreateDTO, turistaUpdateDTO, iniciarSesionDTO, SolicitudRecuperacion, CambiarContrasenaDTO
from db.session import SessionLocal
from utils.security import hash_password, verify_password
from mails.mailjet_config import enviar_correo_recuperacion
from datetime import datetime, timedelta
import uuid
from random import randint

#obtener el objeto session
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
#objeto que contiene este grupo
#rutas
router = APIRouter( prefix='/turista')

@router.get('/')
def listar_turistas(db: session = Depends(get_session)):
    lt = db.query(Turista).all()
    if not lt:
        raise HTTPException(status_code=404, detail="Turista no encontrado")
    return lt

@router.get('/{id}')
def listar_por_id(id: int,  db: session = Depends(get_session)):
    lpa = db.query(Turista).filter(Turista.id == id).first()
    if not lpa:
         raise HTTPException(status_code=404, detail="Turista no encontrado")
    return lpa

@router.post("/registrar")
def crear_turista(nuevo_turista: turistaCreateDTO, db: session = Depends(get_session)):
    if db.query(Turista).filter(Turista.correo == nuevo_turista.correo).first():
        raise HTTPException(status_code=409, detail={"campo": "correo", "mensaje": "El correo ya está registrado"})

    if db.query(Turista).filter(Turista.celular == nuevo_turista.celular).first():
        raise HTTPException(status_code=409, detail={"campo": "celular", "mensaje": "El celular ya está registrado"})
    
    if db.query(Turista).filter(Turista.identificacion == nuevo_turista.identificacion).first():
        raise HTTPException(status_code=409, detail={"campo": "identificacion", "mensaje": "La identificacion ya está registrado"})

    nt = Turista(
        nombre=nuevo_turista.nombre,
        correo=nuevo_turista.correo,
        celular=nuevo_turista.celular,
        fecha_nacimiento=nuevo_turista.fecha_nacimiento,
        ciudad_residencia=nuevo_turista.ciudad_residencia,
        direccion=nuevo_turista.direccion,
        identificacion=nuevo_turista.identificacion,
        contrasena= hash_password(nuevo_turista.contrasena)
    )

    db.add(nt)
    db.commit()
    db.refresh(nt)
    return nt

@router.put('/{id}')
def actualizar_turista(id: int, datos: turistaUpdateDTO, db:session = Depends(get_session)):
    at = db.query(Turista).filter(Turista.id == id).first()
    if not at:
        raise HTTPException(status_code=404, detail="Turista no encontrado")
    for key, value in datos.dict(exclude_unset=True).items():
        setattr(at, key, value)
    db.commit()
    db.refresh(at)
    return "El turista fue actualizado exitosamente:" + str(id)

@router.delete('/{id}')
def eliminar_administrador(id: int, 
db:session = Depends(get_session)):
    et = db.query(Turista).filter(Turista.id == id).first()
    if not et:
         raise HTTPException(status_code=404, detail="Turista no encontrado")
    db.delete(et)
    db.commit()
    return {"El turista fue eliminado exitosamente:" + str(id)}

@router.post("/iniciarsesion")
def iniciar_sesion(datos: iniciarSesionDTO, db: session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.correo == datos.correo).first()

    if not turista:
        raise HTTPException(status_code=401, detail="Correo no registrado")
    
    if not verify_password(datos.contrasena, turista.contrasena):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    return {
        "mensaje": "Inicio de sesión exitoso",
        "turista": {
            "id": turista.id,
            "correo": turista.correo
        }
    }


@router.post("/solicitar-recuperacion")
def solicitar_recuperacion(data: SolicitudRecuperacion, db: session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.correo == data.correo).first()
    if not turista:
        raise HTTPException(status_code=404, detail="Correo no registrado")

    #Generar Pin de 6 Digitos
    pin = f"{randint(100000, 999999)}"
    turista.pin_recuperacion = pin
    turista.expira_pin = datetime.utcnow() + timedelta(minutes=10)
    db.commit()

    exito = enviar_correo_recuperacion(turista.correo, pin)
    if not exito:
        raise HTTPException(status_code=500, detail="Error enviando correo")

    return {"mensaje": "Correo de recuperación enviado"}

@router.post("/verificar-pin")
def verificar_pin(correo: str, pin: str, db: session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.correo == correo).first()
    if not turista:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if turista.pin_recuperacion != pin:
        raise HTTPException(status_code=400, detail="PIN incorrecto")

    if datetime.utcnow() > turista.expira_pin:
        raise HTTPException(status_code=400, detail="PIN expirado")
    # Limpiar PIN temporal
    turista.pin_recuperacion = None
    turista.expira_pin = None

    # Generar token temporal para cambiar contraseña
    token = str(uuid.uuid4())
    turista.token_recuperacion = token
    turista.expira_token = datetime.utcnow() + timedelta(minutes=15)
    db.commit()

    return {"token": token}

@router.post("/cambiar-contrasena")
def cambiar_contrasena(data: CambiarContrasenaDTO, db: session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.token_recuperacion == data.token).first()
    if not turista:
        raise HTTPException(status_code=404, detail="Token inválido")

    if datetime.utcnow() > turista.expira_token:
        raise HTTPException(status_code=400, detail="Token expirado")

    # Guardar nueva contraseña
    turista.contrasena = hash_password(data.nueva_contrasena)

    # Limpiar token
    turista.token_recuperacion = None
    turista.expira_token = None
    db.commit()

    return {"mensaje": "Contraseña cambiada exitosamente"}