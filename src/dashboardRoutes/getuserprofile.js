const express = require("express");
const db = require("../dbconnect");
const router = express.Router();


router.post("/",async(req, res)=>{
    const {loginid} = req.body

    if(loginid){
        
    const [fetchRes] = await db.promise().query("SELECT * FROM userprofile WHERE loginId = ?",[loginid]);

    if(fetchRes){
        res.status(200).json({
            code:200,
            status:true,
            message:"fetched data successfully",
            data:fetchRes
        })
    }else{
        res.status(200).json({
            code:500,
            status:false,
            message:"failed to fetch internal server error"
        })
    }
  }

})

module.exports = router;