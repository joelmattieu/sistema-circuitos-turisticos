from pydantic import BaseModel, Field, computed_field
from typing import Optional, List
from datetime import date

class CategoriaSimple(BaseModel):
    nombre_categoria: str

    class Config:
        from_attributes = True

class PuntoInteresSimple(BaseModel):
    poi_id: int
    nombre: str
    descripcion: str
    tipo_poi: str
    latitud: float
    longitud: float
    tiene_audioguia: bool
    fecha_inauguracion: Optional[date] = None
    dato_historico: Optional[str] = None
    informacion_cultural: Optional[str] = None
    informacion_extra: Optional[str] = None
    
    class Config:
        from_attributes = True

class CircuitoCreate(BaseModel):
    nombre: str
    descripcion: str
    nombre_en: Optional[str] = None
    nombre_pt: Optional[str] = None
    descripcion_en: Optional[str] = None
    descripcion_pt: Optional[str] = None
    categoria_id: int
    modo_transporte_id: Optional[int] = None
    distancia_total_metros: float
    duracion_estimada_minutos: int
    url_imagen_portada: Optional[str] = None
    accesible_auto: bool = True
    tiene_tramos_techados: bool = False
    activo: bool = True

class CircuitoUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    nombre_en: Optional[str] = None
    nombre_pt: Optional[str] = None
    descripcion_en: Optional[str] = None
    descripcion_pt: Optional[str] = None
    categoria_id: Optional[int] = None
    modo_transporte_id: Optional[int] = None
    distancia_total_metros: Optional[float] = None
    duracion_estimada_minutos: Optional[int] = None
    url_imagen_portada: Optional[str] = None
    accesible_auto: Optional[bool] = None
    tiene_tramos_techados: Optional[bool] = None
    activo: Optional[bool] = None

class CircuitoResponse(BaseModel):
    circuito_id: int
    nombre: str
    descripcion: str
    categoria_id: int
    distancia_total_metros: float
    duracion_estimada_minutos: int
    url_imagen_portada: Optional[str] = None
    activo: bool
    veces_finalizado: int
    modo_transporte_id: Optional[int] = None
    accesible_auto: bool = True
    tiene_tramos_techados: bool = False
    categoria_nombre: Optional[str] = None
    categoria: Optional[CategoriaSimple] = None
    puntos_interes: List[PuntoInteresSimple] = []
    
    distancia_formateada: Optional[str] = None
    unidad_medicion: Optional[str] = None
    progreso_porcentaje: Optional[float] = None
    distancia_al_usuario_km: Optional[float] = None

    class Config:
        from_attributes = True
