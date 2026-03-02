const skinMBTI = {
    currentQuestion: 0,
    scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    questions: [
        // E vs I (Oil vs Dry)
        {
            q: "세안 후 30분이 지났을 때 내 피부는?",
            a: [
                { text: "번들거리는 유분이 올라온다.", type: "E" },
                { text: "당기고 건조해서 로션이 필수다.", type: "I" }
            ]
        },
        {
            q: "오후 3시, 수정 화장을 할 때 나는?",
            a: [
                { text: "기름종이로 유분을 닦아낸다.", type: "E" },
                { text: "미스트를 뿌려 수분을 공급한다.", type: "I" }
            ]
        },
        // S vs N (Sensitive vs Non-sensitive)
        {
            q: "새로운 화장품을 샀을 때 나는?",
            a: [
                { text: "혹시 뒤집어질까 봐 걱정부터 된다.", type: "S" },
                { text: "별 걱정 없이 바로 얼굴에 바른다.", type: "N" }
            ]
        },
        {
            q: "미세먼지가 심하거나 환절기 때 피부는?",
            a: [
                { text: "바로 붉어지거나 가렵다.", type: "S" },
                { text: "큰 변화 없이 평소와 같다.", type: "N" }
            ]
        },
        // T vs F (Trouble vs Flawless)
        {
            q: "거울을 볼 때 가장 먼저 눈에 띄는 것은?",
            a: [
                { text: "울긋불긋한 여드름이나 뾰루지.", type: "T" },
                { text: "전체적인 피부 톤이나 결.", type: "F" }
            ]
        },
        {
            q: "내 피부의 최대 고민거리는?",
            a: [
                { text: "반복되는 트러블과 흉터.", type: "T" },
                { text: "기미, 주근깨 혹은 칙칙함.", type: "F" } // F is used for 'Clear' but here implies focus on tone rather than active trouble
            ]
        },
        // J vs P (Jelly/Firm vs Pore/Sagging)
        {
            q: "사진을 찍고 나서 보정할 때?",
            a: [
                { text: "턱선을 깎고 주름을 지운다.", type: "P" },
                { text: "피부 톤만 밝게 하면 만족한다.", type: "J" }
            ]
        },
        {
            q: "손가락으로 볼을 눌렀다 떼면?",
            a: [
                { text: "자국이 오래 남고 탄력이 없다.", type: "P" },
                { text: "바로 탱탱하게 돌아온다.", type: "J" }
            ]
        }
    ],
    results: {
        "ESTP": { title: "총체적 난국 [응급실 VIP]", desc: "유분은 넘치는데 속은 예민하고 트러블까지! 지금 당장 전문가의 손길이 시급합니다.", color: "#FF6B6B" },
        "ESTJ": { title: "철벽 방어 [강철 지성]", desc: "튼튼하지만 유분이 많은 지성 피부. 모공 관리만 잘해주면 완벽해질 수 있어요.", color: "#4ECDC4" },
        "ESFP": { title: "변덕쟁이 [트러블 메이커]", desc: "유분과 트러블이 수시로 올라오는 피부. 진정 관리가 필요해요.", color: "#FFE66D" },
        "ESFJ": { title: "사교적인 [유리알 지성]", desc: "유분은 있지만 관리가 잘 된 피부. 수분 밸런스만 맞춰주세요.", color: "#1A535C" },
        "ENTP": { title: "기름 부자 [산유국 만수르]", desc: "피부는 튼튼하지만 개기름이 고민. 피지 조절이 핵심입니다.", color: "#F7FFF7" },
        "ENTJ": { title: "완벽주의 [도자기 피부]", desc: "지성이지만 트러블 없이 깨끗하고 탄력 있는 축복받은 피부.", color: "#FF6B6B" },
        "ENFP": { title: "자유로운 [모공 부자]", desc: "피부는 건강하지만 모공이 넓어질 수 있어요. 탄력 관리에 집중하세요.", color: "#4ECDC4" },
        "ENFJ": { title: "카리스마 [탄력 여왕]", desc: "지성이지만 탄력 관리가 잘 되어 건강해 보이는 피부.", color: "#FFE66D" },
        "ISTP": { title: "속건조 [사막의 선인장]", desc: "겉은 번들거려도 속은 바짝 마른 수부지(수분부족지성). 수분 충전이 필수!", color: "#1A535C" },
        "ISTJ": { title: "원칙주의 [교과서 피부]", desc: "건조하지만 트러블 없이 깨끗한 피부. 보습만 잘하면 최상입니다.", color: "#F7FFF7" },
        "ISFP": { title: "섬세한 [유리알 공주]", desc: "건조하고 민감해서 작은 자극에도 반응해요. 저자극 케어가 정답.", color: "#FF6B6B" },
        "ISFJ": { title: "온실 속 [화초 피부]", desc: "깨끗하고 탄력 있지만 건조함이 적. 물광 관리가 필요해요.", color: "#4ECDC4" },
        "INTP": { title: "무심한 [건조 주의보]", desc: "트러블은 없지만 탄력이 떨어지고 건조해요. 안티에이징을 시작하세요.", color: "#FFE66D" },
        "INTJ": { title: "시크한 [냉미녀 피부]", desc: "건조하지만 탄력 있고 깨끗한 피부. 지금 상태를 유지하는 게 관건.", color: "#1A535C" },
        "INFP": { title: "몽상가 [트러블 소녀]", desc: "건조한데 트러블이 나는 복합성 고민. 유수분 밸런스를 맞춰야 해요.", color: "#F7FFF7" },
        "INFJ": { title: "타고난 [피부 금수저]", desc: "건조함만 잡으면 완벽한 피부. 프리미엄 관리로 광채를 더하세요.", color: "#FFD700" }
    },

    init: function () {
        const container = document.getElementById('skin-mbti-container');
        if (!container) return;

        container.innerHTML = `
            <div class="mbti-intro">
                <h3>나의 피부 MBTI는?</h3>
                <p>1분 만에 알아보는 내 피부 성격 테스트</p>
                <button onclick="skinMBTI.start()" class="btn btn-primary">테스트 시작하기</button>
            </div>
        `;
    },

    start: function () {
        this.currentQuestion = 0;
        this.scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        this.showQuestion();
    },

    showQuestion: function () {
        const container = document.getElementById('skin-mbti-container');
        const q = this.questions[this.currentQuestion];
        const progress = ((this.currentQuestion) / this.questions.length) * 100;

        container.innerHTML = `
            <div class="mbti-quiz">
                <div class="progress-bar"><div class="fill" style="width:${progress}%"></div></div>
                <div class="question-box">
                    <h4>Q${this.currentQuestion + 1}.</h4>
                    <p>${q.q}</p>
                </div>
                <div class="answer-box">
                    <button onclick="skinMBTI.select('${q.a[0].type}')">${q.a[0].text}</button>
                    <button onclick="skinMBTI.select('${q.a[1].type}')">${q.a[1].text}</button>
                </div>
            </div>
        `;
    },

    select: function (type) {
        this.scores[type]++;
        this.currentQuestion++;

        if (this.currentQuestion >= this.questions.length) {
            this.showResult();
        } else {
            this.showQuestion();
        }
    },

    showResult: function () {
        // Calculate MBTI Code
        const mbti = [
            this.scores.E >= this.scores.I ? 'E' : 'I',
            this.scores.S >= this.scores.N ? 'S' : 'N',
            this.scores.T >= this.scores.F ? 'T' : 'F',
            this.scores.J >= this.scores.P ? 'J' : 'P' // Fixed logic: J is Firm, P is Sagging. If J score high -> J.
        ].join('');

        const result = this.results[mbti] || this.results['ISFJ']; // Fallback
        const container = document.getElementById('skin-mbti-container');

        container.innerHTML = `
            <div class="mbti-result fade-in">
                <div class="result-header">당신의 피부 MBTI는</div>
                <h2 class="mbti-code">${mbti}</h2>
                <h3 class="mbti-title">${result.title}</h3>
                <p class="mbti-desc">${result.desc}</p>
                <div class="mbti-actions">
                    <a href="https://pf.kakao.com/_DxewtT/chat" target="_blank" class="btn btn-primary">
                        ${mbti} 맞춤 처방 받기
                    </a>
                    <button onclick="skinMBTI.start()" class="btn btn-outline">다시 하기</button>
                </div>
            </div>
        `;
    }
};

// Auto init if container exists
document.addEventListener('DOMContentLoaded', () => {
    skinMBTI.init();
});
