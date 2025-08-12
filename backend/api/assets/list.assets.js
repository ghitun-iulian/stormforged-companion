function listAssets(db, res) {
  const assets = db.prepare("SELECT * FROM assets").all();
  assets.forEach((a) => {
    try {
      a.data = JSON.parse(a.data);
    } catch {
      a.data = {};
    }
  });

  res.json(assets);
}

module.exports = listAssets;
