'use strict';

// get elements 

let firstImageElement = document.getElementById('firstImg');
let secondImageElement = document.getElementById('secondImg');
let thirdImageElement = document.getElementById('thirdImg');

let maxAttempts = 25;
let attemptsCounter = 0;

let firstImageIndex;
let secondImageIndex;
let thirdImageIndex;

function Product(name, source) {
    this.name = name;
    this.source = source;
    this.shown = 0;
    this.votes = 0;

    Product.allProducts.push(this);

}
Product.allProducts = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

console.log(Product.allProducts);

// get random index
function randomIndex() {
    return (Math.floor(Math.random() * Product.allProducts.length));
}
// console.log(randomIndex());

// rendering

function renderThreeProducts() {
    firstImageIndex = randomIndex();
    secondImageIndex = randomIndex();
    thirdImageIndex = randomIndex();

    while ((firstImageIndex === secondImageIndex) || (firstImageIndex === thirdImageIndex) || (secondImageIndex === thirdImageIndex)) { 
        if(firstImageIndex === secondImageIndex){
            firstImageIndex = randomIndex();
        }else if(firstImageIndex === thirdImageIndex){
            thirdImageIndex = randomIndex();
        }else{
            secondImageIndex = randomIndex();
        }
    }
    firstImageElement.src = Product.allProducts[firstImageIndex].source;
    Product.allProducts[firstImageIndex].shown++;
    secondImageElement.src = Product.allProducts[secondImageIndex].source;
    Product.allProducts[secondImageIndex].shown++;
    thirdImageElement.src = Product.allProducts[thirdImageIndex].source;
    Product.allProducts[thirdImageIndex].shown++;


}
renderThreeProducts();

// clicking part

let divImagesElement = document.getElementById('images');
divImagesElement.addEventListener('click', userClick);
function userClick(event) {
    // console.log(event.target.id);

    attemptsCounter++;
    // console.log(attemptsCounter++);

    if (attemptsCounter <= maxAttempts) {
        if (event.target.id === 'firstImg') {
            Product.allProducts[firstImageIndex].votes++;
            renderThreeProducts();
        } else if (event.target.id === 'secondImg') {
            Product.allProducts[secondImageIndex].votes++;
            renderThreeProducts();
        } else if (event.target.id === 'thirdImg') {
            Product.allProducts[thirdImageIndex].votes++;
            renderThreeProducts();
        }
        
        // console.log(Product.allProducts[]);
        
    } else {
        divImagesElement.removeEventListener('click', userClick);
        let buttonElement = document.getElementById('Button')
        let showResultsButton = document.createElement('Button');
        buttonElement.appendChild(showResultsButton);
        showResultsButton.textContent= 'click here to show the results'
        showResultsButton.addEventListener('click', showResults);
        function showResults(event) {
            console.log(event);
            
            let listElement = document.createElement('ul');
            buttonElement.appendChild(listElement);

            for ( let i=0 ; i< Product.allProducts.length ; i++){
                let resultElement = document.createElement('li');
                listElement.appendChild(resultElement);
                resultElement.textContent = `${Product.allProducts[i].name} had ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].shown} times`;
            }
            showResultsButton.removeEventListener('click', showResults);
 
        }

    }
}
