CREATE TABLE IF NOT EXISTS assets (
    id TEXT PRIMARY KEY,
    shape TEXT NOT NULL,
    type TEXT NOT NULL,
    metadata TEXT,
    data TEXT
  );