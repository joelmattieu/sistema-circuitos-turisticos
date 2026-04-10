from fastapi import HTTPException
from models.usuario import UsuarioModel
from models.preferencia_usuario import PreferenciaUsuarioModel
import bcrypt

ID_IDIOMA_ESPANOL = 1
ID_MODO_A_PIE = 1
ID_UNIDAD_KM = 1


def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def get_password_hash(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def create_user(db, user):
    if db.query(UsuarioModel).filter(UsuarioModel.email == user.email).first():
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    user.contrasena = get_password_hash(user.contrasena)
    db_user = UsuarioModel(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    preferencias_default = PreferenciaUsuarioModel(
        usuario_id=db_user.usuario_id,
        idioma_id=ID_IDIOMA_ESPANOL,
        modo_transporte_id=ID_MODO_A_PIE,
        unidad_medicion_id=ID_UNIDAD_KM,
    )
    db.add(preferencias_default)
    db.commit()
    db.refresh(preferencias_default)

    return db_user


def authenticate_user(db, email, password):
    user = db.query(UsuarioModel).filter(UsuarioModel.email == email).first()
    if not user or not verify_password(password, user.contrasena):
        return False
    return user