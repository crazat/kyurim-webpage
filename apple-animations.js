/* 
   Apple Style Animations JS (Dynamic Scrollytelling)
   - Real-time Scroll Parallax
   - Hero Zoom
   - Floating Elements
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    const parallaxSpeed = 0.1; // Base speed factor

    // --- Elements ---
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const parallaxCards = document.querySelectorAll('.card, .event-item, .ba-card');
    const directorImage = document.querySelector('.director-image');
    const navbar = document.querySelector('.navbar');

    // --- State ---
    let scrollY = 0;
    let ticking = false;

    // --- Scroll Listener ---
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- Animation Loop ---
    function updateAnimations() {
        const viewportHeight = window.innerHeight;

        // 1. Hero Section (Zoom & Fade)
        if (hero && scrollY < viewportHeight) {
            // Background Zoom: 1.0 -> 1.2
            const scale = 1 + (scrollY * 0.0005);
            hero.style.backgroundSize = `${100 * scale}%`; // Assuming cover
            hero.style.backgroundPosition = `center ${scrollY * 0.5}px`; // Parallax move

            // Content Fade & Slide
            if (heroContent) {
                const opacity = 1 - (scrollY / (viewportHeight * 0.6));
                const translateY = scrollY * 0.5;

                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${translateY}px)`;
            }
        }

        // 2. Parallax Cards (Floating Effect)
        parallaxCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            // Check if in viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Calculate relative position in viewport (-1 to 1)
                const relativePos = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2);

                // Staggered speed based on index (Even/Odd)
                const speed = (index % 2 === 0) ? 20 : 40;
                const yOffset = relativePos * speed;

                // Apply translation (preserve existing transform if any, but simplified here)
                // We use translate3d for performance
                // Note: This overrides hover transform, so we need a wrapper or be careful.
                // To coexist with hover scale, we apply this to a wrapper or use CSS variable.
                // For safety in this overlay approach, let's use a subtle transform that doesn't break hover scale too much
                // OR better: use CSS variable for Y offset
                card.style.setProperty('--scroll-y', `${yOffset}px`);
            }
        });

        // 3. Director Image Parallax
        if (directorImage) {
            const rect = directorImage.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const relativePos = (rect.top - viewportHeight / 2) / viewportHeight;
                const yOffset = relativePos * 60; // Move 60px total
                directorImage.style.transform = `translateY(${yOffset}px)`;
            }
        }

        // 4. Navbar Dynamic Shadow
        if (navbar) {
            if (scrollY > 10) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
    }

    // --- Initial Setup for CSS Variables ---
    parallaxCards.forEach(card => {
        // We need to ensure the card uses the variable in its transform
        // But we can't easily edit the CSS rule from here without inline styles.
        // Let's set a transition that includes the variable.
        card.style.transition = 'transform 0.1s linear, box-shadow 0.4s ease'; // Linear for scroll, Ease for hover
        // Wait, linear transition fights with hover. 
        // Best approach for smooth scroll + hover: 
        // Scroll updates CSS var, Hover updates Scale.
        // transform: translateY(var(--scroll-y)) scale(var(--hover-scale));

        // Let's inject this logic via inline style for now
        card.style.transform = 'translateY(var(--scroll-y, 0px))';

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.transform = 'translateY(var(--scroll-y, 0px)) scale(1.03)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.transform = 'translateY(var(--scroll-y, 0px)) scale(1)';
        });
    });

    // --- Intersection Observer for Reveal (Keep existing) ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealTargets = document.querySelectorAll('.section-header, .director-info, .step-item');
    revealTargets.forEach(el => {
        el.classList.add('premium-fade-up');
        observer.observe(el);
    });

    console.log("Dynamic Scrollytelling Initialized");
});
