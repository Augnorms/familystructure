const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.put("/", async(req, res)=>{
   const {
    memuserId, mememail, memmother, memfather, memmaritalstatus, 
    memprimaryeducation, memsecondaryeducation, memtertiaryeducation,
    memoccupation, memnumberofchildren, memplaceofbirth
   } = req.body;

   try{

    const query = `UPDATE membersdetails SET mememail = ?, memmother = ?, memfather = ?, memmaritalstatus = ?, 
    memprimaryeducation = ?, memsecondaryeducation = ?, memtertiaryeducation = ?,  memoccupation = ?, memnumberofchildren = ?, 
    memplaceofbirth = ? WHERE memuserId = ?
    `;

    const data = [mememail, memmother, memfather, memmaritalstatus, memprimaryeducation, memsecondaryeducation, memtertiaryeducation, 
        memoccupation, memnumberofchildren, memplaceofbirth, memuserId];

    const [updateRes] = await db.promise().query(query, data);

    if(updateRes){
        res.status(200).json({
            code:200,
            status:true,
            message:"successfully updated members details",
        });
    }

   }catch(error){
    res.status(500).json({
        code:500,
        status:false,
        message:"Failed to update",
        err:error.message
    });
   }

});

module.exports = router;