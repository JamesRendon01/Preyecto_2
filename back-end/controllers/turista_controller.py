from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import session
from models.turista import Turista
from dtos.turista_dto import turistaCreateDTO, turistaUpdateDTO, iniciarSesionDTO, SolicitudRecuperacion
from db.session import SessionLocal
from utils.security import hash_password, verify_password
from utils.tokens import generar_token, verificar_token
from mails.mailjet_config import enviar_correo_recuperacion
import uuid

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

    # Generar token (ejemplo simple, reemplazar con JWT o similar)
    token = str(uuid.uuid4())

    # Guardar token temporalmente en la BD si es necesario

    exito = enviar_correo_recuperacion(turista.correo, token)
    if not exito:
        raise HTTPException(status_code=500, detail="Error enviando correo")

    return {"mensaje": "Correo de recuperación enviado"}
