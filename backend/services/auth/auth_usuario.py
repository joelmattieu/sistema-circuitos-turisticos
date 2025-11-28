from fastapi import HTTPException
from models.usuario import UsuarioModel
from passlib import context

pwd_context = context.CryptContext(schemes=["bcrypt"], deprecated="auto")

async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
  
async def get_password_hash(password):
    return pwd_context.hash(password)

async def create_user(db, user):
    usr_login = db.query(UsuarioModel).filter(UsuarioModel.email == user.email).first()
    if usr_login:
        raise HTTPException(status_code=400, detail="El usuario ya está registrado")
    
    user.contrasena = await get_password_hash(user.contrasena)
    db_user = UsuarioModel(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
    
async def authenticate_user(db, email: str, password: str):
    user = db.query(UsuarioModel).filter(UsuarioModel.email == email).first()
    if not user:
        return False
    if not await verify_password(password, user.contrasena):
        return False
    return user