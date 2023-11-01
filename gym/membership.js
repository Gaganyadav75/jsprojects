var mbtn = document.getElementById("membershipbtn")
var membership = document.getElementById("membership")
var memberx= document.getElementById("memberx")


mbtn.onclick=()=>{
    membership.style.display="flex"
}
memberx.onclick=()=>{
    membership.style.display="none"
}

setTimeout(() => {
    membership.style.display="flex"
}, 15000);
