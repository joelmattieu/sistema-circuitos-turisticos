from fastapi import APIRouter
from db import db_dependency
from schemas.unidad_medicion_schema import UnidadMedicion, UnidadMedicionCreate
from services.cruds.crud_unidades_medicion import (
    get_all_unidades_medicion,
    get_unidad_medicion_by_id,
    create_unidad_medicion,
    update_unidad_medicion,
    delete_unidad_medicion
)
from typing import List

route_unidades_medicion = APIRouter(prefix="/unidades-medicion", tags=["Unidades de Medición"])

@route_unidades_medicion.get("", response_model=List[UnidadMedicion])
async def get_unidades_medicion(db: db_dependency):
    return get_all_unidades_medicion(db)

@route_unidades_medicion.get("/{unidad_medicion_id}", response_model=UnidadMedicion)
async def get_unidad_medicion(unidad_medicion_id: int, db: db_dependency):
    return get_unidad_medicion_by_id(db, unidad_medicion_id)

@route_unidades_medicion.post("", response_model=UnidadMedicion, status_code=201)
async def create_unidad_medicion_endpoint(unidad: UnidadMedicionCreate, db: db_dependency):
    return create_unidad_medicion(db, unidad)

@route_unidades_medicion.put("/{unidad_medicion_id}", response_model=UnidadMedicion)
async def update_unidad_medicion_endpoint(unidad_medicion_id: int, unidad: UnidadMedicion, db: db_dependency):
    return update_unidad_medicion(db, unidad_medicion_id, unidad)

@route_unidades_medicion.delete("/{unidad_medicion_id}", status_code=204)
async def delete_unidad_medicion_endpoint(unidad_medicion_id: int, db: db_dependency):
    delete_unidad_medicion(db, unidad_medicion_id)
    return {"message": "Unidad de medición eliminada correctamente"}