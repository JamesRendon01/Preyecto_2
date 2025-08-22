from db import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, VARCHAR, Text
from sqlalchemy.orm import relationship

class Turista(Base):
    __tablename__ ="turista"
    id=Column(Integer, primary_key=True)
    nombre=Column(VARCHAR(30))
    correo=Column(VARCHAR(50), unique=True)
    celular=Column(String(20), unique=True)
    fecha_nacimiento=Column(Date)
    ciudad_residencia=Column(VARCHAR(20))
    direccion=Column(VARCHAR(50))
    identificacion=Column(String(20), unique=True)
    contrasena=Column(VARCHAR(100))
