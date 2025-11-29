from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.provincia import ProvinciaModel
from schemas.provincia_schema import Provincia, ProvinciaCreate
from typing import List

def get_all_provincias(db: Session) -> List[ProvinciaModel]:
    return db.query(ProvinciaModel).all()

def get_provincia_by_id(db: Session, provincia_id: int) -> ProvinciaModel:
    provincia = db.query(ProvinciaModel).filter(ProvinciaModel.provincia_id == provincia_id).first()
    if not provincia:
        raise HTTPException(status_code=404, detail="Provincia no encontrada")
    return provincia

def create_provincia(db: Session, provincia_data: ProvinciaCreate) -> ProvinciaModel:
    nueva_provincia = ProvinciaModel(**provincia_data.dict())
    db.add(nueva_provincia)
    db.commit()
    db.refresh(nueva_provincia)
    return nueva_provincia

def update_provincia(db: Session, provincia_id: int, provincia_data: Provincia) -> ProvinciaModel:
    provincia_db = get_provincia_by_id(db, provincia_id)
    for key, value in provincia_data.dict().items():
        setattr(provincia_db, key, value)
    db.commit()
    db.refresh(provincia_db)
    return provincia_db

def delete_provincia(db: Session, provincia_id: int) -> None:
    provincia_db = get_provincia_by_id(db, provincia_id)
    db.delete(provincia_db)
    db.commit()