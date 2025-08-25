from db import Base
from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, Text, VARCHAR
from sqlalchemy.orm import relationship

class Ubicacion(Base):
    __tablename__ = "ubicacion"
    id=Column(Integer, primary_key=True)
    direccion=Column(VARCHAR(30), unique=True)
    longitud=Column(VARCHAR(15), unique=True)
    latitud=Column(VARCHAR(15), unique=True)
    ciudad_id=Column(Integer, ForeignKey("ciudad.id"), unique=True)
    ciudad = relationship("Ciudad", back_populates="ubicacion")