from db import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, VARCHAR, Text, DateTime
from sqlalchemy.orm import relationship

class Plan(Base):
    __tablename__ = "plan"
    id=Column(Integer, primary_key=True)
    nombre=Column(VARCHAR(30), unique=True)
    descripcion=Column(VARCHAR(100), unique=True)
    numero_dias=Column(Integer)
    numero_noches=Column(Integer)
    horario=Column(DateTime)
    id_ubicacion=Column(Integer, ForeignKey("ubicacion.id"))