from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class UsuarioModel(Base):
  __tablename__ = 'usuarios'
  
  usuario_id = Column(Integer, primary_key=True, index=True)
  nombre = Column(String, index=True)
  apellido = Column(String, index=True)
  email = Column(String, unique=True, index=True)
  contrasena = Column(String)
  ciudad = Column(String)
  provincia_id = Column(Integer, ForeignKey('provincias.provincia_id')) 
  
  provincia = relationship("ProvinciaModel", back_populates="usuarios")

