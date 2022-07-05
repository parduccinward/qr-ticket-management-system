const express = require("express");
const pool = require("../db/db");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({mssg: "GET all parties"});
})

router.get("/:id", (req, res) => {
    res.json({mssg: "GET a single party"});
})

router.post("/", async (req, res) => {
    try {
        const {name, sale_start_date, sale_end_date, party_date, banner_url} = req.body;
        const newParty = await pool.query(
            "INSERT INTO parties (name, sale_start_date, sale_end_date, party_date, banner_url) VALUES($1, $2, $3, $4, $5) RETURNING *",
             [name, sale_start_date, sale_end_date, party_date, banner_url]
             );
        res.json(newParty);
    } catch (err) {
        console.error(err.message);
    }
})

router.delete("/:id", (req, res) => {
    res.json({mssg: "DELETE a party"});
})

router.patch("/:id", (req, res) => {
    res.json({mssg: "UPDATE a party"})
})


module.exports = router;
