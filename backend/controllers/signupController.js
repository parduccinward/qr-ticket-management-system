const bcrypt = require("bcrypt");
const pool = require("../models/db");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE username= $1", [username]);
        const anyUser = user.rows;
        if (anyUser.length == 0) {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err){
                    res.status(err).json({error: "Server error"});
                }
                const user = {
                    username,
                    password: hash
                };

                pool.query("INSERT INTO users (username, password) VALUES ($1,$2)", 
                [user.username, user.password], (err) => {
                if (!err) {
                    res.status(200).send({ message: "User added to database, not verified" });
                    const token = jwt.sign(
                    {
                        username: user.username
                    },
                    process.env.SECRET_KEY
                    );
                }
                else {
                    console.error(err);
                    return res.status(500).json({error: "Database error"})
                }
                });
            });
        }
        else {
            return res.status(400).json({error: "Username already exists!"});
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({error: "An error ocurred while signing up. Please try again"});
    };
}

module.exports = registerUser;
