from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import random

# Mock Data for initial testing
MOCK_SONGS = [
    {"id": "1", "title": "Midnight City", "artist": "M83", "features": {"energy": 0.8, "tempo": 125, "valence": 0.7}},
    {"id": "2", "title": "Starboy", "artist": "The Weeknd", "features": {"energy": 0.6, "tempo": 186, "valence": 0.5}},
    {"id": "3", "title": "Nightcall", "artist": "Kavinsky", "features": {"energy": 0.4, "tempo": 91, "valence": 0.3}},
    {"id": "4", "title": "Blinding Lights", "artist": "The Weeknd", "features": {"energy": 0.7, "tempo": 171, "valence": 0.6}},
    {"id": "5", "title": "Instant Crush", "artist": "Daft Punk", "features": {"energy": 0.6, "tempo": 110, "valence": 0.5}},
]

router = APIRouter()

class SearchQuery(BaseModel):
    query: str

class SongResponse(BaseModel):
    id: str
    title: str
    artist: str
    similarity: Optional[float] = None
    features: Dict[str, float]

@router.get("/search", response_model=List[SongResponse])
def search_songs(q: str):
    # Mock search logic
    results = [s for s in MOCK_SONGS if q.lower() in s['title'].lower() or q.lower() in s['artist'].lower()]
    return results

@router.get("/recommendations/{song_id}", response_model=List[SongResponse])
def get_recommendations(song_id: str):
    target = next((s for s in MOCK_SONGS if s['id'] == song_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Song not found")
    
    # Simple mock recommendation logic based on random similarity for now
    recommendations = []
    for s in MOCK_SONGS:
        if s['id'] != song_id:
            similarity = random.uniform(0.7, 0.99)
            recommendations.append({**s, "similarity": round(similarity, 3)})
    
    return sorted(recommendations, key=lambda x: x['similarity'], reverse=True)
