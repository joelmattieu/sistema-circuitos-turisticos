from sqlalchemy.orm import Session, joinedload
from models.circuito import CircuitoModel
from models.categoria_circuito import CategoriaCircuitoModel
from schemas.circuito_schema import CircuitoCreate, CircuitoUpdate
from fastapi import HTTPException

def create_circuito(db: Session, circuito: CircuitoCreate):
    categoria = db.query(CategoriaCircuitoModel).filter(
        CategoriaCircuitoModel.categoria_id == circuito.categoria_id
    ).first()
    
    if not categoria:
        raise HTTPException(status_code=400, detail="La categoría no existe")
    
    db_circuito = CircuitoModel(**circuito.dict())
    db.add(db_circuito)
    db.commit()
    db.refresh(db_circuito)
    return db_circuito

def get_circuitos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(CircuitoModel).options(
        joinedload(CircuitoModel.categoria)
    ).offset(skip).limit(limit).all()

def get_circuito(db: Session, circuito_id: int):
    circuito = db.query(CircuitoModel).options(
        joinedload(CircuitoModel.categoria)
    ).filter(CircuitoModel.circuito_id == circuito_id).first()
    
    if not circuito:
        raise HTTPException(status_code=404, detail="Circuito no encontrado")
    
    return circuito

def update_circuito(db: Session, circuito_id: int, circuito_update: CircuitoUpdate):
    db_circuito = get_circuito(db, circuito_id)
    
    update_data = circuito_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_circuito, field, value)
    
    db.commit()
    db.refresh(db_circuito)
    return db_circuito

def delete_circuito(db: Session, circuito_id: int):
    db_circuito = get_circuito(db, circuito_id)
    db.delete(db_circuito)
    db.commit()
    return {"message": "Circuito eliminado definitivamente"}
  
def incrementar_veces_finalizado(db: Session, circuito_id: int):
    db_circuito = get_circuito(db, circuito_id)
    db_circuito.veces_finalizado += 1
    db.commit()
    db.refresh(db_circuito)
    return db_circuito