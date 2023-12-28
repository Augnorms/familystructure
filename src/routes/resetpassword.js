const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../dbconnect");

router.put("/", async (req, res) => {
  const { password, id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "UPDATE logins SET password = ? WHERE loginId = ? LIMIT 1",
      [hashedPassword, id],
      (err, result) => {
        if (err) {
          console.error("Error updating password:", err);
          return res.status(500).json({
            code: 500,
            status: false,
            message: "Internal server error",
          });
        }

        if (result.affectedRows > 0) {
          return res.status(200).json({
            code: 200,
            status: true,
            message: "Password reset successful",
          });
        } else {
          return res.status(404).json({
            code: 404,
            status: false,
            message: "User not found or no rows updated",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({
      code: 500,
      status: false,
      message: "Internal server error (password hashing)",
    });
  }
});

module.exports = router;
