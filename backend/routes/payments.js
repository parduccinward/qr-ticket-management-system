const express = require("express");
const pool = require("../db/db");

const router = express.Router();

router.get("/", (req,res) => {
    res.json({mssg:"GET all payments"});
})

router.get("/:id", (req,res) => {
    res.json({mssg:"GET a single payment"});
})


module.exports = router;