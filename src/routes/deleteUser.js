const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.post("/", async(req, res)=>{
    const {deleteId} = req.body;
console.log(deleteId)
    try{
       const [deleteRes] = await db.promise().query("DELETE FROM logins WHERE loginId = ? LIMIT 1", [deleteId]);

       if(deleteRes){
        res.status(200).json({
            code:200,
            status:true,
            message:"Delete successfull",
        })
     }

    }catch(error){
        res.status(500).json({
            code:500,
            status:false,
            message:"Internal server error",
            error:error.message
        })
    }
  
})

module.exports = router;