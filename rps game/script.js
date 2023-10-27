
let rembtn = document.getElementById("remove");
let score = document.getElementById("score");
let scoretxt = document.getElementById("scoretxt");

let rps = document.querySelectorAll('.clbtns')
let x=0;

rps.forEach(i => {i.onclick = function check(){
  let cvalue = randgen();
  let shvalue = `👦${i.value} V/S 🤖${cvalue}`;
    if(cvalue == this.value){   //when its a tie
      scoretxt.innerText =`${shvalue}\n It's a tie`;
    }else if (this.value=="Rock" && cvalue =="Scissor") {  //when human wins 
      scoretxt.innerText =`${shvalue}\nYou Win`;
      score.innerText=`Score : ${x+=1}`;   
    }else if (this.value=="Paper" && cvalue =="Rock") {
      scoretxt.innerText =`${shvalue}\nYou Win`;
      score.innerText=`Score : ${x+=1}`;
    }else if (this.value=="Scissor" && cvalue =="Paper") {
      scoretxt.innerText =`${shvalue}\nYou Win`;
      score.innerText=`Score : ${x+=1}`;
    }else{
      scoretxt.innerText =`${shvalue}\nYou Lost`;
      
      score.innerText=`Score : ${x-=1}`;
    }}
})

const randgen = ()=>{
  let value = ["Rock","Paper","Scissor"];
  let randnum = Math.floor(Math.random() *3);
 
  return value[randnum];
}

rembtn.onclick = () => {
  x="";
  score.innerText="";
  scoretxt.innerText="";
}
// let random = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

