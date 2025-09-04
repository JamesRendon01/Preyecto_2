from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class iniciarSesionDTO(BaseModel):
    correo: str
    contrasena: str