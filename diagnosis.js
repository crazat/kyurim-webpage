const diagnosisData = {
    diet: {
        title: "나의 비만 유형 찾기",
        desc: "체질에 따른 맞춤 다이어트가 성공의 열쇠입니다.",
        questions: [
            {
                q: "평소 식사 습관은 어떤가요?",
                a: [
                    { text: "식사량이 많고 기름진 음식을 좋아한다.", score: "A" },
                    { text: "식사 시간은 불규칙하고 폭식을 자주 한다.", score: "B" },
                    { text: "밥보다는 빵, 면, 군것질을 좋아한다.", score: "C" },
                    { text: "물만 먹어도 살이 찌는 것 같고 몸이 잘 붓는다.", score: "D" }
                ]
            },
            {
                q: "가장 고민되는 부위는 어디인가요?",
                a: [
                    { text: "전신에 살이 많고 탄탄한 편이다.", score: "A" },
                    { text: "윗배(상복부)가 유독 나와 보인다.", score: "B" },
                    { text: "팔뚝, 뱃살 등 부분적인 군살이 고민이다.", score: "C" },
                    { text: "하체(허벅지, 종아리)가 굵고 잘 붓는다.", score: "D" }
                ]
            },
            {
                q: "평소 컨디션은 어떤가요?",
                a: [
                    { text: "더위를 많이 타고 땀이 많다.", score: "A" },
                    { text: "속이 자주 쓰리거나 신물이 넘어온다.", score: "B" },
                    { text: "변비가 있거나 가스가 잘 찬다.", score: "C" },
                    { text: "추위를 많이 타고 손발이 차다.", score: "D" }
                ]
            }
        ],
        results: {
            A: { type: "실증 열비만형", desc: "식욕이 왕성하고 체력이 좋은 편입니다. 위장의 열을 내리고 식욕을 조절하는 처방이 필요합니다." },
            B: { type: "스트레스형 비만", desc: "불규칙한 식습관과 스트레스로 인한 폭식이 원인입니다. 자율신경 균형을 맞추는 치료가 중요합니다." },
            C: { type: "탄수화물 중독형", desc: "혈당 조절 능력이 떨어져 잉여 에너지가 지방으로 축적됩니다. 해독과 대사 기능 회복이 필요합니다." },
            D: { type: "허증 부종형", desc: "기초대사량이 낮고 순환이 안 되어 붓기가 살이 되는 타입입니다. 몸을 따뜻하게 하고 순환을 돕는 치료가 필요합니다." }
        }
    },
    skin: {
        title: "나의 피부 타입 찾기",
        desc: "피부 겉과 속을 함께 다스려야 근본적인 개선이 가능합니다.",
        questions: [
            {
                q: "피부 상태는 어떤가요?",
                a: [
                    { text: "기름기가 많고 여드름이 자주 난다.", score: "A" },
                    { text: "세안 후 당김이 심하고 각질이 잘 일어난다.", score: "B" },
                    { text: "T존은 번들거리고 U존은 건조하다.", score: "C" },
                    { text: "작은 자극에도 쉽게 붉어지고 예민하다.", score: "D" }
                ]
            },
            {
                q: "주로 발생하는 트러블은?",
                a: [
                    { text: "화농성 여드름과 붉은 자국", score: "A" },
                    { text: "잔주름과 탄력 저하", score: "B" },
                    { text: "좁쌀 여드름과 블랙헤드", score: "C" },
                    { text: "안면홍조와 가려움증", score: "D" }
                ]
            },
            {
                q: "평소 생활 패턴은?",
                a: [
                    { text: "기름진 음식이나 인스턴트를 즐긴다.", score: "A" },
                    { text: "물 섭취가 적고 커피를 자주 마신다.", score: "B" },
                    { text: "수면이 불규칙하고 스트레스를 많이 받는다.", score: "C" },
                    { text: "온도 변화에 민감하고 알레르기가 있다.", score: "D" }
                ]
            }
        ],
        results: {
            A: { type: "지성/여드름성 피부", desc: "피지 분비가 과다하고 내열이 많은 상태입니다. 청열 해독 치료와 피지 조절이 필요합니다." },
            B: { type: "건성/노화성 피부", desc: "피부 장벽이 약해지고 진액이 부족한 상태입니다. 보습과 재생을 돕는 자윤 치료가 필요합니다." },
            C: { type: "복합성/트러블 피부", desc: "유수분 밸런스가 깨져있는 상태입니다. 순환을 돕고 균형을 맞추는 치료가 필요합니다." },
            D: { type: "민감성/홍조 피부", desc: "피부 면역력이 저하되고 혈관이 확장된 상태입니다. 피부 장벽 강화와 진정 치료가 필요합니다." }
        }
    },
    asymmetry: {
        title: "안면비대칭 자가진단",
        desc: "얼굴의 균형을 되찾아 숨겨진 아름다움을 발견하세요.",
        questions: [
            {
                q: "거울을 볼 때 어떤 점이 신경 쓰이나요?",
                a: [
                    { text: "양쪽 눈썹 높이나 눈 크기가 다르다.", score: "A" },
                    { text: "코가 한쪽으로 휘어 보인다.", score: "B" },
                    { text: "입꼬리 높이가 다르고 웃을 때 비대칭이다.", score: "C" },
                    { text: "광대뼈의 크기나 위치가 다르다.", score: "D" }
                ]
            },
            {
                q: "평소 습관은 어떤가요?",
                a: [
                    { text: "한쪽으로만 음식을 씹는다.", score: "C" },
                    { text: "다리를 꼬거나 턱을 괴는 습관이 있다.", score: "D" },
                    { text: "잘 때 한쪽으로 엎드려 잔다.", score: "B" },
                    { text: "목이나 어깨가 항상 뻐근하다.", score: "A" }
                ]
            },
            {
                q: "턱관절 상태는 어떤가요?",
                a: [
                    { text: "입을 벌릴 때 '딱' 소리가 난다.", score: "C" },
                    { text: "입을 크게 벌리기 힘들다.", score: "D" },
                    { text: "턱 주변이 뻐근하고 통증이 있다.", score: "B" },
                    { text: "특별한 통증은 없지만 모양이 신경 쓰인다.", score: "A" }
                ]
            }
        ],
        results: {
            A: { type: "상안부 비대칭", desc: "두개골의 회전 변위가 원인일 수 있습니다. 두개천골요법과 경추 교정이 필요합니다." },
            B: { type: "중안부 비대칭", desc: "코와 광대뼈의 불균형이 주된 원인입니다. 비중격 교정과 안면 골격 교정이 필요합니다." },
            C: { type: "하안부/턱관절 비대칭", desc: "턱관절의 불균형과 편측 저작 습관이 원인입니다. 턱관절 교정과 근육 이완 치료가 필요합니다." },
            D: { type: "복합성/전신 비대칭", desc: "골반과 척추의 틀어짐이 얼굴까지 영향을 미친 경우입니다. 전신 체형 교정과 안면 교정을 병행해야 합니다." }
        }
    },
    body: {
        title: "체형 불균형 자가진단",
        desc: "바른 자세가 건강하고 아름다운 몸매를 만듭니다.",
        questions: [
            {
                q: "가장 불편한 증상은 무엇인가요?",
                a: [
                    { text: "목과 어깨가 항상 뭉치고 두통이 있다.", score: "A" },
                    { text: "등이 굽어 있고 옷태가 안 난다.", score: "B" },
                    { text: "허리가 자주 아프고 다리가 저리다.", score: "C" },
                    { text: "치마가 한쪽으로 돌아가거나 신발 굽이 한쪽만 닳는다.", score: "D" }
                ]
            },
            {
                q: "자신의 옆모습을 봤을 때 어떤가요?",
                a: [
                    { text: "머리가 어깨보다 앞으로 나와 있다 (거북목).", score: "A" },
                    { text: "어깨가 안으로 말려 있다 (라운드숄더).", score: "B" },
                    { text: "아랫배가 툭 튀어나와 있다 (골반전방경사).", score: "C" },
                    { text: "엉덩이가 처져 있고 등이 평평하다 (일자허리).", score: "D" }
                ]
            },
            {
                q: "평소 자세는 어떤가요?",
                a: [
                    { text: "스마트폰이나 모니터를 볼 때 고개를 숙인다.", score: "A" },
                    { text: "장시간 앉아 있는 일이 많다.", score: "C" },
                    { text: "다리를 꼬고 앉는 것이 편하다.", score: "D" },
                    { text: "구부정하게 걷거나 서 있는다.", score: "B" }
                ]
            }
        ],
        results: {
            A: { type: "거북목/일자목 증후군", desc: "경추의 커브가 소실되어 목과 어깨의 통증을 유발합니다. 경추 교정과 자세 교정이 시급합니다." },
            B: { type: "굽은 등/라운드 숄더", desc: "흉추가 후만되고 어깨가 말린 상태입니다. 흉추 교정과 가슴 근육 이완이 필요합니다." },
            C: { type: "요추 과전만/디스크", desc: "허리 뼈가 과도하게 꺾이거나 디스크 압박이 있는 상태입니다. 골반 교정과 코어 강화가 필요합니다." },
            D: { type: "골반 불균형/휜 다리", desc: "골반이 틀어지고 다리 길이가 차이 나는 상태입니다. 골반 교정과 보행 습관 교정이 필요합니다." }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const screen = document.getElementById('diagnosis-screen');
    let currentType = 'diet';
    let currentStep = 0;
    let scores = {}; // Store counts for A, B, C, D

    if (!screen) return; // Guard clause

    // Initialize
    initDiagnosis(currentType);

    // Tab Click Event
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentType = tab.dataset.type;
            initDiagnosis(currentType);
        });
    });

    function initDiagnosis(type) {
        currentStep = 0;
        scores = { A: 0, B: 0, C: 0, D: 0 };
        showStartScreen(type);
    }

    function showStartScreen(type) {
        const data = diagnosisData[type];
        screen.innerHTML = `
            <div class="diag-start fade-in">
                <h4>${data.title}</h4>
                <p>${data.desc}</p>
                <div class="diag-icon">
                    <i class="fa-solid fa-clipboard-check"></i>
                </div>
                <button class="btn btn-primary start-diag-btn">진단 시작하기</button>
            </div>
        `;
        screen.querySelector('.start-diag-btn').addEventListener('click', () => {
            showQuestion(type, 0);
        });
    }

    function showQuestion(type, index) {
        const data = diagnosisData[type];
        const question = data.questions[index];

        // Calculate progress
        const progress = ((index + 1) / data.questions.length) * 100;

        let html = `
            <div class="diag-question-container fade-in">
                <div class="diag-progress-bar">
                    <div class="diag-progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="diag-step">Q${index + 1}.</div>
                <h5 class="diag-question-text">${question.q}</h5>
                <div class="diag-options">
        `;

        question.a.forEach(option => {
            html += `<button class="diag-option-btn" data-score="${option.score}">${option.text}</button>`;
        });

        html += `
                </div>
            </div>
        `;

        screen.innerHTML = html;

        const options = screen.querySelectorAll('.diag-option-btn');
        options.forEach(btn => {
            btn.addEventListener('click', () => {
                const score = btn.dataset.score;
                scores[score]++;

                if (index < data.questions.length - 1) {
                    showQuestion(type, index + 1);
                } else {
                    showResult(type);
                }
            });
        });
    }

    function showResult(type) {
        // Find highest score
        const maxScore = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        const result = diagnosisData[type].results[maxScore];
        const naverBookingUrl = "https://map.naver.com/p/entry/place/37885828?lng=127.4881999&lat=36.6357180&placePath=%2Fbooking%3FbookingRedirectUrl%3Dhttps%3A%2F%2Fm.booking.naver.com%2Fbooking%2F13%2Fbizes%2F188566%3Ftheme%3Dplace%26entry%3Dpll%26lang%3Dko%26entry%3Dpll&area=pll&c=15.00,0,0,0,dh";

        screen.innerHTML = `
            <div class="diag-result fade-in">
                <div class="result-header">당신의 유형은?</div>
                <h3 class="result-type">${result.type}</h3>
                <p class="result-desc">${result.desc}</p>
                
                <div class="result-box">
                    <p class="disclaimer">
                        <i class="fa-solid fa-circle-info"></i>
                        위 결과는 간단한 자가진단이며, 정확한 상태 파악과 치료를 위해서는<br>
                        반드시 내원하여 원장님과의 1:1 정밀 상담이 필요합니다.
                    </p>
                </div>

                <div class="result-actions">
                    <button class="btn btn-outline restart-btn">다시 하기</button>
                    <a href="${naverBookingUrl}" target="_blank" class="btn btn-primary booking-btn">
                        <i class="fa-solid fa-calendar-check"></i> 상담 예약하고 정확한 진단 받기
                    </a>
                </div>
            </div>
        `;

        screen.querySelector('.restart-btn').addEventListener('click', () => {
            initDiagnosis(type);
        });
    }
});
