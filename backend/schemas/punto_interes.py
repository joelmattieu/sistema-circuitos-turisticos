from pydantic import BaseModel
from typing import Optional
from datetime import date
from utils.enums import TipoPuntoInteresEnum

class PuntoInteresCreate(BaseModel):
    nombre: str
    descripcion: str
    nombre_en: Optional[str] = None
    nombre_pt: Optional[str] = None
    descripcion_en: Optional[str] = None
    descripcion_pt: Optional[str] = None
    tipo_poi: TipoPuntoInteresEnum
    latitud: float
    longitud: float
    tiene_audioguia: bool = False
    activo: bool = True
    fecha_inauguracion: Optional[date] = None
    dato_historico: Optional[str] = None
    dato_historico_en: Optional[str] = None
    dato_historico_pt: Optional[str] = None
    informacion_cultural: Optional[str] = None
    informacion_cultural_en: Optional[str] = None
    informacion_cultural_pt: Optional[str] = None
    informacion_extra: Optional[str] = None
    informacion_extra_en: Optional[str] = None
    informacion_extra_pt: Optional[str] = None

class PuntoInteresUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    nombre_en: Optional[str] = None
    nombre_pt: Optional[str] = None
    descripcion_en: Optional[str] = None
    descripcion_pt: Optional[str] = None
    tipo_poi: Optional[TipoPuntoInteresEnum] = None
    latitud: Optional[float] = None
    longitud: Optional[float] = None
    tiene_audioguia: Optional[bool] = None
    activo: Optional[bool] = None
    fecha_inauguracion: Optional[date] = None
    dato_historico: Optional[str] = None
    dato_historico_en: Optional[str] = None
    dato_historico_pt: Optional[str] = None
    informacion_cultural: Optional[str] = None
    informacion_cultural_en: Optional[str] = None
    informacion_cultural_pt: Optional[str] = None
    informacion_extra: Optional[str] = None
    informacion_extra_en: Optional[str] = None
    informacion_extra_pt: Optional[str] = None

class PuntoInteresResponse(BaseModel):
    poi_id: int
    nombre: str
    descripcion: str
    tipo_poi: str
    latitud: float
    longitud: float
    tiene_audioguia: bool
    activo: bool
    fecha_inauguracion: Optional[date] = None
    dato_historico: Optional[str] = None
    informacion_cultural: Optional[str] = None
    informacion_extra: Optional[str] = None

    class Config:
        from_attributes = True