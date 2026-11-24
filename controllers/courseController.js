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