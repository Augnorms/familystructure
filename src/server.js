const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginEndpoint");
const emailVerification = require("./routes/emailVerification");
const verification = require("./routes/verification");

app.use(express.json());
app.use(cors());

//routers defined here
app.use("/createuser", createUser);
app.use("/login", loginUser);
app.use("/emailverification", emailVerification);
app.use("/verification", verification);

let port = 4000;

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);  
});