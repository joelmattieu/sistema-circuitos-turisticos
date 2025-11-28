from pydantic import BaseModel

class PaisCreate(BaseModel):
    nombre_pais: str
    codigo_iso: str

class Pais(PaisCreate):
    pais_id: int
    
    class Config:
        from_attributes = True