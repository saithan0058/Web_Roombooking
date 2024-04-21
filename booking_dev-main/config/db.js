//Get require
const mysql = require("mysql2")

//DB host connection
const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "webpro",
});

module.exports = con;
