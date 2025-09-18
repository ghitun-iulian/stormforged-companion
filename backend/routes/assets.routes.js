const express = require("express");
const listAssets = require("../api/assets/list.assets");
const getAsset = require("../api/assets/get.assets");
const createAsset = require("../api/assets/post.assets");
const updateAsset = require("../api/assets/put.assets");
const deleteAsset = require("../api/assets/delete.assets");

function createAssetsRouter(db) {
  const router = express.Router();

  router.get("/:id", (req, res) => {
    const { id } = req.params;
    return getAsset(db, res, id);
  });

  router.get("/", (req, res) => {
    return listAssets(db, res, req);
  });

  router.post("/", (req, res) => {
    return createAsset(db, req, res);
  });

  router.put("/:id", (req, res) => {
    const { id } = req.params;
    return updateAsset(db, res, req, id);
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    return deleteAsset(db, res, id);
  });

  return router;
}

module.exports = createAssetsRouter;
