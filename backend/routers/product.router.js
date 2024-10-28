const express = require("express");
const Product= require("../models/product");
const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");

const router = express.Router();
const response = require("../services/response.service");

//Let's design adding product method.
router.post("/add", upload.array("images"),async(req, res) => {
    response(res, async ()=>{
        const {name, stock,price, categories} = req.body;

        const productId = uuidv4();
        let product = new Product({
            _id: productId,
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            categories: categories,
            isActive: true,
            imageUrls: req.files,
            createdDate: new Date()
        })
        await product.save();

        res.json({message: "Succesfully added the Item!"});
    });
});

//Let's design deleting products.
router.post("/deleteById", async (req, res) => {
    response(res, async() => {
        const {_id} = req.body;

        const product = await Product.findById(_id);
        //we need to delete it's pictures' as well. Hence, we need to find it first.
        for(const image of product.imageUrls){
            fs.unlink(image.path, ()=> {});
        }

        await Product.findByIdAndDelete(_id);
        res.json({message: "The Product successfully deleted..."});
    });
});