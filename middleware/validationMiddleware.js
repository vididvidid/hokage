const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const { body,validationResult } = require("express-validator");
const { registerUser } = require("../controllers/userController");

const validateRegistrationRule = ()=>{
  return [
  body('username')
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Username is required and must be at least 4 characters long"),
  body('email').isEmail().withMessage("Invalid email address"),
  body('password')
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]};

const validateLoginRule = ()=>{
  return [
  body('email').isEmail().withMessage("Invalid email address"),
  body('password')
    .exists()
    .withMessage("Password can't be empty"),
]};

//function to validate
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
};


module.exports = {
  validateRegistrationRule,
  validate,
  validateLoginRule,
};
