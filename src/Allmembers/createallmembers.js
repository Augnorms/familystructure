const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.post("/",async(req, res)=>{
    const {
        memuserId, mememail, memmother, memfather, memmaritalstatus, 
        memprimaryeducation, memsecondaryeducation, memtertiaryeducation,
        memoccupation, memnumberofchildren, memplaceofbirth,   
    } = req.body;

  try{

    const insertQuery = `
    INSERT INTO membersdetails (
        memuserId, mememail, memmother, memfather, memmaritalstatus, 
        memprimaryeducation, memsecondaryeducation, memtertiaryeducation,
        memoccupation, memnumberofchildren, memplaceofbirth, isUpdate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const insertValues = [
    memuserId, mememail, memmother, memfather, memmaritalstatus, 
    memprimaryeducation, memsecondaryeducation, memtertiaryeducation,
    memoccupation, memnumberofchildren, memplaceofbirth, true
]

    const [inserRes] = await db.promise().query(insertQuery, insertValues);

    if(inserRes){
        const fetchQuery = `
        SELECT m.name, m.gender, m.dob, m.hometown,
               md.mememail, md.memmother, md.memfather, md.memmaritalstatus,
               md.memprimaryeducation, md.memsecondaryeducation, md.memtertiaryeducation,
               md.memoccupation, md.memnumberofchildren, md.memplaceofbirth, md.isUpdate
        FROM members m
        JOIN membersdetails md ON m.id = md.memuserId
    `;

     const [resFetch] = await db.promise().query(fetchQuery);

     res.status(200).json({
        code:200,
        status:true,
        message:"successfully created members details",
        data:resFetch
    });

    }

  }catch(error){
    res.status(500).json({
        code:500,
        status:false,
        message:"Failed to create",
        err:error.message
    });
  }
});

module.exports = router;