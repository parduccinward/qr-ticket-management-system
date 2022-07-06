const express = require("express");

const {
    getClients,
    getClient,
    createClient,
    deleteClient,
    updateClient
} = require("../controllers/clientController");

const router = express.Router();

router.get("/",getClients);

router.get("/:id",getClient);

router.post("/", createClient);

router.delete("/:id",deleteClient);

router.put("/:id",updateClient);

module.exports = router;