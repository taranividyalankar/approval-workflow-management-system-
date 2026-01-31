const express = require("express")
require("dotenv").config()
const bcrypt = require("bcrypt") // for password

const jwt = require("jsonwebtoken")

const User = require("../MODELS/usermodel")
//const secretCode = "1233vdnmb"


const router = express.Router()  // as app is created in index.js , to use it here , a varibale callled router is created.

router.post('/signup', async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const age = req.body.age;
    const password = req.body.password;

    if(!email || !password) { //validation
        return res.json({"message":"email and password are required"}) //if return is given then function stops executing
    }
    if (age < 18) {
        return res.json({"message":"age must be at least 18"})
    }
    if (role !== "MANAGER" && role !== "USER") {
        return res.json({"message":"role must be MANAGER or USER"})
    }
    if (password.length < 8) {
        return res.json({"message":"password must be at least 8 characters long"})
    }
    if (!email.includes("@")) {
        return res.json({"message":"invalid email"})
    }
    if (!(/[0-9]/.test(password))) {
        return res.json({"message":"password must contain at least one number"})
    }
    if (!(/[A-Z]/.test(password))) {
        return res.json({"message":"password must contain at least one uppercase letter"})
    }
    if (!(/[a-z]/.test(password))) {
        return res.json({"message":"password must contain at least one lowercase letter"})
    }
    if (/\s/.test(password)) {
        return res.json({"message":"password must not contain spaces"})
    } 

    const userCheck = await User.findOne({email: email}) //check if user with same email exists
    console.log("userCheck", userCheck)
    if (userCheck) {
        return res.json({"message":"user with this email already exists"})
    }

    const hashPassword = await bcrypt.hash(password, 10); //encrypt password | 10 is salt rounds (how many times to encrypt)
    //also a time taking procces, so wait

    //save in database , creating a collection
    const user = new User({
        name: name,
        email: email,
        role: role,
        age: age,
        password: hashPassword
    })
    await user.save() //saves user in database | it takes some time to save so we put a keyword await until it saves in db to give success message
    //to maintain efficiency everytime we use await we have to make the function async
    res.json({"message":"success"})
})

router.post('/login', async(req,res) => {
    const user = await User.findOne({email:req.body.email}) //await
    if(!user) {
        return res.json({"message":"invalid email"})
    }
    const isPasswordValid = await bcrypt.compare(
        req.body.password, user.password) //compare entered password with encrypted password
    if(!isPasswordValid) {
        return res.json({"message":"invalid password"})
    }
    
    const token = jwt.sign(
        {user: user._id},process.env.SECRET_CODE,
        {expiresIn: "1h"}
    )
    return res.json({"message":"login successful", "token": token})
})


module.exports = router