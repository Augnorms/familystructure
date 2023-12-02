const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.put("/",(req, resp)=>{
  const userid = req.body.userid;
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email
  const isadmin = req.body.isadmin;
  const isAdmin = isadmin === "true" ? 1 : 0;

    db.query(
        "UPDATE logins SET username = ?, firstname = ?, lastname = ?, email = ?, isadmin = ? WHERE loginId = ? LIMIT 1",
        [username, firstname, lastname, email, isAdmin, userid],
        (err, res) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).json({
                    success: false,
                    code: 500,
                    message: "Failed to update user " + username + ". Internal server error." + err.message,
                });
            } else {
                // Fetch the updated user details
                db.query(
                    "SELECT loginId, username, password, firstname, lastname, email, isadmin FROM logins WHERE loginId = ?",
                    [userid],
                    (err, selectResult) => {
                        if (err) {
                            console.error("Database error:", err);
                            res.status(500).json({
                                success: false,
                                code: 500,
                                message: "Failed to fetch updated user details. Internal server error." + err.message,
                            });
                        } else {
                            const updatedUser = selectResult[0]; // Assuming there's only one result

                            resp.status(200).json({
                                success: true,
                                code: 200,
                                message: "User has been updated successfully.",
                                user: updatedUser,
                            });
                        }
                    }
                );
            }
        }
    );
});

module.exports = router;