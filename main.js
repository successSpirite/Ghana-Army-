
const Num = document.getElementById("num");


const Numerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//const sumOfAll = [...Numerals];

//console.log(sumOfAll.length);




function generateCode(code, length = 6) {
  
  let newCode = " ";
  for (var i = 0; i < length; i++) {
    // Tab to edit
    const randomIndex = Math.floor(Math.random() * code.length);
    newCode += code[randomIndex];
  }
  return newCode;
  
}





//Generating code
setTimeout(  ()=>{
Num.textContent = generateCode(Numerals);
}, 100);






//Auto moving cusor
  const NumInput = document.querySelectorAll(".Num-input");
  

NumInput.forEach((input, index)=>{
  input.addEventListener( 'input', ()=>{
    if (input.value.length === 1) {
      
      if (index < NumInput.length - 1) {
        NumInput[index + 1 ].focus();
      }
      
      
    }
  } );
  
  input.addEventListener("keydown", (e)=>{
    if (e.key === "Backspace" && input.value === " ") {
      if (index > 0) {
        
    NumInput[index - 1].focus();
   NumInput[index - 1].value = " ";


      }
      
    }
    
  });
  
  
} );






// submit Button 
const Button = document.getElementById("BTN");

Button.addEventListener('click', ()=>{
  const inputedCodes = Array.from(NumInput).map(input => input.value).join('');
  const AuctualCode = Num.textContent.trim();
//  console.log( "Actual code " + AuctualCode);
 //console.log("inputedCodes " + inputedCodes);
  
  
  if ( inputedCodes === AuctualCode){
  //  console.log("hello");
    
    
    document.querySelector(".container").style.display = "none";


const TimeoutId = setTimeout(   ()=>{
  
document.querySelector(".well_Done    ").style.display = "flex";
  
}, 1000);
//clearTimeout(TimeoutId);

//document.querySelector(".Input_User-Container").style.display = "flex";
  

    
    
  }
  
});


//GAF
const codeContainer =  document.querySelector(".container");

const InputUserContainer = document.querySelector(".Input_User-Container");


const inputGAF = document.getElementById('inputGAF');

const gafUserBTN =  document.getElementById("GAFBTN");

gafUserBTN.addEventListener('click', ()=>{
  
  if (inputGAF.value.trim() === '') {
    InputUserContainer.style.display = "flex";

    
    
    
  } else {
    
InputUserContainer.style.display = "none";
    //BringingBack
    codeContainer.style.display = "flex";
  }
  
 //console.log(inputGAF.value);
} );