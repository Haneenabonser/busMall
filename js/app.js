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

let namesArr = [];
let votesArr = [];
let shownArr = [];

function Product(name, source) {
    this.name = name;
    this.source = source;
    this.shown = 0;
    this.votes = 0;

    Product.allProducts.push(this);

    namesArr.push(this.name);

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

let imagesArray = [];
function renderThreeProducts() {
    firstImageIndex = randomIndex();
    secondImageIndex = randomIndex();
    thirdImageIndex = randomIndex();

    while ((firstImageIndex === secondImageIndex) || (firstImageIndex === thirdImageIndex) || (secondImageIndex === thirdImageIndex) || imagesArray.includes(firstImageIndex) || imagesArray.includes(secondImageIndex) || imagesArray.includes(thirdImageIndex)) {
        thirdImageIndex = randomIndex();
        secondImageIndex = randomIndex();
        firstImageIndex = randomIndex();
    }
    imagesArray = [];
    imagesArray.push(firstImageIndex, secondImageIndex, thirdImageIndex);
    console.log(imagesArray);

    // while (imagesArray.includes(firstImageIndex) || imagesArray.includes(secondImageIndex) || imagesArray.includes(thirdImageIndex)){
    //     firstImageIndex = randomIndex();
    //     secondImageIndex = randomIndex();
    //     thirdImageIndex = randomIndex();


    firstImageElement.src = Product.allProducts[firstImageIndex].source;
    Product.allProducts[firstImageIndex].shown++;
    dataStorage();
    secondImageElement.src = Product.allProducts[secondImageIndex].source;
    Product.allProducts[secondImageIndex].shown++;
    dataStorage();
    thirdImageElement.src = Product.allProducts[thirdImageIndex].source;
    Product.allProducts[thirdImageIndex].shown++;
    dataStorage();

    // imagesArray.push(firstImageElement.src, secondImageElement.src, thirdImageElement.src);
    // console.log(imagesArray);
    // }
}
// renderThreeProducts();




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
        } else {
            alert('please click on the images');
            attemptsCounter--;

        }

        // console.log(Product.allProducts[]);

    } else {
        divImagesElement.removeEventListener('click', userClick);
        let buttonElement = document.getElementById('Button')
        let showResultsButton = document.createElement('Button');
        buttonElement.appendChild(showResultsButton);
        showResultsButton.textContent = 'click here to show the results'
        showResultsButton.addEventListener('click', showResults);

        for (let i = 0; i < Product.allProducts.length; i++) {
            votesArr.push(Product.allProducts[i].votes);
            shownArr.push(Product.allProducts[i].shown);
        }

        chart();




        function showResults(event) {
            let listElement = document.createElement('ul');
            buttonElement.appendChild(listElement);

            for (let i = 0; i < Product.allProducts.length; i++) {
                let resultElement = document.createElement('li');
                listElement.appendChild(resultElement);
                resultElement.textContent = `${Product.allProducts[i].name} had ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].shown} times`;
            }
            showResultsButton.removeEventListener('click', showResults);

        }

    }
}


// creating the chart 
function chart() {
    let ctx = document.getElementById('chart').getContext('2d');

    let chart = new Chart(ctx, {
        // what type is the chart
        type: 'bar',

        //  the data for showing
        data: {
            //  for the names
            labels: namesArr,

            datasets: [
                {
                    label: 'Products votes',
                    data: votesArr,
                    backgroundColor: [
                        '#845460',
                    ],

                    borderWidth: 1
                },

                {
                    label: 'Products shown',
                    data: shownArr,
                    backgroundColor: [
                        '#b4a5a5',
                    ],

                    borderWidth: 1
                }

            ]
        },
        options: {}
    });

}


// adding to local storage:
function dataStorage() {
    let dataStored = JSON.stringify(Product.allProducts);
    // console.log(dataStored);
    localStorage.setItem('product', dataStored);
}


// getting data from local storage:
function gettingData() {
    let getData = localStorage.getItem('product');
    // console.log(getData);
    if (getData !== null) {
        Product.allProducts = JSON.parse(getData);
    }
    renderThreeProducts();
}
gettingData();