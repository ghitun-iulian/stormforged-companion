INSERT INTO assets (id, label, data) VALUES
    ('seed', 'Seed asset', '{"test":"seed"}')
ON CONFLICT (id) DO NOTHING;

