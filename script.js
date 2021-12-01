const N = 16;

function addNElements (n, node) {

    // loop to create n div elements and append to child of node
    for (let i = 0; i < n; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('topDiv');
        
        for (let i = 0; i < n; i++) {
            // create new div
            const newNewDiv = document.createElement('div');

            //add childDiv class to new div
            newNewDiv.classList.add('childDiv');

            // add text to new div
            const content = document.createTextNode('This is a div-child');
            newNewDiv.appendChild(content);

            // add mouseover color change to new div
            newNewDiv.addEventListener('mouseover', function(e) {
                e.target.setAttribute('style', 'background-color:green;')
            });

            // append to parent
            newDiv.appendChild(newNewDiv);
        }
        node.appendChild(newDiv);
    }
}
 
// create container for all of the divs and give it an id
const container = document.createElement('div');
container.setAttribute('id', 'container');

// create the grid and append to contianer
addNElements(N, container);

// append container to the body of html
document.body.appendChild(container);
