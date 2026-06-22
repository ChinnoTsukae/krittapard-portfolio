/**
 * Krittapard Kanyanuvong - Portfolio Website Script
 * Interactive features: Mobile Nav Toggle, Header Scroll Style, Scroll Reveal, 
 * Scroll-triggered Progress Bars, Active Nav Scroll Highlighting, Mock Contact Form Popup
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. Mobile Hamburger Menu Toggle
    // ==========================================================================
    const navToggle = document.getElementById("js-nav-toggle");
    const navMenu = document.getElementById("js-nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Toggle body scroll to prevent background scrolling when menu is open
            if (navMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = ""; // Restore body scrolling
            });
        });
    }

    // ==========================================================================
    // 2. Header Scroll Styling
    // ==========================================================================
    const header = document.querySelector(".main-header");
    
    const handleScrollStyles = () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    
    window.addEventListener("scroll", handleScrollStyles);
    handleScrollStyles(); // Initialize on load in case page is refreshed halfway

    // ==========================================================================
    // 3. Scroll Reveal Animation (Intersection Observer)
    // ==========================================================================
    const reveals = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Once element is shown, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // trigger when 10% of element is in view
        rootMargin: "0px 0px -40px 0px"
    });

    reveals.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 4. Progress Bar Animation on Scroll-into-view
    // ==========================================================================
    const progressBars = document.querySelectorAll(".progress-fill");
    
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute("data-width");
                bar.style.width = targetWidth;
                observer.unobserve(bar); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.2 // Trigger when bar container is partially visible
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // ==========================================================================
    // 5. Active Navigation Indicator on Scroll
    // ==========================================================================
    const sections = document.querySelectorAll("section[id]");
    
    const trackActiveNav = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Account for header height and offset padding
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active");
                } else {
                    navLink.classList.remove("active");
                }
            }
        });
    };
    
    window.addEventListener("scroll", trackActiveNav);
    trackActiveNav(); // Initialize on load

    // ==========================================================================
    // 6. Contact Form Simulated Submission (Custom Modal alert)
    // ==========================================================================
    const contactForm = document.getElementById("js-contact-form");
    const modalOverlay = document.getElementById("js-modal-overlay");
    const modalClose = document.getElementById("js-modal-close");

    if (contactForm && modalOverlay && modalClose) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop page refresh
            modalOverlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });

        const closeModal = () => {
            modalOverlay.classList.remove("active");
            document.body.style.overflow = ""; // Restore background scroll
        };

        modalClose.addEventListener("click", closeModal);

        // Close on clicking outside the modal box content
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Escape key listener to close modal
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
                closeModal();
            }
        });
    }
});
