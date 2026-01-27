from sqlalchemy.orm import Session, joinedload
from models.circuito import CircuitoModel
from models.categoria_circuito import CategoriaCircuitoModel
from models.preferencia_usuario import PreferenciaUsuarioModel
from models.unidad_medicion import UnidadMedicionModel
from schemas.circuito_schema import CircuitoCreate, CircuitoUpdate, CircuitoResponse
from services.progreso_service import obtener_progresos_usuario
from fastapi import HTTPException

def calcular_distancia_con_preferencias(distancia_metros: float, unidad_id: int) -> tuple:
    """
    Calcula la distancia formateada según la unidad de medición del usuario.
    Retorna (distancia_formateada, nombre_unidad)
    """
    if unidad_id == 2: 
        distancia_millas = (distancia_metros / 1000) * 0.621371
        return f"{distancia_millas:.1f}", "mi"
    else: 
        distancia_km = distancia_metros / 1000
        return f"{distancia_km:.1f}", "km"

def get_circuitos_raw(db: Session, skip: int = 0, limit: int = 100):
    """
    Obtiene circuitos como objetos del modelo sin procesar.
    Útil para servicios internos como el de recomendaciones.
    """
    return db.query(CircuitoModel).options(
        joinedload(CircuitoModel.categoria),
        joinedload(CircuitoModel.puntos_interes)
    ).offset(skip).limit(limit).all()

def create_circuito(db: Session, circuito: CircuitoCreate):
    categoria = db.query(CategoriaCircuitoModel).filter(
        CategoriaCircuitoModel.categoria_id == circuito.categoria_id
    ).first()
    
    if not categoria:
        raise HTTPException(status_code=400, detail="La categoría no existe")
    
    db_circuito = CircuitoModel(**circuito.dict())
    db.add(db_circuito)
    db.commit()
    db.refresh(db_circuito)
    return db_circuito

def get_circuitos(db: Session, skip: int = 0, limit: int = 100, usuario_id: int = None):
    circuitos = db.query(CircuitoModel).options(
        joinedload(CircuitoModel.categoria),
        joinedload(CircuitoModel.puntos_interes)
    ).offset(skip).limit(limit).all()
    
    progresos = {}
    if usuario_id:
        progresos = obtener_progresos_usuario(db, usuario_id)
    
    preferencias = None
    if usuario_id:
        preferencias = db.query(PreferenciaUsuarioModel).filter(
            PreferenciaUsuarioModel.usuario_id == usuario_id
        ).first()
    
    circuitos_response = []
    for circuito in circuitos:
        circuito_dict = CircuitoResponse.from_orm(circuito).dict()
        
        if preferencias:
            distancia_fmt, unidad = calcular_distancia_con_preferencias(
                circuito.distancia_total_metros,
                preferencias.unidad_medicion_id
            )
            circuito_dict['distancia_formateada'] = distancia_fmt
            circuito_dict['unidad_medicion'] = unidad
        
        circuito_dict['progreso_porcentaje'] = progresos.get(circuito.circuito_id, 0.0)
        
        # Mantener categoría como objeto para compatibilidad con frontend
        if circuito.categoria:
            circuito_dict['categoria'] = {
                'nombre_categoria': circuito.categoria.nombre_categoria
            }
        
        circuitos_response.append(circuito_dict)
    
    return circuitos_response

def get_circuito(db: Session, circuito_id: int, usuario_id: int = None):
    circuito = db.query(CircuitoModel).options(
        joinedload(CircuitoModel.categoria),
        joinedload(CircuitoModel.puntos_interes)
    ).filter(CircuitoModel.circuito_id == circuito_id).first()
    
    if not circuito:
        raise HTTPException(status_code=404, detail="Circuito no encontrado")
    
    if usuario_id:
        preferencias = db.query(PreferenciaUsuarioModel).filter(
            PreferenciaUsuarioModel.usuario_id == usuario_id
        ).first()
        
        if preferencias:
            circuito_dict = CircuitoResponse.from_orm(circuito).dict()
            distancia_fmt, unidad = calcular_distancia_con_preferencias(
                circuito.distancia_total_metros,
                preferencias.unidad_medicion_id
            )
            circuito_dict['distancia_formateada'] = distancia_fmt
            circuito_dict['unidad_medicion'] = unidad
            return CircuitoResponse(**circuito_dict)
    
    return circuito

def update_circuito(db: Session, circuito_id: int, circuito_update: CircuitoUpdate):
    db_circuito = get_circuito(db, circuito_id)
    
    update_data = circuito_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_circuito, field, value)
    
    db.commit()
    db.refresh(db_circuito)
    return db_circuito

def delete_circuito(db: Session, circuito_id: int):
    db_circuito = get_circuito(db, circuito_id)
    db.delete(db_circuito)
    db.commit()

def incrementar_veces_finalizado(db: Session, circuito_id: int):
    db_circuito = get_circuito(db, circuito_id)
    db_circuito.veces_finalizado += 1
    db.commit()
    db.refresh(db_circuito)
    return db_circuito