const crtbtn = document.getElementById("crtbtn");
const dltbtn = document.getElementById("dltbtn");
const container = document.querySelector(".container")
const save = document.querySelector("#save")

let number = 1;
let localnum = JSON.parse(localStorage.getItem("notes"));

if (localnum!=null) {
    if (localnum.length>1) {
        number = localnum+1;
     }
}



const localsetter = ()=> {
    let textspan = document.querySelectorAll(".textspan");
    let d = [];
  
    textspan.forEach(ele=>{
        let fchild = ele.firstChild;
        if (fchild.value!="") {
            d.push([ele.firstChild.innerText, fchild.nextSibling.value]);
           
        }
        
    })
    
    localStorage.setItem("notes",JSON.stringify(d))

}

save.addEventListener("click",()=>{
localsetter()
save.style.filter = "none"
})


const createfun = (h3val,val) => {
    let span = document.createElement("span");
    let textarea = document.createElement("textarea");
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    span.classList.add("textspan");
    textarea.setAttribute("rows","7");
    textarea.value = val;
    img.setAttribute("src","delete.png")
    img.addEventListener("click",(e)=>{
        e.target.parentElement.remove();
        localsetter();
    })
    h3.setAttribute("contenteditable","true")
    if (h3val=="") {
    h3.innerText="Heading"
    }else{
        h3.innerText=h3val;
    }

    span.appendChild(h3);

    span.appendChild(textarea)
    span.appendChild(img);

    container.appendChild(span);
    number++;
}



crtbtn.addEventListener("click",(e)=>{
  createfun("","")
  save.style.filter = "drop-shadow(0px 0px 2px red)"
})





window.onload =() => {
    let arrdata = JSON.parse(localStorage.getItem("notes"))
    if (arrdata!=null && arrdata.length>0) {
        arrdata.forEach(ele=>{
            createfun(ele[0],ele[1])
        })
    }
}




