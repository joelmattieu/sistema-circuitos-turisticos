from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class PreferenciaUsuarioModel(Base):
  __tablename__ = 'preferencias_usuario'
  
  preferencia_id = Column(Integer, primary_key=True, index=True)
  usuario_id = Column(Integer)
  idioma_id = Column(Integer)
  modo_transporte_id = Column(Integer)
  unidad_medicion_id = Column(Integer)