const mongoose = require ("mongoose");

//let's define the schema.
const userSchema = new mongoose.Schema({
    _id: String,
    name: {type:String,required: true}, //Let's make name section is a must.
    email: {type:String, required: true, unique: true}, //We set each email adress only used once.
    password:{type:String,required: true}, //We also made password is a must.
    isAdmin: Boolean,
    createdDate: Date
});

//let's create user model.
const User = mongoose.model("User",userSchema);

//let's make user sharable.
module.exports=User;