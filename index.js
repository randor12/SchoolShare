// Initialize Express Application 
const express = require('express')
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const auth = require('./auth.json');

// Communicate with the MySQL
const mysql = require('mysql')

// This is where the connection object is setup. Pay attention to the fields
var con = mysql.createConnection({
    // When connected to server -> process.env.uName and 
    // process.env.passwd will connect cloud database
    // Create auth.json file with local username and password to connect to MySQL
    // Make the json have a section called "username": "YOUR_USERNAME"
    // and have a section called "passwd": "YOUR_PASSWORD"
    host: "localhost",
    user: process.env.uName || auth.username,
    password: process.env.passwd || auth.passwd,
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

//start the server
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!!`)
})



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

// Send the CSS
app.get('/styles/style.css', function (req, res, next) {
    res.sendFile(__dirname + '/styles/style.css');
})

app.get('/about', function(req, res, next) {
    res.sendFile(__dirname + '/public/about.html');
})

app.get('/contact', function (req, res, next) {
    res.sendFile(__dirname + '/public/contact.html');
})