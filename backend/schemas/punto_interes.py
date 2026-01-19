from pydantic import BaseModel
from typing import Optional
from utils.enums import TipoPuntoInteresEnum

class PuntoInteresCreate(BaseModel):
    nombre: str
    descripcion: str
    tipo: TipoPuntoInteresEnum
    latitud: float
    longitud: float
    tiene_audioguia: bool = False
    activo: bool = True
    fecha_inauguracion: Optional[str] = None
    dato_historico: Optional[str] = None
    informacion_cultural: Optional[str] = None
    informacion_extra: Optional[str] = None

class PuntoInteresUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    tipo: Optional[TipoPuntoInteresEnum] = None
    latitud: Optional[float] = None
    longitud: Optional[float] = None
    tiene_audioguia: Optional[bool] = None
    activo: Optional[bool] = None
    fecha_inauguracion: Optional[str] = None
    dato_historico: Optional[str] = None
    informacion_cultural: Optional[str] = None
    informacion_extra: Optional[str] = None

class PuntoInteresResponse(BaseModel):
    poi_id: int
    nombre: str
    descripcion: str
    tipo: str
    latitud: float
    longitud: float
    tiene_audioguia: bool
    activo: bool
    fecha_inauguracion: Optional[str] = None
    dato_historico: Optional[str] = None
    informacion_cultural: Optional[str] = None
    informacion_extra: Optional[str] = None
    
    class Config:
        from_attributes = True