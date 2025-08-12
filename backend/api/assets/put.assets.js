function updateAsset(db, res, id, asset) {
    const { label, type, filetype, path, data } = asset;
    const stmt = db.prepare('UPDATE assets SET label = ?, type = ?, filetype = ?, path = ?, data = ? WHERE id = ?');
    const info = stmt.run(label, type, filetype, path, JSON.stringify(data || {}), id);
    if (info.changes === 0) return res.status(404).json({ error: 'Asset not found' });
    res.json({ updated: true });
}

module.exports = updateAsset;
