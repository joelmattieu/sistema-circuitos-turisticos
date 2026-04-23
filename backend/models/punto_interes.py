from db import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, Date
from sqlalchemy.types import Enum
from sqlalchemy.orm import relationship
from utils.enums import TipoPuntoInteresEnum

class PuntoInteresModel(Base):
    __tablename__ = 'puntos_interes'

    poi_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    nombre_en = Column(String, nullable=True)
    nombre_pt = Column(String, nullable=True)
    descripcion = Column(String, index=True)
    descripcion_en = Column(String, nullable=True)
    descripcion_pt = Column(String, nullable=True)
    tipo_poi = Column(Enum(TipoPuntoInteresEnum), nullable=False, default=TipoPuntoInteresEnum.CULTURAL)
    latitud = Column(Float)
    longitud = Column(Float)
    tiene_audioguia = Column(Boolean)
    activo = Column(Boolean, default=False)

    # Datos AR
    fecha_inauguracion = Column(Date, nullable=True)
    dato_historico = Column(String(1000), nullable=True)
    dato_historico_en = Column(String(1000), nullable=True)
    dato_historico_pt = Column(String(1000), nullable=True)
    informacion_cultural = Column(String(1000), nullable=True)
    informacion_cultural_en = Column(String(1000), nullable=True)
    informacion_cultural_pt = Column(String(1000), nullable=True)
    informacion_extra = Column(String(500), nullable=True)
    informacion_extra_en = Column(String(500), nullable=True)
    informacion_extra_pt = Column(String(500), nullable=True)
    
    circuito_puntos = relationship(
        "CircuitoPuntoInteresModel", 
        back_populates="punto_interes",
        overlaps="circuitos,puntos_interes"
    )

