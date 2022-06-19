const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const productsRoutes = require("./products");
const categoriesRoutes = require("./categories");
const areasRoutes = require("./areas");
const {
    authenticated: Authenticated
} = require("../middlewares/Auth")


//Routing Modules

//auth routing module
router.use("/auth", authRoutes);
router.use("/products", Authenticated, productsRoutes);
router.use("/categories", Authenticated, categoriesRoutes);
router.use("/areas", Authenticated, areasRoutes);

module.exports = router;