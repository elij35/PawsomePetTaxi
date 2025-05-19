document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");
    let lastScrollTop = window.pageYOffset;

    // Mobile menu variables
    let mobileMenuBtn, mobileMenu, mobileMenuOverlay;

    // Scroll-based active link & direction indicator
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        const direction = currentScroll > lastScrollTop ? "down" : "up";
        lastScrollTop = Math.max(currentScroll, 0);
        const viewportMiddle = currentScroll + window.innerHeight / 2;

        let activeSection = null;
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            if (viewportMiddle >= top && viewportMiddle <= bottom) activeSection = section.id;
        });

        if (activeSection) {
            navLinks.forEach(link => link.classList.remove("active", "scroll-down", "scroll-up"));
            const activeLink = document.querySelector(`.nav-links a[href="#${activeSection}"]`);
            if (activeLink) activeLink.classList.add("active", `scroll-${direction}`);
        }
    }

    // Animate sections when scrolling into view
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < windowHeight * 0.75) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    }

    // Initialize sections styles for animation
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    // Mobile menu toggle handler
    function toggleMobileMenu() {
        if (!mobileMenu || !mobileMenuOverlay) return;
        mobileMenu.classList.toggle("active");
        mobileMenuOverlay.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    }

    // Create mobile menu elements dynamically
    function createMobileMenuElements() {
        // Overlay
        mobileMenuOverlay = document.createElement("div");
        mobileMenuOverlay.className = "mobile-menu-overlay";
        mobileMenuOverlay.addEventListener("click", toggleMobileMenu);

        // Menu container
        mobileMenu = document.createElement("div");
        mobileMenu.className = "mobile-menu";

        const menuContent = document.createElement("div");
        menuContent.className = "mobile-menu-content";

        // Header with close button
        const menuHeader = document.createElement("div");
        menuHeader.className = "mobile-menu-header";
        const closeBtn = document.createElement("button");
        closeBtn.className = "mobile-menu-close";
        closeBtn.innerHTML = "✕";
        closeBtn.addEventListener("click", toggleMobileMenu);
        menuHeader.appendChild(closeBtn);

        // Logo container
        const logoContainer = document.createElement("div");
        logoContainer.className = "mobile-menu-logo";
        const logoImg = document.createElement("img");
        logoImg.src = "images/logo.png";
        logoImg.alt = "Pawsome Pet Taxi logo";
        const logoText = document.createElement("span");
        logoText.textContent = "Pawsome Pet Taxi";
        logoContainer.append(logoImg, logoText);

        // Navigation links (cloned)
        const mobileNav = document.createElement("nav");
        mobileNav.className = "mobile-menu-nav";
        const originalNav = document.querySelector(".nav-links");
        if (originalNav) {
            originalNav.querySelectorAll("a").forEach(link => {
                const clone = link.cloneNode(true);
                clone.addEventListener("click", toggleMobileMenu);
                mobileNav.appendChild(clone);
            });
        }

        // Assemble menu content
        menuHeader.appendChild(logoContainer);
        menuHeader.appendChild(closeBtn);
        menuContent.append(menuHeader, mobileNav);

        mobileMenu.appendChild(menuContent);

        // Append overlay and menu to body
        document.body.append(mobileMenuOverlay, mobileMenu);

        // Create and append mobile menu button in navbar
        mobileMenuBtn = document.createElement("button");
        mobileMenuBtn.className = "mobile-menu-btn";
        mobileMenuBtn.innerHTML = "☰";
        mobileMenuBtn.setAttribute("aria-label", "Toggle mobile menu");
        mobileMenuBtn.addEventListener("click", toggleMobileMenu);
        const navbar = document.querySelector(".navbar");
        if (navbar) navbar.appendChild(mobileMenuBtn);
    }

    // Remove mobile menu elements
    function cleanupMobileMenu() {
        [mobileMenu, mobileMenuOverlay, mobileMenuBtn].forEach(el => el?.remove());
        mobileMenu = mobileMenuOverlay = mobileMenuBtn = null;
        document.body.classList.remove("no-scroll");
    }

    // Check window width to toggle mobile menu
    function checkMobileMenu() {
        if (window.innerWidth <= 768) {
            if (!mobileMenuBtn) createMobileMenuElements();
            // Hide desktop nav links on mobile
            const navLinksContainer = document.querySelector(".nav-links");
            if (navLinksContainer) navLinksContainer.style.display = "none";
        } else {
            cleanupMobileMenu();
            const navLinksContainer = document.querySelector(".nav-links");
            if (navLinksContainer) navLinksContainer.style.display = "flex";
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            const targetId = anchor.getAttribute("href");
            if (targetId === "#" || !targetId) return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
                // If mobile menu is open, close it after clicking link
                if (mobileMenu?.classList.contains("active")) toggleMobileMenu();
            }
        });
    });

    // Desktop hamburger menu toggle (if used)
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            const navLinksContainer = document.querySelector(".nav-links");
            if (navLinksContainer) navLinksContainer.classList.toggle("active");
        });
    }

    // Debounce helper
    function debounce(fn, delay) {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(fn, delay);
        };
    }

    // Handle scroll & viewport changes
    window.addEventListener("scroll", () => {
        handleScroll();
        animateOnScroll();
    });

    // Check mobile menu on load and resize (debounced)
    window.addEventListener("resize", debounce(() => {
        checkMobileMenu();
    }, 150));

    // Initial setup calls
    checkMobileMenu();
    handleScroll();
    animateOnScroll();
});
