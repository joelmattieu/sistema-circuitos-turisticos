from db import Base
from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class VisitaUsuarioModel(Base):
  __tablename__ = 'visitas_usuarios'
  
  visita_id = Column(Integer, primary_key=True, index=True)
  recorrido_id = Column(Integer, ForeignKey('recorridos_usuarios.recorrido_id'))
  poi_id = Column(Integer, ForeignKey('puntos_interes.poi_id'))
  orden_visita = Column(Integer)
  fecha_visita = Column(DateTime)

