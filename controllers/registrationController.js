const Registration = require("../models/registrationModel");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");

exports.createRegistration = async (req, res) => {
    try {
        const { student, course } = req.body;
        const studentExists = await Student.findById(student);

        if (!studentExists) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const courseExists = await Course.findById(course);

        if (!courseExists) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const registration = await Registration.create(req.body);
        await registration.populate(["student", "course"]);

        res.status(201).json({
            message: "Student registered for course successfully",
            registration
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Student is already registered for this course in this academic year and semester"
            });
        }

        res.status(500).json({
            message: "Error registering student for course",
            error: error.message
        });
    }
};