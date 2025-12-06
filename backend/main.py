from fastapi import FastAPI
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from db import create_tables, get_db
from services.load_data import load_data

# importación de rutas
from routes.auth_route import route_auth
from routes.paises_route import route_paises
from routes.provincias_route import route_provincias
from routes.idiomas_route import route_idiomas
from routes.modos_transporte_route import route_modos_transporte
from routes.unidad_medicion_route import route_unidades_medicion
from routes.circuitos_route import route_circuitos
from routes.preferencias_route import route_preferencias

app = FastAPI()

## CORS         
origins = [
    "http://localhost:3000",
    "http://192.168.1.135:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

create_tables()

# cargar datos en las tablas 
@app.on_event("startup")
def startup_event():
  db: Session = next(get_db())
  load_data(db)
  
app.include_router(route_auth)
app.include_router(route_paises)
app.include_router(route_provincias)
app.include_router(route_idiomas)
app.include_router(route_modos_transporte)
app.include_router(route_unidades_medicion)
app.include_router(route_circuitos)
app.include_router(route_preferencias)