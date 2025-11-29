from fastapi import APIRouter
from db import db_dependency
from schemas.pais_schema import Pais, PaisCreate
from services.cruds.crud_paises import (
    get_all_paises,
    get_pais_by_id,
    create_pais,
    update_pais,
    delete_pais
)
from typing import List

route_paises = APIRouter(prefix="/paises", tags=["Países"])

@route_paises.get("", response_model=List[Pais])
async def get_paises(db: db_dependency):
    return get_all_paises(db)

@route_paises.get("/{pais_id}", response_model=Pais)
async def get_pais(pais_id: int, db: db_dependency):
    return get_pais_by_id(db, pais_id)

@route_paises.post("", response_model=Pais, status_code=201)
async def create_pais_endpoint(pais: PaisCreate, db: db_dependency):
    return create_pais(db, pais)

@route_paises.put("/{pais_id}", response_model=Pais)
async def update_pais_endpoint(pais_id: int, pais: Pais, db: db_dependency):
    return update_pais(db, pais_id, pais)

@route_paises.delete("/{pais_id}", status_code=204)
async def delete_pais_endpoint(pais_id: int, db: db_dependency):
    delete_pais(db, pais_id)
    return {"message": "País eliminado correctamente"}