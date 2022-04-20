// Defaults
var N = 16; // number of cells per side in screen
var S = 10; // percent to increase saturation on each pass
var C = 'black'; // black, red, blue, random

// Grid functionality
//
// Create grid and appends to node
function addNElements(node, n, color, saturation) {
    // parameters: node to add cells to, number of cells per side, color setting, saturation setting
    // output: none

    // loop to create n div elements and append as child to node
    for (let i = 0; i < n; i++) {
        
        // create column for cells
        const column = document.createElement('div');
        column.classList.add('column');
        
        // loop to create another n div elements and append as child to create grid
        for (let i = 0; i < n; i++) {

            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.style.backgroundColor = 'rgb(100%, 100%, 100%)';

            // add mouseover color change to new div
            cell.addEventListener('mouseover', function(e) {
                e.target.setAttribute('style', `background-color: ${rgbIntensify(e.target.style.backgroundColor, color, saturation)};`);
            });

            column.appendChild(cell);
        }
        node.appendChild(column);
    }
}

// Clear grid
function clear() {
    // removes all child nodes of main container
    while (screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }
    // recreate grid with current number of the cells per side
    addNElements(screen, N, C, S);
}

// Resize grid
function resize() {
    // removes all child nodes of main container
    while (screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }
    N = input();
    // create grid with user input number as the cells per side
    addNElements(screen, N, C, S);
}

// Button functionality
//
// Add function to resize button
const resizeButton = document.querySelector('#resize');
resizeButton.addEventListener('click', resize);

// Add function to clear button
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

// resize: helper function
function input() {
    // parameters: none
    // output: number from user input
    // validates input for integer between 1-100

    // give output a starting value of N (default N = 16)
    let output = N;

    do {
        let promptMessage = "Enter number of cells per side for the new grid (integers only): ";
        if (isNaN(output) | output < 1 | output > 100) {
            promptMessage = "Please enter an integer between 1 and 100 (inclusive)!";
        }
        output = parseInt(prompt(promptMessage));
    } while (isNaN(output) | output < 1 | output > 100);

    return output;
}

// Color and saturation functionality
//
// Intensifies color by saturation settings (default saturation is 10%)
function rgbIntensify (currColor, settingColor, percent) {
    // parameters: current color, new setting color, percent saturation
    // output: string containing new  rgb value

    const rgb = currColor.replace(/[^\d,]/g, '').split(',');
    const red = parseInt(rgb[0]);
    const green = parseInt(rgb[1]);
    const blue = parseInt(rgb[2]);
    const interval = 255 * (percent / 100);

    if (settingColor == 'red') {
        return `rgb(${red}, ${green - interval}, ${blue - interval})`;
    } else if (settingColor == 'green') {
        return `rgb(${red - interval}, ${green}, ${blue - interval})`;
    } else if (settingColor == 'blue') {
        return `rgb(${red - interval}, ${green - interval}, ${blue})`;
    } else {
        if (settingColor == 'random' && red == 255 && green == 255 && blue == 255) {
            return rgbRandom();
        } else {
            return `rgb(${red - interval}, ${green - interval}, ${blue - interval})`
        };
    };
}

// Provides random rgb value
function rgbRandom() {
    // parameters: none
    // output: string of random rgb value

    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

// Dial functionality for color and saturation controls
function turnDial(notch) {
    // parameters: notch element
    // output: none
    // changes settings for color and saturation when dial is turned

    const notchLabel = notch.getAttribute('id');
    const posClass = notch.classList[1];
    const currPos = posClass.substring(3);
    const newPos = (parseInt(currPos) + 1) % 4;
    
    // switches notch class
    notch.classList.remove(posClass);
    notch.classList.add(`pos${newPos}`);

    // switches settings and displays new setting
    switch (notchLabel) {
        case 'color-dial':
            switch (newPos) {
                case 0:
                    C = 'black';
                    break;
                case 1:
                    C = 'red';
                    break;
                case 2:
                    C = 'blue';
                    break;
                case 3:
                    C = 'random';
                    break;
            };
            document.querySelector('.color-value').textContent = C[0].toUpperCase() + C.slice(1);
            break;
        case 'saturation-dial':
            switch (newPos) {
                case 0:
                    S = 10;
                    break;
                case 1:
                    S = 25;
                    break;
                case 2:
                    S = 50;
                    break;
                case 3:
                    S = 100;
                    break;
            };
            document.querySelector('.saturation-value').textContent = S.toString() + '%';
            break;
    };

    // resets grid with new settings
    clear();
}

// add turnDial function to notches
const notches = document.querySelectorAll('.notch');
notches.forEach(notch => notch.addEventListener('click', function(e) {turnDial(e.target)}));

// create the grid and append to container
const screen = document.querySelector('#screen');
addNElements(screen, N, C, S);