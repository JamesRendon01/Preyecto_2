from db import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, VARCHAR, Text
from sqlalchemy.orm import relationship
from models.informe import Informe
from models.plan import Plan
from models.turista import Turista

class Reserva(Base):
    __tablename__ = "reserva"
    id=Column(Integer, primary_key=True)
    fecha_reserva=Column(Date)
    costo_final=Column(Integer)
    disponibilidad=Column(Boolean)
    numero_personas=Column(Integer)
    id_informe=Column(Integer, ForeignKey("informe.id"))
    id_plan=Column(Integer, ForeignKey("plan.id"))
    id_turista=Column(Integer, ForeignKey("turista.id"))
