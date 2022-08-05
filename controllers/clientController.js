const pool = require("../models/db");
const {cloudinary} = require("../cloud/cloudinary");
const QRCode = require('qrcode')
const fs = require('fs');
const path = require("path");

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
        const {name, last_name, phone, ci, gender, payment_url, instagram, party_id, salesperson_id} = req.body;
        const newClient = await pool.query(
            "INSERT INTO clients (name, last_name, phone, ci, gender, payment_url, instagram, party_id, salesperson_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [name, last_name, phone, ci, gender, payment_url, instagram, party_id, salesperson_id]
            );
        res.json(newClient.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const createClientId = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, last_name, phone, ci, gender, instagram} = req.body;
        const result = await cloudinary.uploader.upload(req.file.path, {folder:"payments"});

        const nameArray = id.split(" ")
        const queryName = nameArray[0];
        const queryLast_name = nameArray[1];
    
        const query = await pool.query("SELECT * FROM salespersons WHERE name=$1 AND last_name=$2",[queryName, queryLast_name])

        const salesperson = query.rows

        const payment_url = result.url;
        const salesperson_id = salesperson[0].salesperson_id;
        const party_id = salesperson[0].party_id;
        const salesperson_name = salesperson[0].name;
        const created_at = new Date()

        const qr_code = require("crypto").randomBytes(4).toString("hex");

        const newClient = await pool.query(
            "INSERT INTO clients (name, last_name, phone, ci, gender, payment_url, instagram, salesperson_name, created_at, qr_code, party_id, salesperson_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [name, last_name, phone, ci, gender, payment_url, instagram, salesperson_name, created_at, qr_code, party_id, salesperson_id]
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


const downloadQR = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(path.join(__dirname,"/../uploads"))
        const qr = await QRCode.toFile(path.join(__dirname,`/../uploads/${id}.png`),id, {width:'400'});
        const qrImage = path.join(__dirname,`/../uploads/${id}.png`)
        const stream = fs.createReadStream(qrImage);
        res.set({
            'Content-Disposition': `attachment; filename=${id}.png`,
            'Content-Type': 'application/png',
          });
        stream.pipe(res);
    } catch (err) {
        console.error(err.message);
    }
}

const validateQR = async (req,res) => {
    try {
        const {decodedCode} = req.body;
        const searchQR = await pool.query("SELECT * FROM clients WHERE qr_code=$1",[decodedCode]);
        const client = searchQR.rows
        if(client.length !== 0){
            res.json(searchQR.rows[0]);
        }else{
            res.status(404).json({error: "QR Code is not valid!"});
        }

    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    getClients,
    getClient,
    createClient,
    createClientId,
    deleteClient,
    updateClient,
    downloadQR,
    validateQR
}