from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class CategoriaCircuitoModel(Base):
    __tablename__ = 'categorias_circuitos'
    
    categoria_id = Column(Integer, primary_key=True, index=True)
    nombre_categoria = Column(String, index=True)
    nombre_categoria_en = Column(String, nullable=True)
    nombre_categoria_pt = Column(String, nullable=True)
    
    circuitos = relationship("CircuitoModel", back_populates="categoria")

