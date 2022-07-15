const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,username) => {
            if(err){
                return res.status(403).json("Token is not valid!");
            }
            req.username = username;
            next();
        });
    }else{
        res.status(401).json("You are not authenticated!");
    }
}

module.exports = verifyJWT;