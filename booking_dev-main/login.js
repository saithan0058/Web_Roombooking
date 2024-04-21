//Get package
const express = require("express");
//Router
const router = express.Router();
//Path
const path = require("path");
//Database
const con = require("./config/db.js");
//Authen
const bcrypt = require("bcrypt");
//Session
const session = require("express-session");

router.use(
  session({
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, //1 day in millisec
    secret: "mylogincode",
    resave: false,
    saveUninitialized: true,
  })
);

//รอไปใช้หน้าบ้าน
router.get("/user-info", function (req, res) {
  res.json({
    userID: req.session.userID,
    fName_sName: req.session.fName_sName,
    role: req.session.role,
    email : req.session.email,
    phone_number : req.session.phone_number,
    student_id : req.session.student_id
  });
});

//-------User login------
router.post("/login", function (req, res) {
  const { email, password ,fName_sName } = req.body;
  //SQL Check
  const sql = "SELECT * FROM login WHERE email= ?";
  con.query(sql, [email], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else if (result.length != 1) {
      res.status(404).send("Wrong Email");
    } else {
      bcrypt.compare(password, result[0].password, function (err, correct) {
        if (err) {
          res.status(500).send("Authen Error");
        } else {
          if (correct) {
            req.session.userID = result[0].id;
            req.session.fName_sName = result[0].fName_sName;
            req.session.role = result[0].role;
            req.session.email = result[0].email;
            req.session.phone_number = result[0].phone_number;
            req.session.student_id = result[0].student_id;
            if (result[0].role === 1) {
              res.send("/user/landing");
            } else if (result[0].role === 2) {
              res.send("/staff/landing");
            } else if (result[0].role === 3) {
              res.send("/admin/landing");
            } else {
              res.status(403).send("Unauthorized Role");
            }
          } else {
            res.status(401).send("Wrong password");
          }
        }
      });
    }
  });
});

router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "./user/views/login.html"));
});

module.exports = router;
