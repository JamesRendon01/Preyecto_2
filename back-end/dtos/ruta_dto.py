from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class rutaCreateDTO(BaseModel):
    distancia: str
    ciudad: str

class rutaUpdateDTO(BaseModel):
    distancia: Optional[str] = None
    ciudad: Optional[str] = None