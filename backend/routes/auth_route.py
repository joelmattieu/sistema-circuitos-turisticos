from fastapi import APIRouter, HTTPException, status
from db import db_dependency
from schemas.usuario_schema import UsuarioLogin, UsuarioRegister
from services.auth.auth_usuario import create_user, authenticate_user

route_auth = APIRouter(tags=["Autenticación"], prefix="/auth") 

@route_auth.post("/login", status_code=200)
async def login(user: UsuarioLogin, db: db_dependency):
    authenticated_user = authenticate_user(db, user.email, user.contrasena)

    if not authenticated_user:
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")

    return {
        "usuario_id": authenticated_user.usuario_id,
        "nombre": authenticated_user.nombre,
        "apellido": authenticated_user.apellido,
        "email": authenticated_user.email,
        "provincia_id": authenticated_user.provincia_id,
        "ciudad": authenticated_user.ciudad,
        "fecha_nacimiento": authenticated_user.fecha_nacimiento.isoformat() if authenticated_user.fecha_nacimiento else None,
        "fecha_registro": authenticated_user.fecha_registro.isoformat() if authenticated_user.fecha_registro else None
    }

@route_auth.post("/register", status_code=201)
async def register(user: UsuarioRegister, db: db_dependency):
    created_user = create_user(db, user)
    return {
        "message": "Usuario creado exitosamente",
        "usuario_id": created_user.usuario_id
    }