function listCollection(db, res) {
  const assets = db.prepare("SELECT * FROM collection").all();
  res.json(assets);
}

module.exports = listCollection;
