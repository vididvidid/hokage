const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Access the JWT secret key from the environment variables
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret);
};

module.exports = {
  generateToken,
};
