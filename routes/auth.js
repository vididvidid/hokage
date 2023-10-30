const express = require("express"); // Import express
const router = express.Router(); // Import the router module from express
const { validationResult } = require("express-validator");
const res = require("express/lib/response");
const {validateRegistrationRule} = require("../middleware/validationRegister");
const {validate} = require("../middleware/validationValidate");
const {validateLoginRule} = require("../middleware/validationLogin");
const {registerUser} = require("../controllers/registerUserController");
const {loginUser} = require("../controllers/loginUserController");
const {getUser} = require("../controllers/getUserController");
const {fetchuser} = require("../middleware/fetchUser");
const { deleteUser } = require("../controllers/deleteUserController");
const { updateUsername } = require("../controllers/updateUsernameController");


//ROUTE 1: Create a User using : POST "/api/auth/createuser". Don't require Auth
router.post("/createuser", validateRegistrationRule(),validate, registerUser);
//ROUTE 2: login a User using : POST "/api/auth/loginuser". Don't require Auth
router.post("/loginuser",validateLoginRule(),validate,loginUser);
//ROUTE 3: Get logedin user detail using : POST "/api/auth/getuser". login required
router.post("/getuser",fetchuser ,getUser);
// ROUTE 4: Delete a user using : DELETE "/api/auth/deleteuser". Login required
router.delete("/deleteuser", fetchuser, deleteUser);
// ROUTE 5: Update username using : PUT "/api/auth/updateusername". Login required
router.put("/updateusername", fetchuser, updateUsername);


module.exports = router; // Export the router
