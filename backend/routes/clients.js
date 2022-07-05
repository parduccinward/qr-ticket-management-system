const express = require("express");
const pool = require("../db/db");

const router = express.Router();

router.get("/",(req,res) => {
    res.json({mssg:"GET all clients"});
})

router.get("/:id", (req,res) => {
    res.json({mssg:"GET a single client"});
})


module.exports = router;