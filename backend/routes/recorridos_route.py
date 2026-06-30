from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db import get_db
from models.usuario import UsuarioModel
from services.auth.dependencies import obtener_usuario_actual
from services.cruds.crud_recorridos import (
    iniciar_recorrido,
    registrar_visita,
    obtener_recorrido_usuario,
    obtener_pois_visitados
)

route_recorridos = APIRouter(prefix="/recorridos", tags=["Recorridos"])


class IniciarRecorridoRequest(BaseModel):
    circuito_id: int


class RegistrarVisitaRequest(BaseModel):
    circuito_id: int
    poi_id: int


@route_recorridos.post("/iniciar")
def iniciar_recorrido_route(
    request: IniciarRecorridoRequest,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    recorrido = iniciar_recorrido(
        db,
        usuario_actual.usuario_id,
        request.circuito_id,
    )
    return {
        "recorrido_id": recorrido.recorrido_id,
        "estado": recorrido.estado,
        "progreso": recorrido.avance_porcentaje,
    }


@route_recorridos.post("/visita")
def registrar_visita_poi(
    request: RegistrarVisitaRequest,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    return registrar_visita(
        db,
        usuario_actual.usuario_id,
        request.circuito_id,
        request.poi_id,
    )


@route_recorridos.get("/circuito/{circuito_id}")
def obtener_recorrido(
    circuito_id: int,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    recorrido = obtener_recorrido_usuario(db, usuario_actual.usuario_id, circuito_id)

    if not recorrido:
        return {
            "recorrido_id": None,
            "estado": "no_iniciado",
            "progreso": 0.0,
            "pois_visitados": []
        }

    pois_visitados = obtener_pois_visitados(db, usuario_actual.usuario_id, circuito_id)

    return {
        "recorrido_id": recorrido.recorrido_id,
        "estado": recorrido.estado,
        "progreso": recorrido.avance_porcentaje,
        "fecha_inicio": recorrido.fecha_inicio,
        "fecha_fin": recorrido.fecha_fin,
        "pois_visitados": pois_visitados
    }


@route_recorridos.get("/circuito/{circuito_id}/visitados")
def obtener_pois_visitados_route(
    circuito_id: int,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    pois = obtener_pois_visitados(db, usuario_actual.usuario_id, circuito_id)
    return {"pois_visitados": pois}
