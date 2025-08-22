from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class notificacionesCreateDTO(BaseModel):
    mensaje: str
    fecha_envio: datetime
    id_administrador: int
    id_chat: int

class notificacionesUpdateDTO(BaseModel):
    mensaje: Optional[str] = None
    fecha_envio: Optional[datetime] = None
    id_administrador: Optional[int] = None
    id_chat: Optional[int] = None