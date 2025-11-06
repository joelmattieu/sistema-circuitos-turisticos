from typing import Annotated
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from fastapi import Depends
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/circuitos-turisticos"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def create_tables():
  Base.metadata.create_all(bind=engine)
  
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]