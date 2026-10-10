const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");



const register = async (req,res) => {

    const {username,email,password}=req.body;


    const isAlreadyRegistered = await User.findOne({

        $or:[
            {username},
            {email}
        ],
    });

    if(isAlreadyRegistered){
        //409 ->conflict
        return res.status(409).json({
            message:"username or email already register",
        });
    }

    const hash = await bcrypt.hash(password,10);



    const user = await User.create({
        username,
        email,
        password:hash,
    });

    const accessToken = jwt.sign({
        id:user._id
    },JWT_SECRET_KEY,{
        expiresIn:"15m",
    });
    const refreshToken = jwt.sign({
        id:user._id
    },JWT_SECRET_KEY,{
        expiresIn:"7d",
    });



    // 201->resource created 

    res.cookie("refreshToken", refreshToken, {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000, //7 days
    });
    res.status(201).json({
        message:"user registered successfully",
        user:{
            username:user.username,
            email:user.email,
            accessToken,
        }
    });


    
}


const getMe = async (req,res) => {
const token =req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"token not found",
        });
    }

    try{


        const decoded = jwt.verify(token,JWT_SECRET_KEY);

        let id = decoded.id;
    console.log(id);

    const user =await User.findById(id).select("-password");

    if(!user) {
            return res.status(404).json({
                message:"user not found",
            });
        }


    res.status(200).json({
        message:"user fetched successfully",
        user:user,


        
    });
    } catch(err) {

        res.status(400).json({
            message:"user not found"
        })
    }
}

const refreshToken = async (req,res) => {

    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken){ 
        return res.status(401).json({
            message:"refresh token not found",
        });
    }   
    const decoded = jwt.verify(refreshToken,JWT_SECRET_KEY);

    let id = decoded.id;
    
    const accessToken = jwt.sign({
        id:id
    },JWT_SECRET_KEY,{
        expiresIn:"15m",
    });

    return res.status(200).json({
        message:"access token generated successfully",
        accessToken,
    });
}

module.exports={
    register,
    getMe,
    refreshToken,
};