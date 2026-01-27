from sqlalchemy.orm import Session
from models.recorrido_usuario import RecorridoUsuarioModel
from models.visita_usuario import VisitaUsuarioModel
from models.circuito import CircuitoModel
from typing import Dict

def calcular_progreso_circuito(db: Session, usuario_id: int, circuito_id: int) -> float:
    """
    Calcula el porcentaje de progreso de un usuario en un circuito.
    Retorna un valor entre 0 y 100.
    """
    circuito = db.query(CircuitoModel).filter(
        CircuitoModel.circuito_id == circuito_id
    ).first()
    
    if not circuito or not circuito.puntos_interes:
        return 0.0
    
    total_pois = len(circuito.puntos_interes)
    
    recorrido = db.query(RecorridoUsuarioModel).filter(
        RecorridoUsuarioModel.usuario_id == usuario_id,
        RecorridoUsuarioModel.circuito_id == circuito_id
    ).first()
    
    if not recorrido:
        return 0.0
    
    visitas = db.query(VisitaUsuarioModel).filter(
        VisitaUsuarioModel.recorrido_id == recorrido.recorrido_id
    ).count()
    
    porcentaje = (visitas / total_pois) * 100 if total_pois > 0 else 0
    return round(porcentaje, 1)


def obtener_progresos_usuario(db: Session, usuario_id: int) -> Dict[int, float]:
    """
    Obtiene todos los progresos del usuario en todos los circuitos.
    Retorna un diccionario {circuito_id: porcentaje}
    """
    progresos = {}
    
    recorridos = db.query(RecorridoUsuarioModel).filter(
        RecorridoUsuarioModel.usuario_id == usuario_id
    ).all()
    
    for recorrido in recorridos:
        progreso = calcular_progreso_circuito(db, usuario_id, recorrido.circuito_id)
        progresos[recorrido.circuito_id] = progreso
    
    return progresos
