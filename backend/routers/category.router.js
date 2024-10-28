const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const {v4:uuidv4} = require("uuid");

router.post("/add", async (request, response) => {
    try {
        const{name} = request.body;

        const checkName = await Category.findOne({name:name});
        if(checkName != null){
            response.status(403).json({message: "This category name is already taken!"});
        }

        else{
            const category = new Category({
                _id: uuidv4(),
                name: name
            })
    
            await category.save();
            response.json({message: "Data Succesfully Registred..."});
        }

    } 
    catch (error) {
        response.status(500).json({message: error.message});
    }
})

router.post("/DeleteById", async(request, response)=>{
    try {
        const{_id} = request.body;

        await Category.findByIdAndDelete(_id);
        response.json({message: "Data embarked on a journey into the void..."});
    } 
    catch (error) {
        response.status(500).json({message: error.message});
    }
})

router.post("/update", async(request, response)=>{
    try {
        const{_id, name} = request.body;
        const category = await Category.findOne({_id:_id}); //we need to first find the category.

        if(category.name != name ){
            const checkName = await Category.findOne({name: name});//let's search name once,
            if(checkName != null){
                response.status(403).json({message: "Upss.. Name Already in Use !"});
            }
            else{
                category.name = name;
                await Category.findByIdAndUpdate(_id, category); // Update with new name only
                //if error occurs change {{name}} to category.
                response.json({message: "Data Successfuly Updated..."});
            }
        }


    } 
    catch (error) {
        response.status(500).json({message: error.message});
    }
})

router.get("/", async(request, response)=>{
    try {
        const categories = await Category.find().sort({name: 1}); //List all of the data according to their first letter.
        response.json(categories);
    } 
    catch (error) {
        response.status(500).json({message: error.message});
    }
})

module.exports = router;//we need this so that this code can get out its folder.