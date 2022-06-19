const express = require("express");
const router = express.Router();
const areaController = require("../controllers/areaController")
const storeAreaRequest = require("../requests/storeAreaRequest");

router.get("/", areaController.index);
router.post("/", storeAreaRequest.schema, areaController.store);
router.put("/:id", storeAreaRequest.schema, areaController.update);
router.delete("/:id", areaController.destroy);



module.exports = router;