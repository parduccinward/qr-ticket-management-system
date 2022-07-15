const express = require("express");
const verifyJWT = require('../middleware/verifyJWT');


const {
    loginUser,
    registerUser,
    logoutUser,
    refreshToken
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", verifyJWT, registerUser);

router.post("/login", loginUser);

router.post("/logout", verifyJWT, logoutUser);

router.post("/refresh", refreshToken);

module.exports = router;
