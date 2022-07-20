const pool = require("../models/db");

const handleLogout = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const query = await pool.query("SELECT * FROM users WHERE refresh_token= $1",[refreshToken]);
    const user = query.rows;
    if(!user) {
        res.clearCookie('jwt', { httpOnly: true});
        return res.sendStatus(204);
    }

    const deleteUser = await pool.query("UPDATE users SET refresh_token = null WHERE username=$1", [user[0].username]);
    res.clearCookie("jwt", { httpOnly: true});
    res.sendStatus(204);

}

module.exports = { handleLogout }