const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/", async(req, res)=>{
   const [members] = await db.promise().query("SELECT * FROM members");
 
   if(members){
     res.status(200).json({
        code:200,
        status:true,
        message:"fetched data successful",
        data:members
     })
   }else{
    res.status(400).json({
        code:400,
        status:false,
        message:"fetched data failed"
     })
   }

});

module.exports = router;