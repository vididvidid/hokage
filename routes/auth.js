const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Route for user registration
//Create a User using : POST "/api/auth/". Don't require Auth
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user using the User model
    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json(newUser); // Respond with the newly created user
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'User registration failed' });
  }
});

module.exports = router; // Export the router
