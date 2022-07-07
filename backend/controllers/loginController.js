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
                        process.env.SECRET_KEY
                    );
                    res.status(200).json({
                        message:"User signed in successfully",
                        token: token
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

module.exports = loginUser;
