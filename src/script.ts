let containerEl = document.querySelector(".div_container") as HTMLElement;
let divRowsCols: number = 4; // make this a prompt later
let divDimensions: number = divRowsCols * 25;

// function that calculates grid col and rows
function createRowsCols() {
    containerEl.style.gridTemplateColumns = `repeat(${divRowsCols}, 1fr)`; // change 4 to whatever divrowscols
    containerEl.style.gridTemplateRows = `repeat(${divRowsCols}, ${divDimensions}px)`; // change px to match height and width using divrowscols * 6
    containerEl.style.gap = "2px"; // delete later
}

// creates specified amount of divs
function createDivs(divRowsCols: number) {
    let totalDivs = divRowsCols * divRowsCols; // gets total divs ex: 16 = 4 * 4
    for(let i = 0; i < totalDivs; i++){
        let newDiv = document.createElement("div")
        newDiv.style.background = "black";
        newDiv.style.height = `${divDimensions}px`; // multiply divrowscols * 6
        newDiv.style.width = `${divDimensions}px`;    // multiply divrowscols * 6
        containerEl.appendChild(newDiv);
    }
}
createRowsCols();
createDivs(divRowsCols)

// event listener hover function
// change background color to black