const box = document.querySelectorAll(".box"); // we will get all the boxes/cells
const X_PLAYER = 'X';
const O_PLAYER = 'O';
let turn = X_PLAYER; //for tracking the number of turns and we are using "let" as the value will be changing each time and our starting position will be X
const playboardstate = Array(box.length); // this array will contain 9 items as we have 9 boxes 
playboardstate.fill(null);

//For accessing the HTML elements in JavaScript file the DOM Manipulation is used
const mark = document.getElementById("mark"); 
const gamefinishedarea = document.getElementById("game-finished-area");
const gamefinishedtext = document.getElementById("game-finished-text");
const playagain = document.getElementById("play-again");

// we will add even listener to each of the box 
playagain.addEventListener("click",startnewgame);
box.forEach((box) => box.addEventListener('click' , boxclick)); // for each tile we will add Even Listener using for each loop

function setHoverText() {  //function to display the Hover effect 
  //1. this function will work in two steps :- 1) It will remove any existing Hover effect in the boxes 2) It will add Hover effect for the current turn 
    box.forEach((box) => {
      box.classList.remove("x-hover"); // for removing any existing Hover effect by remove() method 
      box.classList.remove("o-hover");
    });
  
    const hoverClass = `${turn.toLowerCase()}-hover`;// string template for figuring out which class we will use based on the current turn 
  
    box.forEach((box) => {  //for setting the hover effect if there is no text
      if (box.innerText == "") {
        box.classList.add(hoverClass);  //adding the hoverclass to display the effect 
      }
    });
  }
  setHoverText(); //function calling 

function boxclick(event) {   // this function will give us the event as which box was clicked 
    if(gamefinishedarea.classList.contains('visible')) {  //if the game finish area is visible then it will stop 
        return ;
    }
    const box = event.target;  //we get reference to the HTML element that was clicked 
    const boxnumber = box.dataset.index;  //for knowing which box was clicked and for accessing the index of box we use data-set
    if(box.innerText != "") {   // check if it doesn't have a value that means an X or O is present in the box
        return;
    }
    if(turn == X_PLAYER)   //for checking whose turn it is 
    {
        box.innerText = X_PLAYER;  //for setting to player X
        playboardstate[boxnumber-1] = X_PLAYER;  //for updating the playboardstate, as array starts with 0 that means 
                                                //this array will go from 0-8 but our indexing starts from 1 in HTML so we have to -1 from it
        turn = O_PLAYER;  // since player X already went now its player O's turn
    }
    else 
    {
        box.innerText = O_PLAYER;       //for setting to player O
        playboardstate[boxnumber-1] = O_PLAYER;                   // for updating the playboard state
        turn = X_PLAYER;                                          // since player O already went now its player X's turn
    }
    setHoverText();                                                   //Function calling once more to reset the function 
    winnercheck();
}

function winnercheck() {   //for checking winner 
    for(const combinationforwinning of combinationforwinnings) { //for looping all the winning combinations using 'of' keyword
    const {combination,markClass} = combinationforwinning; //for extracting combination and markClass from combinationforwinning
    //now we are checking for winner 
    const boxvalue1 = playboardstate[combination[0]-1]; //for indexing 
    const boxvalue2 = playboardstate[combination[1]-1];
    const boxvalue3 = playboardstate[combination[2]-1];

    if(boxvalue1 != null && boxvalue1 === boxvalue2 && boxvalue1 === boxvalue3) { //for checking all the values are same
    mark.classList.add(markClass); //for marking the values if they are found in a row/column/diagonal
    gamefinishedscreen(boxvalue1); //after determing the winner we'll invoke the gamefinished screen with the value telling who the player was 
    return;   
        }
    }
    //to check whether the match is draw - Every single box is filled with a value that is not equal to null
    const allboxfilled = playboardstate.every((box)=>box!==null);  //for checking that all boxes are filled in and 
                                                                    //to check every single box is not equal to null
    if(allboxfilled) { //condition for checking that if all box is filled then display the gamefinishedscreen 
        gamefinishedscreen(null);
    }
}

function gamefinishedscreen(winnerText) {
    let message = "Match Draw!!!"; //by default
    if (winnerText != null) {
      message = `Winner is ${winnerText}!`; //for displaying who the winner is
    }
    gamefinishedarea.className = "visible"; //manipulating the DOM elements on the screen 
    gamefinishedtext.innerText = message;
  }

function startnewgame() {
    mark.className = "mark"; // we are resetting the elements 
    gamefinishedarea.className = "hidden";
    playboardstate.fill(null);
    box.forEach((box) => (box.innerText="")); //for each box we are setting the value to empty when we restart the game
    turn = X_PLAYER; //player X will again start the game
    setHoverText();
}
const combinationforwinnings = [ //for checking all the combinations to be a winner (horizontal,vertical or diagonal)
  //row wise
    { combination: [1, 2, 3], markClass: "mark-row-1" }, // contain objects which describes the winning combination and the mark used
    { combination: [4, 5, 6], markClass: "mark-row-2" }, 
    { combination: [7, 8, 9], markClass: "mark-row-3" },
  //column wise
    { combination: [1, 4, 7], markClass: "mark-col-1" },
    { combination: [2, 5, 8], markClass: "mark-col-2" },
    { combination: [3, 6, 9], markClass: "mark-col-3" },
  //diagonally
    { combination: [1, 5, 9], markClass: "mark-diag1" },
    { combination: [3, 5, 7], markClass: "mark-diag2" },
  ];
