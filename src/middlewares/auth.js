const {verifyToken}=require('../utils/token');
const User = require("../models/User");

exports.protect = async (req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token)
           return res.status(401).json({message:"Not Authenticate"});


        const decode = verifyToken(token);


        const user = await User.findById(decode.id);


        if(!user)
           return res.status(401).json({message:"User no longer exists"});


        req.user=user;

        next();
    } catch(err) {

        if(err.name === 'TokenExpiredError')
            return res.status(401).json({message:"Token expired"});


        return res.status(401).json({message:"Invalid Token"});
    }
}