from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from db import get_db
from services.cruds.crud_circuitos import get_circuitos_raw
from services.recomendaciones_service import obtener_circuitos_recomendados
from services.progreso_service import obtener_progresos_usuario
from schemas.circuito_schema import CircuitoResponse

route_recomendaciones = APIRouter(prefix="/recomendaciones", tags=["Recomendaciones"])


@route_recomendaciones.get("/circuitos", response_model=list[dict])
def get_circuitos_recomendados(
    lat: Optional[float] = Query(None, description="Latitud del usuario"),
    lon: Optional[float] = Query(None, description="Longitud del usuario"),
    modo_transporte: Optional[str] = Query(None, description="Modo de transporte preferido"),
    usuario_id: Optional[int] = Query(None, description="ID del usuario para obtener progreso"),
    db: Session = Depends(get_db)
):
    """
    Obtiene circuitos recomendados según clima, ubicación y preferencias.
    """
    # Obtener todos los circuitos como objetos del modelo
    circuitos = get_circuitos_raw(db)
    
    ubicacion_usuario = None
    if lat is not None and lon is not None:
        ubicacion_usuario = {"lat": lat, "lon": lon}
    
    circuitos_recomendados = obtener_circuitos_recomendados(
        circuitos,
        ubicacion_usuario,
        modo_transporte
    )
    
    progresos = {}
    if usuario_id:
        progresos = obtener_progresos_usuario(db, usuario_id)
    
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
            "score": item["score"],
            "clima_actual": item["clima"],
            "progreso_porcentaje": progresos.get(circuito.circuito_id, 0.0)
        })
    
    return resultado
