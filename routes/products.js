const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const productRequest = require("../requests/productRequest");

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
});


router.get("/", productsController.index);
router.post("/", upload.fields([{name:'productImage'}]), [productRequest.name, productRequest.image], productsController.store);

module.exports = router;