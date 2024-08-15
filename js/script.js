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
});

// For sidebar on phone screens
document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    // Toggle menu and overlay visibility
    function toggleOffCanvasMenu() {
        navLinks.classList.toggle('open');
        overlay.classList.toggle('show');
        body.classList.toggle('menu-open');
    }

    // Close the menu when clicking on the menu icon
    document.querySelector('.menu-icon').addEventListener('click', toggleOffCanvasMenu);

    // Close the menu when clicking on the overlay
    overlay.addEventListener('click', toggleOffCanvasMenu);

    // Close the menu when clicking anywhere outside of the menu and overlay
    window.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !overlay.contains(event.target) && !event.target.classList.contains('menu-icon')) {
            if (navLinks.classList.contains('open')) {
                toggleOffCanvasMenu();
            }
        }
    });
});