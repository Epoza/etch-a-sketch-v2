let containerEl = document.querySelector(".div_container") as HTMLElement;
let eraserButton = document.getElementById("eraseButton") as HTMLElement;
let dimensionsButton = document.getElementById("dimensionsButton") as HTMLElement;

// base values for when website first loads
let baseColRows: number = 4;
// calculates the dimensions of the box and divs inside
let baseDimensions: number =  (100 / baseColRows) * 5;

// function that calculates the grid dimensions and div styling
function createDivs(newColRows: number, newDimensions: number) {
    // makes a newColRows x newColRows grid ex: 4x4 grid
    containerEl.style.gridTemplateColumns = `repeat(${newColRows}, auto)`; 
    containerEl.style.gridTemplateRows = `repeat(${newColRows}, ${newDimensions}px)`;
    // creates specified amount of divs
    let totalDivs = newColRows * newColRows;
    // make and style each div
    for(let i = 0; i < totalDivs; i++){
        let newDiv = document.createElement("div")
        newDiv.style.background = "white";
        newDiv.style.height = `${newDimensions}px`;
        newDiv.style.width = `${newDimensions}px`;
        // changes background color when hovered
        newDiv.addEventListener("mouseover", (e: MouseEvent) => {
            const targetElement = e.target as HTMLElement;
            if (e.target && eraserClicked === false) {
                targetElement.style.backgroundColor = "black";
            } else {
                // eraser button is clicked
                targetElement.style.backgroundColor = "white"
            }
        });
        containerEl.appendChild(newDiv);
    }
}

createDivs(baseColRows, baseDimensions);

// add listener for buttons
let eraserClicked = false;
eraserButton.addEventListener('click', (e) => {
    if (e.target) {
        eraserClicked = !eraserClicked; // Toggle the state
        if (eraserClicked) {
            // change styles when the button is clicked
            eraserButton.style.color = "white";
            eraserButton.style.backgroundColor = "black";
            eraserButton.style.fontSize = "1.25rem";
            eraserButton.style.padding = "0.25rem";
        } else {
            // reset styles when the button is not clicked
            eraserButton.style.color = ""; 
            eraserButton.style.backgroundColor = "";
            eraserButton.style.fontSize = "";
            eraserButton.style.padding = "";
        }
    } else {
        alert("Error!")
    }
});

// promps user for new dimensions
dimensionsButton.addEventListener('click', (e) => {
    if(e.target){
        console.log("dimensions");
        let userInput = parseInt(prompt("Enter amount rows x columns", "4")!);
        let divColRows: number;
        // checks that userInput is a whole number from 1-99
        if(userInput >= 1 && userInput <= 99){
            divColRows = userInput;
            console.log(divColRows);
        } else {
            alert("Error: please enter a number from 1 to 99")
            divColRows = 4;
        }
        let dimensions: number =  (100 / divColRows) * 5;
        // clear existing divs
        containerEl.innerHTML = '';
        // create the new etch a sketch board
        createDivs(divColRows, dimensions);
    } else {
        alert("Error!");
    }
});