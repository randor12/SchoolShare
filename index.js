// Initialize Express Application 
const express = require('express')
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const auth = require('./auth.json');
var session = require('express-session');
var path = require('path');
var crypto = require('bcryptjs');
// Communicate with the MySQL
const mysql = require('mysql')
var http = require('http').Server(app);   
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var faker = require('faker');


var io = require('socket.io')(http);

io.on('connection', () => {
    console.log('user connected');
});

var socket = io.connect;

// socket.on('initiate', () => {
//     io.emit('initiate');
// });

// Video authentication 
app.get('/token', function (req, res, next) {
    var identity = faker.name.findName();

    var token = new AccessToken(
        auth.twilioSID,
        auth.apiKeyIDTwilio,
        apiSecretTwilio
    )

    token.identity = identity;

    const grant = VideoGrant();

    token.addGrant(grant);

    res.json({
        identity: identity,
        token: token.toJwt()
    })

})

app.get('/images/blankImage.png', function(req, res, next) {
    res.sendFile(__dirname + '/images/blankImage.png');
})

app.get('/scripts/roomApp.js', function(req, res, next) {
    res.sendFile(__dirname + '/scripts/roomApp.js');
    
})

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
    
    if (req.session.loggedin != undefined) {
        console.log('Logged in');
        console.log("Username: " + req.session.uName);
        res.sendFile(__dirname + '/public/index.html');
    }
    else {
        res.redirect('/login');
    }
    
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
    if (req.session.loggedin) {
        console.log('Logged in');
        console.log("Username: " + req.session.uName);
        res.sendFile(__dirname + '/public/about.html');
    }
    else {
        res.redirect('/login');
    }
    
})

app.get('/contact', function (req, res, next) {
    if (req.session.loggedin) {
        console.log('Logged in');
        console.log("Username: " + req.session.uName);
        res.sendFile(__dirname + '/public/contact.html');
    }
    else {
        res.redirect('/login');
    }
    
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

var loginAlerts = {wrongEmail: false, wrongPassword: false};

// Check database for username and password
app.post('/login', function (request, response) {
    console.log("Authenticating...");
    var email = request.body.email;
    var password = request.body.password;
    console.log("Email: " + email);
    //var req = 'SELECT * FROM accounts WHERE email = "' + email + '" AND password = "' + password + '";';
    var req = 'SELECT * FROM accounts WHERE email = "' + email + '";';
    if (email && password) {
        
        con.query(req, function (error, results, fields) {
            console.log("Results Length: " + results.length);
            if (results.length > 0) {
                var salt = results[0].salt;
                var hash = hashPasswd(password, salt);
                if (results[0].password == hash)
                {
                    request.session.loggedin = true;
                    request.session.uName = results[0].username;
                    request.session.email = results[0].email;

                    console.log("Successfully Logged In!");
                    response.redirect('/');
                }
                else {
                    loginAlerts.wrongPassword = true;
                    response.redirect('/login');
                }
            } else {
                loginAlerts.wrongEmail = true;
                console.log('Email does not exist');
                response.redirect('/login');
                
            }
            response.end();
        
        });
        
    } else {
        response.send('Please enter Email and Password!');
        response.end();
    }
});

app.get('/loginAlerts', function(req, res, next) {
    console.log("Wrong Email: " + loginAlerts.wrongEmail);
    console.log("Wrong Password: " + loginAlerts.wrongPassword);
    res.json(loginAlerts);
    loginAlerts.wrongEmail = false;
    loginAlerts.wrongPassword = false;
})

// Get salt for password
function saltPass(length) {
    var salt = crypto.genSaltSync(length);
    /*
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    */
    return salt;
}

function hashPasswd(passwd, salt) {
    // Salt and hash password
    var hash = crypto.hashSync(passwd, salt);
    return hash;
}

var exists = {e: false};

// function alreadySignedUp(email) {
//     var req = 'SELECT * FROM accounts WHERE email like "' + email + '";';
//     console.log('Request: ' + req);
//     con.query(req, function (error, results, field) {
//         console.log('Length: ' + results.length);
//         signedAlready = (results.length > 0) ? true : false;
//         return signedAlready;
//     });
// }

app.get('/user', function (req, res, next) {
    var User = {email: req.session.email, uName: req.session.uName};
    console.log("Email: "+ User.email);
    res.json(User);
})

app.post('/list', function(req, rest, next) {
    var request = 'SELECT * FROM accounts WHERE email like "' + req.body.email + '";';
    console.log('Request: ' + request);
    con.query(request, function (err, res, field) {
        console.log(res.length);
        if (res.length > 0) {
            exists.e = true;
        }
        else {
            exists.e = false;
        }
    })
})

var signUpAlert = {alert: false};

// Sign up for the application
app.post('/signup', function (req, res) {
    console.log('Signing Up...');
    var email = req.body.email;
    var uName = req.body.username;
    var passwd = req.body.password;
    var salt = saltPass(15);
    var hashPass = hashPasswd(passwd, salt);
    var check = exists.e;
    
    console.log('Check: ' + check);
    if (!check)
    {
        console.log("Email: " + email);
        var req = 'INSERT INTO accounts (email, password, username, salt) VALUES ("' + email + '", "' + hashPass + '", "' + uName + '", "' + salt + '");';
        con.query(req, function (error, results, field) {
            if (error) throw error;
            console.log("Result: ", results);
            signUpAlert.alert = false;
            res.redirect('/');
        })
    }
    else {
        console.log('Signed Up Already');
        signUpAlert.alert = true;
        res.redirect('/signup');
    }
})

app.get('/alreadySignedUp', function(req, res, next) {
    res.json(signUpAlert);
    signUpAlert.alert = false;
});

app.get('/logout', function (req, res, next) {
    req.session.destroy(function(err) {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });
})

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

app.get('/forgotPass', function(req, res, next) {
    res.sendFile(__dirname + '/public/forgotPass.html');
})

app.post('/forgotPass', function(req, res, next) {
    console.log("Forgot Password");
    if (exists.e) {
        req.session.resetPass = req.body.email;
        res.redirect('/resetPass');
    }
    else {
        res.send('<p>Email not found</p>\n<a href="/forgotPass">Redirect to forgot password</a>');
    }
})

app.get('/resetPass', function(req, res, next) {
    if (req.session.email != undefined) {
        req.session.resetPass = req.session.email;
    }
    if (req.session.resetPass != undefined)
        res.sendFile(__dirname + '/public/resetPass.html');
    else {
        res.redirect('/forgotPass');
    }
})

app.get('/feed', function(req, res, next) {
    if (req.session.loggedin) {
        res.sendFile(__dirname + '/public/feed.html');
    }
    else {
        res.redirect('/login');
    }
})


app.get('/browser', function(req, res, next) {
    if (req.session.loggedin) {
        res.sendFile(__dirname + '/public/browser.html');
    }
    else {
        res.redirect('/login');
    }
})

app.get('/settings', function(req, res, next) {
    if (req.session.loggedin) {
        res.sendFile(__dirname + '/public/settings.html');

    }
    else {
        res.redirect('/login');
    }
})

app.post('/resetPass', function(req, res, next) {
    var salt = saltPass(15);
    var hashPass = hashPasswd(req.body.password, salt);
    var request = 'UPDATE accounts SET password = "' + hashPass + '", salt = "' + salt + 
    '" WHERE email like "' + req.session.resetPass
    + '";';
    console.log("Reset Request: " + request);
    con.query(request, function (err, res, field) {
        if (err) throw err;
        console.log("Updated Password for User");
        
    })
    req.session.destroy();
    res.redirect('/login');
})

app.get('/styles/bootstrap.css', function (req, res, next) {
    res.sendFile(__dirname + '/styles/bootstrap.css');
})

app.get('/createRoom', function (req, res, next) {
    if (req.session.loggedin)
        res.sendFile(__dirname + '/public/room.html');
    else
        res.redirect('/login');
});

app.get('/joinRoom', function(req, res, next) {
    if (req.session.loggedin)
        res.sendFile(__dirname + '/public/joinRoom.html');
    else
        res.redirect('/login');
})

app.get('/scripts/video.js', function(req, res, next) {
    res.sendFile(__dirname + '/scripts/video.js');
})
