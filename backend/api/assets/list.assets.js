function listAssets(db, res, req) {

  const { search, shape, type } = req.query;
  let sql = "SELECT * FROM assets "
  const conditions = []
  const params = {}

  if (search) {
    conditions.push("json_extract(metadata, '$.label') LIKE :search");
    params.search = `%${search}%`;
  }

  if (shape) {
    conditions.push("shape = :shape")
    params.shape = shape
  }

  if (type) {
    conditions.push("type = :type")
    params.type = type
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ")
  }

  const assets = db.prepare(sql).all(params);

  assets.forEach(a => {
    try {
      a.data = JSON.parse(a.data || {});
      a.metadata = JSON.parse(a.metadata || {});
    } catch {
      a.data = {};
      a.metadata = {};
    }
  });

  res.json(assets);
}

module.exports = listAssets;
