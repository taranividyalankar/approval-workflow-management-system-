//since mulitple files are created thus to use require , we export it and later it is imported to index.js(previous)

const mongoose = require("mongoose")


module.exports = () =>{
    mongoose.connect('mongodb://localhost:27017/test-rmp-db').   //connecting the database | connect to a diff db as we are to save encrypt password, and the old db should not mess with this this logic
        then(()=>{console.log("database connected")}). //after connection prints done
        catch((err)=> {console.log(err)}) //if any err, prints error
}


