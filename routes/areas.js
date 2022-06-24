const express = require("express");
const router = express.Router();
const areaController = require("../controllers/areaController");
const { checkRole } = require("../middlewares/Auth");
const { ADMIN } = require("../models/User");
const storeAreaRequest = require("../requests/storeAreaRequest");

router.get("/", areaController.index);
router.post("/", storeAreaRequest.schema, checkRole(ADMIN), areaController.store);
router.put("/:id", storeAreaRequest.schema, checkRole(ADMIN), areaController.update);
router.delete("/:id", checkRole(ADMIN), areaController.destroy);



module.exports = router;