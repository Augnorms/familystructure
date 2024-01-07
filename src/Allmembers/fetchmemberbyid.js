const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.post("/", async (req, res) => {
    const { refid } = req.body;

    try {
        const fetchQuery = `
            SELECT m.name, m.gender, m.dob, m.hometown,
                   md.details_id, md.mememail, md.memmother, md.memfather, md.memmaritalstatus,
                   md.memprimaryeducation, md.memsecondaryeducation, md.memtertiaryeducation,
                   md.memoccupation, md.memnumberofchildren, md.memplaceofbirth, md.isUpdate
            FROM members m
            JOIN membersdetails md ON m.id = md.memuserId
            WHERE md.memuserId = ?  
        `;

        const [resFetch] = await db.promise().query(fetchQuery, [refid]);

        res.status(200).json({
            code: 200,
            status: true,
            message: "Successfully fetched data by refid",
            data: resFetch,
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            status: false,
            message: "Failed to fetch data by refid",
            err: error.message,
        });
    }
});

module.exports = router;
