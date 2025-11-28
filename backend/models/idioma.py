from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class IdiomaModel(Base):  # ← Cambiar de PaisModel a IdiomaModel
  __tablename__ = 'idiomas'
  
  idioma_id = Column(Integer, primary_key=True, index=True)
  nombre_idioma = Column(String, index=True)
  codigo_iso = Column(String(2), index=True)

