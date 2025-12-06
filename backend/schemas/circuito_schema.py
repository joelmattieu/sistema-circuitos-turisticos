from pydantic import BaseModel
from typing import Optional, List

class PuntoInteresSimple(BaseModel):
    poi_id: int
    nombre: str
    descripcion: str
    tipo: str
    latitud: float
    longitud: float
    tiene_audioguia: bool
    
    class Config:
        from_attributes = True

class CircuitoCreate(BaseModel):
    nombre: str
    descripcion: str
    categoria_id: int
    distancia_total_metros: float
    duracion_estimada_minutos: int
    url_imagen_portada: Optional[str] = None
    activo: bool = True

class CircuitoUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    categoria_id: Optional[int] = None
    distancia_total_metros: Optional[float] = None
    duracion_estimada_minutos: Optional[int] = None
    url_imagen_portada: Optional[str] = None
    activo: Optional[bool] = None

class CircuitoResponse(CircuitoCreate):
    circuito_id: int 
    veces_finalizado: int
    categoria_nombre: Optional[str] = None
    puntos_interes: List[PuntoInteresSimple] = []
    
    class Config:
        from_attributes = True