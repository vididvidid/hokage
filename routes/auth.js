const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const { validationResult } = require("express-validator");
const validateRegistration = require("../middleware/validationMiddleware");
const { registerUser } = require("../controllers/userController");

// Route for user registration
//Create a User using : POST "/api/auth/". Don't require Auth
router.post("/", validateRegistration, registerUser);

module.exports = router; // Export the router
