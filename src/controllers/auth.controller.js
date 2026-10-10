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
        res.status(409).json({
            message:"username or email already register",
        });
    }

    const hash = await bcrypt.hash(password,10);



    const user = await User.create({
        username,
        email,
        password:hash,
    });

    const token = jwt.sign({
        id:user._id
    },JWT_SECRET_KEY,{
        expiresIn:"1d",
    });


    // 201->resource created 

    res.cookie("token",token);
    res.status(201).json({
        message:"user registered successfully",
        user:{
            username:user.username,
            email:user.email,
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
module.exports={
    register,
    getMe,
};