from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.pais import PaisModel
from schemas.pais_schema import Pais, PaisCreate
from typing import List

def get_all_paises(db: Session) -> List[PaisModel]:
    return db.query(PaisModel).all()

def get_pais_by_id(db: Session, pais_id: int) -> PaisModel:
    pais = db.query(PaisModel).filter(PaisModel.pais_id == pais_id).first()
    if not pais:
        raise HTTPException(status_code=404, detail="País no encontrado")
    return pais

def create_pais(db: Session, pais_data: PaisCreate) -> PaisModel:
    nuevo_pais = PaisModel(**pais_data.dict())
    db.add(nuevo_pais)
    db.commit()
    db.refresh(nuevo_pais)
    return nuevo_pais

def update_pais(db: Session, pais_id: int, pais_data: Pais) -> PaisModel:
    pais_db = get_pais_by_id(db, pais_id)
    for key, value in pais_data.dict().items():
        setattr(pais_db, key, value)
    db.commit()
    db.refresh(pais_db)
    return pais_db

def delete_pais(db: Session, pais_id: int) -> None:
    pais_db = get_pais_by_id(db, pais_id)
    db.delete(pais_db)
    db.commit()