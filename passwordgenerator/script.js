const passwordinput = document.getElementById("passshow");
const selectlen = document.getElementById("length");
const btn = document.getElementById("btn");
const copy = document.getElementById("span");
let length = 12;

const upppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerrcase = "abcdefghijklmnopqrstuvwxyz";
const specialchar = "!@$%^&*(){}[]><?/-=";
const numbers = "123456789";

const allchar = upppercase+lowerrcase+specialchar+numbers

const rdgen = (arr) => {
    return Number(Math.floor(Math.random()*arr.length));
}

const passcreate = () => {
    let password = "";
    password+=upppercase[rdgen(upppercase)]
    password+=lowerrcase[rdgen(lowerrcase)]
    password+=numbers[rdgen(numbers)]
    password+=specialchar[rdgen(specialchar)]

    while (length>password.length) {
        password+=allchar[rdgen(allchar)]
        console.log(password);
    }
    return password;
}


const passwordcopy = () => {
    passwordinput.select();
    document.execCommand("copy")
}

copy.addEventListener('click',passwordcopy)

btn.addEventListener("click",()=>{
    length = selectlen.value;
    passwordinput.value= passcreate();
})



