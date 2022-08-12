const express = require("express");
const verifyJWT = require('../middleware/verifyJWT');


const {
    loginUser,
    registerUser
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);


module.exports = router;
