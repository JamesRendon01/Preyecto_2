from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class instanciaCreateDTO(BaseModel):
    fecha_inicio: datetime
    fecha_fin: datetime
    costo: str
    id_plan: int

class instanciaUpdateDTO(BaseModel):
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
    costo: Optional[str] = None
    id_plan: Optional[int] = None