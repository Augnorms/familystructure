const express = require("express");
const db = require("../dbconnect");
const jwtoken = require("jsonwebtoken");
const router = express.Router();
const bycrypt = require("bcrypt");


router.get("/", (req, res)=>{
    const {username, password} = req.body;
    
    db.query('SELECT username, password FROM logins WHERE username = ?', 
    [username], 
    (err, resData)=>{
       if(err){
        res.status(401).json({
          success:false,
          code:401,
          message:"Failed to login username, password incorrect"
        });
       }else if(resData.length === 0){
        res.status(401).json({
            success:false,
            code:401,
            message:"Failed to login username, password incorrect"
          });
       }else{
         const user = resData[0]
         const isPassword = bycrypt.compare(password, user.password);

         if(isPassword){
            const token = jwtoken.sign({ username: user.username }, "validate12345", {
                expiresIn: "1h", 
            });

            db.query("SELECT loginId, password, email, firstname, lastname, isadmin FROM logins Where username = ?", [username], (err, response)=>{
                if(err){
                    res.status(401).json({
                        message:"Failed to fetch"
                    });
                }else{
                    res.status(201).json({
                        success:true,
                        code:201,
                        message:"login successful",
                        token:token,
                        data:response
                    });
                }
            });
         }else{
            res.status(401).json({
                success:false,
                code:401,
                message:"Failed to login username, password incorrect"
              });
         }
       }
    });

});

module.exports = router;