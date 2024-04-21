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
  if (req.session.role != 3) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../admin/views/table_admin.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 3) {
    res.redirect("/");
  } else {
      res.redirect('/admin/room')
  }
});

  module.exports = router;