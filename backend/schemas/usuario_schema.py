import re
from pydantic import BaseModel, EmailStr, Field, validator
from datetime import date

class UsuarioLogin(BaseModel):
    email: EmailStr
    contrasena: str = Field(..., min_length=1, max_length=50)

class UsuarioRegister(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=50)
    apellido: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    provincia_id: int
    ciudad: str = Field(..., min_length=2, max_length=100)
    fecha_nacimiento: date
    contrasena: str = Field(..., min_length=8, max_length=50)

    @validator('fecha_nacimiento')
    def validate_edad(cls, v):
        today = date.today()
        age = today.year - v.year - ((today.month, today.day) < (v.month, v.day))
        if age < 13:
            raise ValueError('Debes tener al menos 13 años para registrarte')
        if age > 120:
            raise ValueError('Fecha de nacimiento inválida')
        return v

    @validator('contrasena')
    def validate_contrasena(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('La contraseña debe tener al menos una letra mayúscula')
        if not re.search(r'[a-z]', v):
            raise ValueError('La contraseña debe tener al menos una letra minúscula')
        if not re.search(r'[0-9]', v):
            raise ValueError('La contraseña debe tener al menos un número')
        if not re.search(r'[^A-Za-z0-9]', v):
            raise ValueError('La contraseña debe tener al menos un carácter especial')
        return v

