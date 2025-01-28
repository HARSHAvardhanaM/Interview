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
    course: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Opportunity",  // Fixed typo here
    }
});

module.exports.Schedule = mongoose.model("Schedule", scheduleSchema);
