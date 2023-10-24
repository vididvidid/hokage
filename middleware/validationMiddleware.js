const { body } = require("express-validator");

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

module.exports = {
  validateRegistration,
};
