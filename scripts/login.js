/**
 * Login POST Request
 */
 function verify() {
     console.log("Verifying");
     // Verify user exists
     data = {
         username: $("#username").val(),
         password: $("#password").val()
     }
     console.log("Username: " + data.username);

     $.ajax({
         type: "POST",
         dataType: "json",
         contentType: "application/json",
         data: JSON.stringify(data),
         url: "/login"
     });
 }
