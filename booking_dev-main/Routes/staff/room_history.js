// Get package
const express = require("express");
// Router
const router = express.Router();
// Path
const path = require("path");
// Database
const con = require("../../config/db.js");

// Route Landing
router.get("/room_history", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../staff/views/history_staff.html")
    );
  }
});


// Endpoint to fetch user history data
router.get("/history", function (req, res) {
  // Here you need to query your database to get the user's booking history
  // Adjust the SQL query based on your database schema
  const userId = req.session.userID;
  const sql = "SELECT booking.*, room_list.room_number , room_list.room_name FROM booking INNER JOIN room_list ON booking.room_id = room_list.room_id";
  con.query(sql, [userId], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(result);
    }
  });
});

router.get("/", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.redirect("/staff/room_history");
  }
});

module.exports = router;
