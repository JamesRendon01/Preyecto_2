from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class planCreateDTO(BaseModel):
    nombre: str
    descripcion: str
    numero_dias: str
    numero_noches: str
    horario: datetime
    id_ubicacion: int

class planUpdateDTO(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    numero_dias: Optional[str] = None
    numero_noches: Optional[str] = None
    horario: Optional[datetime] = None
    id_ubicacion: Optional[int] = None