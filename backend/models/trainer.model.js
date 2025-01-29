const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const trainerSchema = new mongoose.Schema({
    trainerName: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    expertise: {
        type: [String],
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
});

// Hash password before saving (if needed, uncomment and use the password field)
// trainerSchema.pre("save", async function (next) {
//     if (this.isModified("password")) { // Ensure that you are hashing the password only if it's modified
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next(); // Call next to continue saving the document
// });

// // Method to check password
// trainerSchema.methods.checkPassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

// // Method to generate JWT token
// trainerSchema.methods.generateToken = function () {
//     return jwt.sign(
//         { userId: this._id }, // Assuming you want to store the userId in the token
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     );
// };

module.exports.Trainer = mongoose.model("Trainer", trainerSchema);
