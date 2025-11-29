from db import Base
from sqlalchemy import Column, Integer, String, DateTime, Date, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class UsuarioModel(Base):
    __tablename__ = "usuarios"
    
    usuario_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    provincia_id = Column(Integer, ForeignKey("provincias.provincia_id"), nullable=False)
    ciudad = Column(String(100), nullable=False)
    fecha_nacimiento = Column(Date, nullable=False)
    contrasena = Column(String(255), nullable=False)
    fecha_registro = Column(DateTime, default=datetime.now, nullable=False)
    
    # Relación con provincia
    provincia = relationship("ProvinciaModel", back_populates="usuarios")

