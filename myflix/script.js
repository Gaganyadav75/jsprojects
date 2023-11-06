var haveac = document.getElementById("haveac")
var donthaveac = document.getElementById("donthaveac")
var logindiv = document.getElementById("logindiv")
var signupdiv = document.getElementById("signupdiv")

const acc = (me,you)=>{
you.style.display="none";
me.style.display="block";
}

haveac.onclick= ()=>(acc(logindiv,signupdiv))
donthaveac.onclick= ()=>(acc(signupdiv,logindiv))




var signupfrm = document.getElementById("sheetdb-form")
var signupdetail= document.querySelectorAll(".signupdetail")

var signupdetailforlstor=[];

signupfrm.onsubmit=()=>{
    // var date = new Date;
    // var currdate = `${date.getDate()+5},${date.getMonth()},${date.getFullYear()}`
    let expirationDate = new Date(new Date().getTime() + (60000 * 7200))
    var phone = document.getElementById("phone")
    if (phone.value!="" ) {
    if (localStorage.getItem(phone.value)==null) {



        let i=0;
        signupdetail.forEach(detail =>{
            
              signupdetailforlstor[i]=detail.value;
              i++;
          }) 
          localStorage.setItem(signupdetailforlstor[2],JSON.stringify(signupdetailforlstor));
          localStorage.setItem("AuthenticationState", "Authenticated");
          localStorage.setItem("AuthenticationExpires", expirationDate.toISOString());
        
          localStorage.setItem("myflix",JSON.stringify(signupdetailforlstor))

          haveac.click();
    

    }else{
        alert("Number already exist");
    }

}else{
    
}

    return false;
}



var loginbtn = document.getElementById("login")
var loginphone= document.getElementById("loginphone")
var loginpass= document.getElementById("loginpass")
var loginfrm= document.getElementById("loginfrm")

loginbtn.addEventListener('click',()=>{
   var gotval= JSON.parse(localStorage.getItem(loginphone.value))
//    console.log(gotval);
   let expirationDate = new Date(new Date().getTime() + (60000 * 7200))
   if (loginphone.value!="" && loginpass.value!="") {
    if (gotval!=null) {
       
            
            if (gotval[3]==loginpass.value){
                localStorage.setItem("AuthenticationState", "Authenticated");
                localStorage.setItem("AuthenticationExpires",expirationDate.toISOString());
               localStorage.setItem("myflix",JSON.parse(localStorage.getItem(loginphone.value)));
                setTimeout(() => {
                    // window.open('https://gaganyadav75.github.io/jsprojects/netflixapp/','_self');
                    window.open('net.html','_self');
                 
                }, 2000); 
            }else{
                alert("Wrong Password")
            }   
        
       
    }else{
       
        alert("Number does not exists");
            
      
    }
}else {
    alert("Something wrong")
}

 return false;
 
}


)


window.onpageshow=()=>{
    let sessionauth = localStorage.getItem("AuthenticationState")
    let sessionexpire = localStorage.getItem("AuthenticationExpires")
    
    if (localStorage.getItem("myflix")!=null && sessionauth=="Authenticated") {
        
        window.open('net.html','_self');
    }
    
}
