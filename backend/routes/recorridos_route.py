from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db import get_db
from services.cruds.crud_recorridos import (
    registrar_visita,
    obtener_recorrido_usuario,
    obtener_pois_visitados
)

route_recorridos = APIRouter(prefix="/recorridos", tags=["Recorridos"])


class RegistrarVisitaRequest(BaseModel):
    usuario_id: int
    circuito_id: int
    poi_id: int


@route_recorridos.post("/visita")
def registrar_visita_poi(
    request: RegistrarVisitaRequest,
    db: Session = Depends(get_db)
):
    """
    Registra que un usuario visitó un punto de interés.
    Crea el recorrido automáticamente si no existe.
    """
    try:
        resultado = registrar_visita(
            db,
            request.usuario_id,
            request.circuito_id,
            request.poi_id
        )
        return resultado
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@route_recorridos.get("/usuario/{usuario_id}/circuito/{circuito_id}")
def obtener_recorrido(
    usuario_id: int,
    circuito_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtiene el recorrido de un usuario en un circuito específico.
    """
    recorrido = obtener_recorrido_usuario(db, usuario_id, circuito_id)
    
    if not recorrido:
        return {
            "recorrido_id": None,
            "estado": "no_iniciado",
            "progreso": 0.0,
            "pois_visitados": []
        }
    
    pois_visitados = obtener_pois_visitados(db, usuario_id, circuito_id)
    
    return {
        "recorrido_id": recorrido.recorrido_id,
        "estado": recorrido.estado,
        "progreso": recorrido.avance_porcentaje,
        "fecha_inicio": recorrido.fecha_inicio,
        "fecha_fin": recorrido.fecha_fin,
        "pois_visitados": pois_visitados
    }


@route_recorridos.get("/usuario/{usuario_id}/circuito/{circuito_id}/visitados")
def obtener_pois_visitados_route(
    usuario_id: int,
    circuito_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtiene la lista de POI IDs que el usuario ya visitó en un circuito.
    """
    pois = obtener_pois_visitados(db, usuario_id, circuito_id)
    return {"pois_visitados": pois}
