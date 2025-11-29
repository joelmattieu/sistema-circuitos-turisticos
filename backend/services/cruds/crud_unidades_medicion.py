from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.unidad_medicion import UnidadMedicionModel
from schemas.unidad_medicion_schema import UnidadMedicion, UnidadMedicionCreate
from typing import List

def get_all_unidades_medicion(db: Session) -> List[UnidadMedicionModel]:
    return db.query(UnidadMedicionModel).all()

def get_unidad_medicion_by_id(db: Session, unidad_medicion_id: int) -> UnidadMedicionModel:
    unidad = db.query(UnidadMedicionModel).filter(UnidadMedicionModel.unidad_medicion_id == unidad_medicion_id).first()
    if not unidad:
        raise HTTPException(status_code=404, detail="Unidad de medición no encontrada")
    return unidad

def create_unidad_medicion(db: Session, unidad_data: UnidadMedicionCreate) -> UnidadMedicionModel:
    nueva_unidad = UnidadMedicionModel(**unidad_data.dict())
    db.add(nueva_unidad)
    db.commit()
    db.refresh(nueva_unidad)
    return nueva_unidad

def update_unidad_medicion(db: Session, unidad_medicion_id: int, unidad_data: UnidadMedicion) -> UnidadMedicionModel:
    unidad_db = get_unidad_medicion_by_id(db, unidad_medicion_id)
    for key, value in unidad_data.dict().items():
        setattr(unidad_db, key, value)
    db.commit()
    db.refresh(unidad_db)
    return unidad_db

def delete_unidad_medicion(db: Session, unidad_medicion_id: int) -> None:
    unidad_db = get_unidad_medicion_by_id(db, unidad_medicion_id)
    db.delete(unidad_db)
    db.commit()