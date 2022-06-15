const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController")
const categoriesRequest = require('../requests/categoriesRequest');
const {
    checkRole
} = require("../middlewares/Auth");
const { ADMIN } = require("../models/User");

router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);
router.post("/", checkRole(ADMIN), categoriesRequest.schema, categoriesController.store);
router.put("/:id", checkRole(ADMIN), categoriesRequest.schema, categoriesController.update);
router.delete("/:id", checkRole(ADMIN), categoriesController.destroy)

module.exports = router;