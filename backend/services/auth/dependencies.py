from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from db import get_db
from models.usuario import UsuarioModel
from services.auth.jwt_handler import verificar_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
oauth2_scheme_optional = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=False)


def obtener_usuario_actual(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> UsuarioModel:
    usuario_id = verificar_token(token)
    if usuario_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )

    usuario = db.query(UsuarioModel).filter(UsuarioModel.usuario_id == usuario_id).first()
    if usuario is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado",
        )
    return usuario


def obtener_usuario_actual_opcional(
    token: str | None = Depends(oauth2_scheme_optional),
    db: Session = Depends(get_db),
) -> UsuarioModel | None:
    if not token:
        return None
    usuario_id = verificar_token(token)
    if usuario_id is None:
        return None
    return db.query(UsuarioModel).filter(UsuarioModel.usuario_id == usuario_id).first()
