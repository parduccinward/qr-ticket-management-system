require("dotenv").config()

const express = require('express');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require("cookie-parser");
const partyRoutes = require("./routes/parties");
const salespersonRoutes = require("./routes/salespersons");
const clientRoutes = require("./routes/clients");
const userRoutes = require("./routes/users");
const path = require("path");
const PORT = process.env.PORT || 4000;


const app = express();

app.use(cors({credentials: true, origin: [process.env.PRODUCTION_FRONTEND_ORIGIN, process.env.FRONTEND_ORIGIN]}));
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/build")));
}

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
app.use("/api/clients", clientRoutes);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.listen(PORT, () => {
    console.log("listening on port",PORT);
})