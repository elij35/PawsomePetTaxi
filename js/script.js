// script.js

//For the slider on index page:
document.addEventListener('DOMContentLoaded', function () {
    let index = 0;
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = images.length;

    function showSlide(n) {
        if (n >= totalSlides) index = 0;
        else if (n < 0) index = totalSlides - 1;
        else index = n;

        slides.style.transform = `translateX(${-index * 100}%)`;

        dots.forEach((dot, idx) => {
            dot.classList.toggle('dot-active', idx === index);
        });
    }

    document.querySelector('.next').addEventListener('click', () => {
        showSlide(index + 1);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        showSlide(index - 1);
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
        });
    });

    showSlide(index);

    /*
    // Optional: Auto-slide through the images
    setInterval(() => {
        showSlide(index + 1);
    }, 10000); // Change slide every 10 seconds
    */
});