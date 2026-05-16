from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models.usuario import UsuarioModel
from services.auth.dependencies import obtener_usuario_actual
from services.cruds.crud_preferencias import (
    get_preferencia_by_usuario,
    get_preferencia_by_id,
    create_preferencia,
    update_preferencia,
    delete_preferencia,
)
from schemas.preferencia_schema import (
    PreferenciaUsuario,
    PreferenciaUsuarioCreate,
)

route_preferencias = APIRouter(prefix="/preferencias", tags=["Preferencias"])


@route_preferencias.get("/me", response_model=PreferenciaUsuario)
def get_preferencia(
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    preferencia = get_preferencia_by_usuario(db, usuario_actual.usuario_id)
    if not preferencia:
        raise HTTPException(status_code=404, detail="Preferencia no encontrada para este usuario")
    return preferencia


@route_preferencias.post("", response_model=PreferenciaUsuario)
def create_or_update_preferencia(
    preferencia_data: PreferenciaUsuarioCreate,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    # No confiamos en el usuario_id del body: forzamos el del token firmado
    preferencia_data.usuario_id = usuario_actual.usuario_id
    return create_preferencia(db, preferencia_data)


@route_preferencias.put("/{preferencia_id}", response_model=PreferenciaUsuario)
def update_preferencia_route(
    preferencia_id: int,
    preferencia_data: PreferenciaUsuario,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    preferencia_existente = get_preferencia_by_id(db, preferencia_id)
    if not preferencia_existente:
        raise HTTPException(status_code=404, detail="Preferencia no encontrada")
    if preferencia_existente.usuario_id != usuario_actual.usuario_id:
        raise HTTPException(status_code=403, detail="No autorizado")
    preferencia_data.usuario_id = usuario_actual.usuario_id
    return update_preferencia(db, preferencia_id, preferencia_data)


@route_preferencias.delete("/{preferencia_id}")
def delete_preferencia_route(
    preferencia_id: int,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual),
):
    preferencia_existente = get_preferencia_by_id(db, preferencia_id)
    if not preferencia_existente:
        raise HTTPException(status_code=404, detail="Preferencia no encontrada")
    if preferencia_existente.usuario_id != usuario_actual.usuario_id:
        raise HTTPException(status_code=403, detail="No autorizado")
    delete_preferencia(db, preferencia_id)
    return {"message": "Preferencia eliminada correctamente"}
