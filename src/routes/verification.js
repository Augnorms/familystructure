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
        
        const user_id_query = "SELECT user_id FROM verification_codes WHERE code = ?";
        db.query(user_id_query, [verificationnumber], (err, userResult) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            const user_id = userResult.length > 0 ? userResult[0].user_id : null;

            res.status(201).json({
              success: true,
              code: 201,
              message: "Verification successful",
              user_id: user_id,
            });
          }
        });
      } else {
        res.status(401).json({
          success: false,
          code: 401,
          message: "Invalid verification number or expired",
        });
      }
    }
  });
});

module.exports = router;
