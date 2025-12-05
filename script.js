document.addEventListener('DOMContentLoaded', () => {
    // --- Snowfall Effect ---
    const snowContainer = document.getElementById('snow-container');
    const isMobile = window.innerWidth <= 768;
    const snowflakeCount = isMobile ? 30 : 50; // Reduce count on mobile

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
        { treatment: "다이어트 3개월", text: "3개월 동안 12kg 감량 성공했어요! 요요 없이 유지 중입니다. 원장님이 식단까지 꼼꼼하게 봐주셔서 포기하지 않을 수 없었어요.", name: "김OO님", stars: 5, date: "2025.11.28", keywords: ["친절해요", "꼼꼼해요", "효과좋아요"] },
        { treatment: "다이어트 1개월", text: "한 달 만에 5kg 빠졌어요. 한약이 쓰지 않고 먹기 편해서 좋았습니다. 목표 체중까지 화이팅!", name: "이OO님", stars: 5, date: "2025.11.15", keywords: ["상담이 자세해요", "시설이 깔끔해요"] },
        { treatment: "다이어트 환", text: "식욕 억제가 잘 돼서 군것질을 끊었어요. 가지고 다니기도 편해서 빼먹지 않고 먹게 되네요.", name: "박OO님", stars: 4, date: "2025.10.30", keywords: ["편리해요", "가성비 최고"] },
        { treatment: "산후 다이어트", text: "출산 후 안 빠지던 살이 규림 한약 먹고 쏙 빠졌어요. 붓기도 같이 빠져서 몸이 너무 가벼워요.", name: "최OO님", stars: 5, date: "2025.10.12", keywords: ["붓기완화", "건강해졌어요"] },
        { treatment: "급찐급빠 다이어트", text: "휴가 다녀와서 급하게 찐 살, 2주 프로그램으로 정리했습니다. 역시 관리는 규림이네요.", name: "정OO님", stars: 5, date: "2025.09.25", keywords: ["빠른효과", "친절해요"] },
        { treatment: "다이어트 2개월", text: "운동 없이 식단과 한약만으로 8kg 감량했습니다. 옷 사이즈가 달라져서 쇼핑할 맛이 나요.", name: "강OO님", stars: 5, date: "2025.09.10", keywords: ["옷태가달라져요", "인생한의원"] },
        { treatment: "고도비만 다이어트", text: "혼자서는 힘들었는데 원장님 덕분에 20kg 감량의 기적을 맛봤습니다. 건강도 좋아졌어요.", name: "조OO님", stars: 5, date: "2025.08.22", keywords: ["인생역전", "건강관리"] },
        { treatment: "다이어트 환", text: "직장 다니면서 챙겨 먹기 편해요. 회식 자리에서도 식욕 조절이 돼서 다행입니다.", name: "윤OO님", stars: 4, date: "2025.08.05", keywords: ["직장인추천", "간편해요"] },
        { treatment: "웨딩 다이어트", text: "결혼식 앞두고 급하게 관리받았는데, 드레스 라인이 달라졌어요. 예쁘게 결혼식 잘 마쳤습니다.", name: "장OO님", stars: 5, date: "2025.07.18", keywords: ["예신필수", "라인정리"] },
        { treatment: "갱년기 다이어트", text: "나이 들면서 뱃살이 안 빠졌는데, 규림에서 관리받고 허리라인을 되찾았습니다.", name: "임OO님", stars: 5, date: "2025.07.01", keywords: ["뱃살타파", "젊어졌어요"] },
        { treatment: "소아 비만", text: "아이가 살이 쪄서 걱정이었는데, 한약 먹고 키도 크고 살도 빠졌어요. 아이도 잘 먹네요.", name: "한OO님", stars: 5, date: "2025.06.15", keywords: ["아이성장", "소아비만"] },
        { treatment: "부분 비만", text: "팔뚝이랑 허벅지 살이 고민이었는데, 약침이랑 같이 하니 효과가 두 배네요.", name: "오OO님", stars: 4, date: "2025.06.02", keywords: ["라인관리", "부분비만"] },

        // Facial Asymmetry (10 items)
        { treatment: "안면비대칭 교정", text: "사진 찍을 때마다 스트레스였는데, 교정 후 얼굴 라인이 정말 달라졌어요. 친구들이 살 빠졌냐고 물어봐요!", name: "서OO님", stars: 5, date: "2025.11.20", keywords: ["얼굴축소", "비대칭교정"] },
        { treatment: "안면비대칭 교정", text: "턱 관절 소리도 줄어들고 얼굴 중심선이 맞아가는 게 보입니다. 꾸준히 치료받길 잘했어요.", name: "신OO님", stars: 5, date: "2025.11.05", keywords: ["턱관절", "통증완화"] },
        { treatment: "안면비대칭/턱관절", text: "입 벌릴 때마다 딱딱 소리가 났는데 교정 치료 받고 편해졌습니다. 얼굴 비대칭도 많이 좋아졌어요.", name: "권OO님", stars: 5, date: "2025.10.25", keywords: ["신기해요", "편안해요"] },
        { treatment: "안면비대칭 교정", text: "수술 없이 교정만으로 이렇게 달라질 수 있다니 놀라워요. 거울 보는 게 즐거워졌습니다.", name: "황OO님", stars: 5, date: "2025.10.08", keywords: ["비수술", "자연스러움"] },
        { treatment: "턱관절 장애", text: "턱이 아파서 밥 먹기도 힘들었는데, 치료 몇 번 만에 통증이 사라졌어요.", name: "안OO님", stars: 5, date: "2025.09.15", keywords: ["통증치료", "명의"] },
        { treatment: "안면비대칭 교정", text: "비대칭 때문에 웃을 때 입꼬리가 짝짝이였는데, 이제 자연스럽게 웃을 수 있어요.", name: "송OO님", stars: 5, date: "2025.08.30", keywords: ["미소교정", "자신감상승"] },
        { treatment: "안면비대칭/체형", text: "얼굴뿐만 아니라 골반이랑 척추까지 같이 교정해주셔서 몸 전체가 바르게 된 느낌입니다.", name: "류OO님", stars: 5, date: "2025.08.12", keywords: ["전신교정", "바른자세"] },
        { treatment: "안면비대칭 교정", text: "오랜 컴플렉스였는데 진작 올 걸 그랬어요. 원장님 실력이 정말 좋으십니다.", name: "전OO님", stars: 5, date: "2025.07.25", keywords: ["실력최고", "추천해요"] },
        { treatment: "턱관절 교정", text: "두통까지 있었는데 턱관절 치료하고 두통도 같이 없어졌어요. 신기하네요.", name: "홍OO님", stars: 5, date: "2025.07.10", keywords: ["두통완화", "삶의질상승"] },
        { treatment: "안면비대칭 재교정", text: "다른 곳에서 효과 못 봤는데 규림에서 확실히 좋아졌습니다. 믿고 다닙니다.", name: "고OO님", stars: 5, date: "2025.06.20", keywords: ["재교정성공", "신뢰"] },

        // Skin (10 items)
        { treatment: "여드름 흉터", text: "피부과 많이 다녀봤지만 여기만큼 꼼꼼한 곳은 처음이에요. 흉터가 눈에 띄게 옅어져서 화장할 맛이 납니다.", name: "문OO님", stars: 5, date: "2025.11.25", keywords: ["꼼꼼해요", "피부재생"] },
        { treatment: "피부 리프팅", text: "매선 시술 받았는데 즉각적으로 리프팅되는 게 보여서 신기했어요. 통증도 생각보다 적었습니다.", name: "양OO님", stars: 5, date: "2025.11.10", keywords: ["동안시술", "즉각효과"] },
        { treatment: "성인 여드름", text: "재발하는 여드름 때문에 고민이었는데, 속부터 치료하니 확실히 좋아지네요. 피부 톤도 맑아졌어요.", name: "손OO님", stars: 5, date: "2025.10.20", keywords: ["근본치료", "피부미인"] },
        { treatment: "모공/흉터", text: "새살침 치료 받고 모공이 많이 줄었어요. 화장도 잘 먹고 피부 자신감이 생겼습니다.", name: "배OO님", stars: 5, date: "2025.10.05", keywords: ["모공축소", "새살침"] },
        { treatment: "등 여드름", text: "등드름 때문에 여름에도 가리고 다녔는데, 이제 당당하게 오프숄더 입을 수 있어요!", name: "조OO님", stars: 5, date: "2025.09.18", keywords: ["바디케어", "자신감"] },
        { treatment: "안면홍조", text: "얼굴이 항상 붉어서 스트레스였는데, 한약 먹고 침 맞으니 열감이 많이 내려갔어요.", name: "백OO님", stars: 4, date: "2025.08.25", keywords: ["홍조개선", "열감해소"] },
        { treatment: "피부 탄력", text: "나이 들면서 피부가 처져서 고민이었는데, 정안침 맞고 탱탱해진 기분이에요.", name: "허OO님", stars: 5, date: "2025.08.08", keywords: ["탄력개선", "동안침"] },
        { treatment: "여드름 자국", text: "붉은 자국이 오래갔는데 치료받고 많이 옅어졌어요. 컨실러 안 써도 됩니다.", name: "유OO님", stars: 5, date: "2025.07.22", keywords: ["자국완화", "쌩얼자신감"] },
        { treatment: "건선/아토피", text: "가려움증 때문에 잠도 못 잤는데, 면역 치료 받고 많이 호전되었습니다.", name: "남OO님", stars: 5, date: "2025.07.05", keywords: ["가려움해소", "면역강화"] },
        { treatment: "신부 관리", text: "결혼식 앞두고 피부 관리 받았는데, 화장이 너무 잘 먹어서 칭찬 많이 들었어요.", name: "심OO님", stars: 5, date: "2025.06.18", keywords: ["웨딩케어", "물광피부"] },

        // Pain Treatment (6 items)
        { treatment: "목/어깨 통증", text: "직장인이라 거북목이 심했는데, 침 치료랑 추나 받고 많이 좋아졌습니다. 두통도 사라졌어요.", name: "노OO님", stars: 5, date: "2025.11.22", keywords: ["거북목", "시원해요"] },
        { treatment: "교통사고 후유증", text: "사고 후 목이랑 허리가 계속 아팠는데, 추나 치료 받고 씻은 듯이 나았습니다. 야간진료가 있어서 퇴근 후 가기 편해요.", name: "하OO님", stars: 5, date: "2025.11.08", keywords: ["교통사고", "야간진료"] },
        { treatment: "허리 디스크", text: "허리가 너무 아파서 걷기도 힘들었는데, 약침 맞고 많이 호전되었습니다. 원장님 정말 친절하세요.", name: "곽OO님", stars: 5, date: "2025.10.15", keywords: ["디스크치료", "친절왕"] },
        { treatment: "손목 통증", text: "컴퓨터를 많이 써서 손목이 시큰거렸는데, 침 맞고 금방 좋아졌어요. 물리치료도 시원합니다.", name: "성OO님", stars: 5, date: "2025.09.28", keywords: ["손목통증", "물리치료"] },
        { treatment: "무릎 통증", text: "계단 오르내리기 힘들었는데, 봉침 맞고 많이 부드러워졌어요. 등산도 다시 다닙니다.", name: "차OO님", stars: 5, date: "2025.09.05", keywords: ["봉침효과", "관절튼튼"] },
        { treatment: "오십견", text: "팔이 안 올라가서 고생했는데, 꾸준히 치료받으니 이제 만세도 가능해요.", name: "주OO님", stars: 5, date: "2025.08.18", keywords: ["오십견", "운동가능"] },

        // Others (2 items)
        { treatment: "공진단 처방", text: "부모님 선물로 드렸는데 너무 좋아하시네요. 아침마다 개운하시다고 합니다.", name: "우OO님", stars: 5, date: "2025.05.08", keywords: ["효도선물", "피로회복"] },
        { treatment: "수험생 보약", text: "고3 아들 체력이 떨어져서 지어줬는데, 집중력이 좋아진 것 같다고 하네요.", name: "구OO님", stars: 5, date: "2025.04.20", keywords: ["수험생", "집중력"] }
    ];

    const reviewCarousel = document.querySelector('.review-carousel');
    if (reviewCarousel) {
        // Duplicate reviews for infinite scroll effect (x2 for smoother loop)
        const allReviews = [...uniqueReviews, ...uniqueReviews];

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
                        <img src="assets/logo_icon.png" alt="User">
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
            desc: '당뇨, 고혈압, 컨디션 저하로 내원하셨습니다. \n\n6개월간 20kg 감량하시면서 근육 손실은 거의 없이 체지방만 16kg 감량하는 데 성공했습니다.',
            result: '당뇨와 고혈압 수치가 정상화되었고, 피부결과 전반적인 컨디션이 눈에 띄게 개선되었습니다.'
        },
        'ba_2.png': {
            tag: '다이어트',
            title: '3개월 -10kg, 체질 개선',
            profile: '20대 여성 / 대학생',
            desc: '원래 잘 붓고 살이 쉽게 찌는 체질이 고민이셨습니다. \n\n3개월 집중 프로그램으로 체지방 위주 10kg 감량에 성공했습니다.',
            result: '치료 후 살이 잘 찌지 않는 체질로 변화하였으며, 부종 고민도 말끔히 해결되었습니다.'
        },
        'ba_3.png': {
            tag: '다이어트',
            title: '6개월 -19kg, 건강한 삶',
            profile: '50대 여성 / 자영업',
            desc: '고혈압, 고지혈증, 당뇨 등 대사 증후군을 앓고 계셨습니다. \n\n6개월간 19kg을 감량하며 건강 회복에 집중했습니다.',
            result: '모든 대사 질환 수치가 정상으로 돌아와 치료가 완료되었으며, 삶의 질이 크게 향상되었습니다.'
        },
        'ba_4.jpg': {
            tag: '안면비대칭',
            title: '비수술 안면비대칭 교정',
            profile: '20대 남성 / 직장인',
            desc: '입꼬리 비대칭과 얼굴 좌우 부피 차이가 고민이셨습니다. \n\n수술 없이 침과 추나 요법으로 교정을 진행했습니다.',
            result: '입꼬리 대칭과 눈꼬리 위치가 바르게 정렬되었고, 얼굴 볼륨이 감소하여 라인이 매끄러워졌습니다.'
        },
        'ba_5.png': {
            tag: '안면비대칭',
            title: '안면비대칭 & 윤곽 개선',
            profile: '20대 남성 / 프리랜서',
            desc: '전반적인 얼굴 볼륨과 좌우 비대칭을 개선하고자 하셨습니다. \n\n근육과 골격을 동시에 바로잡는 치료를 시행했습니다.',
            result: '좌우 부피 차이가 확연히 개선되었고, 전체적인 얼굴 볼륨이 줄어들어 이목구비가 또렷해졌습니다.'
        },
        'ba_6.png': {
            tag: '여드름 흉터',
            title: '복합 흉터 치료 (여성)',
            profile: '20대 여성 / 대학생',
            desc: '새살침, 고주파, 스킨부스터를 병행하여 흉터를 치료했습니다. \n\n깊은 흉터와 넓은 모공 개선에 집중했습니다.',
            result: '패인 흉터에 새살이 차오르고 피부결이 매끄러워져 화장이 들뜨지 않게 되었습니다.'
        },
        'ba_7.png': {
            tag: '여드름 흉터',
            title: '난치성 흉터 재생 (여성)',
            profile: '30대 여성 / 직장인',
            desc: '오래된 흉터를 새살침과 고주파 시술로 치료했습니다. \n\n피부 재생력을 높이는 스킨부스터를 함께 시술했습니다.',
            result: '흉터의 깊이가 얕아지고 피부 탄력이 증가하여 생얼 자신감을 되찾으셨습니다.'
        },
        'ba_8.png': {
            tag: '여드름 흉터',
            title: '붉은 자국 & 흉터 (여성)',
            profile: '20대 여성 / 취준생',
            desc: '여드름 후 남은 붉은 자국과 흉터를 동시에 케어했습니다. \n\n자극을 최소화하면서 재생을 유도하는 복합 시술을 진행했습니다.',
            result: '붉은 기가 잡히고 흉터가 개선되어 맑고 깨끗한 피부 톤을 회복했습니다.'
        },
        'ba_9.png': {
            tag: '여드름 흉터',
            title: '남성 심부 흉터 치료',
            profile: '20대 남성 / 대학생',
            desc: '남성분들의 깊고 강한 흉터를 새살침과 고주파로 강력하게 치료했습니다. \n\n스킨부스터로 재생 속도를 높였습니다.',
            result: '울퉁불퉁하던 피부 요철이 평평해지고 인상이 훨씬 깔끔하고 부드러워졌습니다.'
        },
        'ba_10.png': {
            tag: '여드름 흉터',
            title: '박스형 흉터 개선 (남성)',
            profile: '30대 남성 / 직장인',
            desc: '경계가 뚜렷한 박스형 흉터를 집중적으로 치료했습니다. \n\n새살침으로 흉터 밑바닥을 자극하여 살을 채웠습니다.',
            result: '흉터의 경계가 흐려지고 살이 차올라 조명 아래서도 매끄러운 피부를 확인했습니다.'
        }
    };

    if (storyModal && storyImage) {
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
            });
        });

        // Close logic
        function closeStoryModal() {
            storyModal.classList.remove('show');
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

    // 5. Christmas Countdown Logic
    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
        const targetDate = new Date('December 25, 2025 00:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownContainer.innerHTML = "<h3>Merry Christmas!</h3>";
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
            { name: "30% 할인권", weight: 1, type: "win", symbol: "🌟" },
            { name: "10% 할인권", weight: 1000, type: "win", symbol: "🎅" },
            { name: "5% 할인권", weight: 1500, type: "win", symbol: "🦌" },
            { name: "무료 상담권", weight: 2000, type: "win", symbol: "🎁" },
            { name: "다음 기회에...", weight: 5499, type: "lose", symbol: "☃️" }
        ];

        const symbols = ['🎅', '🎄', '🎁', '🦌', '☃️', '🌟'];
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
                        <div class="coupon-header">Kyurim Christmas Event</div>
                        <div class="coupon-body">
                            <div class="coupon-prize">${finalPrize.name}</div>
                            <div class="coupon-validity">유효기간: 2025년 12월 31일까지</div>
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
                prizeResult.innerHTML = `<span style="color: #666; font-size: 1.5rem;">아쉽지만 다음 기회에...🎄</span>`;
            }
        }
    }

});
