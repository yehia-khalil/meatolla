const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const productsRoutes = require("./products");

router.get("/asd", (req, res) => {
    res.send("H")
});


//Routing Modules

//auth routing module
router.use("/auth", authRoutes);
router.use("/products", productsRoutes);

module.exports = router;