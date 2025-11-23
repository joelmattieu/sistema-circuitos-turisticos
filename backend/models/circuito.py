from db import Base
from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import relationship

class CircuitoModel(Base):
  __tablename__ = 'circuitos'
  
  circuito_id = Column(Integer, primary_key=True, index=True)
  nombre = Column(String, index=True)
  descripcion = Column(String)
  categoria_id = Column(Integer)
  distancia_total_metros = Column(Float)
  duracion_estimada_minutos = Column(Integer)
  url_imagen_portada = Column(String)
  veces_finalizado = Column(Integer, default=0)
  activo = Column(Boolean, default=False)
  
  