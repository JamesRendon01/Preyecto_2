from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ubicacionCreateDTO(BaseModel):
    ciudad: str
    direccion: str
    longitud: str
    latitud: str

class ubicacionUpdateDTO(BaseModel):
    ciudad: Optional[str] = None
    direccion: Optional[str] = None
    longitud: Optional[str] = None
    latitud: Optional[str] = None