const mongoose = require("mongoose");
const shoopingCartSchema = new mongoose.Schema({
    _id: String,
    productId: String,
    price: Number,
    quantity: Number,
    userId: String
});

const Cart = mongoose.model("Cart", shoopingCartSchema);
module.exports = Cart;