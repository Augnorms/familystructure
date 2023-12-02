const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.put("/", (req, res)=>{
    const {userid} = req.body;

    
});

module.exports = router;