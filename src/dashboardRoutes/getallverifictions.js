const express = require("express");
const db = require("../dbconnect");
const router = express.Router();


router.get("/", async(req, res)=>{
    const [response] = await db.promise().query("SELECT * FROM verification_codes;");

    if(response.length > 0){
        res.status(200).json({
            code:200,
            status:true,
            message:"success",
            data:response
         })
    }else if(response.length == 0){
        res.status(201).json({
            code:201,
            status:true,
            message:" data empty for now",
            data:[]
        })
   }else{
        res.status(400).json({
            code:400,
            status:false,
            message:"Failed to get verifications"
         })
    }
});

module.exports = router;