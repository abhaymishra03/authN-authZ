const express = require("express");
const {register,getMe,refreshToken}=require("../controllers/auth.controller");


const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.get("/get-me",getMe);
authRouter.get("/refresh-token",refreshToken);


module.exports=authRouter;