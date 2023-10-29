const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const { body,validationResult } = require("express-validator");
const { registerUser } = require("../controllers/userController");


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
  validate
};
