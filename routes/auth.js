const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const registerUserRequest = require("../requests/registerUserRequest");

router.post("/login", authController.login);
router.post("/register", registerUserRequest.schema, authController.register);



module.exports = router;