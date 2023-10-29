const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generateToken } = require("../helpers/jwtHelper");

async function loginUser(req, res) {
  // Your user registration logic here, including validation, password hashing, and token generation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const payload = {
      user:{
        id:user.id
      }
    }

    // Generate a token for the authenticated user
    const authtoken = generateToken(payload);

    // You can add additional logic here (e.g., generate tokens, send responses)
    res.status(200).json({ authtoken}); // Respond with the authenticated user
  } catch (error) {
    console.error("Error login user:", error);
    res.status(500).json({ error: "User login failed" });
  }
}

module.exports = {
  loginUser
};
