const express = require("express");

const registerUser = require("../controllers/signupController");
const loginUser = require("../controllers/loginController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
