
const Department = require("../models/departmentModel");
const Student = require("../models/studentModel");
const Lecturer = require("../models/lecturerModel");
const Course = require("../models/courseModel");

exports.createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);

        res.status(201).json({
            message: "Department created successfully",
            department
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Department name or code already exists"
            });
        }

        res.status(500).json({
            message: "Error creating department",
            error: error.message
        });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();

        res.status(200).json({
            message: "Departments retrieved successfully",
            count: departments.length,
            departments
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving departments",
            error: error.message
        });
    }
};

exports.getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.status(200).json({
            message: "Department retrieved successfully",
            department
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving department",
            error: error.message
        });
    }
};