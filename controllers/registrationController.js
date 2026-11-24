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


exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate("student")
            .populate("course");

        res.status(200).json({
            message: "Registrations retrieved successfully",
            count: registrations.length,
            registrations
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving registrations",
            error: error.message
        });
    }
};

exports.getRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await Registration.findById(id)
            .populate("student")
            .populate("course");

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.status(200).json({
            message: "Registration retrieved successfully",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving registration",
            error: error.message
        });
    }
};


exports.updateRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const { student, course } = req.body;

        if (student !== undefined) {
            const studentExists = await Student.findById(student);

            if (!studentExists) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }
        }

        if (course !== undefined) {
            const courseExists = await Course.findById(course);

            if (!courseExists) {
                return res.status(404).json({
                    message: "Course not found"
                });
            }
        }

        const allowedFields = [
            "student",
            "course",
            "academicYear",
            "semester",
            "status"
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }

        const registration = await Registration.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )
        .populate("student")
        .populate("course");

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.status(200).json({
            message: "Registration updated successfully",
            registration
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "This registration already exists for the student, course, academic year and semester"
            });
        }

        res.status(500).json({
            message: "Error updating registration",
            error: error.message
        });
    }
};

exports.deleteRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await Registration.findById(id);

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        await Registration.findByIdAndDelete(id);
        res.status(200).json({
            message: "Course registration deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting registration",
            error: error.message
        });
    }
};
