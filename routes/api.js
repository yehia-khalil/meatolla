const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const productsRoutes = require("./products");
const categoriesRoutes = require("./categories");
const ordersRoutes = require("./orders");
const areasRoutes = require("./areas");
const cartsRoutes = require("./carts");
const {
    authenticated: Authenticated
} = require("../middlewares/Auth")


//Routing Modules

//auth routing module
router.use("/auth", authRoutes);
router.use("/products", Authenticated, productsRoutes);
router.use("/categories", Authenticated, categoriesRoutes);
router.use("/orders", Authenticated, ordersRoutes);
router.use("/areas", Authenticated, areasRoutes);
router.use("/carts", Authenticated, cartsRoutes);

module.exports = router;