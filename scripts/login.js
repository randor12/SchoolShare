/**
 * Login Back End
 */

 function verify() {
     // Verify user exists
     data = {
         username: $("#first").val(),
         password: $("#last").val()
     }
     
     $.ajax({
         type: "POST",
         dataType: "json",
         contentType: "application/json",
         data: JSON.stringify(data),
         url: "/user"
     })
 }