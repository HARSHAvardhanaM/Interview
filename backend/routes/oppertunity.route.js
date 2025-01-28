const express = require("express")
const router = express.Router();

// const router = Router();
const {getOppertunities,uploadOppertunity} = require("../controller/oppertunity.controller")

router.get("/", getOppertunities);
router.post("/",uploadOppertunity)

module.exports = router