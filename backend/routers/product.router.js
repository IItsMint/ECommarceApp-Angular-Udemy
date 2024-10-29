const express = require("express");
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");

const router = express.Router();

// Let's design adding product method.
router.post("/add", upload.array("images"), async (req, res) => {
    response(res, async () => {
        const { name, stock, price, categories } = req.body;

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
        });
        await product.save();

        res.json({ message: "Successfully added the Item!" });
    });
});

// Let's design deleting products.
router.post("/deleteById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;

        const product = await Product.findById(_id);
        // we need to delete its pictures as well.
        for (const image of product.imageUrls) {
            fs.unlink(image.path, () => { });
        }

        await Product.findByIdAndDelete(_id);
        res.json({ message: "The Product successfully deleted..." });
    });
});

// Let's implement bring product list with pagination.
router.post("/", async (req, res) => {
    response(res, async () => {
        const { pageNumber, pageSize, search } = req.body;

        let productCount = await Product.countDocuments({
            $or: [
                {
                    name: { $regex: search, $options: 'i' }
                }
            ]
        });

        // This is the listing part
        let products = await Product
            .find({
                $or: [
                    {
                        name: { $regex: search, $options: 'i' }
                    }
                ]
            }).sort({ name: 1 })
            .populate("categories")
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        let totalPageCount = Math.ceil(productCount / pageSize);
        let model = {
            data: products,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPageCount: totalPageCount,
            isFirstPage: pageNumber === 1,
            isLastPage: totalPageCount === pageNumber,
        };

        res.json(model);
    });
});

// Let's implement status of the products.
router.post("/changeActiveStatus", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        let product = await Product.findById(_id);
        product.isActive = !product.isActive;
        var result =await Product.findByIdAndUpdate(_id, product);
        console.log(result);
        res.json({ message: "Status of the product successfully changed..." });
    });
});

// Let's implement bring product by id.
router.post("/getById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        let product = await Product.findById(_id);
        res.json(product);
    });
});

// Let's implement Update method.
router.post("/update", upload.array("images"), async (req, res) => {
    response(res, async () => {
        const { _id, name, stock, price, categories } = req.body;
        let product = await Product.findById(_id);

        // Remove old images
        for (const image of product.imageUrls) {
            fs.unlink(image.path, () => { });
        }

        // Update product details
        let imageUrls = [...product.imageUrls, ...req.files];
        product = {
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            imageUrls: imageUrls,
            categories: categories
        };

        await Product.findByIdAndUpdate(_id, product);
        res.json({ message: "Successfully Updated!" });
    });
});

// Let's implement delete image.
router.post("/removeImageByProductIdAndIndex", async (req, res) => {
    response(res, async () => {
        const { _id, index } = req.body;

        let product = await Product.findById(_id);
        if (product.imageUrls.length === 1) {
            res.status(400).json({ message: "At least one image must be posted per product! Unauthorized to delete..." });
        } else {
            let image = product.imageUrls[index];
            product.imageUrls.splice(index, 1);
            await Product.findByIdAndUpdate(_id, product);
            fs.unlink(image.path, () => { });
            res.json({ message: "Successfully removed the image...." });
        }
    });
});

module.exports = router; // Share product router.
