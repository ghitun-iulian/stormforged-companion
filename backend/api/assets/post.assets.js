const { v4: uuidv4 } = require("uuid");

function createAsset(db, req, res) {
  try {
    const { shape, type, metadata, data } = req.body;
    const id = uuidv4();

    const stmt = db.prepare(`
      INSERT INTO assets (id, shape, type, metadata, data) 
      VALUES (?, ?, ?, ?, ?)
      `);

    stmt.run(
      id,
      shape,
      type,
      JSON.stringify(metadata),
      JSON.stringify(data || {})
    );
    
    return res.json({ id });
  } catch (err) {
    console.error("Error creating asset:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = createAsset;
