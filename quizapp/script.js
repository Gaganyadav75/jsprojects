let answerbtn = document.querySelector(".answerbtn");
let sss = document.querySelector(".sss");
let selectcat = document.querySelector("#selectcat");
let selectdef = document.querySelector("#selectdef");
let selecttype = document.querySelector("#selecttype");
let questionh2 = document.getElementById("ques")
let timer = document.querySelector(".timer")


let start = document.querySelector("#start");
let next_btn = document.querySelector("#next-btn");
let second3  = document.getElementById("second3")
let ticktack  = document.getElementById("ticktack")

let mainurl = "https://opentdb.com/api.php?amount=10&category=";
var catog ="general";
let def = "&difficulty="
var level='9';
let encoding = "&type=";
let type = "multiple"
let allquestions = []

let questionnumber = 1;
let marks = 0;
let clicked = false;

let seconds = 30;
let sixty = 30;



start.addEventListener('click',()=>{
  catog =  selectcat.value;
  level = selectdef.value;
  type = selecttype.value;
  sss.style.display = "none"
  gettingquestions().then(e =>{

    updater('1',allquestions[0])
    timeupdater();

  })

})

next_btn.addEventListener('click',()=>{
    clicked=false;
    questionnumber++;
    if (questionnumber<11) {
    updater(questionnumber,allquestions[questionnumber-1])
    // console.log(allquestions[questionnumber-1]);
    seconds=sixty;
    }else{
        questionh2.innerText=`Total score is ${marks}`
        answerbtn.innerHTML=""
        
    }
    if (questionnumber>11) {
        location.reload()
    }
    
})
const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }


answerbtn.addEventListener('click',(e)=>{
   
    if (clicked==false) {
    anschecker(e,questionnumber-1);
    }
    
    
})



const anschecker =(e,i) =>{
    let ritans =  allquestions[i].correct_answer; 
 
    if (e.target.tagName=="BUTTON") {
        next_btn.style.display="block";
        clicked = true;

        if (e.target.innerText===ritans) {
            e.target.classList.add("correct")
            marks++;
    
        }else{
            e.target.classList.add("incorrect")
            Array.from(answerbtn.children).forEach(button=>{
                if (button.innerText==ritans) {
                    button.classList.add("correct")
                }
                })
            
        }      
    }
}



const gettingquestions = async () => {

    try {
        await fetch(mainurl+catog+def+level+encoding+type).then(resposne => resposne.json()).then(data => {

           
            
           Array.from(data.results).forEach(ele=>{
            let ddd = ' ';
            let replaceabled = ddd.concat([...ele.question.split("&quot;")]);
            
            
                let qst = {question:replaceabled.replace(',',' '),
                    correct_answer: ele.correct_answer,
                    incorrect_answers:ele.incorrect_answers, 
                } 
                    allquestions.push(qst) 
           })
           
        })

    } catch (error) {
      
        console.log(error);
    }

}

const updater = (indnum,questionarray) => {
//   console.log(questionarray);
    answerbtn.innerHTML="";
    let quest = questionarray.question
    let rightans = questionarray.correct_answer
    let wrongans = questionarray.incorrect_answers
// console.log(rightans);

   
   let allans  = [rightans,...wrongans]

    let rdnum = Math.floor(Math.random()*3);
    let newarr = allans;
    questionh2.innerText= indnum+'. '+quest;
    if (type=="multiple") {
        if (rdnum==0) {
            newarr = shuffle(allans);
        }else{
            let ff =allans ;
            for (let i = 0; i <= rdnum; i++) {
              ff =  shuffle(ff)
            }
            newarr = ff;
        }
        newarr.forEach(element => {
            let buttons = document.createElement("button");
            buttons.innerHTML=element;
            answerbtn.appendChild(buttons);
        });  
    }else if (type=="boolean") {
        let buttont = document.createElement("button");
        let buttonf = document.createElement("button");
        buttont.innerHTML="True";
        buttonf.innerHTML="False";
        answerbtn.appendChild(buttont)
        answerbtn.appendChild(buttonf)
    }
   

    

    
   next_btn.style.display="none"

}

const timeupdater = () => {
  setInterval(() => {
    if (questionnumber<=11) {
        timer.innerText=seconds;
        if (seconds<=0) {
            next_btn.click();
            seconds=sixty
        }else{
            seconds--;
        }
        if (seconds<5) {
            second3.pause();
            ticktack.play();
        }else if (seconds>=5) {
            second3.play();
            ticktack.pause()
          }
    }

  }, 1000);

        
    
}