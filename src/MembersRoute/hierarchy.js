const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

// Recursive function to build the hierarchy
function buildHierarchy(parentId, allNodes) {
  const children = allNodes.filter(node => node.parent_id === parentId);

  if (children.length === 0) {
    return [];
  }

  return children.map(child => {
    return {
      id: child.child_id,
      label: child.child_name,
      children: buildHierarchy(child.child_id, allNodes),
    };
  });
}

router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT
        m.id AS parent_id,
        m.name AS parent_name,
        m.gender AS parent_gender,
        m.dob AS parent_dob,
        m.hometown AS parent_hometown,
        r.child_id,
        c.name AS child_name,
        c.gender AS child_gender,
        c.dob AS child_dob,
        c.hometown AS child_hometown
      FROM
        relationships r
      JOIN
        members m ON r.parent_id = m.id
      JOIN
        members c ON r.child_id = c.id
      ORDER BY
        parent_id, child_id;
    `;

    const [result] = await db.promise().query(query);

    // Find unique root nodes (parents without parents)
    const rootNodes = result.filter(node => !result.some(parent => parent.child_id === node.parent_id));

    // Build the hierarchy
    const hierarchy = rootNodes.map(root => {
      return {
        id: root.parent_id,
        label: root.parent_name,
        children: buildHierarchy(root.parent_id, result),
      };
    });

    res.status(200).json({
        code:200,
        status:true,
        message:"successfully fetched hierarchy",
        data:[hierarchy[0]]
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
