from sqlalchemy.orm import Session, joinedload
from models.circuito import CircuitoModel
from models.categoria_circuito import CategoriaCircuitoModel
from models.preferencia_usuario import PreferenciaUsuarioModel
from schemas.circuito_schema import CircuitoCreate, CircuitoUpdate, CircuitoResponse
from services.progreso_service import obtener_progresos_usuario
from services.cruds.crud_recorridos import obtener_recorrido_usuario
from services.recomendaciones_service import calcular_distancia_km
from services.i18n import localizar_circuito
from fastapi import HTTPException

UNIDAD_MILLAS = 2
METROS_A_MILLAS = 0.621371


def calcular_distancia_con_preferencias(distancia_metros, unidad_id):
    if unidad_id == UNIDAD_MILLAS:
        return f"{(distancia_metros / 1000) * METROS_A_MILLAS:.1f}", "mi"
    return f"{distancia_metros / 1000:.1f}", "km"

def get_circuitos_raw(db: Session, skip: int = 0, limit: int = 100, idioma: str = "es"):
    circuitos = db.query(CircuitoModel).options(
        joinedload(CircuitoModel.categoria),
        joinedload(CircuitoModel.modo_transporte),
        joinedload(CircuitoModel.puntos_interes)
    ).offset(skip).limit(limit).all()
    for circuito in circuitos:
        localizar_circuito(circuito, idioma)
    return circuitos

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

def get_circuitos(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    usuario_id: int = None,
    lat: float = None,
    lon: float = None,
    ordenar_por_distancia: bool = False,
    idioma: str = "es",
):
    circuitos = db.query(CircuitoModel).options(
        joinedload(CircuitoModel.categoria),
        joinedload(CircuitoModel.puntos_interes)
    ).offset(skip).limit(limit).all()

    for circuito in circuitos:
        localizar_circuito(circuito, idioma)

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

        if lat is not None and lon is not None and circuito.puntos_interes:
            primer_poi = circuito.puntos_interes[0]
            circuito_dict['distancia_al_usuario_km'] = round(
                calcular_distancia_km(lat, lon, primer_poi.latitud, primer_poi.longitud),
                3
            )
        
        if circuito.categoria:
            circuito_dict['categoria'] = {
                'nombre_categoria': circuito.categoria.nombre_categoria
            }

        circuitos_response.append(circuito_dict)

    if ordenar_por_distancia and lat is not None and lon is not None:
        circuitos_response.sort(
            key=lambda c: c.get('distancia_al_usuario_km') or float('inf')
        )

    return circuitos_response

def get_circuito(db: Session, circuito_id: int, usuario_id: int = None, idioma: str = "es"):
    circuito = db.query(CircuitoModel).options(
        joinedload(CircuitoModel.categoria),
        joinedload(CircuitoModel.puntos_interes)
    ).filter(CircuitoModel.circuito_id == circuito_id).first()

    if not circuito:
        raise HTTPException(status_code=404, detail="Circuito no encontrado")

    localizar_circuito(circuito, idioma)

    if not usuario_id:
        return circuito

    circuito_dict = CircuitoResponse.from_orm(circuito).dict()

    progresos = obtener_progresos_usuario(db, usuario_id)
    circuito_dict['progreso_porcentaje'] = progresos.get(circuito_id, 0.0)

    recorrido = obtener_recorrido_usuario(db, usuario_id, circuito_id)
    circuito_dict['estado_recorrido'] = recorrido.estado.value if recorrido else None

    preferencias = db.query(PreferenciaUsuarioModel).filter(
        PreferenciaUsuarioModel.usuario_id == usuario_id
    ).first()
    if preferencias:
        distancia_fmt, unidad = calcular_distancia_con_preferencias(
            circuito.distancia_total_metros,
            preferencias.unidad_medicion_id
        )
        circuito_dict['distancia_formateada'] = distancia_fmt
        circuito_dict['unidad_medicion'] = unidad

    return CircuitoResponse(**circuito_dict)

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
