from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class CircuitoPuntoInteresModel(Base):
    __tablename__ = 'circuitos_puntos_interes'
    
    circuito_poi_id = Column(Integer, primary_key=True, index=True)
    circuito_id = Column(Integer, ForeignKey('circuitos.circuito_id'))
    poi_id = Column(Integer, ForeignKey('puntos_interes.poi_id'))
    orden_en_circuito = Column(Integer)
    distancia_tramo_metros = Column(Integer)
    duracion_tramo_minutos = Column(Integer)
    
    circuito = relationship("CircuitoModel", back_populates="circuito_puntos")
    punto_interes = relationship("PuntoInteresModel", back_populates="circuito_puntos")

