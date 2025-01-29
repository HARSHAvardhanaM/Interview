const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required : true
    }
});

module.exports = Schedule = mongoose.model("Schedule", scheduleSchema);
