const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController")
const categoriesRequest = require('../requests/categoriesRequest');

router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);
router.post("/", categoriesRequest.schema, categoriesController.store);
router.put("/:id", categoriesRequest.schema, categoriesController.update);
router.delete("/:id", categoriesController.destroy)

module.exports = router;