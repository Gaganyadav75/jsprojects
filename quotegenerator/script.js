let url = "https://api.quotable.io/random";


const divoptions = document.querySelector(".options");
const buttons = document.querySelectorAll(".notselected");
const inputbox = document.querySelector("#inputbox");
const genbtn = document.querySelector("#gen");
const twitbtn = document.querySelector("#twit");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const res = document.querySelector("#res");

let type = "random";

divoptions.addEventListener("click",(e)=>{
    if (e.target.tagName=="BUTTON") {
        buttons.forEach(ele=>{
            if (ele.innerHTML==e.target.innerHTML) {
                ele.classList.add("selected")
            }else{
                ele.classList.remove("selected")
            }
            if (e.target.innerHTML=="Random") {
                inputbox.style.display="none"
            }else{
                inputbox.style.display="block"
                if (e.target.innerHTML=="Tags") {
                    type = "tags"
                    inputbox.setAttribute("Placeholder","Tag1 , Tag2")
                }else if (e.target.innerHTML=="Author") {
                    type = "author"
                    inputbox.setAttribute("Placeholder","Author Name")
                }
            }
        })
    }
})


const apifetch = async(link) =>{
try {
    await fetch(link).then(response=>response.json()).then(data=>{
       if (data.content==undefined) {
        alert("Input not found")
        apifetch("https://api.quotable.io/random")
       }else{
        quote.innerText = '"'+data.content+'"';
        author.innerText = data.author;
        res.style.display="flex"
       }
      
    })
} catch (error) {
    try {
  apifetch("https://api.quotable.io/random");
    } catch (error) {
        console.log(error);
    }
}
}

genbtn.addEventListener("click",()=>{
    if (type=="tags") {
apifetch(url+`?tags=${inputbox.value}`)      
    }else if (type=="author") {
    apifetch(url+`?author=${inputbox.value}`)      
    }else{
        apifetch(url)
    }
})


twitbtn.addEventListener("click",()=>{
    if (quote.innerText!="") {
    window.open(`https://twitter.com/intent/tweet?text=${quote.innerText}  --- by ${author.innerText}`,"tweet window","width=600 height=600")
    }
})





