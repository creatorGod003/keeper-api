const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req, res, next)=>{

    let token;

    let authHeader = req.headers.authorization||req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
    }

    if(!token){
        res.status(401);
        throw new Error("User is not authorized or token is missing")
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(constants.UNAUTHORIZED).json({ message: 'Token expired. Please log in again.' });
            } else {
                res.status(constants.UNAUTHORIZED).json({ message: 'User not authorized.' });
            }
        } else {
            req.user = decoded.user;
            next();
        }
    });

})

return module.exports = validateToken;