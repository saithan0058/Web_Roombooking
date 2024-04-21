//Get package
const express = require("express")
//Router
const router = express.Router();
//Path  
const path = require('path');
//Database
const con = require("../../config/db.js");

//Route Landing
router.get("/room", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../staff/views/table_staff.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
      res.redirect('/staff/room')
  }
});

  module.exports = router;