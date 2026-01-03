import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

class MusicML:
    def __init__(self):
        # In a real app, this would load a pre-trained model or a large vector DB
        pass

    def vectorize_features(self, features: Dict) -> np.ndarray:
        """
        Converts Spotify audio features into a normalized vector.
        Features usually include: danceability, energy, loudness, speechiness, 
        acousticness, instrumentalness, liveness, valence, tempo.
        """
        vector = [
            features.get('danceability', 0),
            features.get('energy', 0),
            features.get('loudness', 0) / -60,  # Normalize loudness
            features.get('speechiness', 0),
            features.get('acousticness', 0),
            features.get('instrumentalness', 0),
            features.get('liveness', 0),
            features.get('valence', 0),
            features.get('tempo', 120) / 200    # Normalize tempo
        ]
        return np.array(vector).reshape(1, -1)

    def calculate_similarity(self, target_vector: np.ndarray, candidate_vectors: List[np.ndarray]) -> List[float]:
        """Calculates cosine similarity between target and candidates."""
        if not candidate_vectors:
            return []
        
        candidates = np.vstack(candidate_vectors)
        similarities = cosine_similarity(target_vector, candidates)
        return similarities[0].tolist()

music_ml = MusicML()
