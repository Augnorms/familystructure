const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

// Endpoint to handle adding relationships
router.post("/", async (req, res) => {

  const { parent_id, child_ids } = req.body;

  try {
    // Execute the query for each child ID
    for (const child_id of child_ids) {
        await db.promise().query("INSERT INTO relationships (parent_id, child_id) VALUES (?, ?)", [Number(parent_id), Number(child_id)]);
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Relationships created successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

module.exports = router;
