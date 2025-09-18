function listCollection(db, res, req) {

  const { search, type } = req.query;

  let sql = "SELECT * FROM collection "
  const conditions = []
  const params = {}

  if (search) {
    conditions.push("label LIKE :search");
    params.search = `%${search}%`;
  }

  if (type) {
    conditions.push("type = :type")
    params.type = type
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const collections = db.prepare(sql).all(params);
  res.json(collections);
}

module.exports = listCollection;
