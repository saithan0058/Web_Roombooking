//Get package
const express = require("express");
//Router
const router = express.Router();
//Path
const path = require("path");
//Database
const con = require("../../config/db.js");

//Route Landing
router.get("/manage/edit", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "../../staff/views/edit_staff.html"));
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.redirect("/staff/manage/edit");
  }
});

router.get("/manage/edit/:id", function (req, res) {
  const id = req.params.id;
  const people = req.body.people;
  const sql = "SELECT * FROM room_list WHERE room_id = ?";
  con.query(sql, [id, people], function (err, result) {
    if (err) {
      res.status(500).send("DB error");
    } else {
      res.send(result);
    }
  });
});

router.put("/manage/edit/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const roomName = req.body.room_name;
  const roomNum = req.body.room_number;
  // Check if the new room_name and room_number already exist
  const checkDuplicateSql =
    "SELECT * FROM room_list WHERE room_name = ? AND room_number = ?";
  con.query(checkDuplicateSql, [roomName, roomNum], function (err, duplicateResult) {
    if (err) {
      console.error("Error checking duplicate data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // If there is a duplicate, send an error response
    if (duplicateResult.length > 0) {
      return res.status(400).json({ error: "Duplicate room_name and room_number" });
    }
    // If there is no duplicate, proceed with the update
    const sql =
      "UPDATE room_list SET room_name = ?, room_number = ?, people = ?, facilities = ? WHERE room_id = ?";
    const { room_name, room_number, people, facilities } = req.body;
    con.query(sql, [room_name, room_number, people, facilities, roomId], function (err, result) {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Send a JSON response indicating success
        return res.status(200).json({ success: true, redirect: "/staff/manage" });
      }
    });
  });
});


module.exports = router;
