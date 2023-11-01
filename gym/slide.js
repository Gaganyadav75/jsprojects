let slidecontainer = document.getElementById("slide_container");
let sectionhome = document.getElementById("homesection");

let x = window.innerWidth;
const girlbg=()=>{
    sectionhome.style.backgroundImage="url(https://i.imgur.com/0o5eimb.jpg)";
    sectionhome.style.filter="brightness(0.85)"
}

const boybg=()=>{
    sectionhome.style.backgroundImage="url(https://i.imgur.com/h3x1ZSc.jpg)";
    sectionhome.style.filter="brightness(1)"
}

setInterval(() => {
   if (window.innerWidth>800) {
    girlbg();
   } 
}, 10000);
setInterval(() => {
    if (window.innerWidth>800) {
        boybg();
       } 
}, 20000);

window.onkeydown = (e)=>{
    if (e.keyCode==39) {
       girlbg();
    }
    if (e.keyCode==37) {
        boybg();
    }
}




