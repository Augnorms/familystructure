const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, gender, dob, hometown } = req.body;

  // Check if a record with the same name already exists
  const [existingRecord] = await db
    .promise()
    .query("SELECT * FROM members WHERE name = ?", [name]);

  if (existingRecord.length > 0) {
    // Record with the same name already exists
    return res.status(400).json({
      code: 400,
      status: false,
      message: "Record with the same name already exists",
    });
  }

  // Insert the new record
  const response = await db
    .promise()
    .query(
      "INSERT INTO members (name, gender, dob, hometown) VALUES (?, ?, ?, ?)",
      [name, gender, dob, hometown]
    );

  if (response) {
    // Fetch the updated data after insertion
    const [fetchRes] = await db.promise().query("SELECT * FROM members WHERE name = ?",[name]);

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Data created successfully",
      data: fetchRes,
    });
  } else {
    return res.status(400).json({
      code: 400,
      status: false,
      message: "Data creation failed",
    });
  }
});

module.exports = router;
