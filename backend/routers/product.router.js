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

//Let's implement bring product list, hence we don't wantto search among all of those items. 
//User can need only items that is listed on the specific pages, not other items in other categories.
//so we used pagination.
router.post("/", async(req, res) => {
    response(res, async()=> {
        const {pageNumber, pageSize, search} = req.body;

        //let's implement, bring all those items that includes this part.
        let productCount = await Product.find({
            $or:[
                {
                    name: {$regex: search, $options: 'i'} //options i is ignoring upper-lowercase typos.
                }
            ]
        }).count();
        //this is the listing part
        let products = await Product
        .find({
            $or:[
                {
                    name: {$regex: search, $options: 'i'} //options i is ignoring upper-lowercase typos.
                }
            ]
        }).sort({name:1}) //1 is for smaller to bigger, -1 is for bigger to smaller
        .populate("categories")
        .skip((pageNumber -1)*pageSize) //we are reducing 1 hence, page number usually starts from the 1 not 0.
        .limit(pageSize);

        let totalPageCount = Math.ceil(productCount / pageSize);
        let model ={
            data: products,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPageCount: totalPageCount,
            isFirstPage: pageNumber == 1 ? true : false,
            isLastPage: totalPageCount == pageNumber ? true : false,
        };

        res.json(model);

    });
});

//Let's implement status of the products,
router.post("/changeActiveStatus", async(req, res) => {
    response(res, async() => {
        const {_id} = req.body;
        let product = await Product.findById(_id);
        product.isActive = !product.isActive;
        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Status of the product succesfully changed..."});
    });
});

//let's impelment bring product by id.
router.post("/getById", async(req, res) => {
    response(res, async()=>{
        const {_id} = req.body;
        let product = await Product.findById(_id);
        res.json(product);
    });
});

//Let's impelment Update method, however, we need to delete the iamges and upload them again.
router.post("/update", upload.array("images"), async(req, res) => {
    response(res, async() => {
        const {_id, name, stock, price, categories} = req.body; //we get all the related info here,
        //with these group, we unlink, remove the images,
        let product = await Product.findById(_id);
        for(const image of product.imageUrls){
            fs.unlink(image.path, () => {});
        }
        //we are emereging the list again with the new images.
        let imageUrls;
        imageUrls = [...product.imageUrls, ...req.files]
        product = {
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            imageUrls: imageUrls,
            categories: categories
        };
        //these group finishes the update method.
        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Succesfully Updated !"});
    });
})

//Let's implement delete image,
router.post("/removeImageByProductIdAndIndex", async(req, res) => {
    response(res, async() => {
        const {_id, index} = req.body;
        
        let product = await Product.findById(_id);
        if(product.imageUrls.length == 1){
            res.status(400).json({message: "At least one image must be posted per product ! Unauthorized to delete..."});
        }

        else{
            let image = product.imageUrls[index];//lets find the selected image first,
            product.imageUrls.splice(index,1);
            await Product.findByIdAndUpdate(_id, product);
            fs.unlink(image.path, () => {});
            res.json({message: "Successfully removed the image...."});
        }
    });
});

module.exports = router; //lets share product router.