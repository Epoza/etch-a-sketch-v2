let buttonStates: { [key: string]: boolean } = {
    shadingClicked: false,
    eraserClicked: false,
};

let containerEl = document.querySelector(".div_container") as HTMLElement;
let eraserButton = document.getElementById("eraseButton") as HTMLElement;
let dimensionsButton = document.getElementById("dimensionsButton") as HTMLElement;
let toggleButtonState = document.querySelectorAll(".toggle_button_state")

// base values for when the website first loads
let divColRows: number = 4;
let dimensions: number = calculateDimensions(divColRows);

// Adjust the base dimensions based on the screen width or height
function calculateDimensions(colRows: number): number {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    if(screenWidth < 470 || screenHeight < 580){
        // calculates the dimensions of the box and divs inside
        return (100 / colRows) * 3;
    }else if(screenWidth < 640 || screenHeight < 640){
        return (100 / colRows) * 4;
    } else if (screenWidth < 768 || screenHeight < 768){
            return (100 / colRows) * 4.5;
    }
    return (100 / colRows) * 5;
}

// function that calculates the grid dimensions and div styling
function createDivs(newColRows: number, newDimensions: number) {
    // makes a newColRows x newColRows grid ex: 4x4 grid
    containerEl.style.gridTemplateColumns = `repeat(${newColRows}, auto)`; 
    containerEl.style.gridTemplateRows = `repeat(${newColRows}, ${newDimensions}px)`;
    // creates specified amount of divs
    let totalDivs = newColRows * newColRows;
    // make and style each new div
    for(let i = 0; i < totalDivs; i++){
        let newDiv = document.createElement("div")
        newDiv.style.background = "white";
        newDiv.style.height = `${newDimensions}px`;
        newDiv.style.width = `${newDimensions}px`;
        // checks for mouseover div event
        newDiv.addEventListener("mouseover", (e: MouseEvent) => {
            const targetElement = e.target as HTMLElement;
            if (e.target) {
                divColor(targetElement)
            }
        });
        containerEl.appendChild(newDiv);
    }
}

// change div color depending on button clicked
function divColor (targetElement: HTMLElement) {
    switch (true) {
        case buttonStates.eraserClicked:
            targetElement.style.backgroundColor = "white";
            // reset the shading level to 0
            targetElement.setAttribute("data-shading-level", "0");
            break;
        case buttonStates.shadingClicked:
            // get the current shading level or default to 0
            const currentShadingLevel = parseFloat(targetElement.getAttribute("data-shading-level")!) || 0;
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
    // updates favicon colors
    updateFavicon(divColRows);
}

// updates favicon based on div colors in the grid
function updateFavicon(numCols: number) {
    // creates a canvas for the favicon
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 32;
    canvas.height = 32;

    const blocks = document.querySelectorAll(".div_container > div");

    // gets the total amount of blocks for the canvas
    if (context) {
        blocks.forEach((block, index) => {
            const x = index % numCols;
            const y = Math.floor(index / numCols);
            const color = getBlockColor(block as HTMLElement);

            context.fillStyle = color;
            context.fillRect(x * (canvas.width / numCols), y * (canvas.height / numCols), canvas.width / numCols, canvas.height / numCols);
        });
        
        // function to get the background color of a block
        function getBlockColor(block: HTMLElement): string {
            const computedStyle = window.getComputedStyle(block);
            return computedStyle.backgroundColor || "white";
        }

        const imageDataUrl = canvas.toDataURL("image/png");

        // Update the favicon
        const faviconLink = document.querySelector('link[rel="icon"]');
        if (faviconLink instanceof HTMLLinkElement) {
            faviconLink.href = imageDataUrl;
        }
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

// user creates new dimensions for grid
dimensionsButton.addEventListener('click', (e) => {
    if(e.target){
        let userInput = parseInt(prompt("Enter the amount rows and columns (ex: 4, for a 4x4 grid", "4")!);
        // checks that userInput is a whole number from 1-99
        if(userInput >= 1 && userInput <= 99){
            divColRows = userInput;
        } else {
            alert("Error: please enter a number from 1 to 99")
            divColRows = 4;
        }
        dimensions = calculateDimensions(divColRows);
        // clear existing divs
        containerEl.innerHTML = '';
        // create the new etch a sketch board
        createDivs(divColRows, dimensions);
    } else {
        alert("Error!");
    }
});

// creates base grid dimensions when website first loads
createDivs(divColRows, dimensions);