// Initialize Express Application 
const express = require('express')
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const auth = require('./auth.json');
var session = require('express-session');
var path = require('path')

// Communicate with the MySQL
const mysql = require('mysql')

// This is where the connection object is setup. Pay attention to the fields
var con = mysql.createConnection({
    // When connected to server -> process.env.uName and 
    // process.env.passwd will connect cloud database
    // Create auth.json file with local username and password to connect to MySQL
    // Make the json have a section called "username": "YOUR_USERNAME"
    // and have a section called "passwd": "YOUR_PASSWORD"
    host: process.env.server || "localhost",
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
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/scripts/script.js', function (req, res, next) {
    res.sendFile(__dirname + '/scripts/script.js');
})

app.get('/styles/signIn.css', function (req, res, next) {
    res.sendFile(__dirname + '/styles/signIn.css');
})

app.get('/login', function (req, res, next) {
    res.sendFile(__dirname + '/public/signIn.html');
})

app.get('/scripts/login.js', function (req, res, next) {
    res.sendFile(__dirname + '/scripts/login.js');
})

// Check database for username and password
app.post('/auth', function (request, response) {
    console.log("Authenticating...");
    var email = request.body.email;
    var password = request.body.password;
    console.log("Email: " + email);
    var req = 'SELECT * FROM accounts WHERE email = "' + email + '" AND password = "' + password + '";';
    if (email && password) {
        con.query(req, function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = email;
                console.log("Successfully Logged In!");
                response.redirect('/');
            } else {
                response.send('Incorrect Email and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Email and Password!');
        response.end();
    }
});

/*
app.post('/login', function (req, res, next) {
    var user = document.getElementById('username').nodeValue();
    console.log("Username: " + user);
    console.log('Attempted login...');
    console.log("Username: " + req.body.username);
    res.redirect('/');
});
*/

app.get('/signup', function (req, res, next) {
    res.sendFile(__dirname + '/public/signUp.html');
})