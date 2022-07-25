const pool = require("../models/db");

const getSalespersons = async (req, res) => {
    try {
        const allSalespersons = await pool.query("SELECT * FROM salespersons");
        res.json(allSalespersons.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const getSalesperson = async (req, res) => {
    try {
        const {id} = req.params;
        const salesperson = await pool.query("SELECT * FROM salespersons WHERE salesperson_id = $1 ",[id]);
        res.json(salesperson.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const createSalesperson = async (req, res) => {
    try {
        const {name,last_name, phone, email, sale_url, party_id} = req.body;
        const newSalesperson = await pool.query(
            "INSERT INTO salespersons (name, last_name, phone, email, sale_url, party_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
             [name,last_name, phone, email, sale_url, party_id]
             );
        res.json(newSalesperson.rows);
    } catch (err) {
        console.error(err.message); 
    }
};

const deleteSalesperson = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteSalesperson = await pool.query("DELETE FROM salespersons WHERE salesperson_id =$1",[id]);
        res.json("Salesperson was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
};

const updateSalesperson = async (req, res) => {
    try {
        const {id} = req.params;
        const {name,last_name, phone, email, sale_url, party_id} = req.body;
        const updateSalesperson = await pool.query(
            "UPDATE salespersons SET name = $1, last_name = $2, phone = $3, email = $4, sale_url = $5, party_id = $6 WHERE salesperson_id = $7",
             [name,last_name, phone, email, sale_url, party_id, id]
             );
        res.json("Salesperson was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getSalespersons,
    getSalesperson,
    createSalesperson,
    deleteSalesperson,
    updateSalesperson
}