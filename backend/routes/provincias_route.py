from fastapi import APIRouter, Query
from db import db_dependency
from schemas.provincia_schema import Provincia, ProvinciaCreate
from services.cruds.crud_provincias import (
    get_all_provincias,
    get_provincia_by_id,
    get_provincias_by_contry_id,
    create_provincia,
    update_provincia,
    delete_provincia
    
)
from typing import List, Optional

route_provincias = APIRouter(prefix="/provincias", tags=["Provincias"])


@route_provincias.get("", response_model=List[Provincia])
async def get_provincias(
    db: db_dependency,
    pais_id: Optional[int] = Query(None, description="Filtrar por ID del país")
):
    if pais_id:
        return get_provincias_by_contry_id(db, pais_id)
    return get_all_provincias(db)
  
  
@route_provincias.get("/{provincia_id}", response_model=Provincia)
async def get_provincia(provincia_id: int, db: db_dependency):
    return get_provincia_by_id(db, provincia_id)
  
@route_provincias.get("/country/{country_id}", response_model=List[Provincia])
async def get_provincias_by_country(country_id: int, db: db_dependency):
    return get_provincias_by_contry_id(db, country_id)

@route_provincias.post("", response_model=Provincia, status_code=201)
async def create_provincia_endpoint(provincia: ProvinciaCreate, db: db_dependency):
    return create_provincia(db, provincia)

@route_provincias.put("/{provincia_id}", response_model=Provincia)
async def update_provincia_endpoint(provincia_id: int, provincia: Provincia, db: db_dependency):
    return update_provincia(db, provincia_id, provincia)

@route_provincias.delete("/{provincia_id}", status_code=204)
async def delete_provincia_endpoint(provincia_id: int, db: db_dependency):
    delete_provincia(db, provincia_id)
    return {"message": "Provincia eliminada correctamente"}
