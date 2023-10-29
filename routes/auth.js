const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const {validateRegistrationRule,validate,validateLoginRule}= require("../middleware/validationMiddleware");
const { registerUser,loginUser } = require("../controllers/userController");
const { validationResult } = require("express-validator");




//ROUTE 1: Create a User using : POST "/api/auth/createuser". Don't require Auth
router.post("/createuser", validateRegistrationRule(),validate, registerUser);
//ROUTE 2: login a User using : POST "/api/auth/loginuser". Don't require Auth
router.post("/loginuser",validateLoginRule(),validate,loginUser);




module.exports = router; // Export the router
