require("dotenv").config()

const express = require('express');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require("cookie-parser");
const partyRoutes = require("./routes/parties");
const salespersonRoutes = require("./routes/salespersons");
const clientRoutes = require("./routes/clients");
const userRoutes = require("./routes/users");


const app = express();

app.use(cors({credentials: true, origin: process.env.FRONTEND_ORIGIN}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


app.use("/api/auth",userRoutes);
app.use('/api/refresh', require('./routes/refresh'));
app.use('/api/logout', require('./routes/logout'));

app.use("/api/parties",verifyJWT, partyRoutes);
app.use("/api/salespersons",verifyJWT, salespersonRoutes);
app.use("/api/clients",verifyJWT, clientRoutes);

app.listen(process.env.PORT, () => {
    console.log("listening on port",process.env.PORT);
})