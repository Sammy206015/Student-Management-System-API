const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
    },
    departmentHead: {
        type: String
    },
    departmentDescription: {
        type: String
    },
    departmentCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    }


}, {timestamps: true});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;