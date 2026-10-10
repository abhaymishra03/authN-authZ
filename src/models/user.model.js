const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username must be unique"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email must be unique"],
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
        trim:true,
    }
});

const User = mongoose.model("user",userSchema);


module.exports=User;