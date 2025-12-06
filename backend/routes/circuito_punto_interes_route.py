from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from db import get_db
from schemas.circuito_punto_interes_schema import (
    CircuitoPuntoInteresCreate, 
    CircuitoPuntoInteresUpdate, 
    CircuitoPuntoInteresResponse
)
from services.puntos_interes_svc import (
    vincular_punto_interes, 
    get_puntos_por_circuito, 
    update_vinculo, 
    desvincular_punto_interes
)

route_circuito_puntos = APIRouter(prefix="/circuitos-puntos-interes", tags=["Circuitos - Puntos de Interés"])

@route_circuito_puntos.post("", response_model=CircuitoPuntoInteresResponse, status_code=201)
def vincular_punto(vinculo: CircuitoPuntoInteresCreate, db: Session = Depends(get_db)):
    """Vincular un punto de interés a un circuito"""
    return vincular_punto_interes(db, vinculo)

@route_circuito_puntos.get("/circuito/{circuito_id}", response_model=List[CircuitoPuntoInteresResponse])
def listar_puntos_de_circuito(circuito_id: int, db: Session = Depends(get_db)):
    """Obtener todos los puntos de interés de un circuito"""
    return get_puntos_por_circuito(db, circuito_id)

@route_circuito_puntos.put("/{circuito_poi_id}", response_model=CircuitoPuntoInteresResponse)
def actualizar_vinculo(circuito_poi_id: int, vinculo_update: CircuitoPuntoInteresUpdate, db: Session = Depends(get_db)):
    """Actualizar orden, distancia o duración de un punto en el circuito"""
    return update_vinculo(db, circuito_poi_id, vinculo_update)

@route_circuito_puntos.delete("/{circuito_poi_id}")
def desvincular_punto(circuito_poi_id: int, db: Session = Depends(get_db)):
    """Desvincular un punto de interés de un circuito"""
    desvincular_punto_interes(db, circuito_poi_id)
    return {"message": "Punto de interés desvinculado correctamente"}