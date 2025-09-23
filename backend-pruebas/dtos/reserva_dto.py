from pydantic import BaseModel
from typing import Optional
from datetime import date

class reservaCreateDTO(BaseModel):
    fecha_reserva: date
    costo_final: float
    disponibilidad: bool
    numero_personas: int
    id_informe: Optional[int] = None
    id_plan: int
    token_tarjeta: str
    email_cliente: str
    

class reservaUpdateDTO(BaseModel):
    fecha_reserva: Optional[date] = None
    costo_final: Optional[int] = None
    numero_personas: Optional[int] = None
    id_informe: Optional[int] = None
    id_plan: Optional[int] = None
