const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
    fieldType: {
        type: String,
        enum: ["technical", "soft skills", "leadership"],
    },
    course: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    schedules: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Schedule"
    },
    interested: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Trainer"
    }
});

module.exports = Opportunity = mongoose.model("Opportunity", opportunitySchema);
