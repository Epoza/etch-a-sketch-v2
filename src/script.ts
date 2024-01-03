let containerEl = document.querySelector(".div_container") as HTMLElement;
let userInput = parseInt(prompt("Enter amount rows x columns", "4")!);

let divRowsCols: number;
// checks that userInput is a whole number from 1-99
if(userInput >= 1 || userInput <= 99){
    divRowsCols = userInput;
    console.log(divRowsCols);
} else {
    alert("Please enter a number from 1 to 99")
    divRowsCols = 4;
}

let testing123 = 100 / divRowsCols;

let divDimensions: number = divRowsCols * testing123;

// function that calculates grid col and rows
function createRowsCols() {
    containerEl.style.gridTemplateColumns = `repeat(${divRowsCols}, auto)`; // change 4 to whatever divrowscols
    containerEl.style.gridTemplateRows = `repeat(${divRowsCols}, ${divDimensions}px)`; // change px to match height and width using divrowscols * 6
    containerEl.style.gap = "2px"; // delete later
}

// creates specified amount of divs
function createDivs(divRowsCols: number) {
    let totalDivs = divRowsCols * divRowsCols; // gets total divs ex: 16 = 4 * 4
    for(let i = 0; i < totalDivs; i++){
        let newDiv = document.createElement("div")
        newDiv.style.background = "white";
        newDiv.style.height = `${divDimensions}px`; // multiply divrowscols * 6
        newDiv.style.width = `${divDimensions}px`;    // multiply divrowscols * 6
        // changes background color when hovered
        newDiv.addEventListener("mouseover", (e: MouseEvent) => {
            if (e.target) {
                const targetElement = e.target as HTMLElement;
                targetElement.style.backgroundColor = "black";
            }
        });
        containerEl.appendChild(newDiv);
    }
}
createRowsCols();
createDivs(divRowsCols)

// event listener hover function

// change background color to black