const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")

router.get("/");
router.post("/login", authController.login);
router.post("/register");



module.exports = router;