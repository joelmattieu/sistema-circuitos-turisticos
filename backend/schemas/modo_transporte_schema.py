from pydantic import BaseModel

class ModoTransporteCreate(BaseModel):
    nombre_modo_transporte: str

class ModoTransporte(ModoTransporteCreate):
    modo_transporte_id: int
    
    class Config:
        from_attributes = True