const express = require("express");
const verifyJWT = require('../middleware/verifyJWT');
const multer = require("multer");
const path = require("path")
const cors = require("cors");

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    })

const {
    getClients,
    getClient,
    createClient,
    createClientId,
    deleteClient,
    updateClient,
    downloadQR,
    validateQR
} = require("../controllers/clientController");

const router = express.Router();

router.get("/", verifyJWT, getClients);

router.get("/:id", verifyJWT, getClient);

router.post("/", verifyJWT, createClient);

router.post("/validateQR", validateQR);

router.post("/:id", upload.single("payment_url"), createClientId);

router.delete("/:id", verifyJWT, deleteClient);

router.put("/:id",verifyJWT, updateClient);

router.get("/qr/:id",verifyJWT, cors({
    credentials: true,
    origin: process.env.FRONTEND_ORIGIN,
    exposedHeaders: ['Content-Disposition'],
  }), downloadQR);


module.exports = router;