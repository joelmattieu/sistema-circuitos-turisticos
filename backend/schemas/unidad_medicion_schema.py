from pydantic import BaseModel

class UnidadMedicionCreate(BaseModel):
    nombre_unidad_medicion: str

class UnidadMedicion(UnidadMedicionCreate):
    unidad_medicion_id: int
    
    class Config:
        from_attributes = True