from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class hotelCreateDTO(BaseModel):
    nombre: str
    ciudad: str
    direccion: str

class hotelUpdateDTO(BaseModel):
    nombre: Optional[str] = None
    ciudad: Optional[str] = None
    direccion: Optional[str] = None
        