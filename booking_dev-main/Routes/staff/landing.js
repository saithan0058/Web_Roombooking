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
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../staff/views/dashboard_staff.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
      res.redirect('/staff/landing')
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
      res.send(`${CountAllroom} Rooms`);
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

      res.send(`${CountApprovedRequest} Requests`);
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

      res.send(`${CountEnableRoom} Rooms`);
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

      res.send(`${CountDisableRoom} Rooms`);
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

      res.send(`${countFullReserved} Rooms`);
    }
  });
});


// /จำนวณห้องที่ Pending
router.get("/countPending", function (req, res) {
  const countQuery = "SELECT COUNT(*) AS total FROM booking WHERE status_request = 'pending' AND DATE(date) = CURDATE();";

  con.query(countQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("DB error");
    } else {
      // Access the count directly from the result
      const CountPendingRoom = result[0]['total']; // or result[0].total

      res.send(`${CountPendingRoom} Rooms`);
    }
  });
});

router.get("/chart1", async (req, res) => {
  try {
      const [Enable] = await con.promise().query("SELECT COUNT(*) AS total FROM room_list WHERE room_status = 'Enable' ");
      const [Disable] = await con.promise().query("SELECT COUNT(*) AS total FROM room_list WHERE room_status = 'Disable' ");
     
      res.json({
        Enable: Enable[0].total,
        Disable: Disable[0].total,
  
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Database error" });
}
});


router.get("/chart2", async (req, res) => {
  try {
     
      const [Reserved] = await con.promise().query("SELECT COUNT(*) AS total FROM (SELECT room_id, COUNT(*) as count FROM booking WHERE status_request = 'Approve' AND DATE(date) = CURDATE() GROUP BY room_id HAVING count = 4) as subquery");
      const [Pending] = await con.promise().query("SELECT COUNT(*) AS total FROM booking WHERE status_request = 'pending' AND DATE(date) = CURDATE();");
      const [Approve] = await con.promise().query("SELECT COUNT(*) AS total FROM booking WHERE status_request = 'Approve' AND DATE(date) = CURDATE();")
      res.json({
       
        Reserved: Reserved[0].total,
        Pending: Pending[0].total,
        Approve: Approve[0].total
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Database error" });
}
});


module.exports = router;
