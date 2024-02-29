var inputelement = document.querySelector("#inputtext")
var inputbtn = document.querySelector("#inputbtn")
var ul = document.querySelector("#ul")

const addfun = () => {
    let inpval = inputelement.value;
    if (inpval!="") {
        creatingli(inpval);
        settingstorage(inpval);
        inputelement.value="";
} 
}


const creatingli = (val) => {
    let list = document.createElement("li");
    let span = document.createElement("span");span.innerText=val;
    let removebtn = document.createElement("button");
    removebtn.innerText='X'
    list.appendChild(span)
    list.appendChild(removebtn);
    ul.appendChild(list);
   
}

ul.addEventListener('click',(e)=>{
   if (e.target.tagName==="BUTTON") {
   let tt =e.target.parentElement.querySelector("span").innerText;
   removingitems(tt)
    e.target.parentElement.remove();
   }else if(e.target.tagName==='SPAN'){
    e.target.setAttribute("class","checked")
   let tp =e.target.innerText;
    removingitems(tp)
   }
})

const settingstorage = (val) => {
    let existingtaks = localStorage.getItem("alltasks");
    if (existingtaks==undefined) {
        localStorage.setItem("alltasks",val+',');
    }else {
        localStorage.setItem("alltasks",existingtaks+val+',');
    } 
}

const removingitems = (val) => {
    let existingtaks = localStorage.getItem("alltasks");
    let stnum = existingtaks.search(val+",");
    let newar = existingtaks.replace(val+',',"");
    localStorage.setItem("alltasks",newar);

}

const gettingstorage = () => {
    let existingtaks = localStorage.getItem("alltasks");
    let tasksinarray = existingtaks.split(',');
tasksinarray.map(ele=>{
    if (ele!="") {
      creatingli(ele);
    }
})

}



inputbtn.addEventListener('click',addfun);

window.addEventListener("load",()=>{
    gettingstorage();
})

