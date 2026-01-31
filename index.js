require("dotenv").config();
const express = require("express") //express is used to create an app
 
//.env to read variables
const connectDB = require("./config/db")  // ,/ means this folder ,here this is backend
const userApi = require("./API/userApi")

const app = express()

app.use(express.json())
app.use("./api",userApi)

connectDB()

app.use("/users",userApi)

app.listen(process.env.PORT , () =>{
    console.log("server is running on  ", process.env.PORT)  // to check if server is runnung or not
})

//secret code , mongodb url , port - must be not in code but in other file so in app.listen , port is not 