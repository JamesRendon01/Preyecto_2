from db import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, VARCHAR, Text
from sqlalchemy.orm import relationship
from models.administrador import Administrador

class Informe(Base):
    __tablename__ = "informe"
    id=Column(Integer, primary_key=True)
    nombre=Column(VARCHAR(30), unique=True)
    fecha_creacion=Column(Date)
    id_administrador=Column(Integer, ForeignKey("administrador.id"))
