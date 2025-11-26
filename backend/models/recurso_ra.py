from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class RecursoRAModel(Base):
  __tablename__ = 'recursos_ra'
  
  recurso_id = Column(Integer, primary_key=True, index=True)
  poi_id = Column(Integer)
  tipo_recurso = Column(String)
  url_recurso = Column(String)
  titulo_recurso = Column(String)
  descripcion_recurso = Column(String)
  
  