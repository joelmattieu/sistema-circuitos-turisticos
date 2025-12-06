from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from db import get_db
from schemas.punto_interes import PuntoInteresCreate, PuntoInteresUpdate, PuntoInteresResponse
from services.cruds.crud_puntos_interes import (
    create_punto_interes, get_puntos_interes, get_punto_interes,
    update_punto_interes, delete_punto_interes
)

route_puntos_interes = APIRouter(prefix="/puntos-interes", tags=["Puntos de Interés"])

@route_puntos_interes.post("", response_model=PuntoInteresResponse, status_code=201)
def crear_punto_interes(punto: PuntoInteresCreate, db: Session = Depends(get_db)):
    return create_punto_interes(db, punto)

@route_puntos_interes.get("", response_model=List[PuntoInteresResponse])
def listar_puntos_interes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_puntos_interes(db, skip=skip, limit=limit)

@route_puntos_interes.get("/{poi_id}", response_model=PuntoInteresResponse)
def obtener_punto_interes(poi_id: int, db: Session = Depends(get_db)):
    return get_punto_interes(db, poi_id)

@route_puntos_interes.put("/{poi_id}", response_model=PuntoInteresResponse)
def actualizar_punto_interes(poi_id: int, punto_update: PuntoInteresUpdate, db: Session = Depends(get_db)):
    return update_punto_interes(db, poi_id, punto_update)

@route_puntos_interes.delete("/{poi_id}")
def eliminar_punto_interes(poi_id: int, db: Session = Depends(get_db)):
    delete_punto_interes(db, poi_id)
    return {"message": "Punto de interés eliminado correctamente"}