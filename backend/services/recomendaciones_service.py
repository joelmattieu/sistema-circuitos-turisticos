from typing import List, Optional
from models.circuito import CircuitoModel
from services.clima_service import obtener_clima
import math


RADIO_TIERRA_KM = 6371
CORDOBA_LAT = -31.4201
CORDOBA_LON = -64.1888


def calcular_distancia_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return RADIO_TIERRA_KM * c


def puntaje_clima(circuito, condicion):
    if condicion == "lluvioso":
        base = 25 if (circuito.duracion_estimada_minutos or 0) <= 120 else 15
        bonus = 15 if circuito.tiene_tramos_techados else 0
        return base + bonus
    if condicion == "soleado":
        return 40 if (circuito.duracion_estimada_minutos or 0) > 120 else 25
    return 20


def puntaje_ubicacion(circuito, ubicacion_usuario):
    if not ubicacion_usuario or not circuito.puntos_interes:
        return 0
    primer_poi = circuito.puntos_interes[0]
    distancia = calcular_distancia_km(
        ubicacion_usuario["lat"], ubicacion_usuario["lon"],
        primer_poi.latitud, primer_poi.longitud,
    )
    if distancia < 1:
        return 30
    if distancia < 5:
        return 20
    if distancia < 10:
        return 12
    if distancia < 20:
        return 5
    return 0


def puntaje_transporte(circuito, modo_usuario):
    if not modo_usuario:
        return 0
    if not circuito.modo_transporte:
        return 10
    modo_circuito = circuito.modo_transporte.nombre_modo_transporte.strip().lower()
    modo_usuario = modo_usuario.strip().lower()
    if modo_usuario == modo_circuito:
        return 20
    if modo_usuario == "bicicleta" and modo_circuito == "a pie":
        return 13
    return 0


def puntaje_popularidad(veces_finalizado):
    if veces_finalizado >= 20:
        return 10
    if veces_finalizado >= 10:
        return 7
    if veces_finalizado >= 5:
        return 5
    return 2


def calcular_score_circuito(circuito, clima, ubicacion_usuario, modo_transporte):
    condicion = clima.get("condicion", "soleado")
    score = (
        puntaje_clima(circuito, condicion)
        + puntaje_ubicacion(circuito, ubicacion_usuario)
        + puntaje_transporte(circuito, modo_transporte)
        + puntaje_popularidad(circuito.veces_finalizado)
    )
    return round(score, 2)


def obtener_circuitos_recomendados(circuitos, ubicacion_usuario=None, modo_transporte=None):
    if ubicacion_usuario:
        clima = obtener_clima(ubicacion_usuario["lat"], ubicacion_usuario["lon"])
    else:
        clima = obtener_clima(CORDOBA_LAT, CORDOBA_LON)

    resultados = []
    for circuito in circuitos:
        score = calcular_score_circuito(circuito, clima, ubicacion_usuario, modo_transporte)
        resultados.append({
            "circuito": circuito,
            "score": score,
            "clima": clima["condicion"],
        })

    resultados.sort(key=lambda r: r["score"], reverse=True)
    return resultados
