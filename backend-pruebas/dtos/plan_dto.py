from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from dtos.ubicacion_dto import UbicacionOut

class planCreateDTO(BaseModel):
    nombre: str
    descripcion: str
    descripcion_corta: str
    costo_persona: int
    imagen: Optional[str] = None
    id_ciudad: Optional [int] = None

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

class PlanCardOut(BaseModel):
    id: int
    nombre: str
    descripcion_corta: str
    descripcion: str
    imagen: str

class ListarPlanAdmin(BaseModel):
    id: int
    nombre: str
    descripcion_corta: str
    descripcion: str
    costo_persona: int
    id_ciudad: str
    ubicaciones: List[int] = []

class planUpdateIdDTO(BaseModel):
    id: Optional[int] = None
    nombre: Optional[str] = None
    descripcion_corta: Optional[str] = None
    descripcion: Optional[str] = None
    costo_persona: Optional[int] = None
    id_ciudad: Optional[int] = None
    imagen: Optional[str] = None

