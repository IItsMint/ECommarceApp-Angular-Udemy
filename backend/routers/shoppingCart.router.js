const express = require ("express");
const router = express.Router();

const response = require("../services/response.service");
const Cart = require("../models/shoppingCart");
const Product= require("../models/product")

const {v4:uuidv4} = require("uuid")

router.post("/add", async (req, res) => {
    response(res, async() => {
        const{userId, productId, price, quantity} = req.body;

        let cart = new Cart();
            cart._id = uuidv4();
            cart.userId = userId;
            cart.productId = productId;
            cart.price = price;
            cart.quantity = quantity;

            await cart.save();

            let product = await Product.findById(productId);
            product.stock -= quantity;
            await Product.findByIdAndUpdate(productId, product);

            res.json({message: "Great choice! Product added to your shopping cart."});
    });
});

router.post("/removeById", async(req, res) => {
    response(res, async() => {
        const {_id} = req.body;// we need know the who is doing this.

        let cart = await Cart.findById(_id);

        let product = await Product.findById(cart.productId);
        product.stock += cart.quantity;
        await Product.findByIdAndUpdate(cart.productId, product);

        await Cart.findByIdAndDelete(_id);
        res.json({message: "Succefully removed the item."})
    });
});

router.post("/", async(req, res) => {
    response(res, async() => {
        const {userId} = req.body;// we need know the who is doing this.

        const carts = await Cart.aggregate([
            {
                $match: {userId: userId}
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                }
            }
        ]);

        res.json(carts);

    });
});

router.post("/getCount", async(req, res) => {
    response(res, async() => {
        const {userId} = req.body; // we need know the who is doing this.

        const count = await Cart.find({userId: userId}).countDocuments();
        res.json({count: count});
    });
});

module.exports = router;