from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.song import router as song_router
from models.db import init_db

app = FastAPI(
    title="SIMILI API",
    description="Intelligent Music Recommendation System",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database
@app.on_event("startup")
def on_startup():
    try:
        init_db()
    except Exception as e:
        print(f"DB Initialization skipped or failed: {e}")

# Include Routers
app.include_router(song_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to SIMILI API", "status": "online"}
