from pydantic import BaseModel
from typing import Optional

class CircuitoPuntoInteresCreate(BaseModel):
    circuito_id: int
    poi_id: int
    orden_en_circuito: int

class CircuitoPuntoInteresUpdate(BaseModel):
    orden_en_circuito: Optional[int] = None

class CircuitoPuntoInteresResponse(BaseModel):
    circuito_poi_id: int
    circuito_id: int
    poi_id: int
    orden_en_circuito: int

    class Config:
        from_attributes = True