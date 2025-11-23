from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class ProvinciaModel(Base):
  __tablename__ = 'provincias'
  
  provincia_id = Column(Integer, primary_key=True, index=True)
  nombre_provincia = Column(String, index=True)
  pais_id = Column(Integer)