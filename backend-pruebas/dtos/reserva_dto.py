from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

class reservaCreateDTO(BaseModel):
    fecha_reserva: date
    costo_final: int
    disponibilidad: str
    numero_personas: int
    id_informe: str
    id_plan: str

class reservaUpdateDTO(BaseModel):
    fecha_reserva: Optional[date] = None
    costo_final: Optional[int] = None
    numero_personas: Optional[int] = None
    id_informe: Optional[int] = None
    id_plan: Optional[int] = None