from pydantic import BaseModel

class IdiomaCreate(BaseModel):
    nombre_idioma: str
    codigo_iso: str

class Idioma(IdiomaCreate):
    idioma_id: int
    
    class Config:
        from_attributes = True