from db import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship

class CircuitoModel(Base):
    __tablename__ = 'circuitos'
    
    circuito_id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    nombre_en = Column(String, nullable=True)
    nombre_pt = Column(String, nullable=True)
    descripcion = Column(String)
    descripcion_en = Column(String, nullable=True)
    descripcion_pt = Column(String, nullable=True)
    categoria_id = Column(Integer, ForeignKey('categorias_circuitos.categoria_id'), nullable=False)
    modo_transporte_id = Column(Integer, ForeignKey('modos_transporte.modo_transporte_id'))
    distancia_total_metros = Column(Float)
    duracion_estimada_minutos = Column(Integer)
    url_imagen_portada = Column(String)
    veces_finalizado = Column(Integer, default=0)
    accesible_auto = Column(Boolean, default=True)
    tiene_tramos_techados = Column(Boolean, default=False)
    activo = Column(Boolean, default=False)
    
    categoria = relationship("CategoriaCircuitoModel", back_populates="circuitos")
    modo_transporte = relationship("ModoTransporteModel")
    
    puntos_interes = relationship(
        "PuntoInteresModel",
        secondary="circuitos_puntos_interes",
        order_by="CircuitoPuntoInteresModel.orden_en_circuito",
        backref="circuitos"
    )
    
    circuito_puntos = relationship(
        "CircuitoPuntoInteresModel", 
        back_populates="circuito",
        overlaps="puntos_interes,circuitos"
    )
