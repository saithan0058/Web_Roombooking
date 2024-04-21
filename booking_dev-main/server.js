//Get package
const express = require("express");
const app = express();
var path = require("path");

//logout path
const logout = require('./logout.js')

//From Router login.js
const login = require('./login.js');
//From Router register.js
const registerUser = require('./Routes/user/register.js')
//From Router landing.js
const landingUser = require('./Routes/user/landing.js')
//From Router profile.js
const profileUser = require('./Routes/user/profile.js')
//From Router browse_room.js
const browseRoom = require('./Routes/user/browse_room.js')
//From Router reserve_room.js
const reserveRoom = require('./Routes/user/reserve_room.js')
//From Router check_status.js
const checkStatus = require('./Routes/user/check_status.js')

//========= Staff ==========\\
//From Router landing.js
const dashbooardStaff = require('./Routes/staff/landing.js')
//From Router browse_room.js
const browseroomStaff = require('./Routes/staff/browse_room.js')
//From Router room_history.js
const historyStaff = require('./Routes/staff/room_history.js')
//From Router manage.js
const staffManage = require('./Routes/staff/manage.js')
//From Router edit.js
const staffEdit = require('./Routes/staff/edit.js')
//From Router edit.js
const staffAdd = require('./Routes/staff/add.js')

//========= Admin ==========\\
//From Router landing.js
const dashbooardAdmin = require('./Routes/admin/landing.js')
//From Router browse_room.js
const browseroomAdmin = require('./Routes/admin/browse_room.js')
//From Router booking_request.js
const requestAdmin = require('./Routes/admin/booking_request.js')
//From Router room_history.js
const historyAdmin = require('./Routes/admin/room_history.js')



//Set public folder to static folder, User can access
app.use("/public", express.static(path.join(__dirname, "public")));

//JSON Exchange
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//login With Hash password and email check from database
app.use(login);

//Root Page
app.get("/", function (req, res) {
  if(req.session.role === 1){
    res.redirect('/user/landing')
  }else if(req.session.role === 2){
    res.redirect('/staff/landing')
  }else if(req.session.role === 3){
    res.redirect('/admin/landing')
  }else{
    res.status(200).sendFile(path.join(__dirname, "user/views/landing.html"));
  }
});

//Logout
app.use(logout);

//========= All User API===========
//-----------Register with router------------
app.use("/user" , registerUser); 

//-----------Landing user-------------
app.use("/user", landingUser);

//-------------User Profile-------------
app.use("/user", profileUser);

//-------------User Room List-------------
app.use("/user" , browseRoom);

//-------------User Reserve Room-------------
app.use("/user",reserveRoom);

//-------------User Check Status-------------
app.use("/user", checkStatus);



//========= All Staff API===========
//-------------Landing staff-------------
app.use("/staff", dashbooardStaff);

//-------------Browse room Room-------------
app.use("/staff", browseroomStaff);

//-------------Staff history -------------
app.use("/staff", historyStaff);

//-------------Staff Reserve Room-------------
app.use("/staff", staffManage);

//-------------Staff Reserve Room-------------
app.use("/staff", staffEdit);

//-------------Staff Reserve Room-------------
app.use("/staff", staffAdd);

//========= All Admin API===========
//-------------Landing Admin-------------
app.use("/admin", dashbooardAdmin);

//-------------Browse room Admin-------------
app.use("/admin", browseroomAdmin)

//-------------Request Admin-------------
app.use("/admin", requestAdmin)

//-------------History Admin-------------
app.use("/admin", historyAdmin)





//Setup Server Port
app.listen(7777, function () {
  console.log("Server ready to start " + 7777);
});
