from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import date, datetime

class UsuarioLogin(BaseModel):
    email: EmailStr
    contrasena: str = Field(..., min_length=6, max_length=50)

class UsuarioRegister(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=50)
    apellido: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    provincia_id: int
    ciudad: str = Field(..., min_length=2, max_length=100)
    fecha_nacimiento: date
    contrasena: str = Field(..., min_length=6, max_length=50)
    
    @validator('fecha_nacimiento')
    def validate_edad(cls, v):
        today = date.today()
        age = today.year - v.year - ((today.month, today.day) < (v.month, v.day))
        if age < 13:
            raise ValueError('Debes tener al menos 13 años para registrarte')
        if age > 120:
            raise ValueError('Fecha de nacimiento inválida')
        return v

class Usuario(BaseModel):
    """Schema para respuestas (sin contraseña)"""
    usuario_id: int
    nombre: str
    apellido: str
    email: EmailStr
    provincia_id: int
    ciudad: str
    fecha_nacimiento: date 
    fecha_registro: datetime
    
    class Config:
        from_attributes = True

class UsuarioCreate(BaseModel):
    """Schema interno para crear usuario"""
    nombre: str
    apellido: str
    email: EmailStr
    provincia_id: int
    ciudad: str
    fecha_nacimiento: date
    contrasena: str