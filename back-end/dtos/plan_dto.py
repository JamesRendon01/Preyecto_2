from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class planCreateDTO(BaseModel):
    nombre: str
    descripcion: str
    numero_dias: int
    numero_noches: int
    horario: datetime
    id_ubicacion: int

class planUpdateDTO(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    numero_dias: Optional[int] = None
    numero_noches: Optional[int] = None
    horario: Optional[datetime] = None
    id_ubicacion: Optional[int] = None

class PlanOut(BaseModel):
    id: int
    nombre: str
    descripcion: str
    numero_dias: int
    numero_noches: int
    horario: datetime
    id_ubicacion: int

    class Config:
        orm_mode = True