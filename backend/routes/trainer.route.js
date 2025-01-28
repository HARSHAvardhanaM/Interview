const express = require("express")
const router = express.Router();

// const router = Router();
const {createTrainer , getTrainerById, getTrainers,deleteTrainer,editTrainer} = require("../controller/trainer.controller")

router.get("/", getTrainers);
router.get("/:id", getTrainerById);
router.post("/",createTrainer);
router.delete("/:id", deleteTrainer);
router.patch("/:id",editTrainer)

module.exports = router
