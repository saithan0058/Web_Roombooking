//Get package
const express = require("express");
//Router
const router = express.Router();
//Path
const path = require("path");
//Database
const con = require("../../config/db.js");
//Session
const session = require("express-session");

//Route Landing
router.get("/landing", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../user/views/landing_user.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
      res.redirect('/user/landing')
  }
});

module.exports = router;
