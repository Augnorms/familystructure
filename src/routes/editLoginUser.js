const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.put("/", (req, res) => {
    const { userid, username, firstname, lastname, email, isadmin } = req.body;
    const isAdminValue = isadmin ? 1 : 0;

    db.query(
        "UPDATE logins SET username = ?, firstname = ?, lastname = ?, email = ?, isadmin = ? WHERE loginId = ? LIMIT 1",
        [username, firstname, lastname, email, isAdminValue, userid],
        (err, updateResult) => {
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

                            res.status(200).json({
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