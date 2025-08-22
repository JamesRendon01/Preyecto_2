from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class favoritoCreateDTO(BaseModel):
    id_turista: int
    id_plan: int

class favoritoUpdateDTO(BaseModel):
    id_turista: Optional[int] = None
    id_plan: Optional[int] = None