const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const { body,validationResult } = require("express-validator");
const { registerUser } = require("../controllers/userController");
const {validate} = require("./validationValidate");


const validateLoginRule = ()=>{
  return [
  body('email').isEmail().withMessage("Invalid email address"),
  body('password')
    .exists()
    .withMessage("Password can't be empty"),
]};

validate;


module.exports = {
  validateLoginRule,
};
