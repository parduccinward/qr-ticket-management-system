const pool = require("../models/db");

const getClients = async (req, res) => {
    try {
        const allClients = await pool.query("SELECT * FROM clients");
        res.json(allClients.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const getClient = async (req, res) => {
    try {
        const {id} = req.params;
        const client = await pool.query("SELECT * FROM clients where client_id=$1",[id])
        res.json(client.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const createClient = async (req, res) => {
    try {
        const {name, last_name, phone, gender, payment_url, instagram, party_id, salesperson_id} = req.body;
        const newClient = await pool.query(
            "INSERT INTO clients (name, last_name, phone, gender, payment_url, instagram, party_id, salesperson_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [name, last_name, phone, gender, payment_url, instagram, party_id, salesperson_id]
            );
        res.json(newClient.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const createClientId = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(req.file.path);
        const nameArray = id.split(" ")
        const queryName = nameArray[0];
        const queryLast_name = nameArray[1];
    
        const query = await pool.query("SELECT * FROM salespersons WHERE name=$1 AND last_name=$2",[queryName, queryLast_name])

        const salesperson = query.rows

        
        const payment_url = "boenas";
        const salesperson_id = salesperson[0].salesperson_id;
        const party_id = salesperson[0].party_id;
        const salesperson_name = salesperson[0].name;
        const created_at = new Date()

        const {name, last_name, phone, gender, instagram} = req.body;
        const newClient = await pool.query(
            "INSERT INTO clients (name, last_name, phone, gender, payment_url, instagram, salesperson_name, created_at, party_id, salesperson_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [name, last_name, phone, gender, payment_url, instagram, salesperson_name, created_at, party_id, salesperson_id]
            );
        res.json(newClient.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const deleteClient = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteClient = await pool.query("DELETE FROM clients WHERE client_id =$1",[id]);
        res.json("Client was deleted successfully!")
    } catch (err) {
        console.error(err.message);
    }
}

const updateClient = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, last_name, phone, gender, payment_url, instagram, party_id, salesperson_id} = req.body;
        const updateClient = await pool.query(
            "UPDATE clients SET name = $1, last_name = $2, phone = $3, gender = $4, payment_url = $5, instagram = $6, party_id = $7, salesperson_id =$8 where client_id = $9",
             [name, last_name, phone, gender, payment_url, instagram, party_id, salesperson_id, id]
             );
        res.json("Client was updated successfully");
    } catch (err) {
        console.error(err.message);
    }
}


module.exports = {
    getClients,
    getClient,
    createClient,
    createClientId,
    deleteClient,
    updateClient
}