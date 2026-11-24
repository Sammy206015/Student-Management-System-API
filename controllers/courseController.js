const Course = require("../models/courseModel");
const Department = require("../models/departmentModel");
const Lecturer = require("../models/lecturerModel");
const Registration = require("../models/registrationModel");

exports.createCourse = async (req, res) => {
    try {
        const { department, lecturer } = req.body;

        const departmentExists = await Department.findById(department);

        if (!departmentExists) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        const lecturerExists = await Lecturer.findById(lecturer);

        if (!lecturerExists) {
            return res.status(404).json({
                message: "Lecturer not found"
            });
        }

        const course = await Course.create(req.body);

        await course.populate(["department", "lecturer"]);

        res.status(201).json({
            message: "Course created successfully",
            course
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Course code already exists"
            });
        }

        res.status(500).json({
            message: "Error creating course",
            error: error.message
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            // .populate("department")
            // .populate("lecturer");
            .populate("department", "departmentName departmentCode")
            .populate("lecturer", "firstName lastName staffId");


        res.status(200).json({
            message: "Courses retrieved successfully",
            count: courses.length,
            courses
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving courses",
            error: error.message
        });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id)
            .populate("department", "departmentName departmentCode")
            .populate("lecturer", "firstName lastName staffId");


        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course retrieved successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving course",
            error: error.message
        });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { department, lecturer } = req.body;

        if (department !== undefined) {
            const departmentExists = await Department.findById(department);

            if (!departmentExists) {
                return res.status(404).json({
                    message: "Department not found"
                });
            }
        }

        if (lecturer !== undefined) {
            const lecturerExists = await Lecturer.findById(lecturer);

            if (!lecturerExists) {
                return res.status(404).json({
                    message: "Lecturer not found"
                });
            }
        }

        const allowedFields = [
            "courseTitle",
            "courseCode",
            "description",
            "creditUnit",
            "department",
            "lecturer"
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

        const course = await Course.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )
        .populate("department", "departmentName departmentCode")
        .populate("lecturer", "firstName lastName staffId");


        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            course
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Course code already exists"
            });
        }

        res.status(500).json({
            message: "Error updating course",
            error: error.message
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const registrationExists = await Registration.findOne({
            course: id
        });

        if (registrationExists) {
            return res.status(409).json({
                message: "Cannot delete course with existing registrations"
            });
        }

        await Course.findByIdAndDelete(id);
        res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting course",
            error: error.message
        });
    }
};
