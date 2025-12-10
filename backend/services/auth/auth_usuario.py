from fastapi import HTTPException
from models.usuario import UsuarioModel
from models.preferencia_usuario import PreferenciaUsuarioModel
import bcrypt

## compara la contraseña en texto plano con la contraseña hasheada
def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        password_bytes = plain_password.encode('utf-8')
        hashed_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hashed_bytes)
    except Exception as e:
        print(f"Error verificando contraseña: {e}")
        return False

## hashea la contraseña en texto plano
def get_password_hash(password: str) -> str:
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')

def create_user(db, user):
    usr_login = db.query(UsuarioModel).filter(UsuarioModel.email == user.email).first()
    if usr_login:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    user.contrasena = get_password_hash(user.contrasena)
    db_user = UsuarioModel(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    preferencias_default = PreferenciaUsuarioModel(
        usuario_id=db_user.usuario_id,
        idioma_id=1,  # Español
        modo_transporte_id=1,  # Primer modo a pie
        unidad_medicion_id=1  # Kilómetros
    )
    db.add(preferencias_default)
    db.commit()
    db.refresh(preferencias_default)
    
    return db_user
    
def authenticate_user(db, email: str, password: str):
    user = db.query(UsuarioModel).filter(UsuarioModel.email == email).first()
    if not user:
        return False
    if not verify_password(password, user.contrasena):
        return False
    return user