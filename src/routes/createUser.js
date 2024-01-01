const express = require("express");
const db = require("../dbconnect");
const token = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

router.post("/", async (req, resp) => {
    const { username, password, firstname, lastname, email, isadmin } = req.body;

    try {
        // Check if the username already exists
        const [existingUser] = await db.promise().query("SELECT * FROM logins WHERE username = ?", [username]);

        if (existingUser.length > 0) {
            // Username already exists
            return resp.status(401).json({
                code: 401,
                status: false,
                message: "Username already exists",
            });
        }

        // If username doesn't exist, proceed with user creation
        const hashedpassword = await bcrypt.hash(password, 10);

        await db.promise().query(
            'INSERT INTO logins (username, password, firstname, lastname, email, isadmin) VALUES (?, ?, ?, ?, ?, ?)',
            [username, hashedpassword, firstname, lastname, email, isadmin]
        );

        // Read email template content
        const templatePath = path.join(__dirname, "../accountcreationnotification.html");
        const templateContent = fs.readFileSync(templatePath, "utf-8");

        // Replace placeholders in the template with actual values
        const emailContent = templateContent
            .replace("{{userName}}", `${firstname} ${lastname}`)
            .replace("{{username}}", username)
            .replace("{{password}}", password);

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "augustinenormanyo98@gmail.com",
              pass: "wiis zzwv uglo rbgo", 
            },
          });

        // Define email options
        const mailOptions = {
            from: "augustinenormanyo98@gmail.com",
            to: email,
            subject: "Account Creation Notification",
            html: emailContent,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return resp.status(201).json({
            status: true,
            code: 201,
            message: "User created successfully. Account creation notification sent.",
        });

    } catch (error) {
        return resp.status(500).json({
            status: false,
            code: 500,
            message: "Error: " + error.message,
        });
    }
});

module.exports = router;
