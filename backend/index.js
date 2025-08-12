const express = require("express");
const cors = require("cors");
const path = require("path");
const createAssetsRouter = require("./routes/assets.routes");
const createCollectionRouter = require("./routes/collection.routes");
const initDatabase = require("./db");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const resetDb = process.argv.includes("--reset-db");

const db = initDatabase(resetDb);

app.use("/assets", express.static(path.join(__dirname, "../src/assets")));
app.use("/api/assets", createAssetsRouter(db));
app.use("/api/collection", createCollectionRouter(db));

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
