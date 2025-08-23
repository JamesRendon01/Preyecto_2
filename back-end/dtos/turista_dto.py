from pydantic import BaseModel, EmailStr, validator
from typing import Optional
import re

class turistaCreateDTO(BaseModel):
    nombre: str
    correo: str
    celular: str
    fecha_nacimiento: str  # se puede cambiar a date si lo manejas así
    ciudad_residencia: str
    direccion: str
    identificacion: str
    contrasena: str

    @validator("contrasena")
    def validar_contrasena_segura(cls, value):
        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$'
        if not re.match(pattern, value):
            raise ValueError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.")
        return value

class turistaUpdateDTO(BaseModel):
    nombre: Optional[str] = None
    correo: Optional[EmailStr] = None
    celular: Optional[str] = None
    fecha_nacimiento: Optional[str] = None
    ciudad_residencia: Optional[str] = None
    direccion: Optional[str] = None
    identificacion: Optional[str] = None
    contrasena: Optional[str] = None

class iniciarSesionDTO(BaseModel):
    correo: str
    contrasena: str

class CambiarContrasenaDTO(BaseModel):
    token: str
    nueva_contrasena: str

    @validator("nueva_contrasena")
    def validar_nueva_contrasena_segura(cls, value):
        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$'
        if not re.match(pattern, value):
            raise ValueError("La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.")
        return value


class SolicitudRecuperacion(BaseModel):
<<<<<<< HEAD
    correo: str
=======
    correo: str

class VerificarPinDTO(BaseModel):
    correo: str
    pin: str
>>>>>>> back-end
