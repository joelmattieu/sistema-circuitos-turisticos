from pydantic import BaseModel, EmailStr, Field

class UsuarioLogin(BaseModel):
    email: EmailStr
    contrasena: str = Field(..., min_length=6)
    
class UsuarioRegister(UsuarioLogin):
    nombre: str = Field(..., min_length=3)
    apellido: str = Field(..., min_length=3)
    ciudad: str = Field(..., min_length=3)
    provincia_id: int
    
class Usuario(UsuarioRegister):
    usuario_id: int
    
    class Config:
        from_attributes = True