document.addEventListener('DOMContentLoaded', () => {
    // --- Snowfall Effect ---
    const snowContainer = document.getElementById('snow-container');
    const isMobile = window.innerWidth <= 768;
    const snowflakeCount = isMobile ? 15 : 25; // Reduce count on mobile

    if (snowContainer) {
        for (let i = 0; i < snowflakeCount; i++) {
            createSnowflake();
        }
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        const sparkles = ['✨', '🎉', '💫', '⭐️'];
        snowflake.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        snowflake.style.left = Math.random() * 100 + 'vw';

        // Adjust duration and size for mobile
        const duration = isMobile ? Math.random() * 3 + 3 : Math.random() * 3 + 2; // Slightly slower on mobile
        snowflake.style.animationDuration = duration + 's';

        snowflake.style.opacity = Math.random();

        const size = isMobile ? Math.random() * 5 + 8 : Math.random() * 10 + 10; // Smaller on mobile (8-13px vs 10-20px)
        snowflake.style.fontSize = size + 'px';

        snowContainer.appendChild(snowflake);

        // Add random delay to start
        snowflake.style.animationDelay = Math.random() * 5 + 's';
    }

    // --- New Year Floating Decor (Likely just 2026) ---
    function createFloatingDecor() {
        const decorContainer = document.getElementById('snow-container'); // Reuse container
        if (!decorContainer) return;

        // User Request: Only 2026, very few
        const items = ['2026'];
        const item = document.createElement('div');
        item.classList.add('floating-item');

        const content = items[Math.floor(Math.random() * items.length)];
        item.innerText = content;

        // Special styling for 2026
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
            talismanModal.style.display = 'block';
        });

        if (closeTalisman) {
            closeTalisman.addEventListener('click', function () {
                talismanModal.style.display = 'none';
            });
        }

        window.addEventListener('click', function (e) {
            if (e.target == talismanModal) {
                talismanModal.style.display = 'none';
            }
        });
    } else {
        console.error("Talisman elements not found", { talismanBtn, talismanModal });
    }




    // Initialize
    window.onload = function () {
        // startCountdown(); // Assuming this function exists elsewhere
        // renderCalendar(); // If calendar exists
        // Initial floating decor is already created above, so no need to call createFloatingDecor() here.
    };

    // --- 2. Gold Dust Mouse Trail ---
    document.addEventListener('mousemove', function (e) {
        if (Math.random() > 0.5) return; // Throttle creation (50% chance)

        const dust = document.createElement('div');
        dust.classList.add('gold-dust');
        dust.style.left = e.clientX + 'px';
        dust.style.top = e.clientY + 'px';

        // Random color variation (Gold to nice yellow)
        const colors = ['#D4AF37', '#F8B229', '#FFD700', '#FFF'];
        dust.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(dust);

        setTimeout(() => {
            dust.remove();
        }, 1000); // Remove after animation
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

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = '#FFFFFF';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.backgroundColor = '#FFFFFF';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }

    // Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
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

    // Top Button Logic
    const topBtn = document.getElementById('topBtn');

    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
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

    // 1. Event Modal Logic
    const modal = document.getElementById('eventModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalX = document.querySelector('.close-modal');
    const dontShowCheckbox = document.getElementById('dontShowToday');

    // Check if modal should be shown
    const dontShowDate = localStorage.getItem('kyurim_event_dont_show');
    const todayStr = new Date().toDateString();

    if (modal && dontShowDate !== todayStr) {
        setTimeout(() => {
            modal.classList.add('show');
        }, 1000); // Show after 1 second
    }

    function closeModal() {
        if (dontShowCheckbox && dontShowCheckbox.checked) {
            localStorage.setItem('kyurim_event_dont_show', todayStr);
        }
        modal.classList.remove('show');
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (closeModalX) closeModalX.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

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
    if (reviewCarousel) {
        let filteredReviews = uniqueReviews;
        const pageType = document.body.getAttribute('data-page-type');

        if (pageType === 'skin') {
            filteredReviews = uniqueReviews.filter(r => r.category === 'skin');
        } else if (pageType === 'diet') {
            filteredReviews = uniqueReviews.filter(r => r.category === 'diet');
        } else if (pageType === 'body' || pageType === 'asymmetry') {
            // User requested: Asymmetry & TMJ Body Correction only
            filteredReviews = uniqueReviews.filter(r => r.category === 'asymmetry');
        } else if (pageType === 'pain') {
            filteredReviews = uniqueReviews.filter(r => r.category === 'pain');
        }

        // Duplicate reviews for infinite scroll effect (x2 for smoother loop)
        const allReviews = [...filteredReviews, ...filteredReviews];


        // Determine base path for assets
        const basePath = window.location.pathname.includes('/events/') ? '../../' : '';
        const logoSrc = basePath + 'assets/logo_icon.png';

        allReviews.forEach(review => {
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
            reviewCarousel.appendChild(card);
        });
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
            faqContainer.appendChild(faqItem);

            // Add click event
            const question = faqItem.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = faqItem.classList.contains('active');

                // Close all others
                document.querySelectorAll('.faq-item').forEach(i => {
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
            profile: '40대 여성 / 전문직',
            desc: '눈 밑이 불룩하게 튀어나오고 눈가에 잔주름이 자글자글해 피곤해 보인다는 말을 자주 들으셨습니다. \n\n눈 주변 혈자리를 자극하여 순환을 돕고, 아이 매선으로 눈가 피부를 탄탄하게 조여주는 시술을 진행했습니다.',
            result: '눈 밑이 평평해지고 눈매가 또렷해졌습니다. "피곤해 보인다"는 말 대신 "얼굴 좋아졌다"는 인사를 받게 되셨습니다.'
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
        }
    };

    if (storyModal && storyImage) {
        // 4. Click Sparkle (Firecracker)
        document.addEventListener('click', (e) => {
            const color = ['#FFD700', '#E63946', '#FFFFFF', '#FFA500']; // Gold, Red, White, Orange
            const particleCount = 12;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('click-sparkle');

                // Random color
                particle.style.backgroundColor = color[Math.floor(Math.random() * color.length)];

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

                document.body.appendChild(particle);

                // Cleanup
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        });

        // Select images from Events and Treatment Cases
        const eventImages = document.querySelectorAll('.event-item img');
        const baImages = document.querySelectorAll('.ba-card img');
        const allTargetImages = [...eventImages, ...baImages];

        allTargetImages.forEach(img => {
            img.style.cursor = 'pointer'; // Indicate clickable
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent bubbling

                // Get filename from src
                const src = img.getAttribute('src');
                // Handle potential query parameters and URL encoding
                const filename = decodeURIComponent(src.split('/').pop().split('?')[0]);

                console.log('Clicked Image:', filename); // Debugging

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
                    // Fallback for images without specific story (e.g., event images)
                    document.getElementById('storyTag').innerText = "이벤트";
                    document.getElementById('storyTitle').innerText = "진행 중인 이벤트";
                    document.getElementById('storyProfile').innerText = "규림한의원 청주점";
                    document.getElementById('storyDesc').innerText = "지금 바로 상담 신청하고 혜택을 받아보세요!";
                    document.getElementById('storyResult').innerText = "선착순 마감될 수 있습니다.";
                }

                storyModal.classList.add('show');

                // Reset scroll position to top
                const storyContent = document.querySelector('.story-content');
                if (storyContent) {
                    storyContent.scrollTop = 0;
                }
                const storyTextWrapper = document.querySelector('.story-text-wrapper');
                if (storyTextWrapper) {
                    storyTextWrapper.scrollTop = 0;
                }
            });
        });

        // Close logic
        // Close logic
        function closeStoryModal() {
            storyModal.classList.add('closing');
            setTimeout(() => {
                storyModal.classList.remove('show');
                storyModal.classList.remove('closing');
            }, 250); // 0.25s to match ultra fast animation
        }

        if (storyClose) storyClose.addEventListener('click', closeStoryModal);

        storyModal.addEventListener('click', (e) => {
            if (e.target === storyModal || e.target === storyClose) {
                closeStoryModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && storyModal.classList.contains('show')) {
                closeStoryModal();
            }
        });
    }

    // 5. New Year Countdown Logic
    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
        const targetDate = new Date('February 17, 2026 00:00:00').getTime(); // Seollal (Lunar New Year)

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownContainer.innerHTML = "<h3>새해 복 많이 받으세요!</h3>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }

        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // 6. Slot Machine Logic (New)
    const spinBtn = document.getElementById('spinBtn');
    const prizeResult = document.getElementById('prizeResult');
    const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];

    if (spinBtn && prizeResult && reels.every(r => r)) {
        // Probability Configuration
        const prizesConfig = [
            { name: "30% 할인권", weight: 1, type: "win", symbol: "👑" },
            { name: "10% 할인권", weight: 1000, type: "win", symbol: "☀️" },
            { name: "5% 할인권", weight: 1500, type: "win", symbol: "💰" },
            { name: "무료 상담권", weight: 2000, type: "win", symbol: "🧧" },
            { name: "다음 기회에...", weight: 5499, type: "lose", symbol: "💨" }
        ];

        const symbols = ['☀️', '💰', '🧧', '🪁', '💨', '👑'];
        const totalWeight = prizesConfig.reduce((acc, p) => acc + p.weight, 0);

        function getWeightedPrize() {
            let random = Math.random() * totalWeight;
            for (const prize of prizesConfig) {
                if (random < prize.weight) {
                    return prize;
                }
                random -= prize.weight;
            }
            return prizesConfig[prizesConfig.length - 1]; // Fallback
        }

        let hasPlayed = false;

        // Check if already played today
        const lastPlayed = localStorage.getItem('kyurim_luckybox_played');
        if (lastPlayed === new Date().toDateString()) {
            prizeResult.innerText = "오늘의 운세를 이미 확인하셨습니다.";
            spinBtn.disabled = true;
            spinBtn.querySelector('.spin-text').innerText = "DONE";
            hasPlayed = true;
        }

        spinBtn.addEventListener('click', () => {
            if (hasPlayed) return;

            hasPlayed = true;
            localStorage.setItem('kyurim_luckybox_played', new Date().toDateString());
            spinBtn.disabled = true;

            const finalPrize = getWeightedPrize();
            const targetSymbol = finalPrize.symbol;

            // Start Spinning
            reels.forEach((reel, index) => {
                reel.classList.add('spinning');

                // Spin animation
                const intervalId = setInterval(() => {
                    reel.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                }, 100);

                // Stop reels one by one
                setTimeout(() => {
                    clearInterval(intervalId);
                    reel.innerText = targetSymbol;
                    reel.classList.remove('spinning');

                    // If last reel, show result
                    if (index === 2) {
                        showResult(finalPrize);
                    }
                }, 1000 + (index * 500)); // 1s, 1.5s, 2s
            });
        });

        function showResult(finalPrize) {
            if (finalPrize.type === "win") {
                prizeResult.innerHTML = `
                    <div id="couponCard" class="coupon-card fade-in" style="animation-play-state: running;">
                        <div class="coupon-header">Kyurim New Year 2026</div>
                        <div class="coupon-body">
                            <div class="coupon-prize">${finalPrize.name}</div>
                            <div class="coupon-validity">유효기간: 2026년 1월 31일까지</div>
                        </div>
                        <div class="coupon-footer">규림한의원 청주점</div>
                    </div>
                    <button id="downloadCouponBtn" class="btn btn-primary btn-sm" style="margin-top:10px;">
                        <i class="fa-solid fa-download"></i> 쿠폰 저장하기
                    </button>
                `;

                // Add download functionality
                document.getElementById('downloadCouponBtn').addEventListener('click', () => {
                    const couponCard = document.getElementById('couponCard');
                    html2canvas(couponCard).then(canvas => {
                        const link = document.createElement('a');
                        link.download = `규림한의원_${finalPrize.name}.png`;
                        link.href = canvas.toDataURL();
                        link.click();
                    });
                });
            } else {
                prizeResult.innerHTML = `<span style="color: #666; font-size: 1.5rem;">아쉽지만 다음 기회에...🐍</span>`;
            }
        }
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
            // Use placeholder images for now or generic pattern
            // To make text visible, we use a gradient overlay
            card.innerHTML = `
                <div class="review-image-placeholder" style="background: linear-gradient(135deg, #fce38a 0%, #f38181 100%); height: 150px; display:flex; align-items:center; justify-content:center; color:white; font-size:2rem; font-weight:bold;">
                    ${review.author.charAt(0)}
                </div>
                <div class="review-text-content" style="padding: 15px;">
                    <div class="review-stars" style="color:#FFD700; margin-bottom:5px;">${review.rating}</div>
                    <p class="review-body" style="font-size:0.95rem; color:#333; line-height:1.4; margin-bottom:10px; font-weight:500;">"${review.text}"</p>
                    <p class="review-author" style="font-size:0.8rem; color:#666; text-align:right;">- ${review.author}</p>
                </div>
            `;
            carousel.appendChild(card);
        });
    }
    const reviewContainer = document.querySelector('.review-carousel-container');
    if (reviewContainer && window.innerWidth <= 768) {
        let scrollSpeed = 0.8; // Adjust speed as needed
        let isPaused = false;
        let currentScroll = 0;

        function autoScroll() {
            if (!isPaused) {
                currentScroll += scrollSpeed;
                // Infinite loop logic: When we reach the halfway point (end of first set), jump back to 0
                // We use a small buffer to ensure we don't jump too early
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
        reviewContainer.addEventListener('mouseleave', () => { isPaused = false; });
    }

    // 7. Game Hint Toast (Gamification Trigger)
    setTimeout(() => {
        const gameToast = document.createElement('div');
        gameToast.className = 'reservation-toast game-toast';
        gameToast.style.border = '1px solid #FF4D4D'; // Red border for distinction
        gameToast.style.background = 'rgba(20, 0, 0, 0.95)'; // Darker Red-ish

        gameToast.innerHTML = `
            <span style="font-size: 1.5rem;">🧧</span>
            <div>
                <span class="toast-text" style="display:block; color:#FFD700;"><b>보물찾기 이벤트!</b></span>
                <span class="toast-text">페이지 속 복주머니 3개를 찾아보세요.</span>
            </div>
        `;
        document.body.appendChild(gameToast);

        // Show
        setTimeout(() => gameToast.classList.add('show'), 100);
        // Hide after 4s
        setTimeout(() => {
            gameToast.classList.remove('show');
            setTimeout(() => gameToast.remove(), 500);
        }, 4000);
    }, 1500); // Appear at 1.5s (Before the 3s Reservation Toast)

    // 8. Real-time Reservation Notification (Social Proof)
    const notificationPageType = document.body.getAttribute('data-page-type') || 'general';
    const names = ['김OO', '이OO', '박OO', '최OO', '정OO', '강OO', '조OO', '윤OO', '장OO', '임OO'];
    const actions = {
        'diet': '다이어트 상담을 신청했습니다.',
        'skin': '피부 상담을 신청했습니다.',
        'pain': '통증 치료 상담을 신청했습니다.',
        'body': '체형 교정 상담을 신청했습니다.',
        'asymmetry': '안면비대칭 상담을 신청했습니다.',
        'general': '진료 예약을 신청했습니다.'
    };

    function showToast() {
        const toast = document.createElement('div');
        toast.className = 'reservation-toast';

        const name = names[Math.floor(Math.random() * names.length)];
        const action = actions[notificationPageType] || actions['general'];
        const time = Math.floor(Math.random() * 5) + 1; // 1-5 mins ago

        toast.innerHTML = `
            <i class="fa-solid fa-bell"></i>
            <div>
                <span class="toast-text" style="display:block;"><b>${name}님</b>이</span>
                <span class="toast-text">${action}</span>
            </div>
            <span class="toast-time" style="font-size:0.75rem; margin-left: 10px;">${time}분 전</span>
        `;

        document.body.appendChild(toast);

        // Animate In
        setTimeout(() => toast.classList.add('show'), 100);

        // Animate Out
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000); // Stay for 4 seconds
    }

    // Start Loop
    setTimeout(() => {
        showToast(); // Show first one quickly
        setInterval(() => {
            if (document.hidden) return; // Don't show if tab hidden
            showToast();
        }, 15000); // Every 15 seconds
    }, 3000); // Start after 3 seconds

});

// Global Talisman Function (Outside DOMContentLoaded)
window.openTalismanModal = function () {
    console.log("Opening Talisman Modal...");
    const modal = document.getElementById('talisman-modal');
    if (modal) {
        modal.style.display = 'block';
        modal.style.zIndex = '20000';
    } else {
        alert('팝업을 불러올 수 없습니다. 페이지를 새로고침 해주세요.');
    }
}

// --- New Year Special Features JS ---

// 1. Sunrise Visual Cleanup (Ultra Fast Version)
setTimeout(() => {
    const sunrise = document.getElementById('sunrise-overlay');
    if (sunrise) sunrise.style.display = 'none';
}, 1000); // 0.5s animation + buffer

// 2. Flower Path (Scroll Effect) - "Walk on Flowers" & Kite Parallax
let lastScrollY = window.scrollY;
let scrollTimeout;
const kiteContainer = document.getElementById('kite-container');

window.addEventListener('scroll', () => {
    // Parallax for Kite (Disabled for Mouse Interaction)
    // if (kiteContainer) {
    //     const speed = 0.2;
    //     kiteContainer.style.transform = `translateY(${window.scrollY * -speed}px)`;
    // }

    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const diff = Math.abs(currentScrollY - lastScrollY);

        if (diff > 50) { // Only if scrolled significantly
            createFlowerPath();
            lastScrollY = currentScrollY;
        }
        scrollTimeout = null;
    }, 100); // Throttle
});

function createFlowerPath() {
    const flowers = ['🌸', '🌺', '🏵️', '💐', '🌼'];
    const side = Math.random() > 0.5 ? 'left' : 'right'; // Random side
    const flower = document.createElement('div');
    flower.className = 'flower-path-item';
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

    // Position
    flower.style[side] = Math.random() * 50 + 'px'; // Within 50px of edge
    flower.style.top = Math.random() * (window.innerHeight - 100) + 'px'; // Random height

    // Add to body
    document.body.appendChild(flower);

    // Cleanup after animation
    setTimeout(() => {
        flower.remove();
    }, 2000);
}

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

// 5. Hidden Bok (Luck) Hunt
// 5. Hidden Bok (Luck) Hunt
// Use Event Delegation to ensure it works even if elements are loaded dynamically or late
let foundBokCount = 0;
const totalBokTarget = 3; // We know there are 3

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('hidden-bok')) {
        const bok = e.target;

        e.stopPropagation(); // prevent default click sparkle
        if (bok.classList.contains('found')) return;

        bok.classList.add('found');
        // Visual feedback immediately
        bok.style.opacity = '0.3';
        bok.style.transform = 'scale(1.5)';

        foundBokCount++;
        console.log(`Found Bok: ${foundBokCount}/${totalBokTarget}`);

        // Add specific sparkle effect for Bok
        if (typeof createSparkle === 'function') {
            createSparkle(e.clientX, e.clientY, ['#FFD700', '#FF0000']);
        }

        if (foundBokCount >= totalBokTarget) {
            setTimeout(() => {
                // Show Success Message Overlay
                const successMsg = document.createElement('div');
                successMsg.style.position = 'fixed';
                successMsg.style.top = '50%';
                successMsg.style.left = '50%';
                successMsg.style.transform = 'translate(-50%, -50%)';
                successMsg.style.background = 'rgba(255, 255, 255, 0.95)';
                successMsg.style.padding = '30px 50px';
                successMsg.style.borderRadius = '20px';
                successMsg.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                successMsg.style.zIndex = '100000';
                successMsg.style.textAlign = 'center';
                successMsg.style.border = '4px solid #D4AF37';
                successMsg.innerHTML = `
                    <h2 style="color:#D42426; margin-bottom:15px; font-size:1.8rem;">🎉 축하합니다! 🎉</h2>
                    <p style="font-size:1.1rem; color:#333;">숨겨진 복주머니 3개를 모두 찾으셨네요!</p>
                    
                    <div style="background:#f8f9fa; padding:15px; border-radius:15px; margin:20px 0; border:2px dashed #D4AF37;">
                        <p style="font-size:1rem; color:#555; margin-bottom:5px; font-weight:bold;">📸 화면을 캡처해서 보여주세요</p>
                        <p style="font-size:1.5rem; font-weight:800; color:#D42426; margin: 10px 0;">10,000원 추가 할인</p>
                        <p style="font-size:0.8rem; color:#888;">(※ 상담 당일 데스크 제시 시 적용)</p>
                    </div>

                    <button id="closeSuccess" style="width:100%; padding:15px; background:#D4AF37; color:white; border:none; border-radius:12px; cursor:pointer; font-size:1.1rem; font-weight:bold; box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);">혜택 받고 닫기</button>
                `;
                document.body.appendChild(successMsg);

                const closeBtn = document.getElementById('closeSuccess');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        successMsg.remove();
                    });
                }

                if (typeof triggerBigFireworks === 'function') {
                    triggerBigFireworks();
                }
            }, 500);
        }
    }
});

function createSparkle(x, y, colors, scaleMultiplier = 1) {
    for (let i = 0; i < 12; i++) { // Increased particle count
        const p = document.createElement('div');
        p.classList.add('click-sparkle');
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.zIndex = '100001'; // Ensure on top of success message
        p.style.width = (Math.random() * 6 + 4) * scaleMultiplier + 'px'; // Varied size
        p.style.height = p.style.width;

        const angle = Math.random() * Math.PI * 2;
        const velocity = (Math.random() * 60 + 40) * scaleMultiplier;
        p.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

// 6. Director's Letter Logic
document.addEventListener('click', (e) => {
    // Check if clicked trigger or its children
    const trigger = e.target.closest('.letter-trigger-card');
    if (trigger) {
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
            setTimeout(() => modal.remove(), 300);
        };
        modal.querySelector('.close-letter').addEventListener('click', close);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });
    }
});

function triggerBigFireworks() {
    // Intense burst
    const interval = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.8); // Top 80%
        createSparkle(x, y, ['#FFD700', '#E63946', '#FFFFFF', '#00FF00', '#FFA500'], 2.0); // Bigger scale
    }, 50); // Faster interval (50ms)

    setTimeout(() => clearInterval(interval), 4000); // 4 seconds duration
}

// 6. Interactive Kite (Mouse Follow)
const interactiveKiteRef = document.querySelector('.kite-container');
if (interactiveKiteRef) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Move with mouse (Range +/- 80px)
        const moveX = (x - 0.5) * 80;
        const moveY = (y - 0.5) * 40;

        interactiveKiteRef.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// 7. Norigae Scroll Physics
const norigaeTassel = document.querySelector('.norigae-tassel');
let lastScrollY_Norigae = window.scrollY;
let norigaeTimeout;

window.addEventListener('scroll', () => {
    if (!norigaeTassel) return;

    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY_Norigae;
    lastScrollY_Norigae = currentScrollY;

    // Swing based on scroll direction/speed
    // Cap at 45 degrees
    let angle = -diff * 1.5; // Negative to lagging effect? Or positive?
    if (angle > 45) angle = 45;
    if (angle < -45) angle = -45;

    norigaeTassel.style.transform = `rotate(${angle}deg)`;

    // Reset when stopped
    clearTimeout(norigaeTimeout);
    norigaeTimeout = setTimeout(() => {
        norigaeTassel.style.transform = 'rotate(0deg)';
    }, 150);
});
