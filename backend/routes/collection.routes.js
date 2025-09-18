const express = require("express");
const listCollections = require("../api/collection/list.collection");

function createCollectionRouter(db) {
  const router = express.Router();
  router.get("/", (req, res) => {
    return listCollections(db, res, req);
  });

  return router;
}

module.exports = createCollectionRouter;
