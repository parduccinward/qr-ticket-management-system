const express = require("express");

const {
    getSalespersons,
    getSalesperson,
    createSalesperson,
    deleteSalesperson,
    updateSalesperson
} = require("../controllers/salespersonController");

const router = express.Router();

router.get("/",getSalespersons);

router.get("/:id",getSalesperson);

router.post("/",createSalesperson);

router.delete("/:id",deleteSalesperson);

router.put("/:id",updateSalesperson);

module.exports = router;