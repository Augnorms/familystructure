const express = require("express");
const db = require("../dbconnect");
const router = express.Router();


router.post("/",async(req, res)=>{
   
    const {
        loginId,
        profilefirstname,
        profilelastname,
        profileemail,
        profilegender,
        profiledateofbirth,
        profileplaceofbirth,
        profileoccupation,
        profilenationality,
        profilephonenumber,
        profilemother,
        profilefather,
        profilemaritalstatus,
        profilenumberofchildren,
        profileprimaryeducation,
        profilesecondaryeducation,
        profiletertiaryeducation,
        profilehometown,
      } = req.body;
    
      const [updateResponse] = await db
        .promise()
        .query(
          `UPDATE userprofile 
           SET 
            profilefirstname = ?, 
            profilelastname = ?, 
            profileemail = ?, 
            profilegender = ?, 
            profiledateofbirth = ?, 
            profileplaceofbirth = ?, 
            profileoccupation = ?, 
            profilenationality = ?, 
            profilephonenumber = ?, 
            profilemother = ?, 
            profilefather = ?, 
            profilemaritalstatus = ?, 
            profilenumberofchildren = ?, 
            profileprimaryeducation = ?, 
            profilesecondaryeducation = ?, 
            profiletertiaryeducation = ?, 
            profilehometown = ?
           WHERE loginId = ?`,
          [
            profilefirstname,
            profilelastname,
            profileemail,
            profilegender,
            profiledateofbirth,
            profileplaceofbirth,
            profileoccupation,
            profilenationality,
            profilephonenumber,
            profilemother,
            profilefather,
            profilemaritalstatus,
            profilenumberofchildren,
            profileprimaryeducation,
            profilesecondaryeducation,
            profiletertiaryeducation,
            profilehometown,
            loginId,
          ]
        );
    
      if (updateResponse) {
        const [fetchRes] = await db.promise().query("SELECT * FROM userprofile");
    
        res.status(200).json({
          code: 200,
          status: true,
          message: "Data updated successfully",
          data: fetchRes[0],
        });
      } else {
        res.status(500).json({
          code: 500,
          status: false,
          message: "Internal server error",
        });
      }
    });

module.exports = router;