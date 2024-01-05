"use strict";
let buttonStates = {
    shadingClicked: false,
    eraserClicked: false,
};
let containerEl = document.querySelector(".div_container");
let eraserButton = document.getElementById("eraseButton");
let dimensionsButton = document.getElementById("dimensionsButton");
let toggleButtonState = document.querySelectorAll(".toggle_button_state");
// base values for when website first loads
let baseColRows = 4;
// calculates the dimensions of the box and divs inside
let baseDimensions = calculateDimensions(baseColRows);
// Adjust the base dimensions based on the screen width
function calculateDimensions(colRows) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    if (screenWidth < 470 || screenHeight < 580) {
        return (100 / colRows) * 3;
    }
    else if (screenWidth < 640 || screenHeight < 640) {
        return (100 / colRows) * 4;
    }
    else if (screenWidth < 768 || screenHeight < 768) {
        return (100 / colRows) * 4.5;
    }
    return (100 / colRows) * 5;
}
// function that calculates the grid dimensions and div styling
function createDivs(newColRows, newDimensions) {
    // makes a newColRows x newColRows grid ex: 4x4 grid
    containerEl.style.gridTemplateColumns = `repeat(${newColRows}, auto)`;
    containerEl.style.gridTemplateRows = `repeat(${newColRows}, ${newDimensions}px)`;
    // creates specified amount of divs
    let totalDivs = newColRows * newColRows;
    // make and style each div
    for (let i = 0; i < totalDivs; i++) {
        let newDiv = document.createElement("div");
        newDiv.style.background = "white";
        newDiv.style.height = `${newDimensions}px`;
        newDiv.style.width = `${newDimensions}px`;
        // checks for mouseover div event
        newDiv.addEventListener("mouseover", (e) => {
            const targetElement = e.target;
            if (e.target) {
                divColor(targetElement);
            }
        });
        containerEl.appendChild(newDiv);
    }
}
// change div color depending on button clicked
function divColor(targetElement) {
    switch (true) {
        case buttonStates.eraserClicked:
            targetElement.style.backgroundColor = "white";
            // reset the shading level to 0
            targetElement.setAttribute("data-shading-level", "0");
            break;
        case buttonStates.shadingClicked:
            // get the current shading level or default to 0
            const currentShadingLevel = parseFloat(targetElement.getAttribute("data-shading-level")) || 0;
            // increase shading level by 10%, up to a maximum of 1
            const newShadingLevel = Math.min(currentShadingLevel + 0.1, 1);
            // apply the new shading level
            targetElement.style.backgroundColor = `rgba(0, 0, 0, ${newShadingLevel})`;
            // update the shading level
            targetElement.setAttribute("data-shading-level", newShadingLevel.toString());
            break;
        default:
            targetElement.style.backgroundColor = "black";
            // reset the shading level to 0
            targetElement.setAttribute("data-shading-level", "0");
    }
}
// add listener for coloring buttons
toggleButtonState.forEach(button => {
    button.addEventListener('click', (e) => {
        // get the data-variable attribute value
        const buttonVariable = button.getAttribute('data-variable');
        // set all other states to false and reset styles
        toggleButtonState.forEach(otherButton => {
            const otherButtonVariable = otherButton.getAttribute('data-variable');
            if (otherButtonVariable && otherButtonVariable !== buttonVariable) {
                buttonStates[otherButtonVariable] = false;
                if (otherButton instanceof HTMLElement) {
                    otherButton.style.backgroundColor = "";
                    otherButton.style.color = "";
                    otherButton.style.fontSize = "";
                    otherButton.style.padding = "";
                }
            }
        });
        // toggle the associated variable
        if (buttonVariable && buttonStates.hasOwnProperty(buttonVariable)) {
            buttonStates[buttonVariable] = !buttonStates[buttonVariable];
            // button styling when clicked
            if (button instanceof HTMLElement) {
                button.style.color = buttonStates[buttonVariable] ? "white" : '';
                button.style.backgroundColor = buttonStates[buttonVariable] ? "black" : '';
                button.style.fontSize = buttonStates[buttonVariable] ? "1.25rem" : '';
                button.style.padding = buttonStates[buttonVariable] ? "0.25rem" : '';
            }
        }
    });
});
// promps user for new dimensions
dimensionsButton.addEventListener('click', (e) => {
    if (e.target) {
        let userInput = parseInt(prompt("Enter the amount rows and columns (ex: 4, for a 4x4 grid", "4"));
        let divColRows;
        // checks that userInput is a whole number from 1-99
        if (userInput >= 1 && userInput <= 99) {
            divColRows = userInput;
        }
        else {
            alert("Error: please enter a number from 1 to 99");
            divColRows = 4;
        }
        let dimensions = calculateDimensions(divColRows);
        // clear existing divs
        containerEl.innerHTML = '';
        // create the new etch a sketch board
        createDivs(divColRows, dimensions);
    }
    else {
        alert("Error!");
    }
});
// creates base 
createDivs(baseColRows, baseDimensions);
