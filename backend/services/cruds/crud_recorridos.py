from sqlalchemy.orm import Session
from models.recorrido_usuario import RecorridoUsuarioModel
from models.visita_usuario import VisitaUsuarioModel
from models.circuito import CircuitoModel
from datetime import datetime
from fastapi import HTTPException

def iniciar_recorrido(db: Session, usuario_id: int, circuito_id: int):
    """
    Inicia un nuevo recorrido para un usuario en un circuito.
    Si ya existe un recorrido activo, lo retorna.
    """
    # Verificar si ya existe un recorrido activo
    recorrido_existente = db.query(RecorridoUsuarioModel).filter(
        RecorridoUsuarioModel.usuario_id == usuario_id,
        RecorridoUsuarioModel.circuito_id == circuito_id,
        RecorridoUsuarioModel.estado.in_(["en_progreso", "iniciado"])
    ).first()
    
    if recorrido_existente:
        return recorrido_existente
    
    # Crear nuevo recorrido
    nuevo_recorrido = RecorridoUsuarioModel(
        usuario_id=usuario_id,
        circuito_id=circuito_id,
        estado="en_progreso",
        fecha_inicio=datetime.now(),
        avance_porcentaje=0.0
    )
    
    db.add(nuevo_recorrido)
    db.commit()
    db.refresh(nuevo_recorrido)
    return nuevo_recorrido


def registrar_visita(db: Session, usuario_id: int, circuito_id: int, poi_id: int):
    """
    Registra la visita de un usuario a un punto de interés.
    Crea el recorrido si no existe.
    """
    # Obtener o crear recorrido
    recorrido = iniciar_recorrido(db, usuario_id, circuito_id)
    
    # Verificar si ya visitó este POI
    visita_existente = db.query(VisitaUsuarioModel).filter(
        VisitaUsuarioModel.recorrido_id == recorrido.recorrido_id,
        VisitaUsuarioModel.poi_id == poi_id
    ).first()
    
    if visita_existente:
        # Retornar con el progreso actual del recorrido
        return {
            "message": "POI ya visitado",
            "visitado": True,
            "progreso": recorrido.avance_porcentaje or 0.0
        }
    
    # Contar cuántas visitas tiene en este recorrido
    orden_visita = db.query(VisitaUsuarioModel).filter(
        VisitaUsuarioModel.recorrido_id == recorrido.recorrido_id
    ).count() + 1
    
    # Registrar nueva visita
    nueva_visita = VisitaUsuarioModel(
        recorrido_id=recorrido.recorrido_id,
        poi_id=poi_id,
        orden_visita=orden_visita,
        fecha_visita=datetime.now()
    )
    
    db.add(nueva_visita)
    
    # Actualizar progreso del recorrido
    circuito = db.query(CircuitoModel).filter(
        CircuitoModel.circuito_id == circuito_id
    ).first()
    
    if circuito:
        total_pois = len(circuito.puntos_interes)
        if total_pois > 0:
            nuevo_progreso = (orden_visita / total_pois) * 100
            recorrido.avance_porcentaje = nuevo_progreso
            
            # Si completó todos los POIs, marcar como completado
            if orden_visita >= total_pois:
                recorrido.estado = "completado"
                recorrido.fecha_fin = datetime.now()
    
    db.commit()
    db.refresh(recorrido)
    
    return {
        "message": "Visita registrada exitosamente",
        "visitado": True,
        "progreso": recorrido.avance_porcentaje,
        "pois_visitados": orden_visita,
        "total_pois": total_pois if circuito else 0
    }


def obtener_recorrido_usuario(db: Session, usuario_id: int, circuito_id: int):
    """
    Obtiene el recorrido activo de un usuario en un circuito.
    """
    recorrido = db.query(RecorridoUsuarioModel).filter(
        RecorridoUsuarioModel.usuario_id == usuario_id,
        RecorridoUsuarioModel.circuito_id == circuito_id
    ).first()
    
    return recorrido


def obtener_pois_visitados(db: Session, usuario_id: int, circuito_id: int):
    """
    Obtiene la lista de POI IDs que el usuario ya visitó en un circuito.
    """
    recorrido = obtener_recorrido_usuario(db, usuario_id, circuito_id)
    
    if not recorrido:
        return []
    
    visitas = db.query(VisitaUsuarioModel).filter(
        VisitaUsuarioModel.recorrido_id == recorrido.recorrido_id
    ).all()
    
    return [visita.poi_id for visita in visitas]
