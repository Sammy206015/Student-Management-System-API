
const express = require("express");
const router = express.Router();

const {
    createRegistration,
    getAllRegistrations,
    getRegistration,
} = require("../controllers/registrationController");

router.post("/", createRegistration);

router.get("/", getAllRegistrations);

router.get("/:id", getRegistration);