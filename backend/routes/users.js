const express = require("express");
const verifyJWT = require('../middleware/verifyJWT');


const {
    loginUser,
    registerUser,
    refreshToken
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", verifyJWT, registerUser);

router.post("/login", loginUser);

router.post("/refresh", refreshToken);

module.exports = router;
