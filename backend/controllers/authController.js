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
                    const accessToken = jwt.sign({username:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn: "30s"});
                    const refreshToken = jwt.sign({username:username},process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"});
                    refreshTokens.push(refreshToken);
                    res.status(200).json({
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });
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

let refreshTokens = [];

const refreshToken = (req, res) => {
    const refreshToken =req.body.token

    if(!refreshToken) return res.status(401).json("You are not authenticated!")
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,username) => {
        if(err) console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = jwt.sign({username:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn: "15m"});
        const newRefreshToken = jwt.sign({username:username},process.env.REFRESH_TOKEN_SECRET);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            newRefreshToken: newRefreshToken
        })

    })
}

const logoutUser = (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully");
}




module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    refreshToken
};
