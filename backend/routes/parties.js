const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({mssg: "GET all parties"});
})

router.get("/:id", (req, res) => {
    res.json({mssg: "GET a single party"});
})

router.post("/", (req, res) => {
    res.json({mssg: "POST a new party"})
})

router.delete("/:id", (req, res) => {
    res.json({mssg: "DELETE a party"});
})

router.patch("/:id", (req, res) => {
    res.json({mssg: "UPDATE a party"})
})


module.exports = router;
