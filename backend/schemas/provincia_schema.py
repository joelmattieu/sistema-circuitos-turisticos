from pydantic import BaseModel
from typing import Optional

class ProvinciaCreate(BaseModel):
    nombre_provincia: str
    pais_id: int

class Provincia(ProvinciaCreate):
    provincia_id: int
    
    class Config:
        from_attributes = True