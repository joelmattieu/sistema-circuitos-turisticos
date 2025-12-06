from db import Base
from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.types import Enum
from sqlalchemy.orm import relationship
from utils.enums import TipoPuntoInteresEnum

class PuntoInteresModel(Base):
    __tablename__ = 'puntos_interes'
    
    poi_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    descripcion = Column(String, index=True)
    tipo = Column(Enum(TipoPuntoInteresEnum), nullable=False, default=TipoPuntoInteresEnum.CULTURAL)
    latitud = Column(Float)
    longitud = Column(Float)
    tiene_audioguia = Column(Boolean)
    activo = Column(Boolean, default=False)
    
    circuito_puntos = relationship("CircuitoPuntoInteresModel", back_populates="punto_interes")

