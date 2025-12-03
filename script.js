document.addEventListener('DOMContentLoaded', () => {
    // --- Snowfall Effect ---
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 50;

    if (snowContainer) {
        for (let i = 0; i < snowflakeCount; i++) {
            createSnowflake();
        }
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '&#10052;'; // Snowflake character
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s fall duration
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

        snowContainer.appendChild(snowflake);

        // Add random delay to start
        snowflake.style.animationDelay = Math.random() * 5 + 's';
    }


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

    // 2. Real Reviews Carousel Injection
    // Focus: Diet, Facial Asymmetry, Skin, Pain
    // 40 Unique Reviews
    const uniqueReviews = [
        // Diet (12 items)
        { treatment: "다이어트 3개월", text: "3개월 동안 12kg 감량 성공했어요! 요요 없이 유지 중입니다. 원장님이 식단까지 꼼꼼하게 봐주셔서 포기하지 않을 수 없었어요.", name: "김OO님", stars: 5, date: "2025.11.28" },
        { treatment: "다이어트 1개월", text: "한 달 만에 5kg 빠졌어요. 한약이 쓰지 않고 먹기 편해서 좋았습니다. 목표 체중까지 화이팅!", name: "이OO님", stars: 5, date: "2025.11.15" },
        { treatment: "다이어트 환", text: "식욕 억제가 잘 돼서 군것질을 끊었어요. 가지고 다니기도 편해서 빼먹지 않고 먹게 되네요.", name: "박OO님", stars: 4, date: "2025.10.30" },
        { treatment: "산후 다이어트", text: "출산 후 안 빠지던 살이 규림 한약 먹고 쏙 빠졌어요. 붓기도 같이 빠져서 몸이 너무 가벼워요.", name: "최OO님", stars: 5, date: "2025.10.12" },
        { treatment: "급찐급빠 다이어트", text: "휴가 다녀와서 급하게 찐 살, 2주 프로그램으로 정리했습니다. 역시 관리는 규림이네요.", name: "정OO님", stars: 5, date: "2025.09.25" },
        { treatment: "다이어트 2개월", text: "운동 없이 식단과 한약만으로 8kg 감량했습니다. 옷 사이즈가 달라져서 쇼핑할 맛이 나요.", name: "강OO님", stars: 5, date: "2025.09.10" },
        { treatment: "고도비만 다이어트", text: "혼자서는 힘들었는데 원장님 덕분에 20kg 감량의 기적을 맛봤습니다. 건강도 좋아졌어요.", name: "조OO님", stars: 5, date: "2025.08.22" },
        { treatment: "다이어트 환", text: "직장 다니면서 챙겨 먹기 편해요. 회식 자리에서도 식욕 조절이 돼서 다행입니다.", name: "윤OO님", stars: 4, date: "2025.08.05" },
        { treatment: "웨딩 다이어트", text: "결혼식 앞두고 급하게 관리받았는데, 드레스 라인이 달라졌어요. 예쁘게 결혼식 잘 마쳤습니다.", name: "장OO님", stars: 5, date: "2025.07.18" },
        { treatment: "갱년기 다이어트", text: "나이 들면서 뱃살이 안 빠졌는데, 규림에서 관리받고 허리라인을 되찾았습니다.", name: "임OO님", stars: 5, date: "2025.07.01" },
        { treatment: "소아 비만", text: "아이가 살이 쪄서 걱정이었는데, 한약 먹고 키도 크고 살도 빠졌어요. 아이도 잘 먹네요.", name: "한OO님", stars: 5, date: "2025.06.15" },
        { treatment: "부분 비만", text: "팔뚝이랑 허벅지 살이 고민이었는데, 약침이랑 같이 하니 효과가 두 배네요.", name: "오OO님", stars: 4, date: "2025.06.02" },

        // Facial Asymmetry (10 items)
        { treatment: "안면비대칭 교정", text: "사진 찍을 때마다 스트레스였는데, 교정 후 얼굴 라인이 정말 달라졌어요. 친구들이 살 빠졌냐고 물어봐요!", name: "서OO님", stars: 5, date: "2025.11.20" },
        { treatment: "안면비대칭 교정", text: "턱 관절 소리도 줄어들고 얼굴 중심선이 맞아가는 게 보입니다. 꾸준히 치료받길 잘했어요.", name: "신OO님", stars: 5, date: "2025.11.05" },
        { treatment: "안면비대칭/턱관절", text: "입 벌릴 때마다 딱딱 소리가 났는데 교정 치료 받고 편해졌습니다. 얼굴 비대칭도 많이 좋아졌어요.", name: "권OO님", stars: 5, date: "2025.10.25" },
        { treatment: "안면비대칭 교정", text: "수술 없이 교정만으로 이렇게 달라질 수 있다니 놀라워요. 거울 보는 게 즐거워졌습니다.", name: "황OO님", stars: 5, date: "2025.10.08" },
        { treatment: "턱관절 장애", text: "턱이 아파서 밥 먹기도 힘들었는데, 치료 몇 번 만에 통증이 사라졌어요.", name: "안OO님", stars: 5, date: "2025.09.15" },
        { treatment: "안면비대칭 교정", text: "비대칭 때문에 웃을 때 입꼬리가 짝짝이였는데, 이제 자연스럽게 웃을 수 있어요.", name: "송OO님", stars: 5, date: "2025.08.30" },
        { treatment: "안면비대칭/체형", text: "얼굴뿐만 아니라 골반이랑 척추까지 같이 교정해주셔서 몸 전체가 바르게 된 느낌입니다.", name: "류OO님", stars: 5, date: "2025.08.12" },
        { treatment: "안면비대칭 교정", text: "오랜 컴플렉스였는데 진작 올 걸 그랬어요. 원장님 실력이 정말 좋으십니다.", name: "전OO님", stars: 5, date: "2025.07.25" },
        { treatment: "턱관절 교정", text: "두통까지 있었는데 턱관절 치료하고 두통도 같이 없어졌어요. 신기하네요.", name: "홍OO님", stars: 5, date: "2025.07.10" },
        { treatment: "안면비대칭 재교정", text: "다른 곳에서 효과 못 봤는데 규림에서 확실히 좋아졌습니다. 믿고 다닙니다.", name: "고OO님", stars: 5, date: "2025.06.20" },

        // Skin (10 items)
        { treatment: "여드름 흉터", text: "피부과 많이 다녀봤지만 여기만큼 꼼꼼한 곳은 처음이에요. 흉터가 눈에 띄게 옅어져서 화장할 맛이 납니다.", name: "문OO님", stars: 5, date: "2025.11.25" },
        { treatment: "피부 리프팅", text: "매선 시술 받았는데 즉각적으로 리프팅되는 게 보여서 신기했어요. 통증도 생각보다 적었습니다.", name: "양OO님", stars: 5, date: "2025.11.10" },
        { treatment: "성인 여드름", text: "재발하는 여드름 때문에 고민이었는데, 속부터 치료하니 확실히 좋아지네요. 피부 톤도 맑아졌어요.", name: "손OO님", stars: 5, date: "2025.10.20" },
        { treatment: "모공/흉터", text: "새살침 치료 받고 모공이 많이 줄었어요. 화장도 잘 먹고 피부 자신감이 생겼습니다.", name: "배OO님", stars: 5, date: "2025.10.05" },
        { treatment: "등 여드름", text: "등드름 때문에 여름에도 가리고 다녔는데, 이제 당당하게 오프숄더 입을 수 있어요!", name: "조OO님", stars: 5, date: "2025.09.18" },
        { treatment: "안면홍조", text: "얼굴이 항상 붉어서 스트레스였는데, 한약 먹고 침 맞으니 열감이 많이 내려갔어요.", name: "백OO님", stars: 4, date: "2025.08.25" },
        { treatment: "피부 탄력", text: "나이 들면서 피부가 처져서 고민이었는데, 정안침 맞고 탱탱해진 기분이에요.", name: "허OO님", stars: 5, date: "2025.08.08" },
        { treatment: "여드름 자국", text: "붉은 자국이 오래갔는데 치료받고 많이 옅어졌어요. 컨실러 안 써도 됩니다.", name: "유OO님", stars: 5, date: "2025.07.22" },
        { treatment: "건선/아토피", text: "가려움증 때문에 잠도 못 잤는데, 면역 치료 받고 많이 호전되었습니다.", name: "남OO님", stars: 5, date: "2025.07.05" },
        { treatment: "신부 관리", text: "결혼식 앞두고 피부 관리 받았는데, 화장이 너무 잘 먹어서 칭찬 많이 들었어요.", name: "심OO님", stars: 5, date: "2025.06.18" },

        // Pain Treatment (6 items)
        { treatment: "목/어깨 통증", text: "직장인이라 거북목이 심했는데, 침 치료랑 추나 받고 많이 좋아졌습니다. 두통도 사라졌어요.", name: "노OO님", stars: 5, date: "2025.11.22" },
        { treatment: "교통사고 후유증", text: "사고 후 목이랑 허리가 계속 아팠는데, 추나 치료 받고 씻은 듯이 나았습니다. 야간진료가 있어서 퇴근 후 가기 편해요.", name: "하OO님", stars: 5, date: "2025.11.08" },
        { treatment: "허리 디스크", text: "허리가 너무 아파서 걷기도 힘들었는데, 약침 맞고 많이 호전되었습니다. 원장님 정말 친절하세요.", name: "곽OO님", stars: 5, date: "2025.10.15" },
        { treatment: "손목 통증", text: "컴퓨터를 많이 써서 손목이 시큰거렸는데, 침 맞고 금방 좋아졌어요. 물리치료도 시원합니다.", name: "성OO님", stars: 5, date: "2025.09.28" },
        { treatment: "무릎 통증", text: "계단 오르내리기 힘들었는데, 봉침 맞고 많이 부드러워졌어요. 등산도 다시 다닙니다.", name: "차OO님", stars: 5, date: "2025.09.05" },
        { treatment: "오십견", text: "팔이 안 올라가서 고생했는데, 꾸준히 치료받으니 이제 만세도 가능해요.", name: "주OO님", stars: 5, date: "2025.08.18" },

        // Others (2 items)
        { treatment: "공진단 처방", text: "부모님 선물로 드렸는데 너무 좋아하시네요. 아침마다 개운하시다고 합니다.", name: "우OO님", stars: 5, date: "2025.05.08" },
        { treatment: "수험생 보약", text: "고3 아들 체력이 떨어져서 지어줬는데, 집중력이 좋아진 것 같다고 하네요.", name: "구OO님", stars: 5, date: "2025.04.20" }
    ];

    const reviewCarousel = document.querySelector('.review-carousel');
    if (reviewCarousel) {
        // Duplicate reviews for infinite scroll effect (x2 for smoother loop)
        const allReviews = [...uniqueReviews, ...uniqueReviews];

        allReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="review-header">
                    <div class="stars">${'<i class="fa-solid fa-star"></i>'.repeat(review.stars)}</div>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-body">"${review.text}"</div>
                <div class="review-footer">
                    <div class="reviewer-avatar">${review.name.charAt(0)}</div>
                    <div class="reviewer-info">
                        <h5>${review.name}</h5>
                        <span>${review.treatment}</span>
                    </div>
                </div>
            `;
            reviewCarousel.appendChild(card);
        });
    }

    // 3. FAQ Accordion Logic
    const faqData = [
        { q: "진료 시간은 어떻게 되나요?", a: "평일은 오전 10시 30분부터 오후 8시 30분까지 야간진료를 시행하며, 토요일은 오전 10시부터 오후 4시까지 진료합니다. " },
        { q: "주차는 가능한가요?", a: "네, 건물 내 지하 주차장을 무료로 이용하실 수 있습니다." },
        { q: "다이어트 한약 비용이 궁금해요.", a: "다이어트 프로그램은 환자분의 체질과 목표 감량치에 따라 1:1 맞춤 처방됩니다. 비용은 제형별로 상이하며, 정확한 비용은 상담 후 안내해 드릴 수 있습니다." },
        { q: "예약은 필수인가요?", a: "규림한의원은 원활한 진료를 위해 예약제로 운영되고 있습니다. 네이버 예약, 카카오톡, 또는 전화로 미리 예약해 주시면 대기 시간 없이 진료받으실 수 있습니다." }
    ];

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

    // 4. Image Lightbox Logic
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightboxModal && lightboxImage) {
        // Select images from Events and Treatment Cases
        const eventImages = document.querySelectorAll('.event-item img');
        const baImages = document.querySelectorAll('.ba-card img');
        const allTargetImages = [...eventImages, ...baImages];

        allTargetImages.forEach(img => {
            img.style.cursor = 'pointer'; // Indicate clickable
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent bubbling
                lightboxImage.src = img.src;
                lightboxModal.classList.add('show');
            });
        });

        // Close logic
        function closeLightbox() {
            lightboxModal.classList.remove('show');
            setTimeout(() => {
                lightboxImage.src = ''; // Clear src after animation
            }, 300);
        }

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target === lightboxClose) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('show')) {
                closeLightbox();
            }
        });
    }

});
