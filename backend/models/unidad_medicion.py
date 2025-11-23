from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class UnidadMedicionModel(Base):
  __tablename__ = 'unidades_medicion'
  
  unidad_medicion_id = Column(Integer, primary_key=True, index=True)
  nombre_unidad_medicion = Column(String, index=True)
  
  