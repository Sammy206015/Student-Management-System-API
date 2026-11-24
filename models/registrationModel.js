const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    academicYear: {
        type: String,
        required: true,
    },

    semester: {
        type: String,
        required: true,
        enum: ["First", "Second"]
    },

    status: {
        type: String,
        enum: ["Registered", "Approved", "Dropped"],
        default: "Registered"
    }

}, { timestamps: true });

// Prevent duplicate registration for the same course in the same academic year and semester.
registrationSchema.index(
    { student: 1, course: 1, academicYear: 1, semester: 1 },
    { unique: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
