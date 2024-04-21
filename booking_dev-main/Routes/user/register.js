//Get package
const express = require("express");
//Router
const router = express.Router();
//Path
const path = require("path");
//Database
const con = require("../../config/db.js");
//Authen
const bcrypt = require("bcrypt");

router.post("/register", function (req, res) {
  const { email, password, fName_sName, phone_number, student_id } = req.body;
  // SQL Command to check if the email already exists
  const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
  con.query(checkEmailQuery, [email], function (err, result) {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else if (result.length > 0) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      // Insert Command
      //Hashed Password
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          return res.status(500).json({ error: "Password hashing error" });
        }
        const insertUserQuery =
          "INSERT INTO login (email, password, fName_sName, phone_number, student_id, role) VALUES (?, ?, ?, ?, ?, 1)";
        con.query(
          insertUserQuery,
          [email, hash, fName_sName, phone_number, student_id],
          function (err) {
            if (err) {
              res.status(500).json({ error: "Database error" });
            } else {
              res.send("/login");
            }
          }
        );
      });
    }
  });
});

//Route Landing
router.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "../../user/views/register.html"));
});

router.get("/", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
    res.redirect("/user/register");
  }
});

module.exports = router;
