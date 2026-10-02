const mongoose = require('mongoose');
require('dotenv').config();
const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const connectDB = async () => {


    try {
            await mongoose.connect(process.env.MONGO_URI);

            console.log("MongoDB is connected !");
            

        
    } catch (err) {
        console.log("Mongo DB Error",err);
        
    }

    
}

module.exports=connectDB;