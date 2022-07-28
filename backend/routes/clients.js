const express = require("express");
const verifyJWT = require('../middleware/verifyJWT');

const {
    getClients,
    getClient,
    createClient,
    createClientId,
    deleteClient,
    updateClient
} = require("../controllers/clientController");

const router = express.Router();

router.get("/", verifyJWT, getClients);

router.get("/:id", verifyJWT, getClient);

router.post("/", verifyJWT, createClient);

router.post("/:id", createClientId);

router.delete("/:id", verifyJWT, deleteClient);

router.put("/:id",verifyJWT, updateClient);

module.exports = router;