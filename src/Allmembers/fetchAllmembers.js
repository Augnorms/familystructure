const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/", async(req, res)=>{

    try{
      
   const fetchQuery = `
        SELECT m.name, m.gender, m.dob, m.hometown,
               md.details_id, md.mememail, md.memmother, md.memfather, md.memmaritalstatus,
               md.memprimaryeducation, md.memsecondaryeducation, md.memtertiaryeducation,
               md.memoccupation, md.memnumberofchildren, md.memplaceofbirth, md.isUpdate
        FROM members m
        JOIN membersdetails md ON m.id = md.memuserId ORDER BY md.details_id DESC
    `;   

     const [fetchAllres] = await db.promise().query(fetchQuery);

     res.status(200).json({
        code:200,
        status:true,
        message:"success",
        data:fetchAllres
    });

    }catch(error){
        res.status(500).json({
            code:500,
            status:false,
            message:"Failed to fetch all data",
            err:error.message
        });
    }

});

module.exports = router;