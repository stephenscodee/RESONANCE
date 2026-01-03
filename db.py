from sqlalchemy import create_engine, Column, String, Float, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/simili")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class SongModel(Base):
    __tablename__ = "songs"

    id = Column(String, primary_key=True, index=True)
    title = Column(String)
    artist = Column(String)
    audio_features = Column(JSON)  # Store Spotify features
    vector = Column(JSON)          # Store pre-calculated ML vector

def init_db():
    Base.metadata.create_all(bind=engine)
