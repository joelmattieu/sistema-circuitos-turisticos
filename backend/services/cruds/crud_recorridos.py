from sqlalchemy.orm import Session
from models.recorrido_usuario import RecorridoUsuarioModel
from models.visita_usuario import VisitaUsuarioModel
from models.circuito import CircuitoModel
from utils.enums import EstadoRecorridoEnum
from datetime import datetime
from fastapi import HTTPException

def iniciar_recorrido(db: Session, usuario_id: int, circuito_id: int):
    recorrido_existente = db.query(RecorridoUsuarioModel).filter(
        RecorridoUsuarioModel.usuario_id == usuario_id,
        RecorridoUsuarioModel.circuito_id == circuito_id,
        RecorridoUsuarioModel.estado == EstadoRecorridoEnum.EN_PROGRESO
    ).first()

    if recorrido_existente:
        return recorrido_existente

    nuevo_recorrido = RecorridoUsuarioModel(
        usuario_id=usuario_id,
        circuito_id=circuito_id,
        estado=EstadoRecorridoEnum.EN_PROGRESO,
        fecha_inicio=datetime.now(),
        avance_porcentaje=0.0
    )

    db.add(nuevo_recorrido)
    db.commit()
    db.refresh(nuevo_recorrido)
    return nuevo_recorrido


def registrar_visita(db: Session, usuario_id: int, circuito_id: int, poi_id: int):
    recorrido = iniciar_recorrido(db, usuario_id, circuito_id)

    visita_existente = db.query(VisitaUsuarioModel).filter(
        VisitaUsuarioModel.recorrido_id == recorrido.recorrido_id,
        VisitaUsuarioModel.poi_id == poi_id
    ).first()

    if visita_existente:
        return {
            "message": "POI ya visitado",
            "visitado": True,
            "progreso": recorrido.avance_porcentaje or 0.0
        }

    orden_visita = db.query(VisitaUsuarioModel).filter(
        VisitaUsuarioModel.recorrido_id == recorrido.recorrido_id
    ).count() + 1

    nueva_visita = VisitaUsuarioModel(
        recorrido_id=recorrido.recorrido_id,
        poi_id=poi_id,
        orden_visita=orden_visita,
        fecha_visita=datetime.now()
    )

    db.add(nueva_visita)

    circuito = db.query(CircuitoModel).filter(
        CircuitoModel.circuito_id == circuito_id
    ).first()

    total_pois = 0
    if circuito:
        total_pois = len(circuito.puntos_interes)
        if total_pois > 0:
            recorrido.avance_porcentaje = (orden_visita / total_pois) * 100
            if orden_visita >= total_pois:
                recorrido.estado = EstadoRecorridoEnum.COMPLETADO
                recorrido.fecha_fin = datetime.now()

    db.commit()
    db.refresh(recorrido)

    return {
        "message": "Visita registrada exitosamente",
        "visitado": True,
        "progreso": recorrido.avance_porcentaje,
        "pois_visitados": orden_visita,
        "total_pois": total_pois,
    }


def obtener_recorrido_usuario(db: Session, usuario_id: int, circuito_id: int):
    return db.query(RecorridoUsuarioModel).filter(
        RecorridoUsuarioModel.usuario_id == usuario_id,
        RecorridoUsuarioModel.circuito_id == circuito_id
    ).first()


def obtener_pois_visitados(db: Session, usuario_id: int, circuito_id: int):
    recorrido = obtener_recorrido_usuario(db, usuario_id, circuito_id)
    if not recorrido:
        return []

    visitas = db.query(VisitaUsuarioModel).filter(
        VisitaUsuarioModel.recorrido_id == recorrido.recorrido_id
    ).all()
    return [v.poi_id for v in visitas]
