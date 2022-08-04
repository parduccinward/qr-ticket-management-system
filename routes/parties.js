const express = require("express");

const {
    getParties,
    getParty,
    createParty,
    deleteParty,
    updateParty
} = require("../controllers/partyController");

const router = express.Router();

router.get("/",getParties);

router.get("/:id",getParty);

router.post("/", createParty);

router.delete("/:id",deleteParty);

router.put("/:id",updateParty);


module.exports = router;
