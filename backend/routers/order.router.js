const express = require ("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");

const Order = require("../models/order");
const Cart = require("../models/shoppingCart");
const response = require("../services/response.service");

router.post("/create", async(req, res) => {
response(res, async() => {
    const {userId} = req.body;
    
    let carts = await Cart.find({userId: userId});
    //for each does not support async, hence we used for with of.
    for(const cart of carts){

        let order = new Order();

        order._id = uuidv4();
        order.productId = cart.productId;
        order.price = cart.price;
        order.quantity = cart.quantity;
        order.userId = userId;
        order.createdDate = new Date();

        await order.save();
        await Cart.findByIdAndDelete(cart._id);
    }

    res.json({message:"Your order has been placed successfully!"});

    });
});

router.post("/", async(req,res) => {
    response(res, async() => {
        const {userId} = req.body;
        let orders = await Order.aggregate([
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
        ])
        //to list last added to top.
        .sort({createdDate: -1});
        res.json(orders);

    });
});

module.exports = router;