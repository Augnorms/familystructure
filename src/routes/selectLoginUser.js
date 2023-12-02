const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/:id", (req, res)=>{
   const loginuserId = req.params.id
   
   db.query("SELECT loginId, username, password, firstname, lastname, email, isadmin FROM logins where loginId = ?",
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
        const userData = resdata[0];

        const responseData = {
            id: userData.loginId,
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            isadmin: userData.isadmin === 1 ? true : false,
          };
  
          res.status(201).json({
            success: true,
            code: 201,
            message: "data available for userid" + loginuserId,
            data: responseData,
          });
    }
   });
});

module.exports = router;