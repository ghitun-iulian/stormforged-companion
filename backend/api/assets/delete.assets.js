function deleteAsset(db, res, id) {
  try {
    const stmt = db.prepare('DELETE FROM assets WHERE id = ?');
    const info = stmt.run(id);
    if (info.changes === 0) return res.status(404).json({ error: 'Asset not found' });
    return res.json({ deleted: true });
  } catch (err) {
    console.error("Error deleting asset:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = deleteAsset;