const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/", async(req, res)=>{
   try{

    const [femaleRes] = await db.promise().query("SELECT * FROM members WHERE gender = 2");

    if(femaleRes){
        res.status(200).json({
            code:200,
            status:true,
            message:"sucess",
            count:femaleRes.length
        })
    }

   }catch(error){
    res.status(500).json({
        code:500,
        status:false,
        message:"Failed to fetch Internal server error",
        err:error.message
    })
   }
});

module.exports = router;