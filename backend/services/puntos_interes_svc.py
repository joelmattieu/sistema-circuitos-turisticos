from sqlalchemy.orm import Session
from models.circuito_punto_interes import CircuitoPuntoInteresModel
from models.circuito import CircuitoModel
from models.punto_interes import PuntoInteresModel
from schemas.circuito_punto_interes_schema import CircuitoPuntoInteresCreate, CircuitoPuntoInteresUpdate
from fastapi import HTTPException

def vincular_punto_interes(db: Session, vinculo: CircuitoPuntoInteresCreate):
    circuito = db.query(CircuitoModel).filter(
        CircuitoModel.circuito_id == vinculo.circuito_id
    ).first()
    if not circuito:
        raise HTTPException(status_code=404, detail="Circuito no encontrado")
    
    punto = db.query(PuntoInteresModel).filter(
        PuntoInteresModel.poi_id == vinculo.poi_id
    ).first()
    if not punto:
        raise HTTPException(status_code=404, detail="Punto de interés no encontrado")
    
    vinculo_existente = db.query(CircuitoPuntoInteresModel).filter(
        CircuitoPuntoInteresModel.circuito_id == vinculo.circuito_id,
        CircuitoPuntoInteresModel.poi_id == vinculo.poi_id
    ).first()
    if vinculo_existente:
        raise HTTPException(status_code=400, detail="El punto de interés ya está vinculado a este circuito")
    
    db_vinculo = CircuitoPuntoInteresModel(**vinculo.dict())
    db.add(db_vinculo)
    db.commit()
    db.refresh(db_vinculo)
    return db_vinculo

def get_puntos_por_circuito(db: Session, circuito_id: int):
    return db.query(CircuitoPuntoInteresModel).filter(
        CircuitoPuntoInteresModel.circuito_id == circuito_id
    ).order_by(CircuitoPuntoInteresModel.orden_en_circuito).all()

def update_vinculo(db: Session, circuito_poi_id: int, vinculo_update: CircuitoPuntoInteresUpdate):
    db_vinculo = db.query(CircuitoPuntoInteresModel).filter(
        CircuitoPuntoInteresModel.circuito_poi_id == circuito_poi_id
    ).first()
    
    if not db_vinculo:
        raise HTTPException(status_code=404, detail="Vínculo no encontrado")
    
    update_data = vinculo_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_vinculo, field, value)
    
    db.commit()
    db.refresh(db_vinculo)
    return db_vinculo

def desvincular_punto_interes(db: Session, circuito_poi_id: int):
    db_vinculo = db.query(CircuitoPuntoInteresModel).filter(
        CircuitoPuntoInteresModel.circuito_poi_id == circuito_poi_id
    ).first()
    
    if not db_vinculo:
        raise HTTPException(status_code=404, detail="Vínculo no encontrado")
    
    db.delete(db_vinculo)
    db.commit()