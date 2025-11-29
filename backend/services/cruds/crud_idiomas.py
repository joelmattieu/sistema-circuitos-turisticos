from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.idioma import IdiomaModel
from schemas.idioma_schema import Idioma, IdiomaCreate
from typing import List

def get_all_idiomas(db: Session) -> List[IdiomaModel]:
    return db.query(IdiomaModel).all()

def get_idioma_by_id(db: Session, idioma_id: int) -> IdiomaModel:
    idioma = db.query(IdiomaModel).filter(IdiomaModel.idioma_id == idioma_id).first()
    if not idioma:
        raise HTTPException(status_code=404, detail="Idioma no encontrado")
    return idioma

def create_idioma(db: Session, idioma_data: IdiomaCreate) -> IdiomaModel:
    nuevo_idioma = IdiomaModel(**idioma_data.dict())
    db.add(nuevo_idioma)
    db.commit()
    db.refresh(nuevo_idioma)
    return nuevo_idioma

def update_idioma(db: Session, idioma_id: int, idioma_data: Idioma) -> IdiomaModel:
    idioma_db = get_idioma_by_id(db, idioma_id)
    for key, value in idioma_data.dict().items():
        setattr(idioma_db, key, value)
    db.commit()
    db.refresh(idioma_db)
    return idioma_db

def delete_idioma(db: Session, idioma_id: int) -> None:
    idioma_db = get_idioma_by_id(db, idioma_id)
    db.delete(idioma_db)
    db.commit()