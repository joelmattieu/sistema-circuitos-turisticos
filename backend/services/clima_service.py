import requests
import os
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

def obtener_clima(lat: float, lon: float):
    """
    Obtiene el clima actual. Retorna condicion, temperatura y descripcion.
    """
    if not OPENWEATHER_API_KEY:
        # Fallback si no hay API key configurada
        return {
            "condicion": "soleado",
            "temperatura": 25.0,
            "descripcion": "Clima no disponible"
        }
    
    try:
        params = {
            "lat": lat,
            "lon": lon,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric",
            "lang": "es"
        }
        
        response = requests.get(OPENWEATHER_URL, params=params, timeout=5)
        response.raise_for_status()
        
        data = response.json()
        weather_id = data["weather"][0]["id"]
        
        # https://openweathermap.org/weather-conditions
        if 200 <= weather_id < 600:  # Lluvia, tormenta, llovizna
            condicion = "lluvioso"
        elif 800 <= weather_id < 900:  # Despejado o parcialmente nublado
            condicion = "soleado"
        else:
            condicion = "nublado"
        
        return {
            "condicion": condicion,
            "temperatura": data["main"]["temp"],
            "descripcion": data["weather"][0]["description"]
        }
    
    except Exception as e:
        print(f"Error obteniendo clima: {e}")
        # Fallback en caso de error
        return {
            "condicion": "soleado",
            "temperatura": 25.0,
            "descripcion": "Clima no disponible"
        }
