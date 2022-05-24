const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const productsRoutes = require("./products");
const categoriesRoutes = require("./categories");

router.get("/asd", (req, res) => {
    res.send("H")
});


//Routing Modules

//auth routing module
router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);

module.exports = router;