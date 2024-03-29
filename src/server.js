const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginEndpoint");
const emailVerification = require("./routes/emailVerification");
const verification = require("./routes/verification");
const resetpassword = require("./routes/resetpassword");
const getalluers = require("./dashboardRoutes/getallusers");
const getallverifications = require("./dashboardRoutes/getallverifictions");
const createprofile = require("./dashboardRoutes/createuserprofil");
const getuserprofile = require("./dashboardRoutes/getuserprofile");
const updateuserprofile = require("./dashboardRoutes/updateuserprofile");
const creatmembers = require("./MembersRoute/createmembers");
const getallmembers = require("./MembersRoute/getallmebers");
const createrelationship = require("./MembersRoute/createrelationship");
const hierarchy = require("./MembersRoute/hierarchy");
const allmemmbers = require("./Allmembers/createallmembers");
const fetchallmembers = require("./Allmembers/fetchAllmembers");
const fetchmemberbyid = require("./Allmembers/fetchmemberbyid");
const updatemember = require("./Allmembers/updatemember");
const deletemember = require("./Allmembers/Deletemember");
const allmemberscount = require("./SummaryRoutes/allmemberscount");
const allfemalecount = require("./SummaryRoutes/allfemalecount");
const allmales = require("./SummaryRoutes/allmelecount");
const edituser = require("./routes/editUser");
const deleteuser = require("./routes/deleteUser");

app.use(express.json());
app.use(cors());

//routers defined here
app.use("/createuser", createUser);
app.use("/login", loginUser);
app.use("/emailverification", emailVerification);
app.use("/verification", verification);
app.use("/resetpassword", resetpassword);
app.use("/getalluers", getalluers);
app.use("/getallverifications", getallverifications);
app.use("/createprofile", createprofile);
app.use("/getuserprofile",getuserprofile);
app.use("/updateuserprofile", updateuserprofile);
app.use("/creatmember", creatmembers);
app.use("/getallmembers", getallmembers);
app.use("/createrelationship", createrelationship);
app.use("/hierarchy", hierarchy);
app.use("/allmemmbers", allmemmbers);
app.use("/fetchallmembers", fetchallmembers);
app.use("/fetchmemberbyid", fetchmemberbyid);
app.use("/updatemember", updatemember);
app.use("/deletemember", deletemember);
app.use("/allmemberscount", allmemberscount);
app.use("/allfemalecount", allfemalecount);
app.use("/allmales", allmales);
app.use("/edituser", edituser);
app.use("/deleteuser", deleteuser);

let port = 4000;

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);  
});