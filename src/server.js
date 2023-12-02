const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginEndpoint");
const getalllogins = require("./routes/getAllLogins");
const editloginuser = require("./routes/editLoginUser");
const selectloginuser = require("./routes/selectLoginUser");

app.use(express.json());

//routers defined here
app.use("/createuser", createUser);
app.use("/login", loginUser);
app.use("/getalllogins", getalllogins);
app.use("/editloginuser", editloginuser);
app.use("/selectloginuser", selectloginuser);

let port = 4000;

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);  
});