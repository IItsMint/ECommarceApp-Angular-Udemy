const express = require("express");
const app = express();
const cors =require("cors");
const connection = require("./database/db");
const path = require("path");

app.use(express.json()); //With this line, we are telling that whole request wil be formatted in json.
app.use(cors())//we are making, every website allowed to reach.

//we need to share uplaods folder to access images from outsite in read mode.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");
const productRouter = require("./routers/product.router"); //we need to share api methods of the products
const cartRouter = require("./routers/shoppingCart.router");

//With these line, we dont need to make configurations after adding new api, since it accepts all those apis with this line.
app.use("/api/auth",authRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);


/* Lets Check API request.
app.get("",(request, response) => {
    response.json({message: "API request works fine..."});
}) 
*/

connection();

//since macos ventura using port 5000 for airdrop, I assigned port number 5001.
const port= process.env.port || 5001; //if the port did not appointed, assigned port will  become 5001.
app.listen(port,()=>console.log("The App is running on port 5001 http://localhost:5001"));
