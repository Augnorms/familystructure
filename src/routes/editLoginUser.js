const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.put("/", (req, res)=>{
    const {userid, username, firstname, lastname, email, isadmin} = req.body;
    const isAdminValue = isadmin ? 1 : 0;
    
    db.query("UPDATE logins SET username = ?, firstname = ?, lastname = ?, email = ?, isadmin = ? WHERE loginId = ? LIMIT 1",
    [username, firstname, lastname, email, isAdminValue, userid],
    (err, resdata)=>{
      if(err){
        res.status(401).json({
            success:false,
            code:401,
            message:"Failed to update user "+ username+ " "+err.message
        });
      }else if(resdata.length === 0){
        res.status(401).json({
            success:false,
            code:401,
            message:"Failed to update user "+ username
        }); 
      }else{
        res.status(201).json({
            success:true,
            code:201,
            message:`user ${username} has been updated successfully`
        });
      }
    });
    
});

module.exports = router;