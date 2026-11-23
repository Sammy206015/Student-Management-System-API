const Student = require("../models/studentModel");
const Department = require("../models/departmentModel");
const Registration = require("../models/registrationModel");
const bcrypt = require("bcrypt");

exports.createStudent = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            matricNumber,
            gender,
            level,
            department,
            password
        } = req.body;
        
        if (!firstName || !lastName || !email || !password || !matricNumber || !department) {
            return res.status(400).json({
                message: "firstName, lastName, email, password, matricNumber and department are required"
            });
        }

        if (String(password).length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const existingStudent = await Student.findOne({
            $or: [
                { email },
                { matricNumber}
            ]
        });
        if (existingStudent) {
            return res.status(409).json({
                message: "Student with this email or matric number already exists"
            });
        }


        const departmentExists = await Department.findById(department);
        if (!departmentExists) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            matricNumber,
            gender,
            level,
            department,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                phoneNumber: student.phoneNumber,
                matricNumber: student.matricNumber,
                gender: student.gender,
                level: student.level,
                department: {
                    id: departmentExists._id,
                    name: departmentExists.departmentName
                }
            }
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Student already exists"
            });
        }

        res.status(500).json({
            message: `Error registering student: ${error.message}`
        });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("department");

        res.status(200).json({
            message: "Students retrieved successfully",
            count: students.length,
            students
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving students",
            error: error.message
        });
    }
};

exports.getStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // if (!require("mongoose").isValidObjectId(id)) {
        //     return res.status(400).json({ message: "Invalid student ID" });
        // }

        const student = await Student.findById(id).populate("department");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student retrieved successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving student",
            error: error.message
        });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;


        const allowedFields = [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
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

        const student = await Student.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("department");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating student",
            error: error.message
        });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const registrationExists = await Registration.findOne({
            student: id
        });

        if (registrationExists) {
            return res.status(409).json({
                message: "Cannot delete student with existing course registrations"
            });
        }

        await Student.findByIdAndDelete(id);

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting student",
            error: error.message
        });
    }
};