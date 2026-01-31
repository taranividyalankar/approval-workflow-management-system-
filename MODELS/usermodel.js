const mongoose = require("mongoose") //to create schema we need mongoose

//user creation

const userSchema = new mongoose.Schema({ //user blueprint 
    name: String,
    email: String,
    role: String, //should be in caps MANAGER or USER
    // age: Number,
    password: String
})

const User = mongoose.model("User",userSchema) //user model based on user schema


module.exports = User  //user schema is not required by others whie model is needed.
