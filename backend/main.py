from fastapi import FastAPI
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from db import create_tables, get_db
from routes.auth import route_auth

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

app.include_router(route_auth)

# Cargar datos en las tablas 
@app.on_event("startup")
def startup_event():
  db: Session = next(get_db())