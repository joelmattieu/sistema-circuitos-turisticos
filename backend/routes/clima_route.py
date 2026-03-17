from fastapi import APIRouter, Query
from services.clima_service import obtener_clima

router = APIRouter(prefix="/api/clima", tags=["Clima"])

@router.get("/actual")
def obtener_clima_actual(
    lat: float = Query(-31.4201, description="Latitud"),
    lon: float = Query(-64.1888, description="Longitud")
):
    """
    Endpoint de prueba para verificar el servicio de clima.
    Por defecto usa coordenadas de Córdoba, Argentina.
    """
    clima = obtener_clima(lat, lon)
    
    return {
        "success": True,
        "ubicacion": {
            "latitud": lat,
            "longitud": lon
        },
        "clima": clima,
        "mensaje": "Datos reales de API" if clima["descripcion"] != "Clima no disponible" else "Usando fallback"
    }
