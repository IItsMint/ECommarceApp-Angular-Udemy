//We need API to have users, signin, signup ext...
const express = require("express");
const User = require("../models/user");
const router = express.Router(); //In tthis line we say, it is router.
const {v4:uuidv4} = require("uuid");

const jwt = require("jsonwebtoken");
const secretKey="My Secret Key My Secret Key 1234.";
const Options = {expiresIn: "1d"}

//let's define our signup method.
router.post("/register", async(request, response) => {
    try {
        const user = new User(request.body); //with this line we make sure the body matches with the data.
        user._id = uuidv4(); //with this line we obtain unique id.
        user.createdDate = new Date ();
        user.isAdmin= false;
        
        //Before savaing the user, first lets check their email adress unique or not.
        const checkUserEmail = await User.findOne({email: user.email});
        if(checkUserEmail != null){
            response.status(403).json({message: "This email adress already in use !"});
        }
        
        else
        {
        await user.save(); //with this line we are saving user to database.
        const token = jwt.sign({},secretKey,);
        let model = {token: token, user: user};
        response.json(model);            
        }

    } 

    catch (error) {
        response.status(500).json({message: error.message});
    }
})

//Let's define login.
router.post("/login", async(request, response)=>{
    try {
        const {email, password} = request.body;
        
        let user = await User.findOne({email: email}); //lets controll email adress.
        if(user == null){
            response.status(403).json({message: "This user does not Exists !"});
        }
        //After finding user, lets check password.
        else{
            if(user.password != password){
                response.status(403).json({message: "Credentials does not Matching !"});
            }
            //After confirming all of those credentials, we are generating token here.
            else{
                const token = jwt.sign({},secretKey,Options);
                let model = {token: token, user: user};

                response.json(model);
            }
        }

    } 
    catch (error) {
        response.status(500).json({message: error.message}); //This line appears when there is error in api request.
    }
})
module.exports = router;