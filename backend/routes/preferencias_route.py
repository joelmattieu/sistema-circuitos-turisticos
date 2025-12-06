from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from services.cruds.crud_preferencias import (
    get_preferencia_by_usuario,
    create_preferencia,
    update_preferencia,
    delete_preferencia,
)
from schemas.preferencia_schema import (
    PreferenciaUsuario,
    PreferenciaUsuarioCreate,
)

route_preferencias = APIRouter(prefix="/preferencias", tags=["Preferencias"])

@route_preferencias.get("/{usuario_id}", response_model=PreferenciaUsuario)
def get_preferencia(usuario_id: int, db: Session = Depends(get_db)):
    preferencia = get_preferencia_by_usuario(db, usuario_id)
    if not preferencia:
        raise HTTPException(status_code=404, detail="Preferencia no encontrada para este usuario")
    return preferencia

@route_preferencias.post("", response_model=PreferenciaUsuario)
def create_or_update_preferencia(
    preferencia_data: PreferenciaUsuarioCreate, db: Session = Depends(get_db)
):
    return create_preferencia(db, preferencia_data)

@route_preferencias.put("/{preferencia_id}", response_model=PreferenciaUsuario)
def update_preferencia_route(
    preferencia_id: int,
    preferencia_data: PreferenciaUsuario,
    db: Session = Depends(get_db),
):
    return update_preferencia(db, preferencia_id, preferencia_data)

@route_preferencias.delete("/{preferencia_id}")
def delete_preferencia_route(preferencia_id: int, db: Session = Depends(get_db)):
    delete_preferencia(db, preferencia_id)
    return {"message": "Preferencia eliminada correctamente"}