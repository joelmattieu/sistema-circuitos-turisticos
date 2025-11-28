from fastapi import FastAPI
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from db import create_tables, get_db, Base
from routes.auth_route import route_auth
from routes.provincias_route import router as route_provincias
from services.load_data import load_data

app = FastAPI()

##      CORS         
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

create_tables()

# Cargar datos en las tablas 
@app.on_event("startup")
def startup_event():
  db: Session = next(get_db())
  load_data(db)
  
app.include_router(route_auth)
app.include_router(route_provincias)