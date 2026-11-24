const express = require("express");
const router = express.Router();

const {
  createLecturer,
  getAllLecturers,
  getLecturerById,
  updateLecturer,
  deleteLecturer,
} = require("../controllers/lecturerController");

// Create lecturer
router.post("/", createLecturer);

// Get all lecturers
router.get("/", getAllLecturers);

// Get lecturer by ID
router.get("/:id", getLecturerById);

// Update lecturer
router.put("/:id", updateLecturer);

// Delete lecturer
router.delete("/:id", deleteLecturer);

module.exports = router;
