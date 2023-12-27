const express = require("express");
const db = require("../dbconnect");
const nodemailer = require("nodemailer");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Function to generate a random five-digit number
const generateVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Wrap the database query in a promise
    const getUsername = () => {
      return new Promise((resolve, reject) => {
        db.query("SELECT loginId, firstname from logins WHERE email = ?", [email], (err, resData) => {
          if (err) {
            reject(err);
          } else {
            resolve(resData);
          }
        });
      });
    };

    // Call the promise and handle the result
    const resData = await getUsername();

    const firstname = resData.length > 0 ? resData[0].firstname : "Friend";
    const userid = resData.length > 0 ? resData[0].loginId : 0;


    const verificationcode = generateVerificationCode();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 15); // Assuming a 15-minute expiration time

    // Save the verification code to the database
    db.query("INSERT INTO verification_codes (user_id, code, expiration_time) VALUES (?, ?, ?)",
    [userid, verificationcode, expirationTime], async(err)=>{

        if (err) {
            return res.status(500).json({ error: "Failed to save verification code to the database" });
          }
    })

    //this is dynamic data for html template
    const templatePath = path.join(__dirname, "../emailTemplate.html");
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    const emailContent = templateContent
    .replace("{{userName}}", firstname)
    .replace("{{verificationcode}}", verificationcode)
    .replace("{{minutes}}", expirationTime);

    // Create a nodemailer transporter
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
      subject: "Hello "+firstname,
      html: emailContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({code:201, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
