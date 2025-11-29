from fastapi import APIRouter
from db import db_dependency
from schemas.modo_transporte_schema import ModoTransporte, ModoTransporteCreate
from services.cruds.crud_modos_transporte import (
    get_all_modos_transporte,
    get_modo_transporte_by_id,
    create_modo_transporte,
    update_modo_transporte,
    delete_modo_transporte
)
from typing import List

route_modos_transporte = APIRouter(prefix="/modos-transporte", tags=["Modos de Transporte"])

@route_modos_transporte.get("", response_model=List[ModoTransporte])
async def get_modos_transporte(db: db_dependency):
    return get_all_modos_transporte(db)

@route_modos_transporte.get("/{modo_transporte_id}", response_model=ModoTransporte)
async def get_modo_transporte(modo_transporte_id: int, db: db_dependency):
    return get_modo_transporte_by_id(db, modo_transporte_id)

@route_modos_transporte.post("", response_model=ModoTransporte, status_code=201)
async def create_modo_transporte_endpoint(modo: ModoTransporteCreate, db: db_dependency):
    return create_modo_transporte(db, modo)

@route_modos_transporte.put("/{modo_transporte_id}", response_model=ModoTransporte)
async def update_modo_transporte_endpoint(modo_transporte_id: int, modo: ModoTransporte, db: db_dependency):
    return update_modo_transporte(db, modo_transporte_id, modo)

@route_modos_transporte.delete("/{modo_transporte_id}", status_code=204)
async def delete_modo_transporte_endpoint(modo_transporte_id: int, db: db_dependency):
    delete_modo_transporte(db, modo_transporte_id)
    return {"message": "Modo de transporte eliminado correctamente"}