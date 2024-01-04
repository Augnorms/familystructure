const express = require("express");
const db = require("../dbconnect");
const router = express.Router();


router.post("/", async(req, res)=>{
    const { loginId, profilefirstname, profilelastname, profileemail, 
        profilegender, profiledateofbirth, profileplaceofbirth, profileoccupation, 
        profilenationality, profilephonenumber, profilemother, profilefather, profilemaritalstatus, 
        profilenumberofchildren, profileprimaryeducation, profilesecondaryeducation, profiletertiaryeducation, profilehometown } = req.body;

        const [insertResponse] = await db.promise().query(
            `INSERT INTO userprofile 
             (loginId, profilefirstname, profilelastname, profileemail, 
              profilegender, profiledateofbirth, profileplaceofbirth, profileoccupation, 
              profilenationality, profilephonenumber, profilemother, profilefather, profilemaritalstatus, 
              profilenumberofchildren, profileprimaryeducation, profilesecondaryeducation, profiletertiaryeducation, profilehometown, profileisupdate)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [loginId, profilefirstname, profilelastname, profileemail, 
             profilegender, profiledateofbirth, profileplaceofbirth, profileoccupation, 
             profilenationality, profilephonenumber, profilemother, profilefather, profilemaritalstatus, 
             profilenumberofchildren, profileprimaryeducation, profilesecondaryeducation, profiletertiaryeducation, profilehometown, true]) 

          if(insertResponse){

            const[fetchRes] =  await db.promise().query("SELECT * FROM userprofile");

            res.status(200).json({
                code:200,
                status:true,
                message:"data created successfully",
                data:fetchRes[0]
            })
          } else{
            res.status(200).json({
                code:500,
                status:false,
                message:"Internal server error",
            })
          }  

});

module.exports = router;