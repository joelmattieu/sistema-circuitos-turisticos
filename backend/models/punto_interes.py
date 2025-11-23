from db import Base
from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import relationship

class PuntoInteresModel(Base):
  __tablename__ = 'puntos_interes'
  
  poi_id = Column(Integer, primary_key=True, index=True)
  nombre = Column(String, index=True)
  descripcion = Column(String, index=True)
  latitud = Column(Float)
  longitud = Column(Float)
  tiene_audioguia = Column(Boolean)
  url_imagen_portada = Column(String)
  activo = Column(Boolean, default=False)
  
  