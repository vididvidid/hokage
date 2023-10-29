const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generateToken } = require("../helpers/jwtHelper");

async function getUser(req,res){
  try {
      userId = req.user.id;
      //console.log(userId);
      const user = await User.findByPk(userId,{
          attributes: { exclude: ["password"] }, // Exclude the "password" field
        });
      res.send(user);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "User registration failed" });
  }
}


module.exports = {
  getUser
};
