let canvas = document.querySelector('canvas');
const form = document.querySelector('.signature-pad-form');
const clearButton = document.querySelector('.clear-button');
const color = document.querySelector('#col');
const background = document.querySelector('#back');
const size = document.querySelector('#size');


const ctx = canvas.getContext('2d');


ctx.lineWidth = 5;

ctx.lineJoin = ctx.lineCap = 'round';
ctx.strokeStyle = "black"
let writingMode = false;




const valuesetter = (ele,val) =>{
    ele = val;
}

color.addEventListener("change",()=>{
    console.log(color.value);
    ctx.strokeStyle = color.value
})
background.addEventListener("change",()=>{
    canvas.style.backgroundColor = background.value
})
size.addEventListener("change",()=>{
    ctx.lineWidth = size.value
})




const getCursorPosition = (event) => {
   let positionX = event.clientX - event.target.getBoundingClientRect().x;
   let positionY = event.clientY - event.target.getBoundingClientRect().y;
    // console.log(positionX,positionY);
    return [positionX, positionY];
  }

const handlePointerDown = (event) => {
    writingMode = true;
    ctx.beginPath();
    const [positionX, positionY] = getCursorPosition(event);
    ctx.moveTo(positionX, positionY);
  }


  const handlePointerUp = () => {
    writingMode = false;

  }

const handlePointerMove = (event) => {
    if (!writingMode) return
    const [positionX, positionY] = getCursorPosition(event);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
  }



canvas.addEventListener('pointerdown', handlePointerDown,{passive:true});
canvas.addEventListener('pointerup', handlePointerUp,{passive:true});
canvas.addEventListener('pointermove', handlePointerMove,{passive:true});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const imageURL = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.setAttribute("href",imageURL);
    a.setAttribute("download","true")
    a.click()
    clearPad();
  })
  const clearPad = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearPad();
  })