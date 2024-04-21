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
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../user/views/browse_room.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
    res.redirect('/user/room')
  }
});



// Define a route to fetch data from the database
router.get('/room-data', (req, res) => {
  // Query to fetch data from the database (replace with your actual query)
  const sql = `
    SELECT room_list.*, booking.status_request , booking.time , booking.date
    FROM room_list
    LEFT JOIN booking ON room_list.room_id = booking.room_id
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    } if (result.length <= 0) {
      return res.status(400).send("No room list")
    }
    console.log(result)
    res.json(result);
  });
});

module.exports = router;