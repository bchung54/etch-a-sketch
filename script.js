let N = 16;
let I = 10; // percent to intensify mark on each pass
var C = 'black'; // black, random, rgb

// Core functionality
//
// Create grid
function addNElements(node, n, color, intensity) {

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
                e.target.setAttribute('style', `background-color: ${rgbIntensify(e.target.style.backgroundColor, color, intensity)};`);
            });

            newDiv.appendChild(newNewDiv);
        }
        node.appendChild(newDiv);
    }
}

// Clear grid
function clear() {

    // removes all child nodes of main container
    while (screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }

    // create grid with user input number as the squares per side
    addNElements(screen, N, C, I);
}

// Resize grid
function resize() {
    // removes all child nodes of main container
    while (screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }

    N = input();

    // create grid with user input number as the squares per side
    addNElements(screen, N, C, I);
}

// Color and intensity functionality
//
// Intensifies color by 10%
function rgbIntensify (currColor, settingColor, percent) {
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

function rgbRandom() {

    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
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

// add function to resize button
const resizeButton = document.querySelector('#resize');
resizeButton.addEventListener('click', resize);

// add function to clear button
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

// create the grid and append to container
const screen = document.querySelector('#screen');
addNElements(screen, N, C, I);

const colorNotch = document.querySelector('#color-dial');
const intensityNotch = document.querySelector('#intensity-dial');
function turnDial(notch) {
    const notchLabel = notch.getAttribute('id');
    console.log(notchLabel);
    const posClass = notch.classList[1];
    const currPos = posClass.substring(3);
    const newPos = (parseInt(currPos) + 1) % 4;

    notch.classList.remove(posClass);
    notch.classList.add(`pos${newPos}`);

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
        case 'intensity-dial':
            switch (newPos) {
                case 0:
                    I = 10;
                    break;
                case 1:
                    I = 25;
                    break;
                case 2:
                    I = 50;
                    break;
                case 3:
                    I = 100;
                    break;
            };
            document.querySelector('.saturation-value').textContent = I.toString() + '%';
            break;
    };

    clear();
}

const notches = document.querySelectorAll('.notch');
notches.forEach(notch => notch.addEventListener('click', function(e){
    console.log(e.target);
    turnDial(e.target);
}));