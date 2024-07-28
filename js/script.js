// script.js

//For slider of images on index page
let index = 0;

const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const totalSlides = images.length;

function showSlide(n) {
    if (n >= totalSlides) index = 0;
    else if (n < 0) index = totalSlides - 1;
    else index = n;

    slides.style.transform = `translateX(${-index * 100}%)`;
}

document.querySelector('.next').addEventListener('click', () => {
    showSlide(index + 1);
});

document.querySelector('.prev').addEventListener('click', () => {
    showSlide(index - 1);
});

/*
// Optional: Auto-slide through the images
setInterval(() => {
    showSlide(index + 1);
}, 10000); // Change slide every 12 seconds

*/