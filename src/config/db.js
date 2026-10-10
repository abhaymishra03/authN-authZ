const mongoose = require("mongoose");
const {MONGO_URI} = require("./config");
const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const connectDB = async () => {

    try {

        await mongoose.connect(MONGO_URI);
        console.log("MongoDB successfull connected ");
        
        
    } catch (err) {

        console.log(`MONGO CONNECTION ERROR ${err}`);
        
        
    }
    
};


module.exports=connectDB;