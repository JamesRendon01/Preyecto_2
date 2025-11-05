from pydantic import BaseModel
from typing import Optional, List
from datetime import date

# =====================================================
# 🔹 DTO para acompañante de reserva
# =====================================================
class PersonaReservaDTO(BaseModel):
    nombre: str
    tipo_identificacion: str
    identificacion: str
    edad: int

# =====================================================
# 🔹 DTO para creación de reserva
# =====================================================
class reservaCreateDTO(BaseModel):
    fecha_reserva: date
    disponibilidad: bool
    numero_personas: int
    id_informe: Optional[int] = None
    id_plan: int
    token_tarjeta: str
    email_cliente: str  # si lo usas para enviar correo
    acompanantes: List[PersonaReservaDTO]

    class Config:
        orm_mode = True


# =====================================================
# 🔹 DTO para actualización de reserva
# =====================================================
class reservaUpdateDTO(BaseModel):
    fecha_reserva: Optional[date] = None
    numero_personas: Optional[int] = None
    id_informe: Optional[int] = None
    id_plan: Optional[int] = None
    disponibilidad: Optional[bool] = None

    class Config:
        orm_mode = True


# =====================================================
# 🔹 DTO para salida de reserva
# =====================================================
class ReservaOut(BaseModel):
    id: int
    fecha_reserva: str
    costo_final: float
    disponibilidad: bool
    numero_personas: int
    id_plan: int
    plan_nombre: Optional[str]
    id_turista: int
    turista_nombre: Optional[str]

    class Config:
        orm_mode = True
