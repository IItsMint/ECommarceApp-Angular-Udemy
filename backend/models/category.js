const mongoose = require("mongoose");//we need to co operate with database.
//lets create schema,
const categorySchema = new mongoose.Schema({
    _id: String,
    name:{
        type: String, 
        required:true, 
        unique:true
    },

});

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;//we need to share category to access from outside.