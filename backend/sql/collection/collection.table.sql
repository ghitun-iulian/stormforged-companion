CREATE TABLE IF NOT EXISTS collection (
    path TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    filetype TEXT NOT NULL
  )