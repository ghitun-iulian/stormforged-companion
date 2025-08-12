const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");
const chokidar = require("chokidar");

function initDatabase(resetDb) {
  const dbPath = path.join(__dirname, "db.sqlite");
  const assetsPath = path.join(__dirname, "../src/assets/game_assets");

  if (resetDb && fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log("Database reset: old file deleted.");
  }

  const db = new Database(dbPath);

  runSqlFiles(db, [
    path.join(__dirname, "sql", "collection", "collection.table.sql"),
    path.join(__dirname, "sql", "assets", "assets.table.sql"),
    path.join(__dirname, "sql", "assets", "assets.seed.sql"),
  ]);

  createCollectionSeed(db, assetsPath);
  watchGameAssets(db, assetsPath);

  return db;
}

function runSqlFiles(db, filePaths) {
  filePaths.forEach((filePath) => {
    const sql = fs.readFileSync(filePath, "utf8");
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    statements.forEach((stmt) => db.prepare(stmt).run());
  });
}

function watchGameAssets(db, assetsPath) {
  const watcher = chokidar.watch(assetsPath, {
    ignoreInitial: true,
  });

  watcher.on("add", () => createCollectionSeed(db, assetsPath));
  watcher.on("unlink", () => createCollectionSeed(db, assetsPath));
  watcher.on("change", () => createCollectionSeed(db, assetsPath));
}

function createCollectionSeed(db, assetsPath) {
  const folders = fs
    .readdirSync(assetsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());
  db.prepare("DELETE FROM collection").run();

  folders.forEach((folder) => {
    const folderPath = path.join(assetsPath, folder.name);
    const files = fs.readdirSync(folderPath);

    const collection = files
      .map((file) => {
        const filetype = path.extname(file).slice(1);
        const label = path.basename(file, "." + filetype);
        const filePath = path.posix.join(
          "assets",
          "game_assets",
          folder.name,
          file
        );
        return [filePath, label, folder.name, filetype];
      })
      .flat();

    const placeholders = collection.length / 4;
    // Remove all existing entries from collection before seeding

    const query =
      "INSERT INTO collection (path, label, type, filetype) VALUES " +
      new Array(placeholders).fill("(?, ?, ?, ?)").join(", ") +
      " ON CONFLICT(path) DO NOTHING";

    const stmt = db.prepare(query);
    stmt.run(collection);
  });
}

module.exports = initDatabase;
