from typing import List, Optional
from models.circuito import CircuitoModel
from services.clima_service import obtener_clima
import math


def calcular_distancia(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calcula la distancia en kilómetros entre dos puntos GPS usando Haversine.
    """
    R = 6371  # Radio de la Tierra en km
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c


def criterio_ordenamiento_circuitos(item: dict) -> tuple:
    score = item["score"]
    nombre = item["circuito"].nombre.lower()
    return (-score, nombre)


def calcular_score_circuito(
    circuito: CircuitoModel,
    clima: dict,
    ubicacion_usuario: Optional[dict],
    modo_transporte: Optional[str]
) -> float:
    """
    Calcula un puntaje de recomendación (0-100) basado en:
    - Clima (30 pts): circuitos techados en lluvia, aire libre en sol
    - Distancia (20 pts): cercanía al usuario (< 5km)
    - Transporte (15 pts): compatibilidad con modo preferido
    - Popularidad (10 pts): cantidad de visitas
    """
    score = 0.0
    
    # Clima (30 pts)
    condicion = clima.get("condicion", "soleado")
    
    if condicion == "lluvioso":
        # Priorizar circuitos cortos o con tramos techados
        if circuito.duracion_estimada_minutos and circuito.duracion_estimada_minutos <= 120:  # <= 2 horas
            score += 20
        # TODO: Cuando agregues campo "tiene_tramos_techados" en el modelo
        # if circuito.tiene_tramos_techados:
        #     score += 10
        else:
            score += 10  # Puntaje parcial por ser corto
    
    elif condicion == "soleado":
        # Priorizar circuitos al aire libre o más largos
        if circuito.duracion_estimada_minutos and circuito.duracion_estimada_minutos > 120:
            score += 30
        else:
            score += 20  # Circuitos cortos también válidos en buen clima
    
    else:  # nublado u otro
        score += 15  # Puntaje neutral
    
    # Ubicación (20 pts)
    if ubicacion_usuario and circuito.puntos_interes:
        primer_poi = circuito.puntos_interes[0]
        distancia_km = calcular_distancia(
            ubicacion_usuario["lat"],
            ubicacion_usuario["lon"],
            primer_poi.latitud,
            primer_poi.longitud
        )
        
        if distancia_km < 1:
            score += 20  # Muy cerca
        elif distancia_km < 5:
            score += 15  # Cerca
        elif distancia_km < 10:
            score += 10  # Distancia moderada
        elif distancia_km < 20:
            score += 5   # Algo lejos
        # > 20km: 0 puntos
    
    # Transporte (15 pts)
    if modo_transporte and circuito.modo_transporte:
        modo_circuito = circuito.modo_transporte.nombre_modo_transporte.strip().lower()
        modo_usuario = modo_transporte.strip().lower()

        if modo_usuario == modo_circuito:
            score += 15 
        elif modo_usuario == "bicicleta" and modo_circuito == "a pie":
            score += 10
    elif modo_transporte:
        score += 7.5
    
    # Popularidad (10 pts)
    if circuito.veces_finalizado >= 20:
        score += 10
    elif circuito.veces_finalizado >= 10:
        score += 7
    elif circuito.veces_finalizado >= 5:
        score += 5
    else:
        score += 2
    
    
    return round(score, 2)

def obtener_circuitos_recomendados(
    circuitos: List[CircuitoModel],
    ubicacion_usuario: Optional[dict] = None,
    modo_transporte: Optional[str] = None
) -> List[dict]:
    """
    Ordena circuitos por recomendación según clima, ubicación y preferencias.
    """
    if ubicacion_usuario:
        clima = obtener_clima(ubicacion_usuario["lat"], ubicacion_usuario["lon"])
    else:
        # Coordenadas de Córdoba, Argentina por defecto
        clima = obtener_clima(-31.4201, -64.1888)
    
    circuitos_con_score = []
    for circuito in circuitos:
        score = calcular_score_circuito(
            circuito,
            clima,
            ubicacion_usuario,
            modo_transporte
        )
        
        circuitos_con_score.append({
            "circuito": circuito,
            "score": score,
            "clima": clima["condicion"]
        })
    
    # Ordenar por score (mayor a menor), empates por nombre alfabético
    circuitos_con_score.sort(key=criterio_ordenamiento_circuitos)
    
    return circuitos_con_score
