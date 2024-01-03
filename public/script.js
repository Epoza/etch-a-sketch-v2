"use strict";
let containerEl = document.querySelector(".div_container");
let eraserButton = document.getElementById("eraseButton");
let dimensionsButton = document.getElementById("dimensionsButton");
let divRowsCols = 4;
// calculates the dimensions of the box and divs inside
let divDimensions = (100 / divRowsCols) * 5;
// function that calculates grid col and rows
function createRowsCols() {
    containerEl.style.gridTemplateColumns = `repeat(${divRowsCols}, auto)`; // change 4 to whatever divrowscols
    containerEl.style.gridTemplateRows = `repeat(${divRowsCols}, ${divDimensions}px)`; // change px to match height and width using divrowscols * 6
    containerEl.style.gap = "2px"; // delete later
}
// creates specified amount of divs
function createDivs(divRowsCols) {
    let totalDivs = divRowsCols * divRowsCols; // gets total divs ex: 16 = 4 * 4
    for (let i = 0; i < totalDivs; i++) {
        let newDiv = document.createElement("div");
        newDiv.style.background = "white";
        newDiv.style.height = `${divDimensions}px`; // multiply divrowscols * 6
        newDiv.style.width = `${divDimensions}px`; // multiply divrowscols * 6
        // changes background color when hovered
        newDiv.addEventListener("mouseover", (e) => {
            const targetElement = e.target;
            if (e.target && eraserClicked === false) {
                targetElement.style.backgroundColor = "black";
            }
            else {
                console.log("yess it is trueee...");
                targetElement.style.backgroundColor = "white";
            }
            // if eraserclicked is true
        });
        containerEl.appendChild(newDiv);
    }
}
createRowsCols();
createDivs(divRowsCols);
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
        }
        else {
            // reset styles when the button is not clicked
            eraserButton.style.color = "";
            eraserButton.style.backgroundColor = "";
            eraserButton.style.fontSize = "";
            eraserButton.style.padding = "";
        }
    }
});
// promps user for new dimensions
dimensionsButton.addEventListener('click', (e) => {
    if (e.target) {
        console.log("dimensions");
        let userInput = parseInt(prompt("Enter amount rows x columns", "4"));
        // checks that userInput is a whole number from 1-99
        if (userInput >= 1 && userInput <= 99) {
            divRowsCols = userInput;
            console.log(divRowsCols);
        }
        else {
            alert("Error: please enter a number from 1 to 99");
            divRowsCols = 4;
        }
    }
});
