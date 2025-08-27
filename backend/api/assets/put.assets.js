function updateAsset(db, res, req, id) {
    try {

        const { shape, type, metadata, data } = req.body;
        const stmt = db.prepare(`
        UPDATE assets 
        SET shape = ?, type = ?, metadata = ?, data = ?
        WHERE id = ?
        `);

        stmt.run(
            shape,
            type,
            JSON.stringify(metadata),
            JSON.stringify(data || {}),
            id
        );

        return res.json({ id });

    } catch (err) {
        console.error("Error putting asset:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = updateAsset;
