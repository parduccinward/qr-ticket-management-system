require("dotenv").config()

const express = require('express');
const partyRoutes = require("./routes/parties");
const salespersonRoutes = require("./routes/salespersons");
const clientRoutes = require("./routes/clients");
const userRoutes = require("./routes/users");


const app = express();


app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


app.use("/api/parties",partyRoutes);
app.use("/api/salespersons", salespersonRoutes);
app.use("/api/clients",clientRoutes);
app.use("/api/users",userRoutes);

app.listen(process.env.PORT, () => {
    console.log("listening on port",process.env.PORT);
})