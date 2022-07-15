const bcrypt = require("bcrypt");
const pool = require("../models/db");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const query = await pool.query("SELECT * FROM users WHERE username=$1",[username]);
        const user = query.rows;
        if(user.length !== 0){
            bcrypt.compare(password, user[0].password, (err, passwordsMatch) => {
                if(err){
                    res.status(500).json({error: "Server error"});   
                } else if(passwordsMatch === true){
                    const token = jwt.sign(
                        {
                            username:username
                        },
                        process.env.ACCESS_TOKEN_SECRET
                    );
                    return res.cookie("jwt", token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 900000)
                    })
                    .status(200)
                    .json({message: "Login successful!"})

                }else{
                    res.status(400).json({error: "The password entered is incorrect."});
                }
            });
        }else{
            res.status(400).json({error: "User is not registered. Sign up first!"});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: "An error ocurred while signing in. Please try again"});
    }
}

const registerUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const query = await pool.query("SELECT * FROM users WHERE username= $1", [username]);
        const user = query.rows;
        if (user.length == 0) {
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
                    process.env.ACCESS_TOKEN_SECRET
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


module.exports = {
    loginUser,
    registerUser
};
