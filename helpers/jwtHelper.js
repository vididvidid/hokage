const jwt = require("jsonwebtoken");

const jwtSecret = "YashKumarKasaudhan"; // Replace with a secure key in production

const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret);
};

module.exports = {
  generateToken,
};
