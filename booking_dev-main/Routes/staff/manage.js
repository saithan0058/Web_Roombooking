// Get package
const express = require("express");
// Router
const router = express.Router();
// Path
const path = require("path");
// Database
const con = require("../../config/db.js");

// API to get room list with pagination
router.get("/list", async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 50;

    // Replace the following line with your database query to get paginated room list
    const roomList = await queryToGetRoomListFromDatabase(page, perPage);

    res.json(roomList);
  } catch (error) {
    console.error("Error getting paginated room list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route Landing
router.get("/manage", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "../../staff/views/manage_room.html"));
  }
});

router.get("/", function (req, res) {
  if (req.session.role != 2) {
    res.redirect("/");
  } else {
    res.redirect("/staff/manage");
  }
});




// Add this new endpoint to handle room status toggle
router.post("/toggle-status/:roomId/:newStatus", async (req, res) => {
  const roomId = req.params.roomId;
  const newStatus = req.params.newStatus;
  // Replace this line with your logic to update room status in the database
  const sql = `UPDATE room_list SET room_status = ? WHERE room_id = ?`
  con.query(sql, [newStatus, roomId], function (error, results) {
    if (error) { res.status(500).send('Databese Error') }
    else {
      res.send("ok");
    }
  })  
}
);

// Replace this function with your actual query to get paginated room list from the database
async function queryToGetRoomListFromDatabase(page, perPage) {
  const offset = (page - 1) * perPage;

  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM room_list LIMIT ${perPage} OFFSET ${offset}`, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// // Replace this function with your actual logic to update room status in the database
// async function updateRoomStatusInDatabase(roomId, newStatus) {
//   return new Promise((resolve, reject) => {
//     con.query(`UPDATE room_list SET room_status = '${newStatus}' WHERE room_id = ${roomId}`, (error, results) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//     resolve();
//   });
// }


module.exports = router;