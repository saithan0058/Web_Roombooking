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
router.get("/reserve_room", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "../../user/views/reserve_room.html"));
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
    res.redirect("/user/reserve_room");
  }
});

router.get("/reserve-data/:id", function (req, res) {
  const id = req.params.id;
  const people = req.body.people;
  const sql = "SELECT * FROM room_list WHERE room_id = ?";
  con.query(sql, [id, people], function (err, result) {
    if (err) {
      return res.status(500).send("Err query");
    }
    res.status(200).send(result);
  });
});

router.post("/reserver-data", function (req, res) {
  const { room_id, reason, time, user_id, status_request, dateCurrent } = req.body;
  console.log("Received:", req.body);
  const sql =
    "SELECT * FROM booking WHERE room_id = ? AND time = ? AND status_request != 'Reject' AND DATE(date) = CURDATE() AND user_id != ?;";
  con.query(sql, [room_id, time, user_id], function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else if (results.length >= 1) {
      res.status(400).send("Already booking now!");
    } else {
      // ตั้งค่าคำสั่ง SQL สำหรับการเพิ่มข้อมูลการจอง
      const insertBookerData =
        "INSERT INTO booking (room_id, reason, time, user_id, booker, status_request, date) VALUES (?, ?, ?, ?, ?, 'pending', ?)";
      // ทำการเพิ่มข้อมูลการจอง
      con.query(
        insertBookerData,
        [room_id,reason,time,req.session.userID,req.session.fName_sName,dateCurrent,]
        ,
        function (err, result) {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ error: "Database error", details: err.message });
          } else {
            console.log(result);
            res.json({ message: "Booking success!" });
          }
        }
      );
    }
  });
});

module.exports = router;
