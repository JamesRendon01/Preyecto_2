from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class reservaCreateDTO(BaseModel):
    fecha_inicio: datetime
    fecha_fin: datetime
    precio: str
    numero_personas: int
    id_turista: str
    id_instancia: str
    id_hotel: str
    id_ruta: str

class reservaUpdateDTO(BaseModel):
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
    precio: Optional[str] = None
    numero_personas: Optional[int] = None
    id_turista: Optional[int] = None
    id_instancia: Optional[int] = None
    id_hotel: Optional[int] = None
    id_ruta: Optional[int] = None