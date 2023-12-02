const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/", (req, res)=>{
    db.query("SELECT * FROM logins", (err, resdata)=>{
       if(err){
        res.status(401).json({
            success:false,
            code:401,
            message:"Failed to fetch data"
        })
       }else if(resdata.length == 0){
        res.status(401).json({
            success:false,
            code:401,
            message:"Failed to fetch data"
        })
       }else{
         res.status(201).json({
            success:true,
            code:201,
            message:"data available",
            data:resdata
         });
       }
    });
});


module.exports = router;