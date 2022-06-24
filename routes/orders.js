const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController")
const ordersRequest = require('../requests/storeOrdersRequest');
const {
    checkRole
} = require("../middlewares/Auth");
const { ADMIN } = require("../models/User");

router.get("/", ordersController.index);
router.post("/", ordersRequest.schema, ordersController.store);



module.exports = router;
