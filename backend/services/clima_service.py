import requests
import os
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

CLIMA_FALLBACK = {
    "condicion": "soleado",
    "temperatura": 25.0,
    "descripcion": "Clima no disponible",
}


def _condicion_desde_id(weather_id):
    if 200 <= weather_id < 600:
        return "lluvioso"
    if weather_id == 800:
        return "soleado"
    return "nublado"


def obtener_clima(lat, lon):
    if not OPENWEATHER_API_KEY:
        return CLIMA_FALLBACK

    try:
        response = requests.get(
            OPENWEATHER_URL,
            params={
                "lat": lat,
                "lon": lon,
                "appid": OPENWEATHER_API_KEY,
                "units": "metric",
                "lang": "es",
            },
            timeout=5,
        )
        response.raise_for_status()
        data = response.json()
        return {
            "condicion": _condicion_desde_id(data["weather"][0]["id"]),
            "temperatura": data["main"]["temp"],
            "descripcion": data["weather"][0]["description"],
        }
    except Exception:
        return CLIMA_FALLBACK
