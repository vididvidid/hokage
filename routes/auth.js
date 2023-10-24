const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const User = require("../models/User"); // Import the User model
const { body, validationResult } = require("express-validator"); // Import validators

// Validation middleware for user registration
const validateRegistration = [
  body("username")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Username is required and must be at least 4 characters long"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Route for user registration
//Create a User using : POST "/api/auth/". Don't require Auth
router.post("/", validateRegistration, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email ID already exists" });
    }

    // Create a new user using the User model
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // You can add additional logic here (e.g., generate tokens, send responses)
    res.status(201).json(newUser); // Respond with the newly created user
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "User registration failed" });
  }
});

module.exports = router; // Export the router
