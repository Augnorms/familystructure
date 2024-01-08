const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.post("/", async(req, res)=>{
   const {deleteid} = req.body;
   try{

    const [deleteRes] = await db.promise().query("DELETE FROM membersdetails WHERE memuserId = ?", [deleteid]);

    if(deleteRes){
        res.status(200).json({
            code:200,
            status:true,
            message:"successfully Deleted members details",
        });
    }

   }catch(error){
    res.status(500).json({
        code:500,
        status:false,
        message:"Failed to Delete",
        err:error.message
    });
   }
});

module.exports = router;