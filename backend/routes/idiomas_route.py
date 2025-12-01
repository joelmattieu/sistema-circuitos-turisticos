from fastapi import APIRouter
from db import db_dependency
from schemas.idioma_schema import Idioma, IdiomaCreate
from services.cruds.crud_idiomas import (
    get_all_idiomas,
    get_idioma_by_id,
    create_idioma,
    update_idioma,
    delete_idioma
)
from typing import List

route_idiomas = APIRouter(prefix="/idiomas", tags=["Idiomas"])

@route_idiomas.get("", response_model=List[Idioma])
async def get_idiomas(db: db_dependency):
    return get_all_idiomas(db)

@route_idiomas.get("/{idioma_id}", response_model=Idioma)
async def get_idioma(idioma_id: int, db: db_dependency):
    return get_idioma_by_id(db, idioma_id)

@route_idiomas.post("", response_model=Idioma, status_code=201)
async def create_idioma_endpoint(idioma: IdiomaCreate, db: db_dependency):
    return create_idioma(db, idioma)

@route_idiomas.put("/{idioma_id}", response_model=Idioma)
async def update_idioma_endpoint(idioma_id: int, idioma: Idioma, db: db_dependency):
    return update_idioma(db, idioma_id, idioma)

@route_idiomas.delete("/{idioma_id}", status_code=204)
async def delete_idioma_endpoint(idioma_id: int, db: db_dependency):
    delete_idioma(db, idioma_id)
    return {"message": "Idioma eliminado correctamente"}