const express = require("express")
const router = express.Router();

// const router = Router();
const {uploadSchedule,getScheduleOfTrainer,getSchedules} = require("../controller/schedule.controller")

router.post("/",uploadSchedule);
router.get("/",getSchedules)
router.get("/:id",getScheduleOfTrainer)

module.exports = router