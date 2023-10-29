const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generateToken } = require("../helpers/jwtHelper");

async function registerUser(req, res) {
  // Your user registration logic here, including validation, password hashing, and token generation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, password } = req.body;
    console.log(password);
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email ID already exists" });
    }

    //generate the salt
    const salt = await bcrypt.genSalt(10);
    //hash teh password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the User model
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, //store the hashed password in the database
    });
    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = generateToken(data);

    // You can add additional logic here (e.g., generate tokens, send responses)
    res.status(201).json({ authtoken, user: newUser }); // Respond with the newly created user
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "User registration failed" });
  }
}


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
  registerUser,
  loginUser
};
