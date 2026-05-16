from pydantic import BaseModel
from typing import Optional

class PreferenciaUsuarioCreate(BaseModel):
    idioma_id: int
    modo_transporte_id: int
    unidad_medicion_id: int
    usuario_id: Optional[int] = None  # el backend lo sobreescribe con el JWT

class PreferenciaUsuario(BaseModel):
    preferencia_id: int
    usuario_id: int
    idioma_id: int
    modo_transporte_id: int
    unidad_medicion_id: int

    class Config:
        from_attributes = True