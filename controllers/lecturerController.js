const Lecturer = require("../models/lecturerModel");

// CREATE LECTURER
const createLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.create(req.body);

    res.status(201).json({
      message: "Lecturer created successfully",
      data: lecturer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create lecturer",
      error: error.message,
    });
  }
};

// GET ALL LECTURERS
const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find().populate("department");

    res.status(200).json({
      message: "Lecturers retrieved successfully",
      data: lecturers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve lecturers",
      error: error.message,
    });
  }
};

// GET SINGLE LECTURER
const getLecturerById = async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id).populate(
      "department",
    );

    if (!lecturer) {
      return res.status(404).json({
        message: "Lecturer not found",
      });
    }

    res.status(200).json({
      message: "Lecturer retrieved successfully",
      data: lecturer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid lecturer ID",
      error: error.message,
    });
  }
};

// UPDATE LECTURER
const updateLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("department");

    if (!lecturer) {
      return res.status(404).json({
        message: "Lecturer not found",
      });
    }

    res.status(200).json({
      message: "Lecturer updated successfully",
      data: lecturer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update lecturer",
      error: error.message,
    });
  }
};

// DELETE LECTURER
const deleteLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndDelete(req.params.id);

    if (!lecturer) {
      return res.status(404).json({
        message: "Lecturer not found",
      });
    }

    res.status(200).json({
      message: "Lecturer deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete lecturer",
      error: error.message,
    });
  }
};

module.exports = {
  createLecturer,
  getAllLecturers,
  getLecturerById,
  updateLecturer,
  deleteLecturer,
};
