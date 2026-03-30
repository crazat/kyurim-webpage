﻿// ============================================
// Page Loader - Hide after content loads
// ============================================
window.addEventListener('load', () => {
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        // Wait for progress animation to complete
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => pageLoader.remove(), 500);
        }, 800);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Memory Management & Cleanup System
    // ============================================
    const cleanupCallbacks = [];
    const registerCleanup = (callback) => cleanupCallbacks.push(callback);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cleanupCallbacks.forEach(cb => {
            try { cb(); } catch (e) { console.warn('Cleanup error:', e); }
        });
    });

    // Visibility change handler - pause animations when hidden
    let isPageVisible = !document.hidden;
    document.addEventListener('visibilitychange', () => {
        isPageVisible = !document.hidden;
    });

    // ============================================
    // Safe localStorage Access (Private Browsing Support)
    // ============================================
    const safeStorage = {
        getItem: (key) => {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                console.warn('localStorage not available:', e);
                return null;
            }
        },
        setItem: (key, value) => {
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (e) {
                console.warn('localStorage not available:', e);
                return false;
            }
        },
        removeItem: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.warn('localStorage not available:', e);
                return false;
            }
        }
    };

    // ============================================
    // HTML Escape Utility (XSS Prevention)
    // ============================================
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    // ============================================
    // Throttle Utility for Scroll Performance
    // ============================================
    const throttle = (fn, wait) => {
        let lastTime = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastTime >= wait) {
                lastTime = now;
                fn.apply(this, args);
            }
        };
    };

    // ============================================
    // Unified Scroll Handler (Performance Optimized)
    // ============================================
    const scrollHandlers = [];
    const addScrollHandler = (handler) => scrollHandlers.push(handler);

    // Single throttled scroll listener
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        scrollHandlers.forEach(handler => {
            try {
                handler(scrollY, scrollPercent);
            } catch (e) {
                console.warn('Scroll handler error:', e);
            }
        });
    }, 16), { passive: true }); // ~60fps

    // --- Cherry Blossom Petal Fall ---
    const snowContainer = document.getElementById('snow-container');
    const isMobile = window.innerWidth <= 768;
    const petalCount = isMobile ? 18 : 30;
    // CSS classes for animation variants (don't use inline animationName — breaks async CSS loading)
    const petalVariants = ['', 'petal-v2', 'petal-v3'];

    if (snowContainer) {
        for (let i = 0; i < petalCount; i++) {
            createPetal();
        }
    }

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('snowflake');

        // Random animation variant via CSS class (not inline style)
        const variant = petalVariants[Math.floor(Math.random() * petalVariants.length)];
        if (variant) petal.classList.add(variant);

        const blossoms = ['🌸', '💮', '🌸'];
        petal.innerHTML = blossoms[Math.floor(Math.random() * blossoms.length)];
        petal.style.left = Math.random() * 100 + 'vw';

        // Duration: 9-18s (slower = more graceful)
        // Use setProperty with !important to override prefers-reduced-motion * rule
        const duration = isMobile ? Math.random() * 5 + 9 : Math.random() * 9 + 9;
        petal.style.setProperty('animation-duration', duration + 's', 'important');
        petal.style.setProperty('animation-iteration-count', 'infinite', 'important');

        // Size: 16-28px desktop, 12-20px mobile
        const size = isMobile ? Math.random() * 8 + 12 : Math.random() * 12 + 16;
        petal.style.fontSize = size + 'px';

        // Staggered start: 0-8s
        petal.style.animationDelay = (Math.random() * 8) + 's';

        snowContainer.appendChild(petal);
    }

    // --- Spring Floating Decor ---
    function createFloatingDecor() {
        const decorContainer = document.getElementById('snow-container'); // Reuse container
        if (!decorContainer) return;

        // User Request: Spring cherry blossoms
        const items = ['🌸', '🌺', '🍃'];
        const item = document.createElement('div');
        item.classList.add('floating-item');

        const content = items[Math.floor(Math.random() * items.length)];
        item.innerText = content;

        // Special styling for Spring

        item.style.fontFamily = "'Great Vibes', cursive";
        item.style.fontWeight = 'bold';
        item.style.color = '#D4AF37'; // Gold
        item.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';

        // Random Position
        item.style.left = Math.random() * 90 + 5 + 'vw'; // 5% to 95%

        // Random Size
        const size = Math.random() * 20 + 30; // 30px to 50px
        item.style.fontSize = size + 'px';

        // Random Duration
        const duration = Math.random() * 10 + 20; // 20-30s (Very Slow)
        item.style.animationDuration = duration + 's';

        // Random Delay
        item.style.animationDelay = Math.random() * 15 + 's';

        decorContainer.appendChild(item);
    }

    // Create a few floating items (Reduced count)
    // for (let i = 0; i < 3; i++) {
    //    createFloatingDecor();
    // }

    // --- 1. Wish Lantern Logic ---
    // (Wish Lantern Logic Removed)

    function createCustomLantern(text) {
        const decorContainer = document.getElementById('snow-container');
        if (!decorContainer) return;

        const item = document.createElement('div');
        item.classList.add('floating-item');
        item.innerText = '🏮 ' + text;
        item.style.fontFamily = "'NanumBarunGothic', sans-serif";
        item.style.fontSize = '20px'; // Smaller text for wish
        item.style.color = '#FFF';
        item.style.textShadow = '0 0 5px #D4AF37';
        item.style.whiteSpace = 'nowrap';

        // Start from bottom center-ish or random
        item.style.left = Math.random() * 80 + 10 + 'vw';
        item.style.animationDuration = '20s'; // Slow rise
        item.style.animationDelay = '0s'; // Immediate

        decorContainer.appendChild(item);
    }

    // --- 4. Talisman Modal Logic (Prioritized) ---
    const talismanBtn = document.getElementById('open-talisman-btn');
    const talismanModal = document.getElementById('talisman-modal');
    const closeTalisman = document.getElementById('close-talisman');

    if (talismanBtn && talismanModal) {
        talismanBtn.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior if any
            talismanModal.style.display = ''; // Clear inline block
            talismanModal.classList.add('show');
        });

        if (closeTalisman) {
            closeTalisman.addEventListener('click', function () {
                talismanModal.classList.remove('show');
            });
        }

        // Close on backdrop click (check if click is on modal overlay, not content)
        talismanModal.addEventListener('click', function (e) {
            if (e.target === talismanModal) {
                talismanModal.classList.remove('show');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && talismanModal.classList.contains('show')) {
                talismanModal.classList.remove('show');
            }
        });
    }




    // Initialize
    window.onload = function () {
        // startCountdown(); // Assuming this function exists elsewhere
        // renderCalendar(); // If calendar exists
        // Initial floating decor is already created above, so no need to call createFloatingDecor() here.
    };

    // --- 2. Spring Petal Mouse Trail (with Element Pool) ---
    const petalPool = [];
    const MAX_PETALS = 50;
    let activePetals = 0;

    function getPetalFromPool() {
        if (petalPool.length > 0) {
            return petalPool.pop();
        }
        const dust = document.createElement('div');
        dust.classList.add('petal-dust');
        return dust;
    }

    function returnPetalToPool(dust) {
        activePetals--;
        if (petalPool.length < MAX_PETALS) {
            dust.style.opacity = '0';
            petalPool.push(dust);
        } else {
            dust.remove();
        }
    }

    document.addEventListener('mousemove', function (e) {
        // Skip if page is hidden or too many active petals
        if (!isPageVisible || activePetals >= MAX_PETALS) return;
        if (Math.random() > 0.4) return; // Throttle creation (40% chance)

        const dust = getPetalFromPool();
        dust.style.left = e.clientX + 'px';
        dust.style.top = e.clientY + 'px';
        dust.style.opacity = '0.8';

        // Random spring color variation (Pinks, whites)
        const colors = ['#FFB7B2', '#FFDAC1', '#FF9AA2', '#FFF', '#FFE4E1'];
        dust.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random small rotation
        dust.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;

        if (!dust.parentElement) {
            document.body.appendChild(dust);
        }
        activePetals++;

        setTimeout(() => {
            returnPetalToPool(dust);
        }, 800); // Return after animation
    });

    // Cleanup petal pool on unload
    registerCleanup(() => {
        petalPool.forEach(p => p.remove());
        petalPool.length = 0;
    });


    // --- Original Functionality ---

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (navLinks) navLinks.classList.remove('active'); // Close mobile menu on click

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Navbar Background Change on Scroll (Using unified handler)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        addScrollHandler((scrollY) => {
            if (scrollY > 50) {
                navbar.style.backgroundColor = '#FFFFFF';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.backgroundColor = '#FFFFFF';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }

    // Fade-in Animation on Scroll (Using .visible class for GPU-optimized transforms)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // Enhanced Scroll Reveal Animations
    const scrollRevealElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-stagger, .scroll-slide-left, .scroll-slide-right, .scroll-scale, .scroll-rotate, .scroll-blur, .scroll-clip'
    );

    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    scrollRevealElements.forEach(el => {
        scrollRevealObserver.observe(el);
    });

    // Stagger animation for grid containers (.grid-4, .process-steps)
    const staggerContainers = document.querySelectorAll('.grid-4, .process-steps');
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('stagger-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    staggerContainers.forEach(el => staggerObserver.observe(el));

    // BA Gallery blur-load enhancement
    document.querySelectorAll('.ba-card').forEach(card => {
        const img = card.querySelector('img');
        if (!img) return;
        card.classList.add('blur-load');
        if (img.complete && img.naturalHeight !== 0) {
            card.classList.add('loaded');
        } else {
            img.addEventListener('load', () => card.classList.add('loaded'), { once: true });
            img.addEventListener('error', () => card.classList.add('loaded'), { once: true });
        }
    });

    // Note: Auto-apply scroll-reveal removed - was causing elements to disappear
    // Use explicit .scroll-reveal class in HTML if animation is needed

    // Counter Animation for Statistics
    const counterElements = document.querySelectorAll('.stat-number[data-count]');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        el.classList.add('counting');

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => {
        counterObserver.observe(el);
    });

    // Register cleanup for all observers
    registerCleanup(() => {
        fadeObserver.disconnect();
        scrollRevealObserver.disconnect();
        counterObserver.disconnect();
        staggerObserver.disconnect();
    });

    // =========================================
    // Scroll Progress Bar (JS Fallback for browsers without CSS scroll-timeline)
    // =========================================
    const progressBar = document.getElementById('progressBar');
    if (progressBar && !CSS.supports('animation-timeline', 'scroll()')) {
        addScrollHandler((scrollY) => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) : 0;
            progressBar.style.transform = `scaleX(${progress})`;
        });
    }

    // =========================================
    // Skeleton UI - Image Loading Handler
    // =========================================
    const skeletonContainers = document.querySelectorAll('.skeleton');
    skeletonContainers.forEach(container => {
        const img = container.querySelector('img');
        if (img) {
            img.classList.add('loading');

            const handleLoad = () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
                container.classList.remove('skeleton');
            };

            // Check if already loaded (cached)
            if (img.complete && img.naturalHeight !== 0) {
                handleLoad();
            } else {
                img.addEventListener('load', handleLoad, { once: true });
                img.addEventListener('error', handleLoad, { once: true }); // Remove skeleton on error too
            }
        }
    });

    // =========================================
    // Reward Burst Animation (Cherry Blossom Petals)
    // =========================================
    const isMobileDevice = window.innerWidth <= 768;
    const particleCount = isMobileDevice ? 12 : 24;
    let rewardTriggered = false;

    function createRewardBurst(x, y) {
        const colors = ['#FFB7C5', '#FF69B4', '#FFD700', '#FFA500', '#FFDAB9'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'reward-particle';

            // Random direction and distance
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const distance = 80 + Math.random() * 120;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance - 50; // Slight upward bias

            particle.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                --dx: ${dx}px;
                --dy: ${dy}px;
                --rotation: ${Math.random() * 360}deg;
                animation-delay: ${Math.random() * 0.15}s;
            `;

            document.body.appendChild(particle);

            // Cleanup after animation
            particle.addEventListener('animationend', () => particle.remove(), { once: true });
        }
    }

    // Trigger on reserve/CTA button click
    document.querySelectorAll('.sticky-btn.reserve, .btn-primary[href*="naver"], .btn-primary[href*="kakao"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            createRewardBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    });

    // Trigger once at 80% scroll depth (via unified scroll handler)
    addScrollHandler((scrollY, scrollPercent) => {
        if (rewardTriggered) return;
        if (scrollPercent >= 0.8) {
            rewardTriggered = true;
            createRewardBurst(window.innerWidth / 2, window.innerHeight / 2);
        }
    });

    // Gallery Horizontal Scroll Logic
    const galleryGrid = document.querySelector('.ba-gallery-grid');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');

    if (galleryGrid && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            galleryGrid.scrollBy({
                left: 320, // Scroll by card width + gap
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            galleryGrid.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        });
    }

    // Gallery Dots, Counter & Scroll Hint
    if (galleryGrid) {
        const wrapper = galleryGrid.closest('.gallery-wrapper');
        const cards = galleryGrid.querySelectorAll('.ba-card');
        const cardCount = cards.length;

        if (cardCount > 1 && wrapper) {
            // Create counter
            const counter = document.createElement('span');
            counter.className = 'gallery-counter';
            counter.textContent = '1 / ' + cardCount;
            wrapper.insertBefore(counter, galleryGrid);

            // Create dots
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'gallery-dots' + (cardCount > 8 ? ' many-dots' : '');
            for (let i = 0; i < cardCount; i++) {
                const dot = document.createElement('button');
                dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', (i + 1) + '번째 사례');
                dot.addEventListener('click', () => {
                    cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                });
                dotsContainer.appendChild(dot);
            }
            wrapper.after(dotsContainer);

            // Update on scroll
            let galleryTicking = false;
            galleryGrid.addEventListener('scroll', () => {
                if (!galleryTicking) {
                    requestAnimationFrame(() => {
                        const scrollLeft = galleryGrid.scrollLeft;
                        const cardWidth = cards[0].offsetWidth;
                        const gap = parseFloat(getComputedStyle(galleryGrid).gap) || 15;
                        const activeIdx = Math.round(scrollLeft / (cardWidth + gap));
                        const clamped = Math.max(0, Math.min(activeIdx, cardCount - 1));

                        counter.textContent = (clamped + 1) + ' / ' + cardCount;

                        const dots = dotsContainer.querySelectorAll('.gallery-dot');
                        dots.forEach((d, i) => d.classList.toggle('active', i === clamped));

                        // Scroll-end hint (B-3)
                        const atEnd = galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth - 10;
                        wrapper.classList.toggle('scroll-end', atEnd);

                        galleryTicking = false;
                    });
                    galleryTicking = true;
                }
            }, { passive: true });
        }
    }

    // Top Button Logic (Using unified handler)
    const topBtn = document.getElementById('topBtn');

    if (topBtn) {
        addScrollHandler((scrollY) => {
            if (scrollY > 300) {
                topBtn.style.display = 'flex';
            } else {
                topBtn.style.display = 'none';
            }
        });
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- New Features Logic ---

    // 2. Real Reviews Carousel Injection (Naver Style)
    // Focus: Diet, Facial Asymmetry, Skin, Pain
    const uniqueReviews = [
        // Diet (12 items)
        { category: 'diet', treatment: "다이어트 3개월", text: "3개월 동안 12kg 감량 성공했어요! 요요 없이 유지 중입니다. 원장님이 식단까지 꼼꼼하게 봐주셔서 포기하지 않을 수 없었어요.", name: "김OO님", stars: 5, date: "2025.11.28", keywords: ["친절해요", "꼼꼼해요", "효과좋아요"] },
        { category: 'diet', treatment: "다이어트 1개월", text: "한 달 만에 5kg 빠졌어요. 한약이 쓰지 않고 먹기 편해서 좋았습니다. 목표 체중까지 화이팅!", name: "이OO님", stars: 5, date: "2025.11.15", keywords: ["상담이 자세해요", "시설이 깔끔해요"] },
        { category: 'diet', treatment: "다이어트 환", text: "식욕 억제가 잘 돼서 군것질을 끊었어요. 가지고 다니기도 편해서 빼먹지 않고 먹게 되네요.", name: "박OO님", stars: 4, date: "2025.10.30", keywords: ["편리해요", "가성비 최고"] },
        { category: 'diet', treatment: "산후 다이어트", text: "출산 후 안 빠지던 살이 규림 한약 먹고 쏙 빠졌어요. 붓기도 같이 빠져서 몸이 너무 가벼워요.", name: "최OO님", stars: 5, date: "2025.10.12", keywords: ["붓기완화", "건강해졌어요"] },
        { category: 'diet', treatment: "급찐급빠 다이어트", text: "휴가 다녀와서 급하게 찐 살, 2주 프로그램으로 정리했습니다. 역시 관리는 규림이네요.", name: "정OO님", stars: 5, date: "2025.09.25", keywords: ["빠른효과", "친절해요"] },
        { category: 'diet', treatment: "다이어트 2개월", text: "운동 없이 식단과 한약만으로 8kg 감량했습니다. 옷 사이즈가 달라져서 쇼핑할 맛이 나요.", name: "강OO님", stars: 5, date: "2025.09.10", keywords: ["옷태가달라져요", "인생한의원"] },
        { category: 'diet', treatment: "고도비만 다이어트", text: "혼자서는 힘들었는데 원장님 덕분에 20kg 감량의 기적을 맛봤습니다. 건강도 좋아졌어요.", name: "조OO님", stars: 5, date: "2025.08.22", keywords: ["인생역전", "건강관리"] },
        { category: 'diet', treatment: "다이어트 환", text: "직장 다니면서 챙겨 먹기 편해요. 회식 자리에서도 식욕 조절이 돼서 다행입니다.", name: "윤OO님", stars: 4, date: "2025.08.05", keywords: ["직장인추천", "간편해요"] },
        { category: 'diet', treatment: "웨딩 다이어트", text: "결혼식 앞두고 급하게 관리받았는데, 드레스 라인이 달라졌어요. 예쁘게 결혼식 잘 마쳤습니다.", name: "장OO님", stars: 5, date: "2025.07.18", keywords: ["예신필수", "라인정리"] },
        { category: 'diet', treatment: "갱년기 다이어트", text: "나이 들면서 뱃살이 안 빠졌는데, 규림에서 관리받고 허리라인을 되찾았습니다.", name: "임OO님", stars: 5, date: "2025.07.01", keywords: ["뱃살타파", "젊어졌어요"] },
        { category: 'diet', treatment: "소아 비만", text: "아이가 살이 쪄서 걱정이었는데, 한약 먹고 키도 크고 살도 빠졌어요. 아이도 잘 먹네요.", name: "한OO님", stars: 5, date: "2025.06.15", keywords: ["아이성장", "소아비만"] },
        { category: 'diet', treatment: "부분 비만", text: "팔뚝이랑 허벅지 살이 고민이었는데, 약침이랑 같이 하니 효과가 두 배네요.", name: "오OO님", stars: 4, date: "2025.06.02", keywords: ["라인관리", "부분비만"] },

        // Facial Asymmetry (10 items)
        { category: 'asymmetry', treatment: "안면비대칭 교정", text: "사진 찍을 때마다 스트레스였는데, 교정 후 얼굴 라인이 정말 달라졌어요. 친구들이 살 빠졌냐고 물어봐요!", name: "서OO님", stars: 5, date: "2025.11.20", keywords: ["얼굴축소", "비대칭교정"] },
        { category: 'asymmetry', treatment: "안면비대칭 교정", text: "턱 관절 소리도 줄어들고 얼굴 중심선이 맞아가는 게 보입니다. 꾸준히 치료받길 잘했어요.", name: "신OO님", stars: 5, date: "2025.11.05", keywords: ["턱관절", "통증완화"] },
        { category: 'asymmetry', treatment: "안면비대칭/턱관절", text: "입 벌릴 때마다 딱딱 소리가 났는데 교정 치료 받고 편해졌습니다. 얼굴 비대칭도 많이 좋아졌어요.", name: "권OO님", stars: 5, date: "2025.10.25", keywords: ["신기해요", "편안해요"] },
        { category: 'asymmetry', treatment: "안면비대칭 교정", text: "수술 없이 교정만으로 이렇게 달라질 수 있다니 놀라워요. 거울 보는 게 즐거워졌습니다.", name: "황OO님", stars: 5, date: "2025.10.08", keywords: ["비수술", "자연스러움"] },
        { category: 'asymmetry', treatment: "턱관절 장애", text: "턱이 아파서 밥 먹기도 힘들었는데, 치료 몇 번 만에 통증이 사라졌어요.", name: "안OO님", stars: 5, date: "2025.09.15", keywords: ["통증치료", "명의"] },
        { category: 'asymmetry', treatment: "안면비대칭 교정", text: "비대칭 때문에 웃을 때 입꼬리가 짝짝이였는데, 이제 자연스럽게 웃을 수 있어요.", name: "송OO님", stars: 5, date: "2025.08.30", keywords: ["미소교정", "자신감상승"] },
        { category: 'asymmetry', treatment: "안면비대칭/체형", text: "얼굴뿐만 아니라 골반이랑 척추까지 같이 교정해주셔서 몸 전체가 바르게 된 느낌입니다.", name: "류OO님", stars: 5, date: "2025.08.12", keywords: ["전신교정", "바른자세"] },
        { category: 'asymmetry', treatment: "안면비대칭 교정", text: "오랜 컴플렉스였는데 진작 올 걸 그랬어요. 원장님 실력이 정말 좋으십니다.", name: "전OO님", stars: 5, date: "2025.07.25", keywords: ["실력최고", "추천해요"] },
        { category: 'asymmetry', treatment: "턱관절 교정", text: "두통까지 있었는데 턱관절 치료하고 두통도 같이 없어졌어요. 신기하네요.", name: "홍OO님", stars: 5, date: "2025.07.10", keywords: ["두통완화", "삶의질상승"] },
        { category: 'asymmetry', treatment: "안면비대칭 재교정", text: "다른 곳에서 효과 못 봤는데 규림에서 확실히 좋아졌습니다. 믿고 다닙니다.", name: "고OO님", stars: 5, date: "2025.06.20", keywords: ["재교정성공", "신뢰"] },

        // Skin (10 items)
        { category: 'skin', treatment: "여드름 흉터", text: "피부과 많이 다녀봤지만 여기만큼 꼼꼼한 곳은 처음이에요. 흉터가 눈에 띄게 옅어져서 화장할 맛이 납니다.", name: "문OO님", stars: 5, date: "2025.11.25", keywords: ["꼼꼼해요", "피부재생"] },
        { category: 'skin', treatment: "피부 리프팅", text: "매선 시술 받았는데 즉각적으로 리프팅되는 게 보여서 신기했어요. 통증도 생각보다 적었습니다.", name: "양OO님", stars: 5, date: "2025.11.10", keywords: ["동안시술", "즉각효과"] },
        { category: 'skin', treatment: "성인 여드름", text: "재발하는 여드름 때문에 고민이었는데, 속부터 치료하니 확실히 좋아지네요. 피부 톤도 맑아졌어요.", name: "손OO님", stars: 5, date: "2025.10.20", keywords: ["근본치료", "피부미인"] },
        { category: 'skin', treatment: "모공/흉터", text: "새살침 치료 받고 모공이 많이 줄었어요. 화장도 잘 먹고 피부 자신감이 생겼습니다.", name: "배OO님", stars: 5, date: "2025.10.05", keywords: ["모공축소", "새살침"] },
        { category: 'skin', treatment: "등 여드름", text: "등드름 때문에 여름에도 가리고 다녔는데, 이제 당당하게 오프숄더 입을 수 있어요!", name: "조OO님", stars: 5, date: "2025.09.18", keywords: ["바디케어", "자신감"] },
        { category: 'skin', treatment: "안면홍조", text: "얼굴이 항상 붉어서 스트레스였는데, 한약 먹고 침 맞으니 열감이 많이 내려갔어요.", name: "백OO님", stars: 4, date: "2025.08.25", keywords: ["홍조개선", "열감해소"] },
        { category: 'skin', treatment: "피부 탄력", text: "나이 들면서 피부가 처져서 고민이었는데, 정안침 맞고 탱탱해진 기분이에요.", name: "허OO님", stars: 5, date: "2025.08.08", keywords: ["탄력개선", "동안침"] },
        { category: 'skin', treatment: "여드름 자국", text: "붉은 자국이 오래갔는데 치료받고 많이 옅어졌어요. 컨실러 안 써도 됩니다.", name: "유OO님", stars: 5, date: "2025.07.22", keywords: ["자국완화", "쌩얼자신감"] },
        { category: 'skin', treatment: "건선/아토피", text: "가려움증 때문에 잠도 못 잤는데, 면역 치료 받고 많이 호전되었습니다.", name: "남OO님", stars: 5, date: "2025.07.05", keywords: ["가려움해소", "면역강화"] },
        { category: 'skin', treatment: "신부 관리", text: "결혼식 앞두고 피부 관리 받았는데, 화장이 너무 잘 먹어서 칭찬 많이 들었어요.", name: "심OO님", stars: 5, date: "2025.06.18", keywords: ["웨딩케어", "물광피부"] },

        // Pain Treatment (6 items)
        { category: 'pain', treatment: "목/어깨 통증", text: "직장인이라 거북목이 심했는데, 침 치료랑 추나 받고 많이 좋아졌습니다. 두통도 사라졌어요.", name: "노OO님", stars: 5, date: "2025.11.22", keywords: ["거북목", "시원해요"] },
        { category: 'pain', treatment: "교통사고 후유증", text: "사고 후 목이랑 허리가 계속 아팠는데, 추나 치료 받고 씻은 듯이 나았습니다. 야간진료가 있어서 퇴근 후 가기 편해요.", name: "하OO님", stars: 5, date: "2025.11.08", keywords: ["교통사고", "야간진료"] },
        { category: 'pain', treatment: "허리 디스크", text: "허리가 너무 아파서 걷기도 힘들었는데, 약침 맞고 많이 호전되었습니다. 원장님 정말 친절하세요.", name: "곽OO님", stars: 5, date: "2025.10.15", keywords: ["디스크치료", "친절왕"] },
        { category: 'pain', treatment: "손목 통증", text: "컴퓨터를 많이 써서 손목이 시큰거렸는데, 침 맞고 금방 좋아졌어요. 물리치료도 시원합니다.", name: "성OO님", stars: 5, date: "2025.09.28", keywords: ["손목통증", "물리치료"] },
        { category: 'pain', treatment: "무릎 통증", text: "계단 오르내리기 힘들었는데, 봉침 맞고 많이 부드러워졌어요. 등산도 다시 다닙니다.", name: "차OO님", stars: 5, date: "2025.09.05", keywords: ["봉침효과", "관절튼튼"] },
        { category: 'pain', treatment: "오십견", text: "팔이 안 올라가서 고생했는데, 꾸준히 치료받으니 이제 만세도 가능해요.", name: "주OO님", stars: 5, date: "2025.08.18", keywords: ["오십견", "운동가능"] },

        // Others (2 items)
        { category: 'other', treatment: "공진단 처방", text: "부모님 선물로 드렸는데 너무 좋아하시네요. 아침마다 개운하시다고 합니다.", name: "우OO님", stars: 5, date: "2025.05.08", keywords: ["효도선물", "피로회복"] },
        { category: 'other', treatment: "수험생 보약", text: "고3 아들 체력이 떨어져서 지어줬는데, 집중력이 좋아진 것 같다고 하네요.", name: "구OO님", stars: 5, date: "2025.04.20", keywords: ["수험생", "집중력"] }
    ];

    const reviewCarousel = document.querySelector('.review-carousel');
    const searchInput = document.getElementById('reviewSearchInput');

    function renderReviews(reviews) {
        if (!reviewCarousel) return;
        reviewCarousel.innerHTML = ''; // Clear existing

        if (reviews.length === 0) {
            reviewCarousel.innerHTML = '<div class="no-results">검색 결과가 없습니다.<br>다른 키워드로 검색해보세요.</div>';
            return;
        }

        // Determine base path for assets
        const basePath = window.location.pathname.includes('/events/') ? '../../' : '';
        const logoSrc = basePath + 'assets/logo_icon.png';

        const fragment = document.createDocumentFragment();
        reviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';

            // Generate Keywords HTML
            const keywordsHtml = review.keywords.map(k => `<span class="keyword-badge">#${k}</span>`).join('');

            card.innerHTML = `
                <div class="review-header">
                    <div class="naver-cert"><i class="fa-solid fa-check"></i> 영수증 인증</div>
                    <div class="review-stars">${'<i class="fa-solid fa-star"></i>'.repeat(review.stars)}</div>
                </div>
                <div class="review-body">"${review.text}"</div>
                <div class="review-keywords">${keywordsHtml}</div>
                <div class="review-footer">
                    <div class="reviewer-thumb">
                        <img src="${logoSrc}" alt="User">
                    </div>
                    <div class="reviewer-meta">
                        <h5>${review.name}</h5>
                        <span>${review.treatment} | ${review.date}</span>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });
        reviewCarousel.appendChild(fragment);
    }

    if (reviewCarousel) {
        // Initial Render
        let filteredReviews = uniqueReviews;
        const pageType = document.body.getAttribute('data-page-type');

        if (pageType === 'skin') {
            filteredReviews = uniqueReviews.filter(r => r.category === 'skin');
        } else if (pageType === 'diet') {
            filteredReviews = uniqueReviews.filter(r => r.category === 'diet');
        } else if (pageType === 'body' || pageType === 'asymmetry') {
            filteredReviews = uniqueReviews.filter(r => r.category === 'asymmetry');
        } else if (pageType === 'pain') {
            filteredReviews = uniqueReviews.filter(r => r.category === 'pain');
        }

        // Initial loop render (x2 for visual scroll if needed, but for search we typically show match list)
        // Ideally search should show ALL matches, not looped. 
        // For default view, we can loop. For search, no loop.
        renderReviews([...filteredReviews, ...filteredReviews]);

        // Search Listener
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase().trim();

                if (term === '') {
                    // Restore default looped view
                    renderReviews([...filteredReviews, ...filteredReviews]);
                    return;
                }

                const matches = uniqueReviews.filter(r =>
                    r.text.includes(term) ||
                    r.treatment.includes(term) ||
                    r.keywords.some(k => k.includes(term))
                );

                renderReviews(matches);

                // Highlight search term in results
                if (term && matches.length > 0) {
                    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`(${escapedTerm})`, 'gi');
                    document.querySelectorAll('.review-body').forEach(body => {
                        body.innerHTML = body.innerHTML.replace(regex, '<mark>$1</mark>');
                    });
                }
            });
        }
    }

    // 3. FAQ Accordion Logic
    let faqData = [
        { q: "진료 시간은 어떻게 되나요?", a: "평일은 오전 10시 30분부터 오후 8시 30분까지 야간진료를 시행하며, 토요일은 오전 10시부터 오후 4시까지 진료합니다. " },
        { q: "주차는 가능한가요?", a: "네, 건물 내 지하 주차장을 무료로 이용하실 수 있습니다." },
        { q: "다이어트 한약 비용이 궁금해요.", a: "다이어트 프로그램은 환자분의 체질과 목표 감량치에 따라 1:1 맞춤 처방됩니다. 비용은 제형별로 상이하며, 정확한 비용은 상담 후 안내해 드릴 수 있습니다." },
        { q: "예약은 필수인가요?", a: "규림한의원은 원활한 진료를 위해 예약제로 운영되고 있습니다. 네이버 예약, 카카오톡, 또는 전화로 미리 예약해 주시면 대기 시간 없이 진료받으실 수 있습니다." }
    ];

    const pageType = document.body.getAttribute('data-page-type');
    if (pageType === 'skin' || pageType === 'body' || pageType === 'asymmetry' || pageType === 'pain') {
        // Remove Diet Cost Question for non-diet pages
        faqData = faqData.filter(item => !item.q.includes("다이어트 한약 비용"));
    }

    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        const faqFragment = document.createDocumentFragment();
        faqData.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <div class="faq-question">
                    ${item.q}
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>${item.a}</p>
                </div>
            `;
            faqFragment.appendChild(faqItem);
        });
        faqContainer.appendChild(faqFragment);

        // Event delegation for FAQ clicks (single listener instead of per-item)
        faqContainer.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (!question) return;
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all others
            faqContainer.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                faqItem.classList.add('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    }

    // 4. Success Story Modal Logic (Updated)
    const storyModal = document.getElementById('storyModal');
    const storyImage = document.getElementById('storyImage');
    const storyClose = document.querySelector('.story-close');

    // Story Data Mapping
    // Story Data Mapping
    const storyData = {
        'ba_1.png': {
            tag: '다이어트',
            title: '6개월 -20kg, 대사질환 극복',
            profile: '40대 여성 / 주부',
            desc: '당뇨와 고혈압 진단을 받고, 만성적인 컨디션 저하로 일상 생활에 어려움을 겪으셨습니다. "아이들과 놀아줄 체력조차 없다"며 눈물을 보이셨던 기억이 납니다. \n\n단순 감량이 아닌 대사 기능 회복을 목표로, 인슐린 저항성을 개선하는 청신장쾌(淸神腸快) 탕약을 처방하고, 산삼 비만 약침으로 복부 내장 지방을 집중 분해했습니다.',
            result: '6개월간 체지방만 16kg 감량하며 총 20kg 감량에 성공했습니다. 당뇨 및 혈압 수치가 정상화되어 약물을 중단하셨고, 활력을 되찾아 가족 여행도 다녀오셨습니다.'
        },
        'ba_2.png': {
            tag: '다이어트',
            title: '3개월 -10kg, 체질 개선',
            profile: '20대 여성 / 대학생',
            desc: '물만 마셔도 붓는 심한 부종과 살이 쉽게 찌는 체질로 스트레스가 극심하셨습니다. 아침마다 붓는 얼굴 때문에 약속을 잡기 꺼려질 정도였습니다. \n\n담음(痰飲)으로 인한 순환 장애로 진단, 림프 순환을 돕고 신장 기능을 강화하는 순환 탕약을 처방했습니다. 또한, 하체 순환을 위한 심부 온열 요법을 병행했습니다.',
            result: '3개월 만에 10kg 감량은 물론, 부종이 사라져 아침이 가벼워지셨습니다. "이제 어떤 옷을 입어도 핏이 예쁘다"며 밝게 웃으셨습니다.'
        },
        'ba_3.png': {
            tag: '다이어트',
            title: '6개월 -19kg, 건강한 삶',
            profile: '50대 여성 / 자영업',
            desc: '고혈압, 고지혈증, 당뇨 등 대사 증후군을 복합적으로 앓고 계셨으며, 갱년기 증상까지 겹쳐 우울감이 깊으셨습니다. \n\n갱년기 호르몬 불균형을 바로잡는 조경(調經) 치료와 해독 프로그램을 병행했습니다. 무리한 운동 대신 기초 대사량을 높이는 한약 처방으로 편안한 감량을 유도했습니다.',
            result: '19kg 감량 후 모든 대사 질환 수치가 정상 범위로 돌아왔습니다. "제 2의 인생을 선물 받은 기분"이라며 삶의 질이 크게 향상되셨습니다.'
        },
        'ba_4.jpg': {
            tag: '안면비대칭',
            title: '비수술 안면비대칭 교정',
            profile: '20대 남성 / 직장인',
            desc: '사진 촬영 시 입꼬리가 한쪽으로 올라가고 얼굴 중심선이 틀어져 보이는 콤플렉스로, 중요한 미팅이나 소개팅 자리를 피하셨습니다. \n\n우측 턱관절 아탈구로 인한 교근 비대와 측두골 회전 변위를 확인했습니다. 경추 1, 2번을 정렬하는 상부 경추 추나와 턱관절 균형 장치(TBA)를 통해 골격의 중심을 바로잡았습니다.',
            result: '입꼬리 대칭이 맞춰지고 눈꼬리 위치가 수평을 찾았습니다. "이제 자신 있게 사진을 찍을 수 있다"며 프로필 사진도 새로 촬영하셨습니다.'
        },
        'ba_5.png': {
            tag: '안면비대칭',
            title: '안면비대칭 & 윤곽 개선',
            profile: '20대 남성 / 프리랜서',
            desc: '얼굴 좌우 부피 차이가 심하고 광대 돌출이 비대칭이라 인상이 강해 보이는 것이 고민이셨습니다. \n\n근막 이완 추나로 긴장된 근육을 풀어주고, 약화된 쪽에는 매선(녹는 실)을 자입하여 SMAS층을 강화, 좌우 밸런스를 맞추는 데 주력했습니다.',
            result: '좌우 얼굴 부피가 균일해지고 얼굴 라인이 부드러워졌습니다. 주변에서 "인상이 선해졌다", "살 빠졌냐"는 이야기를 많이 듣게 되셨습니다.'
        },
        'ba_6.png': {
            tag: '여드름 흉터',
            title: '복합 흉터 치료 (여성)',
            profile: '20대 여성 / 대학생',
            desc: '사춘기 시절 심한 여드름으로 양 볼에 깊은 박스형 흉터와 롤링성 흉터가 혼재되어 있었습니다. 5년 넘게 두꺼운 화장과 마스크로 얼굴을 가리고 다니셨습니다. \n\n흉터 밑바닥의 섬유화된 유착을 끊어내는 새살침 코라테라피와 피부 재생을 돕는 쥬베룩 스킨부스터를 병행하여 살이 차오를 공간을 만들었습니다.',
            result: '패인 흉터의 80% 이상이 새살로 채워졌습니다. "이제 쌩얼로도 친구들을 만날 수 있다"며 자존감을 회복하셨습니다.'
        },
        'ba_7.png': {
            tag: '여드름 흉터',
            title: '난치성 흉터 재생 (여성)',
            profile: '30대 여성 / 직장인',
            desc: '여러 피부과 시술에도 효과를 보지 못한 난치성 흉터로 내원하셨습니다. 피부가 얇고 예민해 강한 레이저 시술이 어려운 상태였습니다. \n\n피부 자극을 최소화하면서 진피층의 재생력을 극대화하는 미세 다륜 침(MTS)과 고주파 시술을 교차로 진행했습니다. 재생 앰플을 침투시켜 속건조까지 함께 개선했습니다.',
            result: '흉터의 깊이가 현저히 얕아지고 피부 탄력이 증가했습니다. 화장이 들뜨지 않고 매끄럽게 먹어 출근 준비 시간이 반으로 줄었습니다.'
        },
        'ba_8.png': {
            tag: '여드름 흉터',
            title: '붉은 자국 & 흉터 (여성)',
            profile: '20대 여성 / 취준생',
            desc: '여드름 염증 후 남은 붉은 색소 침착(PIH)과 얕은 흉터가 얼굴 전체에 퍼져 있어, 면접 등에서 자신감이 결여된 상태였습니다. \n\n혈관을 수축시키고 염증을 배출하는 약침 치료와 함께, 표피의 턴오버 주기를 정상화하는 천연 필링 시술을 진행하여 맑은 피부 톤을 유도했습니다.',
            result: '붉은 기가 잡히고 피부 톤이 균일해졌습니다. 깨끗해진 피부 덕분에 자신감 있게 면접에 임하여 원하던 곳에 취업하셨습니다.'
        },
        'ba_9.png': {
            tag: '여드름 흉터',
            title: '남성 심부 흉터 치료',
            profile: '20대 남성 / 대학생',
            desc: '남성 특유의 두꺼운 피부층에 깊게 패인 아이스픽 흉터가 많았습니다. "피부 때문에 소개팅도 못 하겠다"며 위축된 모습이셨습니다. \n\n강력한 물리적 자극을 주는 새살침을 집중적으로 시술하여 흉터의 경계면을 부드럽게 깎아내고, 심부 재생을 위한 고농도 성장인자(EGF)를 도포했습니다.',
            result: '울퉁불퉁하던 요철이 평평해지고 모공이 축소되었습니다. 거친 인상이 부드럽고 깔끔한 훈남 이미지로 변신하셨습니다.'
        },
        'ba_10.png': {
            tag: '여드름 흉터',
            title: '박스형 흉터 개선 (남성)',
            profile: '30대 남성 / 직장인',
            desc: '경계가 뚜렷하고 넓은 박스형 흉터가 관자놀이와 볼 쪽에 집중되어 있었습니다. 조명 아래서 그림자가 지는 것이 큰 스트레스였습니다. \n\n흉터 하나하나를 타겟팅하여 시술하는 새살침으로 흉터 바닥을 들어 올리고, 프락셔널 고주파로 주변 피부의 결을 정돈하여 경계를 흐리게 만들었습니다.',
            result: '흉터의 깊이감이 사라져 조명 아래서도 그림자가 지지 않습니다. "피부 좋아졌다"는 말을 듣는 것이 일상이 되셨습니다.'
        },
        // NEW SKIN CASES
        'ba_skin_new_1.png': {
            tag: '여드름 흉터',
            title: '만성 여드름 & 붉은기',
            profile: '20대 여성 / 대학생',
            desc: '반복되는 염증성 여드름으로 인해 얼굴 전체에 붉은 자국과 열감이 심했습니다. 화장을 해도 가려지지 않아 대인기피증까지 생길 정도였습니다. \n\n피부 장벽을 강화하는 한약 처방과 함께, 염증을 배출시키는 약침 치료와 진정 관리를 병행했습니다.',
            result: '3개월 치료 후 붉은기가 90% 이상 소실되고, 새로운 여드름이 올라오지 않는 건강한 피부가 되었습니다.'
        },
        'ba_skin_lifting_k.png': {
            tag: '동안 리프팅',
            title: '무너진 턱선 & 불독살',
            profile: '50대 여성 / 주부',
            desc: '나이가 들면서 턱선이 무너지고 입가 옆에 불독살이 심술보처럼 내려와 인상이 강해 보이는 것이 고민이셨습니다. 수술은 무서워하셔서 비수술 요법을 원하셨습니다. \n\n녹는 실(매선)을 근막층(SMAS)까지 자입하여 처진 피부를 당겨 올리고, 콜라겐 생성을 유도하여 탄력을 채웠습니다.',
            result: '턱 라인이 날렵한 V라인으로 정리되고 불독살이 사라져, 친구들에게 "살 빠졌냐", "보톡스 맞았냐"는 질문을 받으십니다.'
        },
        'ba_skin_wrinkle_k.png': {
            tag: '주름 개선',
            title: '깊은 팔자주름 (귀족침)',
            profile: '40대 여성 / 교사',
            desc: '코 옆에서 입가로 이어지는 깊은 팔자주름 때문에 실제 나이보다 5살은 더 들어 보여 스트레스셨습니다. 웃을 때마다 주름이 신경 쓰여 잘 웃지 못하셨습니다. \n\n꺼진 부위를 채워주는 채움 매선과 귀족 약침을 시술하여, 필러 없이 자연스럽게 볼륨감을 형성했습니다.',
            result: '팔자주름이 팽팽하게 차올라 앳된 인상으로 변하셨습니다. "인상이 훨씬 밝아졌다"는 이야기를 많이 들으십니다.'
        },
        'ba_skin_neck_k.png': {
            tag: '주름 개선',
            title: '가로 목주름 지우개',
            profile: '30대 여성 / 직장인',
            desc: '스마트폰 사용으로 인한 잘못된 자세로 젊은 나이임에도 깊은 가로 목주름이 자리 잡았습니다. 목걸이를 하기도 꺼려졌습니다. \n\n목 근육의 긴장을 풀어주고, 주름진 부위에 재생 앰플을 침투시키는 MTS 시술과 콜라겐 매선 시술을 병행했습니다.',
            result: '목주름이 옅어지고 목 피부의 탄력이 좋아져 목선이 길고 예뻐 보입니다. 오프숄더 옷도 자신 있게 입으십니다.'
        },
        'ba_skin_glow_k.png': {
            tag: '피부 탄력',
            title: '속건조 해결 & 물광 피부',
            profile: '30대 여성 / 예비신부',
            desc: '결혼식을 앞두고 피부가 푸석하고 화장이 자꾸 들떠서 고민이셨습니다. 샵 관리를 받아도 그때뿐이고 속당김이 해결되지 않았습니다. \n\n피부 진피층에 수분을 공급하는 물광 약침과, 피부 재생 주기를 앞당기는 정안침 치료로 속부터 차오르는 광채를 만들었습니다.',
            result: '세안 후에도 당김 없이 촉촉하고 은은한 윤광이 돕니다. "신부 피부가 너무 좋다"는 칭찬을 들으며 결혼식을 올리셨습니다.'
        },
        'ba_skin_eye_k.png': {
            tag: '동안 리프팅',
            title: '눈가 주름 & 눈밑 지방',
            profile: '50대 여성 / 전문직',
            desc: '눈 밑이 불룩하게 튀어나오고 눈가에 잔주름이 자글자글해 피곤해 보인다는 말을 자주 들으셨습니다. \n\n눈 주변 혈자리를 자극하여 순환을 돕고, 아이 매선으로 눈가 피부를 탄탄하게 조여주는 시술을 진행했습니다.',
            result: '눈 밑이 평평해지고 눈매가 또렷해졌습니다. "피곤해 보인다"는 말 대신 "얼굴 좋아졌다"는 인사를 받게 되셨습니다.'
        },
        // ADDITIONAL SKIN CASES
        'ba_skin_add_1.png': {
            tag: '색소 치료',
            title: '난치성 기미 & 잡티 삭제',
            profile: '40대 여성 / 주부',
            desc: '출산 후 짙어진 기미와 잡티가 레이저 토닝을 10회 이상 받아도 흐려지지 않아 내원하셨습니다. \n\n피부 속 독소를 배출하는 해독 치료와 함께, 색소를 잘게 부수고 배출시키는 미백 약침을 주기적으로 시술했습니다.',
            result: '컨실러로도 안 가려지던 기미가 옅어져 이제는 톤업 크림만 바르고 외출하십니다. 피부 톤 자체가 맑아졌습니다.'
        },
        'ba_skin_add_2.png': {
            tag: '흉터 치료',
            title: '깊게 패인 아이스픽 흉터',
            profile: '20대 남성 / 대학생',
            desc: '송곳으로 찌른 듯한 깊고 좁은 흉터가 볼 전체에 퍼져 있어 피부가 울퉁불퉁했습니다. 프락셀로도 효과를 못 보셨습니다. \n\n흉터의 기저면을 끊어주는 서브시전과 새살침을 병행하여, 패인 곳에 새 살이 차오르게 만들었습니다.',
            result: '구멍 뚫린 듯한 흉터들이 메꿔져 피부 요철이 매끄러워졌습니다. "피부 이식했냐"는 소리를 들을 정도로 개선되었습니다.'
        },
        'ba_skin_add_3.png': {
            tag: '안면 홍조',
            title: '만성 홍조 & 열감 완화',
            profile: '30대 여성 / 간호사',
            desc: '조금만 덥거나 긴장해도 얼굴이 불타는 고구마처럼 빨개지고 화끈거려 일상생활이 힘들었습니다. \n\n상열하한(위로 뜬 열을 내림) 치료를 위해 청열 한약을 처방하고, 진피층 온도를 낮추는 냉각 재생 관리를 진행했습니다.',
            result: '시도 때도 없이 오르던 열감이 잡히고, 맑고 투명한 피부 톤을 되찾았습니다. 붉은기 커버 메이크업이 필요 없어졌습니다.'
        },
        'ba_skin_add_4.png': {
            tag: '민감성 피부',
            title: '뒤집어진 피부 장벽 복구',
            profile: '20대 여성 / 직장인',
            desc: '잘못된 화장품 사용과 잦은 각질 제거로 피부 장벽이 무너져, 세수만 해도 따갑고 좁쌀 여드름이 폭발했습니다. \n\n일체의 자극적인 시술을 중단하고, 천연 한방 진정 팩과 피부 본연의 힘을 기르는 보약 치료에 집중했습니다.',
            result: '따가움과 간지러움이 사라지고 피부결이 보들보들해졌습니다. 어떤 화장품을 발라도 트러블이 나지 않는 건강한 피부가 되었습니다.'
        },
        'ba_skin_add_5.png': {
            tag: '윤곽 약침',
            title: '투턱(이중턱) 완전 삭제',
            profile: '30대 여성 / 예비신부',
            desc: '몸은 말랐는데 턱 밑에 살이 많아 사진만 찍으면 뚱뚱하게 나오는 것이 고민이셨습니다. \n\n지방을 분해하는 윤곽 약침으로 불필요한 지방을 녹이고, 브이 매선으로 턱 라인을 쫙 땋겨 올렸습니다.',
            result: '숨어있던 턱 선이 드러나 얼굴 크기가 작아 보입니다. 본식 스냅사진 보정이 필요 없을 정도로 갸름해지셨습니다.'
        },

        // ADDITIONAL DIET CASES
        'ba_diet_add_1.png': {
            tag: '산후 다이어트',
            title: '산후 비만 & 붓기 탈출',
            profile: '30대 여성 / 출산 6개월 차',
            desc: '임신 중 찐 20kg이 출산 후에도 10kg 이상 남아 빠지지 않았습니다. 육아로 인해 운동할 시간도 기력도 없으셨습니다. \n\n산후 보약 성분이 들어간 다이어트 한약으로, 기력을 보강하면서 부종과 노폐물 배출을 도왔습니다.',
            result: '임신 전 리즈 시절 몸무게로 완벽하게 돌아가셨습니다. "아가씨 같다"는 말을 들으며 육아 우울증도 극복하셨습니다.'
        },
        'ba_diet_add_2.png': {
            tag: '웨딩 다이어트',
            title: 'D-30 드레스 라인 관리',
            profile: '20대 여성 / 예비신부',
            desc: '결혼식이 한 달 남았는데 팔뚝과 승모근 라인이 정리되지 않아 드레스 핏이 예쁘지 않았습니다. \n\n단기간 감량을 위한 부스터 프로그램과 함께, 승모근과 팔뚝 라인을 매끄럽게 하는 라인 관리를 집중했습니다.',
            result: '30일 만에 체지방 5kg 감량에 성공하고, 직각 어깨와 여리여리한 팔뚝 라인으로 예쁜 드레스 핏을 완성하셨습니다.'
        },
        'ba_diet_add_3.png': {
            tag: '남성 다이어트',
            title: '술배/내장 비만 해결',
            profile: '40대 남성 / 영업직',
            desc: '잦은 회식과 야식으로 배만 볼록 나온 전형적인 거미형 체형이었습니다. 고혈압 전 단계 진단까지 받으셨습니다. \n\n간 해독을 돕고 숙취를 해소하는 약재를 첨가한 다이어트 한약으로, 술 자리를 병행하면서도 체지방을 태웠습니다.',
            result: '허리 사이즈가 36인치에서 32인치로 줄었습니다. 혈압 수치도 정상으로 돌아오고 몸이 훨씬 가벼워지셨습니다.'
        },
        'ba_diet_add_4.png': {
            tag: '복부 다이어트',
            title: '안 빠지는 아랫배(똥배)',
            profile: '50대 여성 / 주부',
            desc: '폐경 후 아랫배가 차갑고 단단하게 뭉치면서 뱃살이 늘어졌습니다. 변비도 심한 편이었습니다. \n\n장 운동을 활성화하고 아랫배를 따뜻하게 하는 온열 치료와 함께, 묵은 숙변을 배출시키는 해독 프로그램을 병행했습니다.',
            result: '아랫배가 따뜻하고 말랑해지면서 쏙 들어갔습니다. 만성 변비도 해결되어 피부색까지 맑아지셨습니다.'
        },
        'ba_diet_add_5.png': {
            tag: '하체 비만',
            title: '종아리 알 & 부종 개선',
            profile: '20대 여성 / 서비스직',
            desc: '하루 종일 서서 일하느라 저녁이면 다리가 퉁퉁 붓고 종아리 알이 딱딱하게 배겼습니다. 치마 입기가 두려우셨습니다. \n\n근육 이완 약침(씬 주사)으로 알을 줄이고, 정맥 순환을 돕는 매선 시술로 붓기 체질을 개선했습니다.',
            result: '종아리 둘레가 3cm 감소하고 다리 라인이 매끈하게 펴졌습니다. 퇴근길 발걸음이 한결 가벼워지셨습니다.'
        },

        // NEW DIET CASES (Generated)
        'ba_diet_new_1.png': {
            tag: '다이어트',
            title: '복부 비만 집중 감량',
            profile: '30대 여성 / 직장인',
            desc: '오래 앉아있는 직업 특성상 복부에 살이 집중되어 스트레스였습니다. 운동할 시간이 부족해 효율적인 감량이 필요했습니다. \n\n복부 지방 분해를 돕는 산삼 약침과 대사량을 높이는 다이어트 한약을 병행하여, 체지방 위주의 감량을 유도했습니다.',
            result: '3개월 만에 복부 둘레가 15cm 감소했습니다. "입던 바지가 주먹 하나 들어갈 정도로 헐렁해졌다"며 만족해하셨습니다.'
        },
        'ba_diet_full_k.png': {
            tag: '다이어트',
            title: '고도비만 전신 감량',
            profile: '20대 여성 / 취준생',
            desc: '불규칙한 식습관으로 체중이 80kg대까지 늘어나 자존감이 바닥이었습니다. 혼자 굶는 다이어트는 매번 실패하고 요요만 반복했습니다. \n\n식욕을 조절하고 대사를 정상화하는 1:1 맞춤 한약을 처방하고, 정기적인 인바디 체크로 멘탈까지 관리해드렸습니다.',
            result: '4개월 만에 22kg을 감량하고, 목표하던 기업에 취업까지 성공하셨습니다. "규림 덕분에 새 인생을 산다"고 하십니다.'
        },
        'ba_diet_thigh_k.png': {
            tag: '부분 비만',
            title: '하체 비만(승마살) 탈출',
            profile: '30대 여성 / 디자이너',
            desc: '상체는 마른 편인데 유독 허벅지와 엉덩이에 살이 많아 바지 핏이 예쁘지 않았습니다. 운동을 해도 허벅지 사이즈는 줄지 않아 고민이셨습니다. \n\n단단하게 뭉친 셀룰라이트를 분해하는 강력한 지방분해 약침과 하체 순환을 돕는 탕약을 처방했습니다.',
            result: '허벅지 사이가 멀어지고 승마살이 정리되어 일자 다리 라인을 갖게 되셨습니다. 스키니진도 자신 있게 입으십니다.'
        },
        'ba_diet_arm_k.png': {
            tag: '부분 비만',
            title: '팔뚝살 & 브라라인 정리',
            profile: '40대 여성 / 주부',
            desc: '여름에도 민소매를 입지 못할 정도로 늘어진 팔뚝살이 콤플렉스였습니다. 나잇살이라 안 빠질 거라 생각하고 포기 상태셨습니다. \n\n지방 세포의 크기를 줄여주는 산삼 비만 약침을 팔뚝과 겨드랑이 라인에 집중 시술했습니다.',
            result: '팔 둘레가 4cm 감소하여 라인이 매끈해졌습니다. 올여름에는 민소매 원피스를 마음껏 입으셨습니다.'
        },
        'ba_diet_back_k.png': {
            tag: '부분 비만',
            title: '숨은 등살 & 옆구리',
            profile: '50대 여성 / 자영업',
            desc: '속옷 위아래로 삐져나오는 군살 때문에 옷태가 나지 않아 속상해하셨습니다. 갱년기 후 찐 살이라 잘 빠지지 않았습니다. \n\n체온을 높여 지방 연소를 돕는 심부 온열 요법과 림프 순환을 돕는 해독 프로그램을 진행했습니다.',
            result: '등 라인이 매끈해져 뒷모습이 10년은 젊어 보이십니다. 꽉 끼던 옷들이 넉넉해져서 수선해서 입으십니다.'
        },
        'ba_diet_side_k.png': {
            tag: '체형 교정',
            title: '러브핸들 & S라인',
            profile: '30대 여성 / 필라테스 강사',
            desc: '운동을 업으로 하시지만 옆구리 쪽 군살은 아무리 운동해도 빠지지 않아 내원하셨습니다. \n\n라인을 잡아주는 매선 시술로 탄력을 주고, 국소 부위 지방을 분해하여 워너비 S라인을 완성해드렸습니다.',
            result: '보정 속옷 필요 없는 완벽한 허리 라인을 완성하셨습니다. 회원들에게도 규림을 추천하고 계십니다.'
        },
        'ba_skin_hair_female.png': {
            tag: '탈모',
            title: '여성 정수리 탈모',
            profile: '40대 여성 / 주부',
            desc: '출산 후 시작된 탈모가 갱년기와 겹쳐 급격히 악화되었습니다. 정수리가 훤히 보여 모자를 쓰지 않고는 외출하기 힘들다고 하셨습니다. \n\n두피의 혈액 순환을 돕는 약침과 모근에 영양을 공급하는 발모 한약을 처방하여, 휴지기 모발을 성장기로 전환시켰습니다.',
            result: '정수리 밀도가 빽빽하게 채워졌고, 모발에 힘이 생겨 볼륨감이 살아났습니다. "10년은 젊어 보인다"는 말을 듣고 계십니다.'
        },
        'ba_skin_hair_male.png': {
            tag: '탈모',
            title: '남성 M자 탈모',
            profile: '30대 남성 / 직장인',
            desc: 'M자 라인이 점점 깊어져 앞머리로 가리는 데 한계가 있었습니다. 유전적 요인과 스트레스로 인한 열감(두피열)이 원인이었습니다. \n\n두피의 열을 내리는 청열 치료와 함께, 모낭을 자극하는 약침 치료를 집중적으로 시행했습니다.',
            result: '헤어라인에 잔머리가 굵게 올라와 이마 라인이 1cm 이상 내려왔습니다. 자신 있게 이마를 드러내는 스타일링이 가능해졌습니다.'
        },
        // NEW BODY CASES
        'ba_body_1.png': {
            tag: '체형교정',
            title: '전신 비대칭 교정',
            profile: '20대 여성 / 학생',
            desc: '어깨 높 낮이가 다르고 골반이 틀어져 치마가 자꾸 돌아가는 증상을 호소하셨습니다. 걸음걸이까지 불안정한 상태였습니다. \n\n추나요법으로 골반과 척추의 정렬을 바로잡고, 약화된 근육을 강화하는 운동 치료를 병행했습니다.',
            result: '어깨 라인이 수평을 찾고 골반 통증이 사라졌습니다. 숨어있던 키 2cm를 찾았고, 바른 자세 덕분에 피로감도 줄어들었습니다.'
        },
        'ba_body_2.png': {
            tag: '안면비대칭',
            title: '턱관절 & 비대칭 동시 치료',
            profile: '30대 여성 / 강사',
            desc: '말을 많이 하는 직업인데 입이 잘 안 벌어지고 턱에서 소리가 나는 증상이 있었습니다. 턱이 틀어지면서 얼굴 비대칭도 심해졌습니다. \n\n턱관절의 중심축을 맞추는 교정 장치(TBA)와 경추 교정을 통해 구조적인 문제를 해결했습니다.',
            result: '입을 크게 벌려도 소리가 나지 않고, 턱 선이 갸름해지며 얼굴의 균형이 맞춰졌습니다. 강의할 때 발음도 더 정확해지셨습니다.'
        },
        'ba_body_3.png': {
            tag: '체형교정',
            title: '거북목 & 라운드숄더',
            profile: '30대 남성 / 개발자',
            desc: '하루 종일 모니터를 보느라 목이 거북이처럼 굽고 등이 굽어 만성 두통에 시달리셨습니다. \n\n굳은 흉추를 펴주는 추나요법과 목 주변 근육을 이완시키는 약침 치료를 진행했습니다.',
            result: '목 라인이 길어지고 등이 펴지면서 숨쉬기가 편해지셨습니다. 만성 두통이 사라져 업무 집중력도 높아졌습니다.'
        },
        // NEW ADDED CASES (Missing in original)
        'ba_diet_wedding.png': {
            tag: '웨딩 다이어트',
            title: '부유방 & 쇄골 라인',
            profile: '20대 여성 / 예비신부',
            desc: '드레스 입을 때 가장 신경 쓰이는 팔뚝과 겨드랑이 살(부유방)을 정리하고 싶어 하셨습니다. \n\n산삼 비만 약침으로 국소 부위 지방을 녹이고, 림프 순환을 돕는 마사지 치료를 병행하여 승모근 라인까지 매끄럽게 정리했습니다.',
            result: '가녀린 직각 어깨와 쇄골 라인이 드러나 드레스 핏이 완벽해졌습니다. "어깨 예쁘다"는 칭찬을 많이 받으셨습니다.'
        },
        'ba_diet_man_belly.png': {
            tag: '남성 다이어트',
            title: '중년 남성 복부 비만',
            profile: '50대 남성 / 사업가',
            desc: '잦은 음주와 운동 부족으로 전형적인 남성형 복부 비만(내장 지방)이 심각했습니다. 허리 디스크 초기 증상까지 겹쳐 감량이 시급했습니다. \n\n내장 지방을 태우는 해독 한약(비움탕)을 처방하고, 복부 압력을 낮추는 추나 요법으로 허리 통증까지 함께 관리했습니다.',
            result: '복부 둘레가 4인치 감소하고 바지 사이즈가 줄었습니다. 뱃살이 빠지니 허리 통증도 자연스럽게 사라졌습니다.'
        },
        'ba_diet_back_fat.png': {
            tag: '부분 비만',
            title: '숨은 등살 & 브라 라인',
            profile: '30대 여성 / 주부',
            desc: '앞모습은 날씬한데 뒷모습, 특히 브래지어 끈 위아래로 튀어나오는 등살이 고민이셨습니다. \n\n등 근육의 긴장을 푸는 침 치료와 함께, 지방 분해 약침을 등 라인에 따라 시술하여 울퉁불퉁한 라인을 매끄럽게 다듬었습니다.',
            result: '매끈한 등 라인을 되찾아 타이트한 니트도 자신 있게 입으십니다. 구부정하던 자세도 펴졌습니다.'
        },
        'ba_diet_side_flank.png': {
            tag: '체형 교정',
            title: '러브핸들 & 뱃살 삭제',
            profile: '30대 여성 / 직장인',
            desc: '유독 옆구리 살(러브핸들)이 빠지지 않아 바지를 입으면 살이 튀어나오는 것이 스트레스였습니다. \n\n옆구리 근막을 이완시키는 도침 치료와 지방 분해 약침을 결합하여, 잘 빠지지 않는 셀룰라이트형 지방을 집중 공략했습니다.',
            result: '잘록한 허리 라인이 살아나 S라인 몸매가 되었습니다. 크롭티도 자신 있게 입으십니다.'
        }
    };

    if (storyModal && storyImage) {
        // 4. Click Sparkle (Firecracker) with Element Pool
        const sparklePool = [];
        const MAX_SPARKLES = 100;
        let activeSparkles = 0;

        function getSparkleFromPool() {
            if (sparklePool.length > 0) {
                return sparklePool.pop();
            }
            const particle = document.createElement('div');
            particle.classList.add('click-sparkle');
            return particle;
        }

        function returnSparkleToPool(particle) {
            activeSparkles--;
            if (sparklePool.length < MAX_SPARKLES) {
                particle.style.opacity = '0';
                sparklePool.push(particle);
            } else {
                particle.remove();
            }
        }

        document.addEventListener('click', (e) => {
            // Skip if page is hidden or too many sparkles
            if (!isPageVisible || activeSparkles >= MAX_SPARKLES) return;

            const color = ['#FFD700', '#E63946', '#FFFFFF', '#FFA500']; // Gold, Red, White, Orange
            const particleCount = Math.min(12, MAX_SPARKLES - activeSparkles);

            for (let i = 0; i < particleCount; i++) {
                const particle = getSparkleFromPool();

                // Random color
                particle.style.backgroundColor = color[Math.floor(Math.random() * color.length)];
                particle.style.opacity = '1';

                // Initial position (Mouse coordinates)
                particle.style.left = e.clientX + 'px';
                particle.style.top = e.clientY + 'px';

                // Random direction for explosion
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 50 + 30; // 30-80px distance
                const tx = Math.cos(angle) * velocity + 'px';
                const ty = Math.sin(angle) * velocity + 'px';

                particle.style.setProperty('--tx', tx);
                particle.style.setProperty('--ty', ty);

                if (!particle.parentElement) {
                    document.body.appendChild(particle);
                }
                activeSparkles++;

                // Return to pool
                setTimeout(() => {
                    returnSparkleToPool(particle);
                }, 800);
            }
        });

        // Cleanup sparkle pool on unload
        registerCleanup(() => {
            sparklePool.forEach(p => p.remove());
            sparklePool.length = 0;
        });

        // --- Spotlight Effect Logic for ba-cards ---
        const baCards = document.querySelectorAll('.ba-card');
        baCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        });

        // Set cursor pointer for all target images
        document.querySelectorAll('.event-item img, .ba-card img').forEach(img => {
            img.style.cursor = 'pointer';
        });

        // Modal open/close functions with history management
        let modalHistoryPushed = false;
        let savedScrollY = 0;

        function openStoryModal() {
            // Save scroll position before opening modal
            savedScrollY = window.scrollY;

            storyModal.style.display = 'flex';
            storyModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scroll

            // Add history state for mobile back button
            if (!modalHistoryPushed) {
                history.pushState({ modal: 'story', scrollY: savedScrollY }, '');
                modalHistoryPushed = true;
            }
        }

        function closeStoryModal(fromPopstate = false) {
            storyModal.classList.remove('show');
            storyModal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scroll

            // Clear image to free memory (important for mobile)
            if (storyImage) storyImage.src = '';

            // Restore scroll position
            window.scrollTo(0, savedScrollY);

            // Only manipulate history if not called from popstate
            if (modalHistoryPushed && !fromPopstate) {
                modalHistoryPushed = false;
                // Use replaceState instead of back() to preserve scroll position
                history.replaceState(null, '');
            } else {
                modalHistoryPushed = false;
            }
        }

        // Handle browser back button/gesture
        window.addEventListener('popstate', (e) => {
            if (storyModal.classList.contains('show')) {
                // Get saved scroll position from state if available
                if (e.state && e.state.scrollY !== undefined) {
                    savedScrollY = e.state.scrollY;
                }
                closeStoryModal(true); // Pass true to prevent history manipulation
            }
        });

        // EVENT DELEGATION: Handle all image clicks at document level
        document.addEventListener('click', (e) => {
            const img = e.target.closest('.event-item img, .ba-card img');
            if (!img) return;

            // Prevent if modal is already open
            if (storyModal.classList.contains('show')) return;

            const src = img.getAttribute('src');
            if (!src) return;

            const filename = decodeURIComponent(src.split('/').pop().split('?')[0]);

            // Populate Modal
            storyImage.src = src;

            const data = storyData[filename];
            if (data) {
                document.getElementById('storyTag').innerText = data.tag;
                document.getElementById('storyTitle').innerText = data.title;
                document.getElementById('storyProfile').innerText = data.profile;
                document.getElementById('storyDesc').innerText = data.desc;
                document.getElementById('storyResult').innerText = data.result;
            } else {
                document.getElementById('storyTag').innerText = "이벤트";
                document.getElementById('storyTitle').innerText = "진행 중인 이벤트";
                document.getElementById('storyProfile').innerText = "규림한의원 청주점";
                document.getElementById('storyDesc').innerText = "지금 바로 상담 신청하고 혜택을 받아보세요!";
                document.getElementById('storyResult').innerText = "선착순 마감될 수 있습니다.";
            }

            openStoryModal();

            // Reset scroll position
            const storyContent = document.querySelector('.story-content');
            if (storyContent) storyContent.scrollTop = 0;
            const storyTextWrapper = document.querySelector('.story-text-wrapper');
            if (storyTextWrapper) storyTextWrapper.scrollTop = 0;
        });

        // Close button click
        if (storyClose) {
            storyClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeStoryModal();
            });
        }

        // Background click to close
        storyModal.addEventListener('click', (e) => {
            if (e.target === storyModal) {
                closeStoryModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && storyModal.classList.contains('show')) {
                closeStoryModal();
            }
        });
    }

    // 5. Spring Event Countdown Logic
    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
        const targetDate = new Date('April 30, 2026 23:59:59').getTime(); // End of Spring Event

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownContainer.innerHTML = "<h3>따뜻한 봄날 되세요!</h3>";
                if (countdownIntervalId) {
                    clearInterval(countdownIntervalId);
                    countdownIntervalId = null;
                }
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
        }

        let countdownIntervalId = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call

        // Register cleanup
        registerCleanup(() => {
            if (countdownIntervalId) {
                clearInterval(countdownIntervalId);
                countdownIntervalId = null;
            }
        });
    }




    // 7. Inject Review Content (Populate Missing Reviews)
    const reviewDataMap = {
        'diet': [
            { id: 1, text: "3개월 만에 10kg 감량 성공! 입던 옷이 다 커져서 행복해요.", author: "김OO님 (30대/직장인)", rating: "⭐⭐⭐⭐⭐" },
            { id: 2, text: "굶지 않고 건강하게 빼니까 요요가 없네요. 인생 다이어트입니다.", author: "이OO님 (20대/학생)", rating: "⭐⭐⭐⭐⭐" },
            { id: 3, text: "붓기가 빠지니 라인이 살아나요. 원장님이 정말 꼼꼼하십니다.", author: "박OO님 (40대/주부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 4, text: "다이어트 약 부작용 때문에 걱정했는데, 한약은 속이 편해요.", author: "최OO님 (30대/프리랜서)", rating: "⭐⭐⭐⭐⭐" }
        ],
        'skin': [
            { id: 1, text: "여드름 흉터 때문에 스트레스였는데, 새살침 덕분에 피부가 매끈해졌어요!", author: "정OO님 (20대/대학생)", rating: "⭐⭐⭐⭐⭐" },
            { id: 2, text: "화장으로도 안 가려지던 홍조가 사라졌습니다. 자신감 회복!", author: "강OO님 (30대/직장인)", rating: "⭐⭐⭐⭐⭐" },
            { id: 3, text: "피부과 다 다녀봐도 안 됐는데, 속부터 치료하니 다르네요.", author: "조OO님 (40대/자영업)", rating: "⭐⭐⭐⭐⭐" },
            { id: 4, text: "결혼 앞두고 관리받았는데, 화장이 너무 잘 먹어서 놀랐어요.", author: "윤OO님 (30대/예비신부)", rating: "⭐⭐⭐⭐⭐" }
        ],
        'pain': [
            { id: 1, text: "목이랑 어깨가 너무 아파서 잠도 못 잤는데, 약침 맞고 푹 잡니다.", author: "장OO님 (40대/사무직)", rating: "⭐⭐⭐⭐⭐" },
            { id: 2, text: "허리 디스크 수술 권유받았는데, 비수술로 통증이 잡혔어요. 감사합니다.", author: "임OO님 (50대/주부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 3, text: "교통사고 후유증으로 고생했는데, 입원 치료 덕분에 빨리 회복했어요.", author: "한OO님 (30대/운전직)", rating: "⭐⭐⭐⭐⭐" },
            { id: 4, text: "테니스 엘보로 고생했는데, 봉침 효과가 진짜 좋네요.", author: "오OO님 (40대/운동강사)", rating: "⭐⭐⭐⭐⭐" }
        ],
        'body': [
            { id: 1, text: "안면비대칭 때문에 사진 찍기 싫었는데, 이제 자신 있게 찍어요!", author: "서OO님 (20대/승무원 준비)", rating: "⭐⭐⭐⭐⭐" },
            { id: 2, text: "골반이 틀어져서 치마가 돌아갔는데, 교정 후에는 딱 맞아요.", author: "김OO님 (30대/직장인)", rating: "⭐⭐⭐⭐⭐" },
            { id: 3, text: "거북목 교정받고 키가 2cm는 커진 것 같아요. 자세가 중요하네요.", author: "이OO님 (10대/학생)", rating: "⭐⭐⭐⭐⭐" },
            { id: 4, text: "출산 후 터진 골반, 추나요법으로 시원하게 맞췄습니다.", author: "박OO님 (30대/주부)", rating: "⭐⭐⭐⭐⭐" }
        ],
        'wedding': [
            { id: 1, text: "D-30 웨딩 다이어트로 5kg 감량! 드레스 피팅 때 실장님이 깜짝 놀랐어요.", author: "김OO님 (30대/예비신부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 2, text: "팔뚝살 때문에 민소매 드레스 포기하려 했는데, 팔라인이 완전 달라졌어요!", author: "이OO님 (20대/예비신부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 3, text: "뱃살이 쏙 빠지니 머메이드 드레스도 자신 있게 입어요. 감사합니다!", author: "박OO님 (30대/예비신부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 4, text: "웨딩 리프팅 받고 턱선이 살아났어요. 웨딩 사진 결과가 너무 만족스럽습니다.", author: "최OO님 (30대/예비신부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 5, text: "결혼식 당일 아침 붓기 케어 받았는데, 하루 종일 얼굴이 작았어요!", author: "정OO님 (20대/예비신부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 6, text: "안면비대칭 교정 후 사진 좌우가 대칭이 됐어요. 셀프웨딩 촬영 대성공!", author: "강OO님 (30대/예비신부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 7, text: "등살+브라라인 정리하니 오프숄더 드레스가 완벽하게 맞아요.", author: "윤OO님 (20대/예비신부)", rating: "⭐⭐⭐⭐⭐" },
            { id: 8, text: "신랑이랑 커플로 관리받았는데, 둘 다 인생샷 건졌습니다!", author: "서OO님 (30대/예비신부)", rating: "⭐⭐⭐⭐⭐" }
        ],
        'general': [
            { id: 1, text: "친절하고 꼼꼼한 진료 감사합니다. 믿고 다니는 한의원!", author: "김OO님", rating: "⭐⭐⭐⭐⭐" },
            { id: 2, text: "시설도 깨끗하고 원장님 실력이 정말 좋으세요.", author: "이OO님", rating: "⭐⭐⭐⭐⭐" }
        ]
    };

    const carousel = document.querySelector('.review-carousel');
    if (carousel) {
        // Determine Page Type
        const pType = document.body.getAttribute('data-page-type') || 'general';
        const reviews = reviewDataMap[pType] || reviewDataMap['general'];

        // Double the data for infinite scroll illusion if needed
        const displayReviews = [...reviews, ...reviews, ...reviews]; // 3x for smooth scrolling

        displayReviews.forEach((review, index) => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="review-card-top">
                    <div class="review-stars">${review.rating}</div>
                </div>
                <div class="review-card-body">
                    <p class="review-body">"${review.text}"</p>
                </div>
                <div class="review-card-footer">
                    <span class="review-author">${review.author}</span>
                    <span class="review-verified"><i class="fa-solid fa-circle-check"></i> 인증</span>
                </div>
            `;
            carousel.appendChild(card);
        });
    }
    const reviewContainer = document.querySelector('.review-carousel-container');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Auto-scroll for all environments (JS-based, replaces CSS animation)
    if (reviewContainer && !prefersReducedMotion) {
        let scrollSpeed = window.innerWidth <= 768 ? 0.8 : 0.5;
        let isPaused = false;
        let currentScroll = 0;

        function autoScroll() {
            if (!isPaused && isPageVisible) {
                currentScroll += scrollSpeed;
                if (currentScroll >= reviewContainer.scrollWidth / 2) {
                    currentScroll = 0;
                    reviewContainer.scrollLeft = 0;
                } else {
                    reviewContainer.scrollLeft = currentScroll;
                }
            }
            requestAnimationFrame(autoScroll);
        }

        // Pause on interaction
        reviewContainer.addEventListener('touchstart', () => { isPaused = true; });
        reviewContainer.addEventListener('touchend', () => { setTimeout(() => { isPaused = false; }, 3000); });
        reviewContainer.addEventListener('mouseenter', () => { isPaused = true; });
        reviewContainer.addEventListener('mouseleave', () => { isPaused = false; });
        autoScroll();
    }

    // Mouse drag scroll for all environments
    if (reviewContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        reviewContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - reviewContainer.offsetLeft;
            scrollLeft = reviewContainer.scrollLeft;
        });
        reviewContainer.addEventListener('mouseleave', () => { isDown = false; });
        reviewContainer.addEventListener('mouseup', () => { isDown = false; });
        reviewContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewContainer.offsetLeft;
            reviewContainer.scrollLeft = scrollLeft - (x - startX);
        });
    }

    // 8. Real-time Reservation Notification (Social Proof)
    const notificationPageType = document.body.getAttribute('data-page-type') || 'general';
    const names = ['김OO', '이OO', '박OO', '최OO', '정OO', '강OO', '조OO', '윤OO', '장OO', '임OO'];
    const actions = {
        'diet': '다이어트 상담을 신청했습니다.',
        'skin': '피부 상담을 신청했습니다.',
        'pain': '통증 치료 상담을 신청했습니다.',
        'body': '비대칭 상담을 신청했습니다.',
        'asymmetry': '비대칭 상담을 신청했습니다.',
        'general': '진료 예약을 신청했습니다.'
    };

    // Toast management with limits
    const MAX_TOASTS = 3;
    const activeToasts = [];
    let toastTimeoutId = null;

    function showToast() {
        // Skip if page is hidden or any modal is open
        if (!isPageVisible) return;
        if (document.querySelector('.modal.show, .talisman-modal.show, .story-modal.show')) return;

        // Remove oldest toast if at limit
        while (activeToasts.length >= MAX_TOASTS) {
            const oldToast = activeToasts.shift();
            if (oldToast && oldToast.parentElement) {
                oldToast.classList.remove('show');
                setTimeout(() => oldToast.remove(), 500);
            }
        }

        const toast = document.createElement('div');
        toast.className = 'reservation-toast';

        const name = names[Math.floor(Math.random() * names.length)];
        const action = actions[notificationPageType] || actions['general'];
        const time = Math.floor(Math.random() * 5) + 1; // 1-5 mins ago

        toast.innerHTML = `
            <i class="fa-solid fa-bell"></i>
            <span class="toast-text"><b>${name}</b>님 ${action}</span>
            <span class="toast-time">${time}분 전</span>
        `;

        document.body.appendChild(toast);
        activeToasts.push(toast);

        // Animate In
        setTimeout(() => toast.classList.add('show'), 100);

        // Animate Out
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                const idx = activeToasts.indexOf(toast);
                if (idx > -1) activeToasts.splice(idx, 1);
                toast.remove();
            }, 500);
        }, 4000); // Stay for 4 seconds
    }

    // Non-recursive toast scheduling (prevents memory leak)
    function scheduleNextToast() {
        if (toastTimeoutId) clearTimeout(toastTimeoutId);

        // Random interval between 40s and 80s
        const nextInterval = Math.floor(Math.random() * 40000) + 40000;

        toastTimeoutId = setTimeout(() => {
            if (isPageVisible) {
                showToast();
            }
            scheduleNextToast();
        }, nextInterval);
    }

    // Initial Trigger
    setTimeout(() => {
        showToast(); // Show first one after a short delay
        scheduleNextToast(); // Start the loop
    }, 5000); // Start after 5 seconds

    // Cleanup toast timers on unload
    registerCleanup(() => {
        if (toastTimeoutId) clearTimeout(toastTimeoutId);
        activeToasts.forEach(t => t.remove());
        activeToasts.length = 0;
    });

});

// Global Talisman Function (Outside DOMContentLoaded)
window.openTalismanModal = function () {
    const modal = document.getElementById('talisman-modal');
    if (modal) {
        modal.style.display = 'block';
        modal.style.zIndex = '20000';
    } else {
        alert('팝업을 불러올 수 없습니다. 페이지를 새로고침 해주세요.');
    }
}

// --- New Year Special Features JS ---



// 3. Fortune Cookie Logic
const fortuneWidget = document.getElementById('fortune-cookie-widget');
const fortuneMessage = document.getElementById('fortune-message');
const fortuneText = document.getElementById('fortune-text');
const fortuneIcon = document.getElementById('fortune-icon');
const fortuneClose = document.getElementById('fortune-close');

if (fortuneWidget && fortuneMessage && fortuneText && fortuneIcon) {
    const fortunes = [
        "2026년, 당신의 모든 꿈이 이루어질 것입니다.",
        "생각지도 못한 행운이 찾아올 예정입니다!",
        "건강과 재물, 두 마리 토끼를 잡는 한 해가 됩니다.",
        "오랫동안 바라던 소식이 곧 들려옵니다.",
        "주변 사람들에게 사랑받는 행복한 한 해가 될 거예요.",
        "조금만 더 노력하면 큰 결실을 맺습니다.",
        "귀인을 만나 새로운 기회가 열립니다.",
        "걱정하지 마세요, 모든 것이 잘 풀릴 것입니다.",
        "올해는 당신이 주인공입니다. 자신감을 가지세요!",
        "작은 기쁨들이 모여 큰 행복을 만드는 해입니다."
    ];

    let isCracked = false;

    // Close Button Handling
    if (fortuneClose) {
        fortuneClose.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent widget click
            fortuneMessage.classList.remove('show');

            // Reset to closed cookie state
            setTimeout(() => {
                fortuneIcon.innerText = "🥠";
                isCracked = false;
            }, 300); // Wait for bubble transition
        });
    }

    fortuneWidget.addEventListener('click', () => {
        // If message is pending close or already shown, restart

        if (isCracked) {
            // New fortune
            fortuneMessage.classList.remove('show');
            setTimeout(() => {
                const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
                fortuneText.innerText = randomFortune; // Update text span only
                fortuneMessage.classList.add('show');
            }, 200);
            return;
        }

        // Crack Effect
        fortuneIcon.style.transform = "scale(1.2) rotate(10deg)";
        setTimeout(() => {
            fortuneIcon.innerText = "🍪"; // Change to open cookie
            fortuneIcon.style.transform = "scale(1) rotate(0deg)";

            // Show Message
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            fortuneText.innerText = randomFortune; // Update text span only
            fortuneMessage.classList.add('show');

            isCracked = true;
        }, 100);
    });
}


// 6. Director's Letter Logic (with duplicate prevention)
let isLetterModalOpen = false;

document.addEventListener('click', (e) => {
    // Check if clicked trigger or its children
    const trigger = e.target.closest('.letter-trigger-card');
    if (trigger) {
        // Prevent duplicate modals
        if (isLetterModalOpen) return;
        isLetterModalOpen = true;

        // Define letters by type
        const letters = {
            'diet': {
                title: "살 때문에 자꾸 움츠러드시나요?",
                body: "거울을 볼 때마다 한숨부터 나오신다면, 그건 의지가 약해서가 아닙니다. <br><br>단지, '내 몸에 맞는 방법'을 아직 못 만났을 뿐이에요.<br><br>굶는 고통 없이, 당신이 다시 활짝 웃을 수 있도록 규림이 끝까지 함께하겠습니다."
            },
            'skin': {
                title: "피부 때문에 약속을 피하시나요?",
                body: "두꺼운 화장으로 가리는 것도 이제 지치셨죠. 깨끗한 피부는 단순한 미용이 아닌 '자신감'입니다.<br><br>피부 깊은 곳의 원인부터 치료해서, 민낯으로도 당당하게 웃는 날을 선물해드리겠습니다."
            },
            'pain': {
                title: "지긋지긋한 통증, 참지 마세요.",
                body: "‘시간 지나면 낫겠지’ 하며 파스만 붙이고 계신가요?<br><br>몸이 보내는 구조 신호를 무시하면 마음까지 병이 듭니다.<br><br>아픈 곳 없는 편안한 아침을 맞이하실 수 있도록, 정성을 다해 치료하겠습니다."
            },
            'body': {
                title: "틀어진 몸, 숨은 라인을 찾으세요.",
                body: "사진 찍을 때마다 비뚤어진 어깨가 신경 쓰이시나요?<br><br>균형이 잡혀야 건강도, 아름다움도 따라옵니다.<br><br>당신의 몸이 가진 본연의 우아한 라인을 되찾아드리겠습니다."
            },
            'general': {
                title: "건강한 아름다움을 약속합니다.",
                body: "병원은 두려운 곳이 아니라, 내 몸을 위한 힐링 공간이어야 합니다.<br><br>따뜻한 진료와 정직한 처방으로, 당신의 고민을 함께 나누는 든든한 주치의가 되겠습니다."
            }
        };

        const pageType = document.body.getAttribute('data-page-type') || 'general';
        const content = letters[pageType] || letters['general'];

        // Create Modal HTML
        const modal = document.createElement('div');
        modal.className = 'letter-modal';
        modal.style.display = 'flex'; // Immediately flex to calculate
        modal.innerHTML = `
            <div class="letter-paper">
                <span class="close-letter">&times;</span>
                <div class="letter-content">
                    <h3>${content.title}</h3>
                    <p>${content.body}</p>
                    <div class="letter-stamp">
                        대표원장 한정우 드림 🖋️
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Animate In
        requestAnimationFrame(() => modal.classList.add('show'));

        // Close Handlers
        const close = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                isLetterModalOpen = false;
            }, 300);
        };
        modal.querySelector('.close-letter').addEventListener('click', close);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });
        // ESC key close
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }
});

// Fireworks with duplicate prevention
let fireworksActive = false;
let fireworksIntervalId = null;

function triggerBigFireworks() {
    // Prevent duplicate fireworks
    if (fireworksActive) return;
    fireworksActive = true;

    // Intense burst
    fireworksIntervalId = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.8); // Top 80%
        createSparkle(x, y, ['#FFD700', '#E63946', '#FFFFFF', '#00FF00', '#FFA500'], 2.0); // Bigger scale
    }, 50); // Faster interval (50ms)

    setTimeout(() => {
        if (fireworksIntervalId) {
            clearInterval(fireworksIntervalId);
            fireworksIntervalId = null;
        }
        fireworksActive = false;
    }, 4000); // 4 seconds duration
}

// 7. Norigae Scroll Physics (Throttled)
const norigaeTassel = document.querySelector('.norigae-tassel');
let lastScrollY_Norigae = window.scrollY;
let norigaeTimeout;
let norigaeTicking = false;

window.addEventListener('scroll', () => {
    if (!norigaeTassel || norigaeTicking) return;

    norigaeTicking = true;
    requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY_Norigae;
        lastScrollY_Norigae = currentScrollY;

        // Swing based on scroll direction/speed
        // Cap at 45 degrees
        let angle = -diff * 1.5;
        if (angle > 45) angle = 45;
        if (angle < -45) angle = -45;

        norigaeTassel.style.transform = `rotate(${angle}deg)`;

        // Reset when stopped
        clearTimeout(norigaeTimeout);
        norigaeTimeout = setTimeout(() => {
            norigaeTassel.style.transform = 'rotate(0deg)';
        }, 150);

        norigaeTicking = false;
    });
}, { passive: true });

// --- AI Rolling Ticker Logic (Multi-Instance) ---
document.addEventListener('DOMContentLoaded', () => {
    const tickerContainers = document.querySelectorAll('.ai-ticker-content, .ai-ticker-sticky-rolling .ticker-content');
    const tickerIntervalIds = [];

    tickerContainers.forEach(container => {
        const items = container.querySelectorAll('.ticker-item');
        if (items.length <= 1) return;

        let currentIndex = 0;

        const rotate = () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        };

        const delay = 3000 + Math.random() * 1000;
        tickerIntervalIds.push(setInterval(rotate, delay));
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        tickerIntervalIds.forEach(id => clearInterval(id));
    }, { once: true });
});

// ============================================
// Form Validation & Submission Handler
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[name="submit-to-google-sheet"]');

    // Google Apps Script URL (기존 연동된 URL)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqi91kECbIuw8PTK0LygMYsy2D4uyQi272PEDIhgepeN3RHCwjbrqfYfeebAdhGoD_/exec';

    // 전화번호 유효성 검사 패턴 (휴대폰 + 유선 모두 지원)
    // 010-1234-5678, 02-123-4567, 043-224-1075 등
    const phonePattern = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

    forms.forEach(form => {
        const phoneInput = form.querySelector('input[name="연락처"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

        // 실시간 전화번호 포맷팅
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^0-9]/g, '');

                // 자동 하이픈 추가
                if (value.length > 3 && value.length <= 7) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else if (value.length > 7) {
                    value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
                }

                e.target.value = value;
            });

            // 유효성 검사 피드백
            phoneInput.addEventListener('blur', (e) => {
                const value = e.target.value.replace(/-/g, '');
                if (value && !phonePattern.test(e.target.value)) {
                    phoneInput.style.borderColor = '#E63946';
                    phoneInput.style.boxShadow = '0 0 0 3px rgba(230, 57, 70, 0.1)';
                } else if (value) {
                    phoneInput.style.borderColor = '#03C75A';
                    phoneInput.style.boxShadow = '0 0 0 3px rgba(3, 199, 90, 0.1)';
                }
            });

            phoneInput.addEventListener('focus', (e) => {
                phoneInput.style.borderColor = '';
                phoneInput.style.boxShadow = '';
            });
        }

        // 폼 제출 핸들러 (중복 제출 방지)
        let isSubmitting = false;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 중복 제출 방지
            if (isSubmitting) return;

            // 전화번호 유효성 최종 검사
            if (phoneInput && !phonePattern.test(phoneInput.value)) {
                phoneInput.focus();
                phoneInput.style.borderColor = '#E63946';
                // Show inline error instead of alert
                const parentEl = phoneInput.parentElement;
                if (parentEl) {
                    let errMsg = parentEl.querySelector('.phone-error');
                    if (!errMsg) {
                        errMsg = document.createElement('span');
                        errMsg.className = 'phone-error';
                        errMsg.style.cssText = 'color:#E63946;font-size:0.8rem;display:block;margin-top:4px;';
                        parentEl.appendChild(errMsg);
                    }
                    errMsg.textContent = '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)';
                }
                return;
            }
            // Clear any previous phone error
            const prevErr = phoneInput?.parentElement?.querySelector('.phone-error');
            if (prevErr) prevErr.textContent = '';

            isSubmitting = true;

            // 로딩 상태 표시
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 전송 중...';
            }

            try {
                const formData = new FormData(form);
                formData.append('제출시간', new Date().toLocaleString('ko-KR'));

                // Timeout을 위한 AbortController
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: formData,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (response.ok) {
                    // 성공 시
                    if (submitBtn) {
                        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> 신청 완료!';
                        submitBtn.style.background = '#03C75A';
                    }

                    // 인라인 성공 메시지 (alert 대신)
                    let successMsg = form.querySelector('.form-success-msg');
                    if (!successMsg) {
                        successMsg = document.createElement('div');
                        successMsg.className = 'form-success-msg';
                        successMsg.style.cssText = 'background:#f0fbf4;color:#03C75A;padding:12px 16px;border-radius:8px;text-align:center;font-weight:600;margin-top:12px;';
                        form.appendChild(successMsg);
                    }
                    successMsg.textContent = '상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.';

                    // 폼 초기화
                    form.reset();

                    // 3초 후 버튼 원복, 5초 후 성공 메시지 제거
                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.innerHTML = originalBtnHTML;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }
                        isSubmitting = false;
                    }, 3000);
                    setTimeout(() => {
                        if (successMsg) successMsg.remove();
                    }, 5000);
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                // 에러 처리
                console.warn('Form submission error:', error);

                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> 재시도';
                    submitBtn.style.background = '#E63946';
                }

                // 네트워크 에러 vs 타임아웃 구분
                if (error.name === 'AbortError') {
                    alert('네트워크 연결이 느립니다.\n잠시 후 다시 시도해주세요.');
                } else {
                    alert('일시적인 오류가 발생했습니다.\n전화(043-224-1075)로 문의해주세요.');
                }

                // 2초 후 버튼 원복 (재시도 가능)
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.innerHTML = originalBtnHTML;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }
                    isSubmitting = false;
                }, 2000);
            }
        });
    });
});

// ============================================
// Modal Focus Management (Accessibility)
// ============================================
(function() {
    const FOCUSABLE_SELECTORS = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let previousActiveElement = null;

    // Focus trap for modals
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(FOCUSABLE_SELECTORS);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement) return;

        const handleKeydown = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        modal.addEventListener('keydown', handleKeydown);
        return () => modal.removeEventListener('keydown', handleKeydown);
    }

    // Open modal with focus management
    window.openModalWithFocus = function(modal) {
        if (!modal) return;

        previousActiveElement = document.activeElement;
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');

        // Focus first focusable element or modal itself
        const firstFocusable = modal.querySelector(FOCUSABLE_SELECTORS);
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 50);
        } else {
            modal.setAttribute('tabindex', '-1');
            modal.focus();
        }

        // Set up focus trap
        const cleanup = trapFocus(modal);

        // Close on Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModalWithFocus(modal);
                document.removeEventListener('keydown', handleEscape);
                if (cleanup) cleanup();
            }
        };
        document.addEventListener('keydown', handleEscape);
    };

    // Close modal and restore focus
    window.closeModalWithFocus = function(modal) {
        if (!modal) return;

        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');

        // Restore focus to previously focused element
        if (previousActiveElement && previousActiveElement.focus) {
            previousActiveElement.focus();
        }
        previousActiveElement = null;
    };

    // Auto-enhance existing modals
    document.addEventListener('DOMContentLoaded', () => {
        // Story Modal close button
        const storyModal = document.getElementById('storyModal');
        const storyClose = storyModal ? storyModal.querySelector('.story-close') : null;
        if (storyClose) {
            storyClose.addEventListener('click', () => closeModalWithFocus(storyModal));
        }

        // Talisman Modal close button
        const talismanModal = document.getElementById('talisman-modal');
        const talismanClose = talismanModal ? talismanModal.querySelector('.close-btn, .modal-close') : null;
        if (talismanClose) {
            talismanClose.addEventListener('click', () => closeModalWithFocus(talismanModal));
        }

        // Click outside to close
        [storyModal, talismanModal].forEach(modal => {
            if (!modal) return;
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModalWithFocus(modal);
                }
            });
        });
    });
})();

// ============================================
// Parallax Effect System
// ============================================
(function() {
    // Skip on mobile or reduced motion preference
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) return;

    let ticking = false;

    // Parallax elements configuration
    const parallaxElements = [];

    // Initialize parallax on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Auto-detect elements with data-parallax attribute
        document.querySelectorAll('[data-parallax]').forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            parallaxElements.push({ element: el, speed });
        });

        // Add parallax to hero section if exists
        const hero = document.querySelector('.hero');
        if (hero && !hero.dataset.parallax) {
            parallaxElements.push({ element: hero, speed: 0.3, type: 'background' });
        }

        // Add parallax to interior images
        document.querySelectorAll('.interior-item img').forEach(img => {
            parallaxElements.push({ element: img, speed: 0.1, type: 'transform' });
        });
    });

    // Optimized scroll handler with RAF
    function updateParallax() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        parallaxElements.forEach(({ element, speed, type }) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;

            // Only animate if element is in viewport
            if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
                const offset = (scrollY - elementTop) * speed;

                if (type === 'background') {
                    element.style.backgroundPositionY = `${offset}px`;
                } else {
                    element.style.transform = `translateY(${offset}px)`;
                }
            }
        });

        ticking = false;
    }

    // Throttled scroll listener
    window.addEventListener('scroll', () => {
        if (!ticking && parallaxElements.length > 0) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
})();

// ============================================
// #2. Image Blur-up Loading (Progressive)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Find all images that should have blur-up effect
    const blurContainers = document.querySelectorAll('.blur-load');

    blurContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;

        // If already loaded
        if (img.complete) {
            container.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                container.classList.add('loaded');
            });
        }
    });

    // Auto-apply to lazy-loaded images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        if (img.closest('.blur-load')) return; // Skip if already wrapped

        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });

        // Set initial opacity
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease';
        }
    });
});

// ============================================
// #5. Button Ripple Effect
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn, .sticky-btn, .quick-btn, button[type="submit"]');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove existing ripples
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Calculate size (use larger dimension)
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';

            // Position ripple at click location
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            // Remove ripple after animation
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
});

// ============================================
// #12. Navbar Shrink on Scroll
// ============================================
(function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
})();

// ============================================
// #13. Active Section Highlight (Navigation)
// ============================================
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        observer.disconnect();
    }, { once: true });
})();

// ============================================
// #14. Card 3D Tilt Effect (Throttled with RAF)
// ============================================
(function() {
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) return;

    const tiltCards = document.querySelectorAll('.tilt-card, .ba-card, .benefit-item, .service-card');

    tiltCards.forEach(card => {
        let tiltTicking = false;
        let lastX = 0;
        let lastY = 0;

        card.addEventListener('mousemove', (e) => {
            lastX = e.clientX;
            lastY = e.clientY;

            if (!tiltTicking) {
                tiltTicking = true;
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = lastX - rect.left;
                    const y = lastY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;

                    card.style.setProperty('--tilt-x', rotateX + 'deg');
                    card.style.setProperty('--tilt-y', rotateY + 'deg');

                    tiltTicking = false;
                });
            }
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
        }, { passive: true });
    });
})();

// ============================================
// #17. Pull-to-Refresh Effect (Mobile Only)
// ============================================
(function() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Create pull-to-refresh element
    const pullToRefresh = document.createElement('div');
    pullToRefresh.className = 'pull-to-refresh';
    pullToRefresh.innerHTML = `
        <div class="pull-spinner"></div>
        <span class="pull-text">당겨서 새로고침</span>
    `;
    document.body.prepend(pullToRefresh);

    let startY = 0;
    let isPulling = false;
    const threshold = 80;

    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isPulling || window.scrollY > 0) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 0 && diff < threshold * 2) {
            pullToRefresh.classList.add('visible');
            const progress = Math.min(diff / threshold, 1);
            pullToRefresh.style.transform = `translateY(${progress * 60 - 60}px)`;

            if (diff >= threshold) {
                pullToRefresh.querySelector('.pull-text').textContent = '놓아서 새로고침';
            } else {
                pullToRefresh.querySelector('.pull-text').textContent = '당겨서 새로고침';
            }
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (!isPulling) return;

        const pullText = pullToRefresh.querySelector('.pull-text');
        if (pullText.textContent === '놓아서 새로고침') {
            pullToRefresh.classList.add('refreshing');
            pullText.textContent = '새로고침 중...';

            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            pullToRefresh.classList.remove('visible');
            pullToRefresh.style.transform = '';
        }

        isPulling = false;
    }, { passive: true });
})();

// ============================================
// A/B Testing Framework
// ============================================
const ABTest = (function() {
    const STORAGE_KEY = 'kyurim_ab_tests';
    const tests = {};

    // Get or assign variant for a test
    function getVariant(testName, variants) {
        const stored = getStoredTests();

        // Return stored variant if exists
        if (stored[testName]) {
            return stored[testName];
        }

        // Assign random variant
        const variant = variants[Math.floor(Math.random() * variants.length)];
        stored[testName] = variant;
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stored)); } catch (e) { /* Private browsing */ }

        // Track assignment
        trackEvent('ab_test_assigned', { test: testName, variant });

        return variant;
    }

    function getStoredTests() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch {
            return {};
        }
    }

    // Track conversion event
    function trackConversion(testName, eventName) {
        const stored = getStoredTests();
        const variant = stored[testName];

        if (variant) {
            trackEvent('ab_test_conversion', {
                test: testName,
                variant,
                event: eventName
            });
        }
    }

    // Generic event tracking (can be connected to analytics)
    function trackEvent(eventType, data) {
        // Send to Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', eventType, data);
        }

        // Send to custom analytics endpoint if needed
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ eventType, data }) });
    }

    // Register a test
    function register(testName, config) {
        tests[testName] = config;
        return getVariant(testName, config.variants);
    }

    // Apply variant to elements
    function apply(testName, selector) {
        const config = tests[testName];
        if (!config) return;

        const variant = getVariant(testName, config.variants);
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            if (config.type === 'text') {
                el.textContent = variant;
            } else if (config.type === 'class') {
                el.classList.add(variant);
            } else if (config.type === 'style') {
                Object.assign(el.style, variant);
            }

            // Add data attribute for tracking
            el.dataset.abTest = testName;
            el.dataset.abVariant = typeof variant === 'object' ? JSON.stringify(variant) : variant;
        });
    }

    return {
        register,
        apply,
        getVariant,
        trackConversion
    };
})();

// Example A/B Tests (activate as needed)
document.addEventListener('DOMContentLoaded', () => {
    // Test 1: CTA Button Text
    // ABTest.register('cta_text', {
    //     variants: ['무료 상담 신청', '지금 상담받기', '1분 상담 신청'],
    //     type: 'text'
    // });
    // ABTest.apply('cta_text', '.btn-primary, button[type="submit"]');

    // Test 2: CTA Button Color
    // ABTest.register('cta_color', {
    //     variants: ['cta-pink', 'cta-coral', 'cta-gold'],
    //     type: 'class'
    // });
    // ABTest.apply('cta_color', '.btn-primary');

    // Track CTA clicks
    document.querySelectorAll('.btn-primary, button[type="submit"]').forEach(btn => {
        btn.addEventListener('click', () => {
            ABTest.trackConversion('cta_text', 'click');
            ABTest.trackConversion('cta_color', 'click');
        });
    });
});

// ============================================
// Text Reveal Animation (Letter by Letter)
// ============================================
(function() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    if (textRevealElements.length === 0) return;

    // Split text into characters
    textRevealElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 0.03}s`;
            el.appendChild(span);
        });
    });

    // Observe for scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    textRevealElements.forEach(el => observer.observe(el));
    window.addEventListener('beforeunload', () => observer.disconnect(), { once: true });
})();

// ============================================
// Word Reveal Animation
// ============================================
(function() {
    const wordRevealElements = document.querySelectorAll('.word-reveal');
    if (wordRevealElements.length === 0) return;

    // Split text into words
    wordRevealElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';

        text.split(' ').forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word;
            span.style.transitionDelay = `${index * 0.1}s`;
            el.appendChild(span);

            // Add space after word
            if (index < text.split(' ').length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
        });
    });

    // Observe for scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    wordRevealElements.forEach(el => observer.observe(el));
    window.addEventListener('beforeunload', () => observer.disconnect(), { once: true });
})();

// ============================================
// Scroll-Triggered Animations (Generic)
// ============================================
(function() {
    const animatedElements = document.querySelectorAll(
        '.image-reveal, .image-reveal-up, .line-draw, .stagger-fade, .scale-reveal, .rotate-reveal'
    );

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
    window.addEventListener('beforeunload', () => observer.disconnect(), { once: true });
})();

// ============================================
// Count Up Animation
// ============================================
(function() {
    const countUpElements = document.querySelectorAll('[data-count-up]');
    if (countUpElements.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const animateCount = (el) => {
        const target = parseInt(el.dataset.countUp, 10);
        const duration = parseInt(el.dataset.countDuration, 10) || 2000;
        const suffix = el.dataset.countSuffix || '';
        const prefix = el.dataset.countPrefix || '';

        let startTime = null;
        const startValue = 0;

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

            el.textContent = prefix + currentValue.toLocaleString() + suffix;
            el.classList.add('animating');

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = prefix + target.toLocaleString() + suffix;
                el.classList.remove('animating');
            }
        };

        requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    countUpElements.forEach(el => observer.observe(el));
    window.addEventListener('beforeunload', () => observer.disconnect(), { once: true });
})();

// ============================================
// Horizontal Scroll - Prevent Browser History Navigation
// ============================================
(function() {
    // Target all horizontal scroll containers
    const scrollContainers = document.querySelectorAll(
        '.ba-gallery-grid, .event-scroll-container, .review-carousel-container'
    );

    if (scrollContainers.length === 0) return;

    scrollContainers.forEach(container => {
        container.addEventListener('wheel', (e) => {
            // Only handle horizontal scroll (trackpad gesture)
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

            const { scrollLeft, scrollWidth, clientWidth } = container;
            const maxScroll = scrollWidth - clientWidth;

            // At left boundary, scrolling left (would trigger back)
            if (scrollLeft <= 0 && e.deltaX < 0) {
                e.preventDefault();
                return;
            }

            // At right boundary, scrolling right (would trigger forward)
            if (scrollLeft >= maxScroll - 1 && e.deltaX > 0) {
                e.preventDefault();
                return;
            }
        }, { passive: false });
    });
})();
