const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generateToken } = require("../helpers/jwtHelper");
const { createNotification } = require("./createNotificationController");
const logger = require("../helpers/logger"); // Import your logger

async function registerUser(req, res) {
  // Your user registration logic here, including validation, password hashing, and token generation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Registration failed: Validation errors", { errors: errors.array() });
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.error("Registration failed: Email ID already exists", { email });
      return res.status(400).json({ error: "Email ID already exists" });
    }

    // Generate the salt and hash the password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the User model
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Store the hashed password in the database
    });

    // Create a notification for successful registration
    await createNotification(newUser.id, 'registration_success');
    logger.info("Registration successful", { userId: newUser.id });

    const data = {
      user: {
        id: newUser.id,
      },
    };
    const authtoken = generateToken(data);

    // You can add additional logic here (e.g., generate tokens, send responses)
    res.status(201).json({ authtoken, user: newUser }); // Respond with the newly created user
  } catch (error) {
    logger.error("Error registering user:", error);
    res.status(500).json({ error: "User registration failed" });
  }
}

module.exports = {
  registerUser
};
