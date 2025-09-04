from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class planCreateDTO(BaseModel):
    nombre: str
    descripcion: str
    descripcion_corta: str
    costo_persona: int
    imagen: Optional[str] = None
    id_ciudad: int
    id_informe: Optional[int] = None

class planUpdateDTO(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    descripcion_corta: Optional[str] = None
    costo_persona: Optional[int] = None
    imagen: Optional[str] = None
    id_ciudad: Optional[int] = None
    id_informe: Optional[int] = None

class PlanOut(BaseModel):
    id: int
    nombre: str
    descripcion: str
    descripcion_corta: str
    costo_persona: int
    imagen: Optional[str]
    id_ciudad: int
    id_informe: Optional[int] = None

    class Config:
        orm_mode = True