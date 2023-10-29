const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const { validationResult } = require("express-validator");
const res = require("express/lib/response");
const {validateRegistrationRule,validate,validateLoginRule}= require("../middleware/validationMiddleware");
const {registerUser} = require("../controllers/registerUserController");
const {loginUser} = require("../controllers/loginUserController");
const {getUser} = require("../controllers/getUserController");
const {fetchuser} = require("../middleware/fetchUser");




//ROUTE 1: Create a User using : POST "/api/auth/createuser". Don't require Auth
router.post("/createuser", validateRegistrationRule(),validate, registerUser);
//ROUTE 2: login a User using : POST "/api/auth/loginuser". Don't require Auth
router.post("/loginuser",validateLoginRule(),validate,loginUser);
//ROUTE 3: Get logedin user detail using : POST "/api/auth/getuser". login required
router.post("/getuser",fetchuser ,getUser);



module.exports = router; // Export the router
