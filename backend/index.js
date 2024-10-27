const express = require("express");
const app = express();
const cors =require("cors")

app.use(express.json()); //With this line, we are telling that whole request wil be formatted in json.
app.use(cors())//we are making, every website allowed to reach.

app.get("",(request, response) => {
    response.json({message: "API request works fine..."});
}) 

//since macos ventura using port 5000 for airdrop, I assigned port number 5001.
const port= process.env.port || 5001; //if the port did not appointed, assigned port will  become 5001.
app.listen(port,()=>console.log("The App is running on port 5001 http://localhost:5001"));
