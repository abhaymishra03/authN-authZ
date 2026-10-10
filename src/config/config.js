require("dotenv").config();


if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in .env file");
}   
if(!process.env.PORT){
    throw new Error("PORT is not defined in .env file");
}   
if(!process.env.JWT_SECRET_KEY){
    throw new Error("JWT_SECRET_KEY is not defined in .env file");
}

module.exports={


    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,


}