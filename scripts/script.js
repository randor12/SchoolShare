/**
 * Main functions for the Website can go here
 */

 var users = "";
 var emails = "";

function notLoggedIn() {
    
    var element = document.getElementById('navbar');

    element.innerHTML = '<a href="/">Home</a>\n' +
        '<a href="/about">About</a>\n' +
        '<a href="/contact">Contact</a>\n' +
        '<a href="/login">Sign In</a>\n' +
        '<a href="/signup">Sign Up</a>\n';
}

function loggedIn() {
    var element = document.getElementById('navbar');
    element.innerHTML = '<a href="/">Home</a>\n' +
        '<a href="/about">About</a>\n' +
        '<a href="/contact">Contact</a>\n' +
        '<a href="/logout">Logout</a>\n';
}


function exists() {
    console.log('Clicked?');
    data = {
        email: $("#email").val(),
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        url: "/list"
    })
}

function getUser() {
    console.log("Collecting Users");
    $.ajax({
        dataType: "json",
        url: "/user",
        success:
            function (data) {
                console.log('Success Collecting Data');
                console.log(data.uName);

                $.each(data, function (value) {
                    // ABOVE: <div class="users"> <!-- Writes info here --> </div>
                    console.log(data.email + "; " + data.uName);
                    users = data.uName;
                    emails = data.email;
                    $('#settings').html("Welcome, " + data.uName);
                });
            }
    });
}

function settingsInputUserInfo() {
    console.log("Collecting Users");
    $.ajax({
        dataType: "json",
        url: "/user",
        success:
            function (data) {
                console.log('Success Collecting Data');
                console.log(data.uName);

                $.each(data, function (value) {
                    // ABOVE: <div class="users"> <!-- Writes info here --> </div>
                    console.log(data.email + "; " + data.uName);
                    users = data.uName;
                    emails = data.email;
                    $('#uName').html(data.uName);
                    $('#emailAddress').html(data.email);
                });
            }
    });
}

function getUsername() {
    $.ajax({
        dataType: "json",
        url: "/user",
        success:
        function(data) {
            console.log('Success');
            $.each(data, function() {
                users = data.uName;
                return users;
            })
        }
    })
}

function getAlert() {
    $.ajax({
        dataType: "json",
        url: "/alreadySignedUp",
        success:
        function(data)
        {
            console.log('Got alert data');
            $.each(data, function (value) {
                console.log('Already signed up: ' + data.alert);
                if (data.alert) {
                    alert('Already signed up!');
                }
            })
        }
    })
}

function getLoginAlert() {
    $.ajax({
        dataType: "json",
        url: "/loginAlerts",
        success:
            function (data) {
                console.log('Got alert data');
                $.each(data, function (value) {
                    console.log("Wrong Email: " + data.wrongEmail);
                    console.log("wrong Password: " + data.wrongPassword);
                    if (data.wrongEmail) {
                        alert('This Email is Incorrect! Try a different email');
                        data.wrongEmail = false;
                    }
                    if (data.wrongPassword) {
                        alert('The Password is Incorrect! Try a different password');
                        data.wrongPassword = false;
                    }
                })
            }
    })
}