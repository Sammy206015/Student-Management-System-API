
const express = require("express");
const router = express.Router();

const {
    createRegistration,
    getAllRegistrations,
    getRegistration,
    updateRegistration,
    deleteRegistration
} = require("../controllers/registrationController");

// Register a student for a course
router.post("/", createRegistration);

// Get all registrations
router.get("/", getAllRegistrations);

// Get a single registration
router.get("/:id", getRegistration);

// Update a course registration
router.put("/:id", updateRegistration);

// Delete a course registration
router.delete("/:id", deleteRegistration);

module.exports = router;
