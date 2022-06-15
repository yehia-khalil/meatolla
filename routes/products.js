const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const productRequest = require("../requests/productRequest");
const multer = require("multer");
const path = require("path");
const {
  checkRole
} = require("../middlewares/Auth");
const { ADMIN } = require("../models/User");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
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
router.get("/:id", productsController.show);

router.post("/", upload.single("productImage"), checkRole(ADMIN), productRequest.schema, productsController.store);
router.put("/:id", upload.single("productImage"), checkRole(ADMIN), productRequest.schema, productsController.update);
router.delete("/:id", productsController.destroy);

module.exports = router;