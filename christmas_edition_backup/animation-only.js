/* 
   Animation Only JS
   Injects motion logic into existing elements.
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer Setup
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 2. Apply Animation Classes to Existing Elements
    // We target common classes found in the original HTML

    // Fade Up Targets
    const fadeTargets = document.querySelectorAll('.section-header, .card, .event-item, .step-item, .director-info, .diagnosis-container, .prediction-container, .ba-card, .review-item');
    fadeTargets.forEach((el, index) => {
        el.classList.add('anim-fade-up');

        // Add stagger for grids
        if (el.parentElement.classList.contains('grid-4') || el.parentElement.classList.contains('event-grid')) {
            // Simple stagger logic based on index
            // We can't easily know the row index without complex logic, so just cycle 1-4
            const delay = (index % 4) + 1;
            el.classList.add(`anim-delay-${delay}00`);
        }

        observer.observe(el);
    });

    // Scale Targets
    const scaleTargets = document.querySelectorAll('.director-image, .interior-item');
    scaleTargets.forEach(el => {
        el.classList.add('anim-scale-up');
        observer.observe(el);
    });

    // 3. Simple Hero Parallax (Background Only)
    // We try to find the hero background. In original CSS, it might be on .hero or .hero::before
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                // Move background position if it's an image background
                // This is safe as it doesn't change layout
                hero.style.backgroundPositionY = `${scrolled * 0.5}px`;

                // Optional: Fade content slightly
                const content = hero.querySelector('.hero-content') || hero.querySelector('.container');
                if (content) {
                    content.style.transform = `translateY(${scrolled * 0.3}px)`;
                    content.style.opacity = 1 - (scrolled / 600);
                }
            }
        });
    }

    console.log("Pure animations initialized.");
});
