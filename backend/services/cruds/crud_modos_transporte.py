from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.modo_transporte import ModoTransporteModel
from schemas.modo_transporte_schema import ModoTransporte, ModoTransporteCreate
from typing import List

def get_all_modos_transporte(db: Session) -> List[ModoTransporteModel]:
    return db.query(ModoTransporteModel).all()

def get_modo_transporte_by_id(db: Session, modo_transporte_id: int) -> ModoTransporteModel:
    modo = db.query(ModoTransporteModel).filter(ModoTransporteModel.modo_transporte_id == modo_transporte_id).first()
    if not modo:
        raise HTTPException(status_code=404, detail="Modo de transporte no encontrado")
    return modo

def create_modo_transporte(db: Session, modo_data: ModoTransporteCreate) -> ModoTransporteModel:
    nuevo_modo = ModoTransporteModel(**modo_data.dict())
    db.add(nuevo_modo)
    db.commit()
    db.refresh(nuevo_modo)
    return nuevo_modo

def update_modo_transporte(db: Session, modo_transporte_id: int, modo_data: ModoTransporte) -> ModoTransporteModel:
    modo_db = get_modo_transporte_by_id(db, modo_transporte_id)
    for key, value in modo_data.dict().items():
        setattr(modo_db, key, value)
    db.commit()
    db.refresh(modo_db)
    return modo_db

def delete_modo_transporte(db: Session, modo_transporte_id: int) -> None:
    modo_db = get_modo_transporte_by_id(db, modo_transporte_id)
    db.delete(modo_db)
    db.commit()