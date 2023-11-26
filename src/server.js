const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginEndpoint");

app.use(express.json());

//routers defined here
app.use("/createuser", createUser);
app.use("/login", loginUser);

let port = 4000;

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);  
});