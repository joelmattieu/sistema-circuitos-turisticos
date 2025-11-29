from fastapi import APIRouter
from db import db_dependency
from schemas.usuario_schema import UsuarioLogin, UsuarioRegister
from services.auth.auth_usuario import create_user, authenticate_user
from fastapi import HTTPException

route_auth = APIRouter(tags=["Autenticación"], prefix="/auth") 

@route_auth.post("/login", status_code=200)
async def login(user: UsuarioLogin, db: db_dependency):
    authenticated_user = await authenticate_user(db, user.email, user.contrasena)

    if not authenticated_user:
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")

    return {
        "id": authenticated_user.usuario_id,
        "nombre": authenticated_user.nombre,
        "apellido": authenticated_user.apellido,
        "email": authenticated_user.email,
        "ciudad": authenticated_user.ciudad
    }

@route_auth.post("/register", status_code=201)
async def register(user: UsuarioRegister, db: db_dependency):
    await create_user(db, user)
    return {"message": "Usuario creado"}