from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class PaisModel(Base):
  __tablename__ = 'paises'
  
  pais_id = Column(Integer, primary_key=True, index=True)
  nombre_pais = Column(String, index=True)
  
  