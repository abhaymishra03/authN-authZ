const express = require("express");
const {register,getMe}=require("../controllers/auth.controller");


const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.get("/get-me",getMe);


module.exports=authRouter;