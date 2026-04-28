from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from db import get_db
from models.usuario import UsuarioModel
from services.auth.dependencies import obtener_usuario_actual, obtener_usuario_actual_opcional
from schemas.circuito_schema import CircuitoCreate, CircuitoUpdate, CircuitoResponse
from services.cruds.crud_circuitos import (
    create_circuito, get_circuitos, get_circuito, 
    update_circuito, delete_circuito, incrementar_veces_finalizado
)

route_circuitos = APIRouter(prefix="/circuitos", tags=["Circuitos"])

@route_circuitos.post("", response_model=CircuitoResponse, status_code=201)
def crear_circuito(
    circuito: CircuitoCreate,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    return create_circuito(db, circuito)

@route_circuitos.get("", response_model=List[CircuitoResponse])
def listar_circuitos(
    skip: int = 0,
    limit: int = 100,
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None),
    ordenar_por_distancia: bool = Query(False),
    idioma: str = Query("es"),
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel | None = Depends(obtener_usuario_actual_opcional),
):
    return get_circuitos(
        db,
        skip=skip,
        limit=limit,
        usuario_id=usuario_actual.usuario_id if usuario_actual else None,
        lat=lat,
        lon=lon,
        ordenar_por_distancia=ordenar_por_distancia,
        idioma=idioma,
    )

@route_circuitos.get("/{circuito_id}", response_model=CircuitoResponse)
def obtener_circuito(
    circuito_id: int,
    idioma: str = Query("es"),
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel | None = Depends(obtener_usuario_actual_opcional),
):
    return get_circuito(
        db,
        circuito_id,
        usuario_id=usuario_actual.usuario_id if usuario_actual else None,
        idioma=idioma,
    )

@route_circuitos.put("/{circuito_id}", response_model=CircuitoResponse)
def actualizar_circuito(
    circuito_id: int,
    circuito_update: CircuitoUpdate,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    return update_circuito(db, circuito_id, circuito_update)

@route_circuitos.delete("/{circuito_id}")
def eliminar_circuito(
    circuito_id: int,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    return delete_circuito(db, circuito_id)

@route_circuitos.post("/{circuito_id}/finalizar", response_model=CircuitoResponse)
def finalizar_circuito(
    circuito_id: int,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    return incrementar_veces_finalizado(db, circuito_id)
