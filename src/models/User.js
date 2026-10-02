const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema =new mongoose.Schema({
    name:{

        type:String,
        required:[true,"Name is required"],
        trim:true,
    },
    email:{

        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true,
        lowercase:true,

    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, 
    },

})
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

// Compare helper (we'll use this in Login)
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);