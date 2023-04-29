// Function Handle Show navbar menu on mobile devices
function showNavbar () {
    let iconElement = document.querySelector('.bx-menu');
    let navbarElement = document.querySelector('.navbar');

    navbarElement.classList.toggle('active');
    iconElement.classList.toggle('bx-x');
}

window.onscroll = function() {
    let iconElement = document.querySelector('.bx-menu');
    let navbarElement = document.querySelector('.navbar');


    navbarElement.classList.remove('active');
    iconElement.classList.remove('bx-x');
}

// Function handle content home section 
function handleContentBlue() {
    let btnblue = document.querySelector('.home .content .blue--btn');

    btnblue.style.backgroundColor = '#0d62ff';
}

function clearHandleContentBlue() {
    let btnblue = document.querySelector('.home .content .blue--btn');

    btnblue.style.backgroundColor = '#fff';
}

function handleContentYellow() {
    let btnYellow = document.querySelector('.home .content .yellow--btn');

    btnYellow.style.backgroundColor = '#ffc021';
}

function clearHandleContentYellow() {
    let btnYellow = document.querySelector('.home .content .yellow--btn');

    btnYellow.style.backgroundColor = '#fff';
}

// Handle slide home content
let slides = document.querySelectorAll('.slide-container');
let index = 0;

function nextSlide() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prevSlide() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

// Function handle toggle Heart color
function toggleHeart() {
    let heartIcon = document.querySelector('.product .product__icons .bxs-heart');

    heartIcon.style.color = '#ff623d';
}


// Handle services product row 1
let featureImages_1 = document.querySelectorAll('.featured__image-1');
featureImages_1.forEach(function(image_1) {
    image_1.addEventListener('click', function() {
        var src = image_1.getAttribute('src');
        document.querySelector('.big__image-1').src = src;
    });
});

// Handle services product row 2
let featureImages_2 = document.querySelectorAll('.featured__image-2');
featureImages_2.forEach(function(image_2) {
    image_2.addEventListener('click', function() {
        var src_2 = image_2.getAttribute('src');
        document.querySelector('.big__image-2').src = src_2;
    });
});

let featureImages_3 = document.querySelectorAll('.featured__image-3');
featureImages_3.forEach(function(image_3) {
    image_3.addEventListener('click', function() {
        var src_3 = image_3.getAttribute('src');
        document.querySelector('.big__image-3').src = src_3;
    });
});



// PRODUCTS PAGE
function showProduct(src) {
    let productImage = document.querySelector('.product__detail .product__image .product__bigImage img');

    productImage.src = src;
} 

