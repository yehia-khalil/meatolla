const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartController")
const {
    checkRole
} = require("../middlewares/Auth");
const { ADMIN } = require("../models/User");

router.get("/", cartsController.index);



module.exports = router;
