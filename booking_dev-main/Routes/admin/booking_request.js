//Get package
const express = require("express");
//Router
const router = express.Router();
//Path
const path = require("path");
//Database
const con = require("../../config/db.js");
//Session
const session = require('express-session');

router.use(session({
   cookie: { maxAge: 24*60*60*1000 }, //1 day in millisec
   secret: 'mysecretcode',
   resave: false,
   saveUninitialized: true
 }));

//Route Landing
router.get("/booking_request", function (req, res) {
  if (req.session.role != 3) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../admin/views/bookingrequest.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 3) {
    res.redirect("/");
  } else {
      res.redirect('/admin/booking_request')
  }
});

//
router.get("/book_approver", (req, res) => {
  const sql = "SELECT booking.*, room_list.room_number , room_list.room_name FROM booking INNER JOIN room_list ON booking.room_id = room_list.room_id WHERE status_request = 'pending' AND DATE(booking.date) = CURDATE()";
  con.query(sql, function (err, result) {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).send("Internal Server Error");
    } else if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(401).send("No pending booking requests found");
    }
  });
});

router.put("/approve_booking/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;
  // ทำการอัปเดตข้อมูลในฐานข้อมูล เปลี่ยน status_request เป็น 'Approve'
  const sql = "UPDATE booking SET status_request = 'Approve' , approve_name = ? WHERE booking_id = ?";
  con.query(sql, [req.session.fName_sName,bookingId], function (err, result) {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send('Booking approved successfully');
    }
  });
});

// router.put("/reject_booking/:bookingId", (req, res) => {
//   const bookingId = req.params.bookingId;
//   const reason = req.body.reason;
//   // ทำการอัปเดตข้อมูลในฐานข้อมูล เปลี่ยน status_request เป็น 'Reject' และบันทึกเหตุผล
//   const sql = "UPDATE booking SET status_request = 'reject', reason = ? WHERE booking_id = ?";
//   con.query(sql, [reason, bookingId], function (err, result) {
//     if (err) {
//       console.error("Error updating data:", err);
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.status(200).send('Booking rejected successfully');
//     }
//   });
// });

router.put("/description_booking/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;
  // ทำการอัปเดตข้อมูลในฐานข้อมูล เปลี่ยน status_request เป็น 'Approve'
  const sql = "UPDATE booking SET status_request = 'Reject', description = ? , approve_name = ? WHERE booking_id = ?";
  const description = req.body.description;
  // console.log(description);
  con.query(sql, [description,req.session.fName_sName,bookingId], function (err, result) {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send('Descrip update kub!');
    }
  });
});



module.exports = router;