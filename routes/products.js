const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController")

router.get("/",productsController.index);
router.post("/",productsController.store);

module.exports = router;