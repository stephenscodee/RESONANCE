CREATE TABLE IF NOT EXISTS songs (
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    artist VARCHAR NOT NULL,
    audio_features JSONB,
    vector JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_songs_title_artist ON songs (title, artist);
