let urls = [
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213',

    
'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045' ,

'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'

]

var wishlist = document.getElementById("wishlist")
var trending = document.getElementById("trending")
var top_rated = document.getElementById("toprated")

var moviesdiv =[wishlist,trending,top_rated]



var body = document.getElementById("body")
var featureddiv = document.querySelector(".featured")
var moviename = document.getElementById("moviename")
var moviedesc = document.querySelector("#moviedesc")
 
//it will fetch the data dynamically

const fetchdata = (url,moviediv,optionspass)=>{
    
    fetch(url,optionspass).then(response => response.json()).then(data => {
        const res =data.results[0];

        // console.log(res);
        if (res.original_name==undefined) {
            moviename.innerHTML=res.original_title;
        }else{
            moviename.innerHTML=res.original_name;
        }
       
        moviedesc.innerText = res.overview;
        
        featureddiv.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${res.backdrop_path})`;
      
        for(result of data.results){
            const img1 = `https://image.tmdb.org/t/p/original${result.poster_path}`
            const img2 = `${result.backdrop_path}`
            const imgtag = document.createElement("img")
            imgtag.setAttribute("src",img1)
            imgtag.setAttribute("alt",img2)
            imgtag.setAttribute("class","imgclass")
           
          let title = result.original_title;
        //   console.log(title);
        if (result.original_name==undefined) {
            imgtag.setAttribute("movienm",title)
        }else{
            imgtag.setAttribute("movienm",result.original_name)
        }
         
            imgtag.setAttribute("overview",result.overview)
            
            moviediv.appendChild(imgtag)
        }
       

    }).then(()=>posterchange("alt")).catch(error=>console.log(error))
}


//it is change the poster on click

const posterchange=(srccheck)=>{
   
    const image1 = document.querySelectorAll(`.imgclass`);
    image1.forEach(element => {
        element.addEventListener('click',()=>{
            let backdrop1 =element.getAttribute(srccheck);
            let original_title =element.getAttribute("movienm");
            let overview =element.getAttribute("overview");
       

    
      
        moviename.innerHTML=original_title;
  
            featureddiv.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${backdrop1})`;
         
        moviedesc.innerText = overview;
        })
    });
    
    
    
    
}


// all vaiables for nav bars controls
var navhome = document.getElementById("navhome")
var navtvshows = document.getElementById("navtvshows")
var navmovie = document.getElementById("navmovie")
var navmylist = document.getElementById("navmylist")


var tvshowsdiv = document.getElementById("tvshows")
var moviesshowdiv = document.getElementById("moviesshowdiv")
var mylistshowdiv = document.getElementById("mylistshowdiv")


var maindiv = document.getElementById("maindiv")
var tvshowmaindiv = document.getElementById("tvshowsdiv")
var moviesmaindiv = document.getElementById("moviesmaindiv")
var mylistmaindiv = document.getElementById("mylistmaindiv")



//it will make all divs display none
const divnone = ()=>{
   maindiv.style.display="none"
    tvshowmaindiv.style.display="none"
    moviesmaindiv.style.display="none"
    mylistmaindiv.style.display="none"
}

//it is function for home click

const home = ()=>{
    divnone()
    maindiv.style.display="block"
    let clname1 = "imgclass"
    fetchdata(urls[0],moviesdiv[0])
    fetchdata(urls[1],moviesdiv[1])
    fetchdata(urls[2],moviesdiv[2])
}

//it is for tvshows navbar  

navtvshows.addEventListener('click',()=>{
    divnone()
tvshowmaindiv.style.display="block"
    const options = {method: 'GET', headers: {accept: 'application/json'}};
   let url = 'https://api.themoviedb.org/3/tv/popular?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
fetchdata(url,tvshowsdiv,options);
})


//it is for navmovies

navmovie.addEventListener('click',()=>{
    divnone()
moviesmaindiv.style.display="block"
const options = {method: 'GET', headers: {accept: 'application/json'}};
   let url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213&language=en-US'
fetchdata(url,moviesshowdiv,options);
})


//add list function
var addlistbtn = document.getElementById('addlistbtn')


//it if for adding movies to the lists

addlistbtn.addEventListener('click',()=>{
    var mvname = moviename.innerText;
    var mvdisc = moviedesc.innerText;
    var bgimg = window.getComputedStyle(featureddiv).getPropertyValue('background-image').replace(/^url\(['"]?(.+?)['"]?\)/,'$1')
    let x =0;
    let gotdata = JSON.parse(localStorage.getItem("itemset"))
    let imgarrayofall=gotdata;

    let imgarray = [mvname,mvdisc,bgimg]
 

    if (gotdata==null) {
       imgarrayofall=[imgarray]
    }else {
      
        for (let i = 0; i < imgarrayofall.length; i++) {
            
               if (imgarrayofall[i][0]==mvname) {
                console.log(imgarrayofall[i][0]);
              x++;
               
               }
                
            
            
        }
    }
    
   

   
    if (x==0) {
       if (gotdata!=null) {
        imgarrayofall.push(imgarray)
       }
        
        console.log(imgarrayofall.length);
            
            localStorage.setItem("itemset",JSON.stringify(imgarrayofall))
    }
       
        
        
        x=0;
    
  
    }
    
)






//it will check the local storage 

const localcheck = ()=>{

    let objdata =JSON.parse(localStorage.getItem("itemset"))

if (objdata!=null) {
  
    objdata.forEach(element => {
       
      
        let localimg= document.createElement("img");
        localimg.setAttribute("class","imgclass")
        localimg.setAttribute("movienm",element[0])
        localimg.setAttribute("overview",element[1])
        localimg.setAttribute("src",element[2])
        // console.log(element[0][2]);
        mylistshowdiv.appendChild(localimg);
     
       
       
    });
 
}

posterchange("src")
}



//it is for navlist click

navmylist.addEventListener('click',()=>{ 
    divnone()
    localcheck();
    mylistmaindiv.style.display="block"
    })



//it is for on load of window 

window.onload=()=>{
    home()
    
};



//calling function on homeclick

navhome.onclick = ()=>{
   divnone()
   maindiv.style.display="block"
    home()
}




var accountdetaildiv = document.getElementById("accountdetaildiv")

const disofacc = (x)=>{x==true?accountdetaildiv.style.display="block":accountdetaildiv.style.display="none";}




let navacc =document.getElementById("account");
navacc.onclick=()=>{disofacc(true)}
document.getElementById("detailcut").onclick=()=>{disofacc(false)}


let sessiondetail = JSON.parse(sessionStorage.getItem("myflix"))



var uimg = document.getElementById("acimg")
var uname = document.getElementById("name")
var gender = document.getElementById("gender")
var phone = document.getElementById("phone")

    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.open("index.html", "_self");
       
     }
     //Is their authentication token still valid?
     else if (new Date <new Date(sessionStorage.getItem("AuthenticationExpires"))) {
           body.style.display="block"
           uname.innerText=sessiondetail[0];
           gender.innerText=sessiondetail[1]
           phone.innerText=sessiondetail[2];

           var sessionimg = sessionStorage.getItem("myfliximg");

           if (sessionimg==null) {
            if (sessiondetail[1]=="male") {
                navacc.style.backgroundImage="url(https://i.imgur.com/byT90Bu.png)"
                uimg.setAttribute("src","https://i.imgur.com/byT90Bu.png")
            }else if (sessiondetail[1]=="female"){
                navacc.style.backgroundImage="url(https://i.imgur.com/LeTHAg7.png)"
                uimg.setAttribute("src","https://i.imgur.com/LeTHAg7.png")
            }else {
                navacc.style.backgroundImage="url(https://i.imgur.com/ZNYCzx5.png)"
                uimg.setAttribute("src","https://i.imgur.com/ZNYCzx5.png")
            }

           }else {
            navacc.style.backgroundImage=`url(${sessionimg})`
            uimg.setAttribute("src",sessionimg)
           }

         

           
     }
     else {
        window.open("index.html", "_self");
   
     }

 

     var logout = document.getElementById("logout")

     logout.onclick=()=>{
        sessionStorage.removeItem("AuthenticationExpires")
        sessionStorage.removeItem("AuthenticationState")
        sessionStorage.removeItem("myfliximg")

        window.location.reload();
     }


var headerdis = document.getElementById("headerdis")
var threeline = document.getElementById("threeline")

threeline.onclick=()=>{
    headerdis.style.display=="none"?headerdis.style.display="grid":headerdis.style.display="none";
}

var dispic = document.getElementById("dispic")
uimg.onclick = ()=>{
    dispic.click()
}

dispic.onchange =()=>{
   let  imgsrc = dispic
   
   let reader = new FileReader();
   reader.readAsDataURL(imgsrc.files[0])
   reader.onload=()=>{
    var filename = reader.result;
    sessionStorage.setItem("myfliximg",filename)
    uimg.setAttribute("src",filename)
    navacc.style.backgroundImage=`url(${filename})`
   }

}



