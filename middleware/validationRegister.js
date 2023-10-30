const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const { body,validationResult } = require("express-validator");
const {validate} = require("./validationValidate");

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
 

validate;

module.exports = {
  validateRegistrationRule
};
