const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    }
})

// run the function before save password, this is 'newUser'
// next() after hashing the password, userSchama save the user
userSchema.pre('save',async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }

    next();
})

module.exports = mongoose.model("User", userSchema)
