//Get package
const express = require("express")
//Router
const router = express.Router();
//Path  
const path = require('path');
//Database
const con = require("../../config/db.js");

//Route Landing
router.get("/check_status", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
    res.sendFile(
      path.join(__dirname, "../../user/views/check_status.html")
    );
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 1) {
    res.redirect("/");
  } else {
      res.redirect('/user/check_status')
  }
});

router.get("/status", (req, res) => {
  const sql = "SELECT booking.*, room_list.room_number, room_list.room_name , date, time, booker FROM booking INNER JOIN room_list ON booking.room_id = room_list.room_id WHERE user_id = ? AND DATE(booking.date) = CURDATE()";
  con.query(sql, [req.session.userID], function (err, result) {
    if (err) {
      console.error("Error executing query: ", err)
      res.status(500).send("Internal Server Error");
    } else if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(401).send("No user booking requests found");
    }
  });
});

//cancel a booking (DELETE request)
router.delete("/cancel_booking/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;
  const cancelBookingQuery = "DELETE FROM booking WHERE booking_id =?";
  con.query(cancelBookingQuery, [bookingId], (err, result) => {
    if (err) {
      console.error("Error canceling booking:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send('Booking canceled successfully');
    }
  });
});


// //จำนวณห้องทั้งหมดในระบบ
// router.get("/countAllroom", function (req, res) {
//   const countQuery = "SELECT COUNT(*) AS total FROM room_list";

//   con.query(countQuery, function (err, result) {
//     if (err) {
//       console.error(err);
//       res.status(500).send("DB error");
//     } else {
//       // Access the count directly from the result
//       const AllroomCount = result[0]['total']; // or result[0].total

//       res.send(`Total rooms: ${AllroomCount}`);
//     }
//   });
// });



  module.exports = router;