app.delete('/api/assets/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM assets WHERE id = ?');
  const info = stmt.run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Asset not found' });
  res.json({ deleted: true });
});
