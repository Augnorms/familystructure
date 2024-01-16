const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.put("/", async(req, res)=>{
    const {editid, username, firstname, lastname, email, isadmin} = req.body

    try{

        const [updateRes] = await db.promise().query(`
        UPDATE logins 
        SET username = ?, 
            firstname = ?, 
            lastname = ?, 
            email = ?, 
            isadmin = ?
        WHERE loginId = ?`,
        [username, firstname, lastname, email, isadmin, editid]
      );

     if(updateRes){
        res.status(200).json({
            code:200,
            status:true,
            message:"update successfull",
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
});

module.exports = router;