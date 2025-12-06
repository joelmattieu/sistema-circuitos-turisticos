from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.preferencia_usuario import PreferenciaUsuarioModel
from schemas.preferencia_schema import PreferenciaUsuario, PreferenciaUsuarioCreate
from typing import List

def get_preferencia_by_usuario(db: Session, usuario_id: int) -> PreferenciaUsuarioModel:
    preferencia = db.query(PreferenciaUsuarioModel).filter(
        PreferenciaUsuarioModel.usuario_id == usuario_id
    ).first()
    return preferencia

def create_preferencia(db: Session, preferencia_data: PreferenciaUsuarioCreate) -> PreferenciaUsuarioModel:
    preferencia_existente = get_preferencia_by_usuario(db, preferencia_data.usuario_id)
    
    if preferencia_existente:
        for key, value in preferencia_data.dict().items():
            setattr(preferencia_existente, key, value)
        db.commit()
        db.refresh(preferencia_existente)
        return preferencia_existente
    
    nueva_preferencia = PreferenciaUsuarioModel(**preferencia_data.dict())
    db.add(nueva_preferencia)
    db.commit()
    db.refresh(nueva_preferencia)
    return nueva_preferencia

def update_preferencia(db: Session, preferencia_id: int, preferencia_data: PreferenciaUsuario) -> PreferenciaUsuarioModel:
    preferencia_db = db.query(PreferenciaUsuarioModel).filter(
        PreferenciaUsuarioModel.preferencia_id == preferencia_id
    ).first()
    
    if not preferencia_db:
        raise HTTPException(status_code=404, detail="Preferencia no encontrada")
    
    for key, value in preferencia_data.dict().items():
        setattr(preferencia_db, key, value)
    db.commit()
    db.refresh(preferencia_db)
    return preferencia_db

def delete_preferencia(db: Session, preferencia_id: int) -> None:
    preferencia_db = db.query(PreferenciaUsuarioModel).filter(
        PreferenciaUsuarioModel.preferencia_id == preferencia_id
    ).first()
    
    if not preferencia_db:
        raise HTTPException(status_code=404, detail="Preferencia no encontrada")
    
    db.delete(preferencia_db)
    db.commit()