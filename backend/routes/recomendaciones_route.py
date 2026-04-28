from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from db import get_db
from models.usuario import UsuarioModel
from services.auth.dependencies import obtener_usuario_actual_opcional
from services.cruds.crud_circuitos import get_circuitos_raw
from services.recomendaciones_service import obtener_circuitos_recomendados
from services.progreso_service import obtener_progresos_usuario

route_recomendaciones = APIRouter(prefix="/recomendaciones", tags=["Recomendaciones"])


@route_recomendaciones.get("/circuitos", response_model=list[dict])
def get_circuitos_recomendados(
    lat: Optional[float] = Query(None, description="Latitud del usuario"),
    lon: Optional[float] = Query(None, description="Longitud del usuario"),
    modo_transporte: Optional[str] = Query(None, description="Modo de transporte preferido"),
    idioma: str = Query("es"),
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel | None = Depends(obtener_usuario_actual_opcional),
):
    circuitos = get_circuitos_raw(db, idioma=idioma)

    ubicacion_usuario = None
    if lat is not None and lon is not None:
        ubicacion_usuario = {"lat": lat, "lon": lon}

    circuitos_recomendados = obtener_circuitos_recomendados(
        circuitos,
        ubicacion_usuario,
        modo_transporte
    )

    progresos = {}
    if usuario_actual:
        progresos = obtener_progresos_usuario(db, usuario_actual.usuario_id)
    
    resultado = []
    for item in circuitos_recomendados:
        circuito = item["circuito"]
        
        resultado.append({
            "circuito_id": circuito.circuito_id,
            "nombre": circuito.nombre,
            "descripcion": circuito.descripcion,
            "duracion_estimada": circuito.duracion_estimada_minutos,
            "distancia_total": circuito.distancia_total_metros,
            "imagen_url": circuito.url_imagen_portada,
            "categoria": circuito.categoria.nombre_categoria if circuito.categoria else None,
            "modo_transporte_id": circuito.modo_transporte_id,
            "accesible_auto": circuito.accesible_auto,
            "tiene_tramos_techados": circuito.tiene_tramos_techados,
            "score": item["score"],
            "clima_actual": item["clima"],
            "progreso_porcentaje": progresos.get(circuito.circuito_id, 0.0)
        })
    
    return resultado
