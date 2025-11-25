from fastapi import HTTPException
from models.usuario import UsuarioModel
from passlib import context

## se crea un objeto de la clase CryptContext
pwd_context = context.CryptContext(schemes=["bcrypt"], deprecated="auto")

## compara la contraseña ingresada con la contraseña hasheada
async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
  
## hashea la contraseña
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
    
async def authenticate_user(db, email: str, password: str):
    user = db.query(UsuarioModel).filter(UsuarioModel.email == email).first()
    if not user:
        return False
    if not await verify_password(password, user.contrasena):
        return False
    return user