class bank {

  constructor(name,balance){
    this.name = name;
this.balance= balance;
  }
    
    deposit(balance,amount) {
    balance += amount;
    }
  
    withdraw(balance,amount) {
      if (balance >= amount) {
       return balance -= amount;
      } else {
        console.log("insufficient balance")
      }
  
    }
  
    rename(nm) {
      this.name = nm;
    }
  
    close() {
      this.name = undefined;
      this.balance = undefined;
    }
  }

  
  const gagan = new bank(undefined,undefined);


  
  const entname = document.getElementById("name");
  const bal = document.getElementById("balance");
  const submit = document.getElementById("submit");
  const showname = document.getElementById("showname");
  const showbalance = document.getElementById("showbalance");
  const amount = document.getElementById("amount");
  const deposit = document.getElementById("deposit");
  const withdraw = document.getElementById("withdraw");
  const alreadyac = document.getElementById("alreadyac");
  
  const acdiv = document.getElementById("acdiv");
  const showdiv = document.getElementById("show");

  alreadyac.onclick = () => {
   bal.style.display!="none" ? disnone():disblock();
 function disnone(){
    bal.style.display="none";
    bal.value=null;
    alreadyac.innerText = "Don't Have an Account"
   }
function disblock(){
    bal.style.display="block";
    alreadyac.innerText = "Already Had an Account"
   }
    
  }
  
  



  const accopening = () => {
    let nm = entname.value.toUpperCase();
    let bl = Number(bal.value);

    gagan.name = nm;
    gagan.balance = bl;

  valueset()
  
    acdiv.style.display = "none";
  
    showdiv.style.display = "flex";
  

  }





  const acclogin = ()=>{
    let nmx =entname.value.toUpperCase()
    valueget(nmx)
     valueset()
  
    acdiv.style.display = "none";
    
    showdiv.style.display = "flex";
  return false
  }



  
  submit.onclick = () => {
    entname.value!=""&&bal.value!="" ?accopening():bal.style.display=="none"&&entname.value!="" ? acclogin():console.log("error");
    return false
  }
  
  deposit.onclick = ()=>{

   let x =Number(amount.value)
   gagan.balance+=x;
   valueset()
  
  }

  withdraw.onclick = ()=>{
    let x =Number(amount.value)
      gagan.balance>x ? ()=>{gagan.balance-=x;valueset();}: alert("insufficient balance");
    
  }


const valueset = ()=>{

    let objdata = {"name":gagan.name,"balance":gagan.balance}
    let data = JSON.stringify(objdata);
           
        localStorage.setItem(gagan.name,data);

    if (gagan.balance!=undefined &&gagan.name!=undefined) {
        showname.innerText = gagan.name;
        showbalance.innerText =gagan.balance;
      }
}

const valueget = (nmx)=>{
    let gotdata = localStorage.getItem(nmx);
    let data = JSON.parse(gotdata);
            gagan.name = data.name;
            gagan.balance =Number(data.balance);
}


  
