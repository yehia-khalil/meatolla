const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");

router.get("/asd",(req,res)=>{
    res.send("H")
});
router.use("/auth",authRoutes);


module.exports= router;