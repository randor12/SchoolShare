// Initialize Express Application 
const express = require('express')
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const auth = require('./auth.json');

// Communicate with the MySQL
const mysql = require('mysql')

// This is where the connection object is setup. Pay attention to the fields
var con = mysql.createConnection({
    host: "localhost",
    user: "root", // can also be user: "rynicholas" with passwd instead of passwd2
    password: process.env.PASSWD || auth.passwd2,
    database: "schoolshare_schema"
});

// Check connection
con.connect(function (err) {
    if (err) throw err
    console.log("Connected!");
})

//telling the ExpressJS app to use the bodyparser.
//This has to ‘happen’ before other middleware.
app.use(bodyParser.json())

//Middleware that handles GET requests to ‘/’
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
    // Example MySQL command 
    /*
    con.query("SELECT * FROM people;", function (err, rows, fields) {
        if (err) {
            res.sendStatus(500);
            throw err;
        }
        users = [];
        // Initialize the users when the app begins
        for (var i = 0; i < rows.length; i++) {
            users.push({ first: rows[i].first, last: rows[i].last });
        }

    })
    */
})

app.get('/styles/style.css', function (req, res, next) {
    res.sendFile(__dirname + 'styles/style.css');
})