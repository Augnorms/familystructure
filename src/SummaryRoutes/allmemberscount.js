const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/", async(req, res)=>{
   try{
    const [memCount] = await db.promise().query("SELECT * FROM members");

    if(memCount){
        res.status(200).json({
            code:200,
            status:true,
            count:memCount.length
        })
    }

   }catch(error){
    res.status(500).json({
        code:500,
        status:false,
        message:"Failed to fetch count members",
        err:error.message
    });
   }
});

module.exports = router;