from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class CircuitoPuntoInteresModel(Base):
  __tablename__ = 'circuitos_puntos_interes'
  
  circuito_poi_id = Column(Integer, primary_key=True, index=True)
  circuito_id = Column(Integer)
  poi_id = Column(Integer)
  orden_en_circuito = Column(Integer)
  distancia_tramo_metros = Column(Integer)
  duracion_tramo_minutos = Column(Integer)
  
  