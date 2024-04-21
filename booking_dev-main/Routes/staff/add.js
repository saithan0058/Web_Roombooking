//Get package
const express = require("express")
//Router
const router = express.Router();
//Path  
const path = require('path');
//Database
const con = require("../../config/db.js");

router.post("/manage/add", function (req, res) {
  const { room_name, room_number, people, facilities } = req.body;
  // SQL Command to check if the email already exists
  const checkRoomQuery = "SELECT * FROM room_list WHERE room_number = ? AND room_name = ?";
  con.query(checkRoomQuery, [room_number , room_name], function (err, result) {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else if (result.length > 0) {
      res.status(400).json({ error: "Room already exists" });
    } else {
      // Insert Command
      const insertRoomQuery =
        "INSERT INTO room_list (room_name, room_number, people, facilities , room_status) VALUES (?, ?, ?, ?, 'Enable')";
        // "INSERT INTO room_list SET ?"
      con.query(
        insertRoomQuery,
        [room_name, room_number, people, facilities],
        function (err) {
          if (err) {
            res.status(500).json({ error: "DB error" });
          } else {
            res.send(result + 'Add room success!');
          }
        }
      );
    }
  });
});

//Route Landing
router.get("/manage/add", function (req, res) {
  res.sendFile(path.join(__dirname, "../../staff/views/add_staff.html"));
})

//Route Landing
router.get("/manage/add", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../staff/views/add_staff.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.redirect('/staff/manage/add')
  }
});

module.exports = router;