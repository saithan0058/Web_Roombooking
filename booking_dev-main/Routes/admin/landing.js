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
  if (req.session.role != 3) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../admin/views/dashboard_admin.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 3) {
    res.redirect("/");
  } else {
      res.redirect('/admin/landing')
  }
});


//จำนวณห้องทั้งหมดในระบบ
router.get("/countAllroom", function (req, res) {
  const countQuery = "SELECT COUNT(*) AS total FROM room_list";

  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else {
      // Access the count directly from the result
      const CountAllroom = result[0]['total']; // or result[0].total
      res.send(`<div class="text-dark" id="AllRoom" style="font-size: 2rem;">${CountAllroom} Rooms</div>`);
    }
  });
});


//จำนวณคำขอที่ถูก approve ในระบบ
router.get("/countApprovedRequest", function (req, res) {
  const countQuery = "SELECT COUNT(*) AS total FROM booking WHERE status_request = 'Approve' AND DATE(date) = CURDATE();";

  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else {
      // Access the count directly from the result
      const CountApprovedRequest = result[0]['total']; // or result[0].total

      res.send(`<div class="text-dark" id="ApprovedRequest" style="font-size: 2rem;">${CountApprovedRequest} Requests</div>`);
    }
  });
});


//จำนวณห้อง enable ในระบบ
router.get("/countEnableRoom", function (req, res) {
  const countQuery = "SELECT COUNT(*) AS total FROM room_list WHERE room_status = 'Enable'";

  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else {
      // Access the count directly from the result
      const CountEnableRoom = result[0]['total']; // or result[0].total

      res.send(`<div class="text-white" id="enable" style="font-size: 2rem;">${CountEnableRoom} Rooms</div>`);
    }
  });
});


//จำนวณห้อง disable ในระบบ
router.get("/countDisableRoom", function (req, res) {
  const countQuery = "SELECT COUNT(*) AS total FROM room_list WHERE room_status = 'Disable'";

  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else {
      // Access the count directly from the result
      const CountDisableRoom = result[0]['total']; // or result[0].total

      res.send(`<div class="text-dark" id="disable" style="font-size: 2rem;">${CountDisableRoom} Rooms</div>`);
    }
  });
});


//จำนวณห้องที่ถูกจองเต็มทั้ง 4 เวลา
router.get("/countFullReserved", function (req, res) {
  const countQuery = "SELECT COUNT(*) AS total FROM (SELECT room_id, COUNT(*) as count FROM booking WHERE status_request = 'Approve' AND DATE(date) = CURDATE() GROUP BY room_id HAVING count = 4) as subquery";

  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else {
      // Access the count directly from the result
      const countFullReserved = result[0]['total']; // or result[0].total

      res.send(`<div class="text-white" id="FullReserved" style="font-size: 2rem;">${countFullReserved} Rooms</div>`);
    }
  });
});

module.exports = router;
