from db import Base
from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.orm import relationship

class VisitaUsuarioModel(Base):
  __tablename__ = 'visitas_usuarios'
  
  visita_id = Column(Integer, primary_key=True, index=True)
  recorrido_id = Column(Integer)
  poi_id = Column(Integer)
  orden_visita = Column(Integer)
  fecha_visita = Column(DateTime)
  
  