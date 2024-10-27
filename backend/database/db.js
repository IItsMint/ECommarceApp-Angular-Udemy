const mongoose = require("mongoose");

//Let's implement dotenv to load environment variable from a .env file.
require('dotenv').config({ path: './database/uri.env' });

//Since we don't want to share uri of the Database, we made the conenction in .env file and than call it here to connect with db.
const uri = process.env.MONGO_URI;

//Let's wire our program with Database,
const connection = ()=>{
    mongoose.connect(uri,{}) //Options are empty, since useNewUrlParser and useUnifiedTopology are become default.
    .then(()=>console.log("MongoDB Connection Established Succesfully..."))
    .catch((error)=>console.log("Something Went Wrong, Can not conncted to MongoDB..."));
}

module.exports = connection;//Connection method becomes shared with this line.
