var inputelement = document.getElementById("input");
var searchbtn = document.getElementById("searchbtn");
var imgupdate = document.querySelector("#imgupdate");
var updatingtemp = document.querySelector("#updatingtemp");
var locationspan = document.querySelector("#locationspan");
var humidityupdate = document.querySelector("#humidityupdate");
var windspeedupdate = document.querySelector("#windspeedupdate");
var maindiv = document.querySelector("#maindiv");


const weatherinfo = async(lati,long) => {
  await  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${String(lati)}&lon=${String(long)}&appid=c17df0ac035d82cfbbab47e990548db3`)
        .then(response => response.json()).then(data => {
            windspeedupdate.innerHTML=data.wind.speed+" km/h";
            humidityupdate.innerHTML=data.main.humidity+"%";
            updatingtemp.innerHTML=(data.main.temp-273.15).toFixed(2);
            locationspan.innerHTML = data.name;
            let wi = data.weather[0].icon[0]+data.weather[0].icon[1]+"d.png";
           
            imgupdate.setAttribute("src",wi);
            maindiv.style.display = "flex"
            inputelement.value = "";
        })
}


const locationextractor = async ()=> {  
let url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputelement.value}&appid=c17df0ac035d82cfbbab47e990548db3`

   try {
    await fetch(url).then(response=>response.json()).then(data => {
        console.log(data);
        weatherinfo(data[0].lat,data[0].lon);
    })

        } catch (error) {
    console.log(error);
    }
}


window.addEventListener("load",()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        weatherinfo(position.coords.latitude,position.coords.longitude)
    },()=>{
        console.log("not got");
    })
})









searchbtn.addEventListener("click",locationextractor);