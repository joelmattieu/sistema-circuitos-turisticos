from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class ModoTransporteModel(Base):
  __tablename__ = 'modos_transporte'
  
  modo_transporte_id = Column(Integer, primary_key=True, index=True)
  nombre_modo_transporte = Column(String, index=True)
  
  