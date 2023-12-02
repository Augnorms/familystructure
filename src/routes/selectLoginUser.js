const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/:id", (req, res)=>{
   const {loginuserId} = req.params
      
   db.query("SELECT loginId, username, password, firstname, lastname, email, isadmin FROM login where loginId = ?",
   [loginuserId],
   (err, resdata)=>{
    if(err){
        res.status(401).json({
            success:false,
            code:401,
            message:"Failed to get data for this user id " +loginuserId +" "+ err.message
        });
    }else if(resdata.length == 0){
        res.status(401).json({
            success:false,
            code:401,
            message:"Failed to get data for this user id " +loginuserId +" "+ err.message
        });
    }else{
        res.status(201).json({
            success:true,
            code:201,
            message:"data available for userid"+ loginuserId,
            data:resdata[0]
        });
    }
   });
});

module.exports = router;