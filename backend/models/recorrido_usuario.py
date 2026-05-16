from db import Base
from sqlalchemy import Column, Integer, DateTime, Numeric, ForeignKey
from sqlalchemy.types import Enum
from sqlalchemy.orm import relationship
from utils.enums import EstadoRecorridoEnum

class RecorridoUsuarioModel(Base):
  __tablename__ = 'recorridos_usuarios'

  recorrido_id = Column(Integer, primary_key=True, index=True)
  usuario_id = Column(Integer, ForeignKey('usuarios.usuario_id'), nullable=False)
  circuito_id = Column(Integer, ForeignKey('circuitos.circuito_id'), nullable=False)
  estado = Column(Enum(EstadoRecorridoEnum), nullable=False, default=EstadoRecorridoEnum.EN_PROGRESO)
  fecha_inicio = Column(DateTime)
  fecha_fin = Column(DateTime)
  avance_porcentaje = Column(Numeric(5, 2))

