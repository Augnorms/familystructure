const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.post("/", (req, res) => {
    const { verificationnumber } = req.body;
  
    db.query("SELECT code FROM verification_codes", async (err, resData) => {
      if (err || resData.length === 0) {
        res.status(401).json({
          success: false,
          code: 401,
          message: "Failed to get codes",
        });
      } else if (resData.length > 0) {
   
        const now = new Date();
        const validCodes = resData.filter(
          (row) => row.code === verificationnumber && new Date(row.expiration_time) > now
        );
    
        if (validCodes) {
          res.status(201).json({
            success: true,
            code: 201,
            message: "Verification successful",
          });
        } else {
          res.status(401).json({
            success: false,
            code: 401,
            message: "Invalid verification number",
          });
        }
      }
    });
  });
  
  

module.exports = router;