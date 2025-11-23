from db import Base
from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship

class RecorridoUsuarioModel(Base):
  __tablename__ = 'recorridos_usuarios'
  
  recorrido_id = Column(Integer, primary_key=True, index=True)
  usuario_id = Column(Integer)
  circuito_id = Column(Integer)
  estado = Column(String)
  fecha_inicio = Column(DateTime)
  fecha_fin = Column(DateTime)
  avance_porcentaje = Column(Float)
  
  