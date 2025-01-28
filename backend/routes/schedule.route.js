const express = require("express")
const router = express.Router();

// const router = Router();
const {uploadSchedule} = require("../controller/schedule.controller")

router.post("/",uploadSchedule)

module.exports = router