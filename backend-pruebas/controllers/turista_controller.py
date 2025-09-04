from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.turista import Turista
from models.ciudad import Ciudad
from dtos.turista_dto import turistaCreateDTO, turistaUpdateDTO, iniciarSesionDTO, SolicitudRecuperacion, CambiarContrasenaDTO, VerificarPinDTO
from db.session import SessionLocal
from utils.security import hash_password, verify_password
from mails.mailjet_config import enviar_correo_recuperacion
from datetime import datetime, timedelta
import uuid
from random import randint

# Session dependency
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(prefix='/turista')

# Listar todos los turistas
@router.get('/')
def listar_turistas(db: Session = Depends(get_session)):
    lt = db.query(Turista).all()
    if not lt:
        raise HTTPException(status_code=404, detail="Turista no encontrado")
    return lt

# Listar por id
@router.get('/{id}')
def listar_por_id(id: int, db: Session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.id == id).first()
    if not turista:
        raise HTTPException(status_code=404, detail="Turista no encontrado")
    return turista

# Crear turista
@router.post("/registrar")
def crear_turista(nuevo_turista: turistaCreateDTO, db: Session = Depends(get_session)):

    # Validar correo, celular e identificación únicos
    if db.query(Turista).filter(Turista.correo == nuevo_turista.correo).first():
        raise HTTPException(status_code=409, detail={"campo": "correo", "mensaje": "El correo ya está registrado"})
    if db.query(Turista).filter(Turista.celular == nuevo_turista.celular).first():
        raise HTTPException(status_code=409, detail={"campo": "celular", "mensaje": "El celular ya está registrado"})
    if db.query(Turista).filter(Turista.identificacion == nuevo_turista.identificacion).first():
        raise HTTPException(status_code=409, detail={"campo": "identificacion", "mensaje": "La identificacion ya está registrada"})

    # Validar que la ciudad exista
    ciudad = db.query(Ciudad).filter(Ciudad.id == nuevo_turista.ciudad_residencia_id).first()
    if not ciudad:
        raise HTTPException(status_code=400, detail="Ciudad no válida")

    nt = Turista(
        nombre=nuevo_turista.nombre,
        correo=nuevo_turista.correo,
        celular=nuevo_turista.celular,
        fecha_nacimiento=nuevo_turista.fecha_nacimiento,
        direccion=nuevo_turista.direccion,
        ciudad_id=nuevo_turista.ciudad_residencia_id, 
        tipo_identificacion=nuevo_turista.tipo_identificacion,
        identificacion=nuevo_turista.identificacion,
        contrasena=hash_password(nuevo_turista.contrasena)
    )

    db.add(nt)
    db.commit()
    db.refresh(nt)
    return nt

# Actualizar turista
@router.put('/{id}')
def actualizar_turista(id: int, datos: turistaUpdateDTO, db: Session = Depends(get_session)):
    at = db.query(Turista).filter(Turista.id == id).first()
    if not at:
        raise HTTPException(status_code=404, detail="Turista no encontrado")

    # Validar ciudad si se proporciona
    if datos.ciudad_residencia_id:
        ciudad = db.query(Ciudad).filter(Ciudad.id == datos.ciudad_residencia_id).first()
        if not ciudad:
            raise HTTPException(status_code=400, detail="Ciudad no válida")

    for key, value in datos.dict(exclude_unset=True).items():
        setattr(at, key, value)
    db.commit()
    db.refresh(at)
    return {"mensaje": f"El turista {id} fue actualizado exitosamente"}

# Eliminar turista
@router.delete('/{id}')
def eliminar_turista(id: int, db: Session = Depends(get_session)):
    et = db.query(Turista).filter(Turista.id == id).first()
    if not et:
        raise HTTPException(status_code=404, detail="Turista no encontrado")
    db.delete(et)
    db.commit()
    return {"mensaje": f"El turista {id} fue eliminado exitosamente"}

# Iniciar sesión
@router.post("/iniciarsesion")
def iniciar_sesion(datos: iniciarSesionDTO, db: Session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.correo == datos.correo).first()
    if not turista:
        raise HTTPException(status_code=401, detail="Correo no registrado")
    if not verify_password(datos.contrasena, turista.contrasena):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    return {"mensaje": "Inicio de sesión exitoso", "turista": {"id": turista.id, "correo": turista.correo}}

# Solicitar recuperación
@router.post("/solicitar-recuperacion")
def solicitar_recuperacion(data: SolicitudRecuperacion, db: Session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.correo == data.correo).first()
    if not turista:
        raise HTTPException(status_code=404, detail="Correo no registrado")

    pin = str(randint(100000, 999999))
    turista.pin_recuperacion = pin
    turista.expira_pin = datetime.utcnow() + timedelta(minutes=10)
    db.commit()

    if not enviar_correo_recuperacion(turista.correo, pin):
        raise HTTPException(status_code=500, detail="Error enviando correo")
    return {"mensaje": "Correo de recuperación enviado"}

# Verificar PIN
@router.post("/verificar-pin")
def verificar_pin(data: VerificarPinDTO, db: Session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.correo == data.correo).first()
    if not turista:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    if turista.pin_recuperacion != data.pin:
        raise HTTPException(status_code=400, detail="PIN incorrecto")
    if datetime.utcnow() > turista.expira_pin:
        raise HTTPException(status_code=400, detail="PIN expirado")

    turista.pin_recuperacion = None
    turista.expira_pin = None
    token = str(uuid.uuid4())
    turista.token_recuperacion = token
    turista.expira_token = datetime.utcnow() + timedelta(minutes=15)
    db.commit()
    return {"token": token}

# Cambiar contraseña
@router.post("/cambiar-contrasena")
def cambiar_contrasena(data: CambiarContrasenaDTO, db: Session = Depends(get_session)):
    turista = db.query(Turista).filter(Turista.token_recuperacion == data.token).first()
    if not turista:
        raise HTTPException(status_code=404, detail="Token inválido")
    if datetime.utcnow() > turista.expira_token:
        raise HTTPException(status_code=400, detail="Token expirado")

    turista.contrasena = hash_password(data.nueva_contrasena)
    turista.token_recuperacion = None
    turista.expira_token = None
    db.commit()
    return {"mensaje": "Contraseña cambiada exitosamente"}
