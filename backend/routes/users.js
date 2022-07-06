const express = require("express");

const {registerUser} = require("../controllers/signupController");
const {loginUser} = require("../controllers/loginController");


const router = express.Router();

module.exports = router;
