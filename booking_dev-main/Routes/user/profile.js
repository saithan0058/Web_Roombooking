//Get package
const express = require("express")
//Router
const router = express.Router();
//Path  
const path = require('path');
//Database
const con = require("../../config/db.js");

//Route Landing
router.get("/profile", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../user/views/account.html")
    );
  }
});


router.get("/", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
      res.redirect('/user/profile')
  }
});


  module.exports = router;