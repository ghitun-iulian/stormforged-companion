const { v4: uuidv4 } = require("uuid");

function createAsset(db, req, res) {
  try {
    const { label, type, filetype, path, data } = req.body;
    const id = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO assets (id, label, type, filetype, path, data) 
      VALUES (?, ?, ?, ?, ?, ?)
      `);

    const info = stmt.run(
      id,
      label,
      type,
      filetype,
      path,
      JSON.stringify(data || {})
    );
    return res.json({ id });
  } catch (err) {
    console.error("Error creating asset:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = createAsset;
