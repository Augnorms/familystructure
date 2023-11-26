const express = require("express");
const db = require("../dbconnect");
const token = require("jsonwebtoken");
const router = express.Router();
const bycrypt = require("bcrypt");

router.post("/", async(req, resp)=>{
    const {username, password, firstname, lastname, email} = req.body;

    try{
        const hashedpassword = await bycrypt.hash(password, 10);

        db.query(
            'INSERT INTO logins (username, password, firstname, lastname, email) VALUES (?, ?, ?, ?, ?)',
            [username, hashedpassword, firstname, lastname, email],
            (err, users)=>{

               if(err){
                 resp.status(401).json({
                    status:false,
                    code:401,
                    message:`user creation failed ${err}`
                 });
               }else{
                  resp.status(201).json({
                    status:true,
                    code:201,
                    message:"user created successfully"
                  });
               } 

            }
        )
    }catch(error){
        resp.status(500).json({
            status: false,
            code: 500,
            message: "Error: " + error.message,
        });
    }
});

module.exports = router;