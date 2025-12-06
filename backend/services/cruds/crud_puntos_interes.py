from sqlalchemy.orm import Session
from models.punto_interes import PuntoInteresModel
from schemas.punto_interes import PuntoInteresCreate, PuntoInteresUpdate
from fastapi import HTTPException

def create_punto_interes(db: Session, punto: PuntoInteresCreate):
    db_punto = PuntoInteresModel(**punto.dict())
    db.add(db_punto)
    db.commit()
    db.refresh(db_punto)
    return db_punto

def get_puntos_interes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(PuntoInteresModel).offset(skip).limit(limit).all()

def get_punto_interes(db: Session, poi_id: int):
    punto = db.query(PuntoInteresModel).filter(
        PuntoInteresModel.poi_id == poi_id
    ).first()
    
    if not punto:
        raise HTTPException(status_code=404, detail="Punto de interés no encontrado")
    
    return punto

def update_punto_interes(db: Session, poi_id: int, punto_update: PuntoInteresUpdate):
    db_punto = get_punto_interes(db, poi_id)
    
    update_data = punto_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_punto, field, value)
    
    db.commit()
    db.refresh(db_punto)
    return db_punto

def delete_punto_interes(db: Session, poi_id: int):
    db_punto = get_punto_interes(db, poi_id)
    db.delete(db_punto)
    db.commit()