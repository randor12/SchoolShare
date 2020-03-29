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

