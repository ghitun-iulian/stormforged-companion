function getAsset(db, res, id) {
  const assets = db.prepare('SELECT * FROM assets WHERE id = ?').all(id);

  assets.forEach(a => {
    try {
      a.data = JSON.parse(a.data);
      a.metadata = JSON.parse(a.metadata);
    } catch {
      a.data = {};
      a.metadata = {};
    }
  });

  res.json(assets[0]);
}

module.exports = getAsset;