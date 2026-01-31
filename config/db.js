//since mulitple files are created thus to use require , we export it and later it is imported to index.js(previous)

require("dotenv").config();

const mongoose = require("mongoose");


module.exports = () =>{
    mongoose.connect(process.env.DB_URL).
    then(()=>{console.log("database connected");}). //after connection prints done
    catch((err)=> {console.log(err);}) //if any err, prints error
};
   
//connecting the database | connect to a diff db as we are to save encrypt password, and the old db should not mess with this this logic
    

