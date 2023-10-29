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

const fetchdata = (url,moviediv,classname,optionspass)=>{
    
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
            imgtag.setAttribute("class",classname)
           
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
       

    }).then(()=>posterchange(classname,"alt")).catch(error=>console.log(error))
}


//it is change the poster on click

const posterchange=(classes,srccheck)=>{
   
    const image1 = document.querySelectorAll(`.${classes}`);
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
    fetchdata(urls[0],moviesdiv[0],clname1)
    fetchdata(urls[1],moviesdiv[1],clname1)
    fetchdata(urls[2],moviesdiv[2],clname1)
}

//it is for tvshows navbar  

navtvshows.addEventListener('click',()=>{
    divnone()
tvshowmaindiv.style.display="block"
    const options = {method: 'GET', headers: {accept: 'application/json'}};
   let url = 'https://api.themoviedb.org/3/tv/popular?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
fetchdata(url,tvshowsdiv,"imgclass2",options);
})


//it is for navmovies

navmovie.addEventListener('click',()=>{
    divnone()
moviesmaindiv.style.display="block"
const options = {method: 'GET', headers: {accept: 'application/json'}};
   let url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213&language=en-US'
fetchdata(url,moviesshowdiv,"imgclass3",options);
})


//add list function
var addlistbtn = document.getElementById('addlistbtn')

let imgarrayofall=[];


//it if for adding movies to the lists

addlistbtn.addEventListener('click',()=>{
    var mvname = moviename.innerText;
    var mvdisc = moviedesc.innerText;
    var bgimg = window.getComputedStyle(featureddiv).getPropertyValue('background-image').replace(/^url\(['"]?(.+?)['"]?\)/,'$1')

    // console.log(bgimg);
    // var imgforlist = document.createElement("img")
    // imgforlist.setAttribute('movienm',mvname)
    // imgforlist.setAttribute('overview',mvdisc)
    // imgforlist.setAttribute('src',bgimg)
    // imgforlist.setAttribute('class',"listimgs")

    
    let x =0;

    let objdata =JSON.parse(localStorage.getItem("itemset"))

    if (objdata!=null) {
    
        for (let i = 0; i < objdata.length; i++) {
            // console.log(objdata[i]);
            for (let j = 0; j < objdata.length; j++) {
               if (objdata[i][0][0]==mvname) {
                x++;
               
               }
                
            }
            
        }
        

       }

    // document.querySelectorAll(".listimgs").forEach(element => {
    //     if (element.getAttribute('movienm')==mvname) {
    //         x++;
    //     }
       
    // });

    // console.log(x);

    let imgarray=[];
    if (x==0) {
    //     // mylistshowdiv.appendChild(imgforlist)
    //     // imgarray.push(JSON.stringify(imgarray))
        let eacharray = [mvname,mvdisc,bgimg]
        imgarray.push(eacharray)
        imgarrayofall.push(imgarray)
        localStorage.setItem("itemset",JSON.stringify(imgarrayofall))
        sessionStorage.setItem("itemset",JSON.stringify(imgarrayofall))
        x=0;
    
    // }else{
    //     console.log("hii")
    }
    
})


//it is for navlist click

navmylist.addEventListener('click',()=>{ 
divnone()
mylistmaindiv.style.display="block"
})



//it will check the local storage 

const localcheck = ()=>{
    let objdata =JSON.parse(localStorage.getItem("itemset"))

if (objdata!=null) {
    let t=0;
    objdata.forEach(element => {
       
       objdata.forEach(ele=>{
        if (ele[0][0]!=element[0][0]) {

            t++;
           
        }
       })
 
       if (t!=0) {
        let localimg= document.createElement("img");
        localimg.setAttribute("class","listimgs")
        localimg.setAttribute("movienm",element[0][0])
        localimg.setAttribute("overview",element[0][1])
        localimg.setAttribute("src",element[0][2])
        // console.log(element[0][2]);
        mylistshowdiv.appendChild(localimg);
        t=0;
       }
       
    });
 
}

posterchange("listimgs","src")
}



//it is for on load of window 

window.onload=()=>{
    home()
    localcheck();
};


//calling function on homeclick

navhome.onclick = ()=>{
   divnone()
   maindiv.style.display="block"
    home()
}