const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const {v4:uuidv4} = require("uuid");

const response = require("../services/response.service");
//method resposne() and refference response is differet. reffernece response it long veriison of res, we can chagne to that too.
router.post("/add", async (req, res) => {
    response(res, async()=> {
        const{name} = req.body;

        const checkName = await Category.findOne({name:name});
        if(checkName != null){
            res.status(403).json({message: "This category name is already taken!"});
        }

        else{
            const category = new Category({
                _id: uuidv4(),
                name: name
            })
    
            await category.save();
            res.json({message: "Data Succesfully Registred..."});
        }
    });
});

router.post("/DeleteById", async(req, res)=>{
    response(res, async()=> {
        const{_id} = req.body;

        await Category.findByIdAndDelete(_id);
        res.json({message: "Data embarked on a journey into the void..."});
    });
});

router.post("/update", async(req, res)=>{
    response(res, async() => {
        const{_id, name} = req.body;
        const category = await Category.findOne({_id:_id}); //we need to first find the category.

        if(category.name != name ){
            const checkName = await Category.findOne({name: name});//let's search name once,
            if(checkName != null){
                res.status(403).json({message: "Upss.. Name Already in Use !"});
            }
            else{
                category.name = name;
                await Category.findByIdAndUpdate(_id, category); // Update with new name only
                //if error occurs change {{name}} to category.
                res.json({message: "Data Successfuly Updated..."});
            }
        }
    });
});


router.get("/", async(req, res)=>{
    response(res, async()=>{
        const categories = await Category.find().sort({name: 1}); //List all of the data according to their first letter.
        res.json(categories);
    })

})

module.exports = router;//we need this so that this code can get out its folder.