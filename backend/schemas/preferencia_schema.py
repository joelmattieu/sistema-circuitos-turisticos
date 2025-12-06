from pydantic import BaseModel
from typing import Optional

class PreferenciaUsuarioBase(BaseModel):
    usuario_id: int
    idioma_id: int
    modo_transporte_id: int
    unidad_medicion_id: int

class PreferenciaUsuarioCreate(PreferenciaUsuarioBase):
    pass

class PreferenciaUsuario(PreferenciaUsuarioBase):
    preferencia_id: int

    class Config:
        from_attributes = True