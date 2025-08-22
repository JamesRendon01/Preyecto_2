from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class chatCreateDTO(BaseModel):
    estado: bool
    mensaje: str
    id_administrador: str
    id_turista: str

class chatUpdateDTO(BaseModel):
    estado: Optional[bool] = None
    mensaje: Optional[str] = None
    id_administrador: Optional[str] = None
    id_turista: Optional[str] = None
