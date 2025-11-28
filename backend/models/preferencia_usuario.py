from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class PreferenciaUsuarioModel(Base):
  __tablename__ = 'preferencias_usuario'
  
  preferencia_id = Column(Integer, primary_key=True, index=True)
  usuario_id = Column(Integer, ForeignKey('usuarios.usuario_id'))
  idioma_id = Column(Integer, ForeignKey('idiomas.idioma_id'))
  modo_transporte_id = Column(Integer, ForeignKey('modos_transporte.modo_transporte_id'))
  unidad_medicion_id = Column(Integer, ForeignKey('unidades_medicion.unidad_medicion_id'))