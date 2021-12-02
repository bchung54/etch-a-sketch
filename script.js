const N = 16;

function addNElements(n, node) {

    // loop to create n div elements and append as child to node
    for (let i = 0; i < n; i++) {
        
        const newDiv = document.createElement('div');
        newDiv.classList.add('colDiv');
        
        // loop to create another n div elements and append as child to create grid
        for (let i = 0; i < n; i++) {

            const newNewDiv = document.createElement('div');
            newNewDiv.classList.add('childDiv');
            newNewDiv.style.backgroundColor = 'rgb(100%, 100%, 100%)';

            // add mouseover color change to new div
            newNewDiv.addEventListener('mouseover', function(e) {
                e.target.setAttribute('style', `background-color: ${rgb10(e.target.style.backgroundColor)};`);
            });

            newDiv.appendChild(newNewDiv);
        }
        node.appendChild(newDiv);
    }
}

function rgb10 (color) {
    var rgb = color.replace(/[^\d,]/g, '').split(',');
    var red = parseInt(rgb[0]);
    var green = parseInt(rgb[1]);
    var blue = parseInt(rgb[2]);
    return `rgb(${red - 25}, ${green - 25}, ${blue - 25})`;
}

function rgbRandom() {

    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function reset() {

    // removes all child nodes of main container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // prompt user for number of squares per side and validate input
    const userN = input();

    // create grid with user input number as the squares per side
    addNElements(userN, container);
    
}

function input() {
    // takes in user input to be used as the squares per side for new grid
    // validates input for integer between 1-100

    // default is global N = 16
    let output = N;

    do {
        let promptMessage = "Enter number of squares per side for the new grid (integers only): ";
        if (isNaN(output) | output < 1 | output > 100) {
            promptMessage = "Please enter an integer between 1 and 100 (inclusive)!";
        }
        output = parseInt(prompt(promptMessage));

    } while (isNaN(output) | output < 1 | output > 100);
    
    return output;
}

// create main container for all of the divs and give it an id
const container = document.createElement('div');
container.setAttribute('id', 'container');

// add reset button to top of screen
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', reset);

// create the grid and append to contianer
addNElements(N, container);

// append container to the body of html
document.body.appendChild(container);
