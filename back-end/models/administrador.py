from db import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, VARCHAR, Text
from sqlalchemy.orm import relationship
# tabla administrador
class Administrador(Base):
    __tablename__ = "administrador"
    id=Column(Integer, primary_key=True)
    nombre=Column(VARCHAR(30))
    correo=Column(VARCHAR(50), unique=True)
    celular=Column(String(15), unique=True)
    identificacion=Column(String(15), unique=True)
    contrasena=Column(VARCHAR(100), unique=True)