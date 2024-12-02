// script.js

//For the slider on index page:
document.addEventListener('DOMContentLoaded', function () {
    let index = 0;
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = images.length;
    let autoSlideInterval;

    function showSlide(n) {
        if (n >= totalSlides) {
            index = 0;
        } else if (n < 0) {
            index = totalSlides - 1;
        } else {
            index = n;
        }

        slides.style.transition = 'transform 0.5s ease-in-out';
        slides.style.transform = `translateX(${-index * 100}%)`;

        dots.forEach((dot, idx) => {
            dot.classList.toggle('dot-active', idx === index);
        });

        resetAutoSlide();
    }

    function resetAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(() => {
            showSlide(index + 1);
        }, 10000); // Changes the slide every 10 seconds
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
    resetAutoSlide();

    // Select elements
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    // Toggle sidebar and overlay
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    });

    // Close sidebar when overlay is clicked
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    });
});