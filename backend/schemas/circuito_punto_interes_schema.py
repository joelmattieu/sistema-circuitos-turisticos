from pydantic import BaseModel
from typing import Optional

class CircuitoPuntoInteresCreate(BaseModel):
    circuito_id: int
    poi_id: int
    orden_en_circuito: int
    distancia_tramo_metros: int
    duracion_tramo_minutos: int

class CircuitoPuntoInteresUpdate(BaseModel):
    orden_en_circuito: Optional[int] = None
    distancia_tramo_metros: Optional[int] = None
    duracion_tramo_minutos: Optional[int] = None

class CircuitoPuntoInteresResponse(BaseModel):
    circuito_poi_id: int
    circuito_id: int
    poi_id: int
    orden_en_circuito: int
    distancia_tramo_metros: int
    duracion_tramo_minutos: int
    
    class Config:
        from_attributes = True