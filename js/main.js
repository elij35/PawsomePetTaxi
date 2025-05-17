// main.js
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");
    const body = document.body;
    let mobileMenuBtn = null;
    let mobileMenu = null;
    let mobileMenuOverlay = null;
    let lastScrollTop = window.pageYOffset;
    let currentActiveLink = null;

    // Scroll handler for directional navigation
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        const direction = currentScroll > lastScrollTop ? "down" : "up";
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

        let activeSection = null;
        const viewportMiddle = window.scrollY + (window.innerHeight / 2);

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
                activeSection = section.id;
            }
        });

        if (activeSection) {
            const newActiveLink = document.querySelector(`.nav-links a[href="#${activeSection}"]`);

            if (newActiveLink) {
                navLinks.forEach(link => {
                    link.classList.remove("active", "scroll-down", "scroll-up");
                });
                newActiveLink.classList.add("active", `scroll-${direction}`);
                currentActiveLink = newActiveLink;
            }
        }

    };

    // Throttled scroll event
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    handleScroll();

    const initMobileMenu = () => {
        // Create overlay
        mobileMenuOverlay = document.createElement("div");
        mobileMenuOverlay.className = "mobile-menu-overlay";
        mobileMenuOverlay.addEventListener("click", toggleMobileMenu);

        // Create menu container
        mobileMenu = document.createElement("div");
        mobileMenu.className = "mobile-menu";

        // Create menu content
        const menuContent = document.createElement("div");
        menuContent.className = "mobile-menu-content";

        // Create header with close button
        const menuHeader = document.createElement("div");
        menuHeader.className = "mobile-menu-header";

        const closeButton = document.createElement("button");
        closeButton.className = "mobile-menu-close";
        closeButton.innerHTML = "✕";
        closeButton.addEventListener("click", toggleMobileMenu);

        menuHeader.appendChild(closeButton);
        menuContent.appendChild(menuHeader);

        // Add logo to mobile menu
        const logoContainer = document.createElement("div");
        logoContainer.className = "mobile-menu-logo";

        const logoImg = document.createElement("img");
        logoImg.src = "images/logo.png";
        logoImg.alt = "Pawsome Pet Taxi logo";

        const logoText = document.createElement("span");
        logoText.textContent = "Pawsome Pet Taxi";

        logoContainer.appendChild(logoImg);
        logoContainer.appendChild(logoText);
        menuContent.appendChild(logoContainer);

        // Create nav element and clone links
        const mobileNav = document.createElement("nav");
        mobileNav.className = "mobile-menu-nav";

        const originalNav = document.querySelector(".nav-links");
        if (originalNav) {
            originalNav.querySelectorAll("a").forEach(link => {
                const clonedLink = link.cloneNode(true);
                clonedLink.addEventListener("click", toggleMobileMenu);
                mobileNav.appendChild(clonedLink);
            });
        }

        menuContent.appendChild(mobileNav);
        mobileMenu.appendChild(menuContent);

        // Add elements to DOM
        document.body.appendChild(mobileMenuOverlay);
        document.body.appendChild(mobileMenu);

        // Create menu button
        mobileMenuBtn = document.createElement("button");
        mobileMenuBtn.className = "mobile-menu-btn";
        mobileMenuBtn.innerHTML = "☰";
        mobileMenuBtn.addEventListener("click", toggleMobileMenu);

        const header = document.querySelector(".navbar");
        if (header) {
            header.appendChild(mobileMenuBtn);
        }
    };

    const toggleMobileMenu = () => {
        if (!mobileMenu || !mobileMenuOverlay) return;
        mobileMenu.classList.toggle("active");
        mobileMenuOverlay.classList.toggle("active");
        document.body.classList.toggle("no-scroll"); 
    };

    const cleanupMobileMenu = () => {
        if (mobileMenu) {
            mobileMenu.remove();
            mobileMenu = null;
        }
        if (mobileMenuOverlay) {
            mobileMenuOverlay.remove();
            mobileMenuOverlay = null;
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.remove();
            mobileMenuBtn = null;
        }
        document.body.classList.remove("no-scroll");
    };

    // Responsive check
    const checkMobileMenu = () => {
        if (window.innerWidth <= 768) {
            if (!mobileMenuBtn) {
                initMobileMenu();
            }
        } else {
            cleanupMobileMenu();
            document.querySelector(".nav-links").style.display = "flex";
        }
    };

    // Initialize
    checkMobileMenu();
    window.addEventListener("resize", checkMobileMenu);

    // Section animations
    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    };

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    // Hamburger menu animation
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            this.classList.toggle("active");
            document.querySelector(".nav-links").classList.toggle("active");
        });
    }
});