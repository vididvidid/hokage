const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const { validationResult } = require('express-validator');
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header("authtoken");

  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.userId.user;
    //console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
}

module.exports = { fetchuser };
