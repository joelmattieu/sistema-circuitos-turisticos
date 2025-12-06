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

class PuntoInteresUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    tipo: Optional[TipoPuntoInteresEnum] = None
    latitud: Optional[float] = None
    longitud: Optional[float] = None
    tiene_audioguia: Optional[bool] = None
    activo: Optional[bool] = None

class PuntoInteresResponse(BaseModel):
    poi_id: int
    nombre: str
    descripcion: str
    tipo: str
    latitud: float
    longitud: float
    tiene_audioguia: bool
    activo: bool
    
    class Config:
        from_attributes = True