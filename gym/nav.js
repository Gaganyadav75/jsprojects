

var navbar = document.getElementById("navbar");

var navfit = document.getElementById("navfit");
var navwhat = document.getElementById("navwhat");
var navabo = document.getElementById("navabo");
var navcon = document.getElementById("navcon");


window.onscroll=()=>{
    if (scrollY<100) {
       
        var navimg = document.getElementById("navimg");
        navbar.style.animation="slide2 forwards 1s ease-in-out"
        navimg.style.animation="slide2 forwards 1s ease-in-out"
        navbar.style.background="linear-gradient(rgba(0,0,0, 0.1),rgba(0,0,0, 0.1))"
     
    }
     if (scrollY>=100) {
       
        var navimg = document.getElementById("navimg");
        navbar.style.animation="slide1 forwards 1s ease-in-out"
        navimg.style.animation="slide1 forwards 1s ease-in-out"
        navbar.style.background="linear-gradient(rgba(255, 0, 0, 0.83),rgba(162, 32, 32, 0.562))"
        // navbar.style.background="linear-gradient(rgba($color: #a60c0c, $alpha: 0.7),rgba($color: #993636, $alpha: 0.5))"
    }

   
  
    var heigh = innerHeight;
   
    if (heigh>scrollY) {
        navcolor()
        navfit.style.color="rgb(10, 148, 235)"
    }
    if (heigh*0.6<scrollY) {
        navcolor()
        navwhat.style.color="rgb(10, 148, 235)"
    }
    if (heigh*1.5<scrollY) {
        navcolor()
        navabo.style.color="rgb(10, 148, 235)"
    }
    if (heigh*2<scrollY) {
        navcolor()
        navcon.style.color="rgb(10, 148, 235)"
    }
 
}


const navcolor = ()=>{
    navfit.style.color="white"
    navwhat.style.color="white"
    navabo.style.color="white"
    navcon.style.color="white"
}


