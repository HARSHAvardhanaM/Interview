const express = require("express")
const router = express.Router();

// const router = Router();
const {getOppertunities,uploadOppertunity,getOppertunity,showIntrest} = require("../controller/oppertunity.controller")

router.get("/:type", getOppertunities);
router.post("/",uploadOppertunity);
router.get("/single/:id",getOppertunity);
router.patch("/:id/:trainer",showIntrest);

module.exports = router