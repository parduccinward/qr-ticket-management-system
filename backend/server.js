require("dotenv").config()

const express = require('express');
const partyRoutes = require("./routes/parties");
const salespersonRoutes = require("./routes/salespersons");



const app = express();


app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


app.use("/api/parties",partyRoutes);
app.use("/api/salespersons", salespersonRoutes);

app.listen(process.env.PORT, () => {
    console.log("listening on port",process.env.PORT);
})