var btn = document.getElementById("btn");
let az = /[a-z]/;


btn.onclick= function () {
    var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var message = document.getElementById("message").value;

if (name.match(az)&& email.match(az&&"@"&&".com")) {

    let objdata = {username:name,usermail:email,usermessage:message}
    let textdata = JSON.stringify(objdata);
    
    localStorage.setItem(email,textdata); 

}






}