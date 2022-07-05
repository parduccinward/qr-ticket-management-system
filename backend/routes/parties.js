const express = require("express");
const pool = require("../models/db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allParties = await pool.query("SELECT * FROM parties");
        res.json(allParties.rows);
    } catch (err) {
        console.error(err.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const party = await pool.query("SELECT * FROM parties WHERE party_id = $1 ",[id]);
        res.json(party.rows);
    } catch (err) {
        console.error(err.message);
    }
})

router.post("/", async (req, res) => {
    try {
        const {name, sale_start_date, sale_end_date, party_date, banner_url} = req.body;
        const newParty = await pool.query(
            "INSERT INTO parties (name, sale_start_date, sale_end_date, party_date, banner_url) VALUES($1, $2, $3, $4, $5) RETURNING *",
             [name, sale_start_date, sale_end_date, party_date, banner_url]
             );
        res.json(newParty.rows);
    } catch (err) {
        console.error(err.message); 
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteParty = await pool.query("DELETE FROM parties WHERE party_id =$1",[id]);
        res.json("Party was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {name, sale_start_date, sale_end_date, party_date, banner_url} = req.body;
        const updateParty = await pool.query(
            "UPDATE parties SET name=$1, sale_start_date=$2, sale_end_date=$3, party_date=$4, banner_url=$5 WHERE party_id=$6",
             [name, sale_start_date, sale_end_date, party_date, banner_url, id]
             );
        res.json("Party was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
})


module.exports = router;
