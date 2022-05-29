const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const productRequest = require("../requests/productRequest");
const multer = require("multer");
const path = require("path");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extName) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});


router.get("/", productsController.index);

router.post("/", upload.fields([{
  name: 'productImage'
}]), [productRequest.name,
  productRequest.category,
  productRequest.image,
  productRequest.price,
  productRequest.quantity
], productsController.store);

module.exports = router;