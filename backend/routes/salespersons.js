const express = require("express");
const pool = require("../db/db");

const router = express.Router();

router.get("/",(req,res) => {
    res.json({mssg:"GET all salespersons"});
})

router.get("/:id", (req,res) => {
    res.json({mssg: "GET a single salesperson"});
})

router.post("/",(req,res) => {
    res.json({mssg:"POST a new salesperson"});
})

router.delete("/:id", (req,res) => {
    res.json({mssg: "DELETE a salesperson"});
})

router.patch("/:id", (req,res) =>{
    res.json({mssg: "UPDATE a salesperson"});
})

module.exports = router;