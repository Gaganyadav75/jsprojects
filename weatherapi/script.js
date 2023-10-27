const searchbtn = document.getElementById("searchbtn")
const input = document.getElementById("inp")
const detaildiv = document.getElementById("detaildiv")
const locationh2 = document.getElementById("locationh2")

searchbtn.onclick = ()=>{weatherfun(input);}
window.addEventListener("keypress", function(ev){
    if (ev.keyCode ==13) {
        weatherfun(input)  
    }
})


const weatherfun =(inp)=>{
    let inpval =  inp.value;
    if (inpval!="") { 
   locationh2.innerText= inpval.toUpperCase()
}
   let conn;

   if (inpval.match(",")) {
    conn =`&country=${inpval.slice(inpval.indexOf(',')+1,[...inpval].length)}`
    let cnn=`${inpval.slice(0,inpval.indexOf(',')).toLowerCase()}`
   
    fetchweather(cnn ,conn);
   
   }else{
    fetchweather(inpval,"")
   }
   
   
}

document.querySelectorAll

const fetchweather = (cn,con)=>{
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cn}${con}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8a5c0860bamsh3c5d6a824f4c0b2p14e217jsn7844beae94e6',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    fetch(url, options).then(res =>res.text()).then(str => JSON.parse(str)).then(data => {
        let datarr = para([data.temp,data.max_temp,data.min_temp,data.humidity])
        if (data.temp!=undefined) {
            detaildiv.innerHTML = datarr;
            input.value=""
        }
       
    }).catch(err => console.log(err))
}

const para = (array)=>{
    let nm =["🌡️Temp","Max_temp","Min_temp","Humidity"]
    let x =-1;
        const ptags = array.map(arr => {
            x++;
          
        return `<p>${nm[x]} :  <span style=" text-decoration: underline dashed  2px;">  ${arr} </span> </p>`
        })

    let returndata = ptags.join(``)

return returndata
}








// const fun = async ()=>{
//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }




