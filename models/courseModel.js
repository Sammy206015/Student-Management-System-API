const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    description: {
        type: String,
        required: true
    },
    courseUnit: {
        type: String,
        required: true,
        min: 1,
        max: 6
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturer",
        required: true
    }
    
}, {timestamp: true});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;