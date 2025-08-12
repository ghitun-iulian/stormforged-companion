function getAsset(db,res, id) {
    const assets = db.prepare('SELECT * FROM assets WHERE id = ?').all(id);
    assets.forEach(a => {
      try {
        a.data = JSON.parse(a.data);
      } catch {
        a.data = {};
      }
    });

    res.json(assets);
}

module.exports = getAsset;