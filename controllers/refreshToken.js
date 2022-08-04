const jwt = require('jsonwebtoken');
const pool = require("../models/db");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const query = await pool.query("SELECT * FROM users WHERE refresh_token= $1",[refreshToken]);
    const user = query.rows;
    if(!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if(err || user[0].username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username":decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "15m"}
            );
            res.json({accessToken: accessToken})
        }
    )
}

module.exports = { handleRefreshToken }