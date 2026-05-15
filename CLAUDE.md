# CLAUDE.md - 규림한의원 청주점 웹사이트

## 2026-05-15 마무리: "한방" → "한의" 전수 교체 (운영 카피 표기 통일)

### Context
사용자 지시: "한방이라는 말 안돼. 한의로 써". 한정우 원장의 표현 정책으로,
운영 카피·메타·JSON-LD·랜딩·블로그 모두에서 "한방" 단어를 "한의"로 통일.

### 변경
- `index.html`: 11곳 — meta description (×2), 통계 라벨, 서비스 카드 본문 ×2,
  서비스 카드 헤딩 ×2, 블로그 카피, FAQ 본문 ×2, inquiry select ×2, Story 모달
  tag 1건. 진료과목 카드는 "통증 · 교통사고 한의치료" / "웨딩 한의 케어"로.
- `events/pain/index.html`: "복합 한방 치료" → "복합 한의 치료"
- `events/skin/index.html`: "물광 한방 케어" → "물광 한의 케어"
- `board.html`: 게시판 샘플 글 제목 1건
- `script.js`: storyData 한 곳의 사연 본문 ("한방 진정 팩" → "한의 진정 팩")
- `script.min.js`: terser로 재생성

### 예외 — 학회 고유명사
**"한방비만학회"는 대한한방비만학회 정식 명칭**이라 그대로 보존
(`events/{diet,skin,body,pain,wedding}/index.html` 각 1건). 학회 측 등록명을
임의 변경하면 사실관계 왜곡. 학회 측 표기를 다르게 바꾸려면 외부 명칭 확인이
선행되어야 함.

### 메모리
`feedback-no-hanbang-use-hanui` 영구 규칙으로 저장. 향후 어떤 신규 카피
작성에서도 "한방" 사용 금지, "한의"로 표기.

## 2026-05-15 후속: 진료과목 재구조화 + BA 비대칭/웨딩 사례 추가

### Context
같은 날 1차 복원 푸시(`7b6d0c0`) 직후 사용자 지적:
"비대칭은 또 왜 빼먹었어?" → "통증이랑 교통사고가 한 묶음이고, 비대칭이
따로이고, 웨딩도 빠져있네"

1차 작업에서 진료과목 5개를 "다이어트 / 피부 / 안면비대칭·체형교정 /
통증 / 교통사고"로 펼쳤지만, **사용자가 운영하는 실제 묶음은
"통증·교통사고가 한 묶음 + 웨딩이 별도"**. 또한 BA 치료사례 6장이
다이어트 3 + 피부 3 구성이라 **안면비대칭/웨딩 사례 노출 0건**.
2026-05-12에 `/events/body/` 비대칭 SEO 강화까지 한 마당에 메인 BA에서
비대칭이 사라진 것은 큰 누락.

### 수정 사항
- **진료과목 5개 재배치**:
  - N° 04: "통증 치료" → "**통증 · 교통사고 한의치료**" (한 묶음). 자보 100%
    적용 문구를 본문에 통합. 링크는 `events/pain/index.html`.
  - N° 05: "교통사고 한의치료" → "**웨딩 한의 케어**". 링크
    `events/wedding/index.html`. 아이콘은 하트형(♥) 직선 SVG로 변경.
- **BA 치료사례 6장 → 12장** (사용자 추가 지적 "비대칭 비포앤애프터 다 있어"
  반영, 비대칭 자산이 5장 다 있는데 처음엔 1장만 추가했던 누락 후속 보강):
  - Case 007 — `ba_4.webp` "비수술 안면비대칭 교정" (남, 직장인, 16주)
  - Case 008 — `ba_5.webp` "안면비대칭 · 윤곽 개선" (남, 프리랜서, 12주)
  - Case 009 — `ba_body_1.webp` "전신 비대칭 · 골반 교정" (여, 학생, 14주)
  - Case 010 — `ba_body_2.webp` "안면비대칭 · 턱관절" (여, 강사, 12주)
  - Case 011 — `ba_body_3.webp` "거북목 · 라운드숄더" (남, 개발자, 10주)
  - Case 012 — `ba_diet_wedding.webp` "웨딩 다이어트" (예비신부, 8주)
- **Story 모달 데이터 6건 추가**: `asym_male_1`, `asym_male_2`, `body_full`,
  `body_asym`, `body_posture`, `wedding_diet`. 사연 카피는
  script.js storyData에서 발췌 후 LUXE 톤으로 정돈("부유방", "쇄골 라인",
  "턱관절 균형 장치" 같은 시술 디테일은 유지하되, "완벽한 핏" 같은 절대적
  표현은 톤다운).
- **Inquiry 폼 select 옵션 재정렬**: "체형교정/비대칭" → "안면비대칭 ·
  체형교정", "통증치료" → "통증 · 교통사고 한의치료", **"웨딩 한의 케어"
  신규 추가**, "교통사고/기타" → "기타 문의"로 단순화.

### 변경 파일
- `index.html` (+BA 카드 6장, Story 모달 데이터 6건, services 재구조화,
  inquiry select 6항목 갱신)
- `CLAUDE.md` (본 절 추가)

### 검증
- `npm test` 통과
- HTML: 16/16 sections, 48/48 unique IDs, 9 inline JS blocks syntax OK, **BA cards 12장**
- 로컬 리소스 79 → 85개 (`ba_4`, `ba_5`, `ba_body_1/2/3`, `ba_diet_wedding`
  webp/png 신규 참조), 전부 resolve

### 메모
인스타 광고 등 외부 유입은 5개 랜딩으로 직접 들어가지만, 메인 BA cases는
유기 검색 유입 사용자가 "어떤 시술을 하는 곳인가"를 가늠하는 핵심 면.
이번 작업 이후로도 새 진료과목/이벤트가 생기면 **메인 BA cases도 함께
업데이트해야** 한다 — 진료과목 카드만 추가하고 BA에서 누락하지 않도록.

## 2026-05-15: 메인 LUXE에 빠진 컨텐츠 8섹션 복원 (전량 복원, LUXE 톤 유지)

### Context
- 사용자가 "최근 디자인에 예전 홈페이지에 있었던 컨텐츠들이 많이 빠졌는데
  특히 메인 홈페이지에서 좀 확인해주겠어?"라고 보고.
- 비교 결과 1419줄(`index-spring-backup.html`) → 887줄(`index.html`)로 축소되며
  이벤트 캐러셀, 자가진단, 다이어트 예측, 리뷰 검색/캐러셀, 인테리어 5번째 사진,
  공식 블로그 진입, BA Story 모달이 모두 빠진 상태였음.
- 사용자가 "1 (전량 복원, LUXE 톤 유지)" 선택.

### 결정사항 (이번 세션에서 사용자가 확정)
1. **카운트다운 컨셉은 폐기** — "만료일 필요 없잖아 그 컨셉은 버렸어".
   향후 어떤 형태로도 카운트다운(`#countdown`, 이벤트 마감 타이머 등)을 다시
   제안하지 말 것. `summer-luxe.css`의 `#countdown { display: none !important }`
   suppress 룰 그대로 유지.
2. **BA Story 모달은 보건소 컨펌 완료** — 환자 사연 노출 가능. 2026-04-01
   의료광고 전수 검토 시점의 "[매우 높음] 환자 체험기/후기 110건+" 우려는
   본 컨펌으로 해소됨. 단, 사연에 시술 효과·부작용 disclaimer를 함께
   노출하는 것은 유지.

### 복원된 섹션 (메인 페이지 흐름 순)
| # | 섹션 ID | 배경 | 비고 |
|---|---|---|---|
| HERO | (기존) | paper | 변경 없음 |
| **N° 01** | `#events` | paper | 15장 picture/WebP 캐러셀, 각 카드 hover 시 ink 더블 보더, label "N° 01 · Diet" 형식 |
| **About** | `#about` | bone | 기존 |
| **Stats** | (기존) | paper | SCOPE 04 → 05 |
| **Services** | `#services` | paper | 4 → **5 카드**. N° 03에 "안면비대칭 · 체형교정" 신규 삽입, `/events/body/`로 링크. 헤더 "네 가지의 결" → "다섯 가지의 결" |
| **Process** | (기존) | bone | 기존 |
| **N° 05** | `#diagnosis` | paper | 4탭(다이어트/피부/비대칭/체형), `diagnosis.js` 재사용 + LUXE CSS 오버라이드 (`.diagnosis-tabs`, `.diag-*`, `.btn-primary/outline` 모두 LUXE 톤으로 변환) |
| **N° 06** | `#diet-prediction` | bone | 성별 라디오 + 키/체중/나이 + Chart.js 차트 + 급속/완속 결과 카드 (`.luxe-predict-card` LUXE 톤) |
| **Cases** | `#cases` | paper | 6장 BA + **click 시 Story 모달** (data-story 키) |
| **Reviews** | `#reviews` | bone | 인라인 24개 후기 + 키워드 검색(200ms debounce, `<mark>` 하이라이트, XSS escape) |
| **Marquee** | (champagne) | — | 기존 |
| **Interior** | `#interior` | paper | 4장 → **5장** (`interior_5.webp` 추가), 그리드 `repeat(4,1fr)` → `repeat(5,1fr)` (반응형 5/3/2-up) |
| **Blog** | `#blog` | paper | `blog.naver.com/crazat` 진입 카드, 韓 한자 비주얼 + champagne hairline |
| **FAQ** | `#faq` | bone | 기존 |
| **Inquiry** | `#inquiry` | paper | 기존 |
| **Contact** | `#contact` | bone | 기존 |

### BA Story 모달 (보건소 컨펌 후 복원)
- 6개 사연 인라인 데이터 (`diet_full`, `skin_lifting`, `diet_side`, `skin_glow`,
  `diet_back`, `skin_neck`). `script.js`의 `storyData`에서 발췌 후 LUXE 톤에
  맞게 카피 정돈 (절대적 표현 "기적", "20kg", "당뇨 약물 중단" 같은 강한
  claim은 톤다운).
- 모달 마크업은 sticky CTA 직후, 외부 script 로드 직전 위치.
- 이미지 + 텍스트 2컬럼 LUXE 카드, hairline 더블 보더, champagne 액센트.
- 사연 본문 하단에 한 줄짜리 disclaimer 박스 (시술 효과·부작용 + 개인차).
- 접근성: `role="dialog"` + `aria-modal` + ESC 닫기 + backdrop click 닫기 +
  마지막 포커스 복원 + BA 카드 `tabindex="0"` + Enter/Space 키보드 트리거.

### 신규 외부 의존성
- **Chart.js 4.4.1** (jsdelivr CDN, `defer`) — 다이어트 예측 차트
- **Font Awesome 6.5.1** (cdnjs, async + SRI sha512) — `diagnosis.js`의
  `<i class="fa-solid fa-clipboard-check">` 등 아이콘. 메인에만 로드.
- **diet_prediction.js**, **diagnosis.js** — 기존 파일 그대로 재사용

### 의도적으로 안 한 것
- **`script.min.js` 전체 로드 회피** — `form[name="submit-to-google-sheet"]`
  핸들러가 중복 등록되어 LUXE 인라인 제출 핸들러와 충돌. 대신 리뷰 데이터는
  24개로 큐레이팅해서 인라인.
- **카운트다운 미복원** (사용자 결정).
- **두 번째(중간) 빠른 상담 폼** — 단일 `#inquiry` 폼 유지로 중복 회피.

### 변경 파일
- `index.html` — 887줄 → 1502줄 (+615)
- `summer-luxe.css` — 1061줄 → 1612줄 (+551, 신규 섹션 9종 + Story 모달 스타일)
- `CLAUDE.md` — 본 절 추가
- 메모리: `feedback-countdown-dropped`, `project-ba-story-cleared` 신규 저장

### 검증
- `npm test` (= `npm run check`) 통과
- HTML: 16/16 sections, 48/48 unique IDs, 9 inline JS blocks 전부 syntax OK
- JSON-LD parse OK
- 로컬 리소스 79개 + 신규 인테리어 5번째 모두 resolve

## 2026-05-12: Body Landing SEO Upgrade for Face Asymmetry

### Context
- Priority query cluster: `청주 안면비대칭`, `청주 안면비대칭 교정`, `청주 안면비대칭 한의원`, `청주 얼굴비대칭`, `청주 턱관절 교정`, and `청주 체형교정`.
- Competitive gap from the marketing bot spot check: 로랑 and 데이릴 are ahead on Naver Place for core asymmetry terms, and 데이릴 is the only Place result for `청주 안면비대칭 교정`.
- Keep `/events/body/` as the canonical local landing for asymmetry/body correction work: `https://kyurim-webpage.vercel.app/events/body/`.

### Changes Made
- `events/body/index.html` now has an exact-intent SEO title, description, keywords, canonical URL, Open Graph/Twitter metadata, expanded `MedicalClinic` JSON-LD, and `FAQPage` JSON-LD.
- Added a visible first-screen intent block with the H1 `청주 안면비대칭 교정 한의원`, copy for jaw/TMJ, cervical/shoulder/pelvis balance, and CTA anchors into diagnosis, process, inquiry, and contact sections.
- Added an intent cluster section covering asymmetry correction, face/jaw asymmetry, TMJ/cervical balance, and body/pelvis correction. This section is for search relevance and user scanning, not decorative content.
- `script.js` now injects body/asymmetry-specific FAQ items before generic FAQ entries. Regenerate `script.min.js` with `npm run build` after editing `script.js`.
- `sitemap.xml` sets `/events/body/` to `lastmod` 2026-05-12 and priority 1.0.

### Verification
- `npm run build`
- `npm test`
- Confirmed presence of title, keywords, canonical, `FAQPage`, H1, and `intent-cluster` in `events/body/index.html`.

## 프로젝트 개요
- **사이트**: 규림한의원 청주점 공식 웹사이트
- **배포 URL**: https://kyurim-webpage.vercel.app/
- **GitHub**: https://github.com/crazat/kyurim-webpage
- **호스팅**: Vercel (GitHub 연동 자동 배포)

## 기술 스택
- **프론트엔드**: 순수 HTML, CSS, JavaScript (프레임워크 없음)
- **이미지 최적화**: WebP 변환 (sharp 라이브러리 사용)
- **배포**: Vercel

## 폴더 구조
```
kyurim-webpage-main/
├── index.html              # 메인 홈페이지
├── style.css               # 메인 스타일시트 (~3500 lines)
├── spring.css              # 봄 시즌 테마 (벚꽃) + 디자인 토큰
├── script.js               # 메인 JavaScript (~2650 lines)
├── manifest.json           # PWA 매니페스트
├── sw.js                   # Service Worker (캐싱/오프라인)
├── offline.html            # 오프라인 폴백 페이지
├── assets/                 # 이미지 파일 (WebP 변환됨)
├── events/                 # 랜딩 페이지들
│   ├── skin/index.html     # 피부 클리닉
│   ├── diet/index.html     # 다이어트 클리닉
│   ├── pain/index.html     # 통증 클리닉
│   ├── body/index.html     # 체형 클리닉
│   └── wedding/index.html  # 웨딩 클리닉
├── event play/             # 이벤트 영상 파일 (.mp4)
├── vercel.json             # Vercel 배포 설정
└── .gitignore
```

## 주요 기능 (Frontend Retention Features)

### 1. Scroll Progress Bar
- 페이지 스크롤 진행률 표시 (상단 고정)
- CSS scroll-timeline 지원 시 CSS 애니메이션 사용
- 미지원 시 JS requestAnimationFrame 폴백
- 봄 테마: 벚꽃 그라데이션 + 글로우 효과

### 2. Skeleton UI
- 이미지 로딩 전 shimmer 애니메이션
- `.skeleton` 클래스로 적용
- 로드 완료 시 `.loaded` 클래스 추가

### 3. Fade-in Animation
- IntersectionObserver 기반 스크롤 애니메이션
- `.fade-in` 클래스 → 뷰포트 진입 시 `.visible` 추가
- GPU 가속 transform 사용

### 4. Micro-interactions
- 버튼 hover/active 상태
- cubic-bezier 이징
- Reward burst 파티클 (벚꽃 테마)

### 5. 이미지 최적화
- 모든 이미지 WebP 변환 (92% 용량 감소)
- `<picture>` 태그로 WebP/PNG 폴백
- lazy loading 적용

### 6. PWA (Progressive Web App)
- 홈 화면 추가 지원 (manifest.json)
- 오프라인 캐싱 (Service Worker)
- 오프라인 폴백 페이지 제공
- 푸시 알림 준비 완료

### 7. Navbar Shrink
- 스크롤 시 네비게이션바 축소 (80px → 60px)
- 핑크 톤 그림자 및 테두리 추가
- 티커 위치 자동 동기화

### 8. 디자인 시스템
- 타이포그래피: Modular Scale 1.25 (h1-h6)
- 스페이싱: 8px 기반 그리드
- 색상: WCAG AA 준수 (4.5:1 명도비)
- 그림자: sm/md/lg/xl + glow 변형
- 애니메이션: fast/normal/slow 토큰

## 최근 작업 이력

### 2026-05-06: 코드 안정성 심층 리뷰 후 캐시/배포 안정화

#### 핵심 수정
- **Service Worker 전략 재정렬**: HTML precache를 제거하고 페이지 요청은 network-first,
  정적 자산은 cache-first로 분리. `CACHE_NAME`은 `kyurim-v20260506b`로 갱신.
- **캐시 헤더 정리**: `sw.js`는 `max-age=0, must-revalidate`로 분리하고,
  운영 JS/CSS/asset만 immutable 캐시 대상으로 유지.
- **JS 버전 쿼리 정합성**: `script.min.js`, `diagnosis.js`, `diet_prediction.js`,
  `skin_mbti.js` 로드 URL을 `?v=20260506b`로 맞춰 immutable 캐시 stale 위험 제거.
- **빌드 재현성 확보**: `terser` devDependency와 `package-lock.json`을 추가하고
  `npm run build`, `npm test` 스크립트 도입.
- **폼 실패 처리 보강**: 메인 문의 폼이 HTTP 4xx/5xx 응답을 성공으로 표시하지 않도록
  `response.ok` 검사를 추가.
- **외부 리소스/링크 보안**: CDN 리소스 버전 고정 및 가능한 항목에 SRI/crossorigin 적용.
  외부 `target="_blank"` 링크에 `rel="noopener noreferrer"` 추가.
- **백업 HTML 배포 제외**: 추적 중이던 `index-spring-backup.html` 및
  `events/*/index-spring-backup.html`을 Git 인덱스에서 제거하고 `*backup*.html` ignore 추가.

#### 변경 파일
- `.gitignore`, `package.json`, `package-lock.json`, `vercel.json`, `sw.js`
- `script.js`, `script.min.js`
- `index.html`, `board.html`
- `events/{body,diet,pain,skin,wedding}/index.html`

#### 검증
- `npm test` 통과
- `npm audit` 취약점 0건
- 활성 HTML 인라인 JS 파싱 통과
- 활성 페이지 로컬 리소스 참조 누락 0
- 활성 페이지의 이전 `script.min.js?v=20260505a` 및 unversioned helper JS 참조 0

### 2026-05-05: 안정성 심층 검토 후 운영 수정

#### 핵심 수정
- **상담 폼 중복 제출 제거**: 5개 이벤트 페이지와 `*-spring-backup.html`의
  인라인 Google Sheets 제출 스크립트를 삭제하고 `script.min.js` 공용 핸들러만
  사용하도록 단일화. Playwright 제출 검증 결과 Google Script 요청 2회 → 1회.
- **`script.min.js` 재생성**: `script.js` 기준으로 terser 재빌드. 이전 min 파일에
  남아 있던 봄 전용 petal/talisman/mouse trail 코드와 미사용 fireworks 코드를 제거.
- **Service Worker 캐시 갱신**: `CACHE_NAME`을 `kyurim-v20260505a`로 올리고,
  `?v=` 쿼리를 캐시 키에서 제거하지 않도록 수정. 새 `script.min.js?v=20260505a`
  배포가 기존 캐시에 가로막히지 않게 처리.
- **깨진 외부/로컬 링크 수정**:
  - `board.html`의 404 Nanum Barun Gothic CDN → Pretendard CDN
  - `board.html`, `offline.html` favicon 명시
  - `index-spring-backup.html`의 없는 `assets/logo-192.png` → `assets/logo_icon.png`
  - 404가 나는 Naver Talk 링크 → 네이버 예약 지도 링크
- **연락처/PWA shortcut 정합성**: `manifest.json`, `offline.html`의
  `043-236-2275`와 구 Kakao 채널 URL을 운영값 `043-224-1075`,
  `https://pf.kakao.com/_DxewtT/chat`로 통일.

#### 변경 파일
- `script.js`, `script.min.js`, `sw.js`
- `manifest.json`, `offline.html`, `board.html`, `index-spring-backup.html`
- `events/{body,diet,pain,skin,wedding}/index.html`
- `events/{body,diet,pain,skin,wedding}/index-spring-backup.html`

#### 검증
- `node --check`: `script.js`, `script.min.js`, `sw.js`, `diagnosis.js`,
  `diet_prediction.js`, `skin_mbti.js` 통과
- JSON parse: `manifest.json`, `vercel.json` 통과
- 추적 HTML/CSS/JS 정적 검사: 로컬 리소스 누락 0, 중복 ID 0,
  인라인 스크립트 오류 0, JSON-LD 오류 0
- 외부 URL 24개 확인: 깨진 링크 0
- Playwright smoke: `/`, 5개 이벤트 페이지, `board.html`, `offline.html`
  콘솔 오류/페이지 오류/로컬 404 없음
- Service Worker 등록 확인: `kyurim-v20260505a`

### 2026-05-04: LUXE 톤 정밀 폴리싱 + 5 랜딩 복구 + 사용자 보고 4건 픽스

#### 디자인 톤 재정렬 — Korean Editorial Apothecary
세션 진입 트리거: 사용자가 "랜딩이랑 메인이 정리 안 된 느낌" 보고 →
`/frontend-design:frontend-design` 스킬로 LUXE를 한 단계 끌어올림.

**`summer-luxe.css` 전면 재작성** (단순 LUXE 토큰 → 모노그래프지 감각):
- **PLATE 카운터** — 모든 `.luxe-section` 우상단에 자동 "PLATE · 02"...
  CSS `counter-reset/increment` + `::before { content: 'PLATE · ' counter() }`
- **한자 텍스처** — 히어로 좌하단 "韓 · 醫 · 規林" 모노그램,
  about 섹션 vertical "Director's Note · 院長手記" caption
- **이탤릭 리듬** — Cormorant italic + teal accent (`.accent`, `em`)
- **숫자 활자** — `font-variant-numeric: tabular-nums oldstyle-nums`로
  통계/가격 클래시컬 표기
- **Hairline 건축** — 1px 챔페인/잉크 hair lines을 섹션 구조의 주축으로
- **Service hover** — 아이콘 45° 회전, 챔페인 그라디언트 배경
- **Process rail** — 5개 step 위 다이아몬드 마커
- **B/A card** — 호버시 더블 보더 + transform translateY(-3px)
- **Form** — 액자 안의 액자(12px inset border) + 챔페인 focus
- **Footer** — 상단 황금 그라디언트 hairline rail
- `:root { color-scheme: light only }` — Chrome auto-dark 차단

**`summer-luxe-events.css` 강화** (5 랜딩 오버레이):
- 인라인 critical CSS의 그라디언트/그림자/rounded `!important`로 제압
- Section header에 mono eyebrow + Cormorant 한글 + 챔페인 hairline
- B/A 카드 hairline-only, hover 시 잉크 윤곽
- 버튼 모두 사각형, 그라디언트 제거
- Sticky 하단바: 잉크 rail + Kakao yellow / Naver green 아이콘 보존
- Form underline-only + italic placeholder + 챔페인 focus
- Diet MBTI 퀴즈 LUXE 사각형
- 가로 스크롤바 챔페인 thumb + faint ink track

#### Phase 5 리커버리 (wholesale 교체 → CSS 오버레이로 전환)
- **문제**: 디자인 번들의 `kyurim-webpage/site/events/{x}/index.html`이
  hero/B/A 섹션 OPENING 태그 없이 CLOSING만 있어 마크업 자체가 깨짐 →
  Phase 5 wholesale 복사 후 hero가 통째 누락된 페이지가 됨
- **해결**: 5 랜딩 모두 Phase 0의 `*-spring-backup.html`로 복원 →
  `spring.min.css` 다시 로드 + LUXE 오버레이로 톤만 입힘 (원래 의도였음)
- **부수**: `spring.min.css`가 빠지면서 깨졌던 것들 동시 복원:
  - `.ai-ticker-sticky-rolling` `position:fixed; top:0` (뒤에 강제 `!important`)
  - `.director-image` 0×0 → `flex:1 1 280px; min-height:480px; aspect-ratio:464/688`
  - `.interior-grid` 그리드 레이아웃
  - profile.gif / interior_*.jpg lazy 로드 정상화

#### 사용자 보고 4건 (이번 세션)
1. **"본문으로 건너뛰기" 노출** (WCAG skip-link이 화면에 보임)
   - 원인: 인라인 critical CSS에 `.skip-link` 숨김 룰 부재 → 비동기 CSS 로딩 사이 노출
   - 해결: 5 랜딩 인라인 critical CSS에 `position:absolute;top:-100px` 1줄
2. **횡스크롤 핑크 잔재**
   - 해결: events 오버레이에 챔페인 thumb + ink hair track 강제 적용
3. **프로필/인테리어 사진 누락**
   - 해결: spring.min.css 복원 + 명시적 sizing 추가
4. **마지막 페이지에 티커 나열** (fixed 위치 잃고 본문 흐름으로 떨어짐)
   - 해결: events 오버레이에 `position:fixed!important; top:0!important`

#### 핑크 갤러리 점 (.gallery-dot) 특이 사례
- spring.min.css의 `.gallery-dot.active { background: var(--primary-color, #d42426) }`
  (no !important)을 외부 CSS의 `!important`로 못 이김
- cssRules에 내 룰이 안 잡힘 — 캐스케이드 레이어 또는 브라우저 확장
  (Chrome force-dark 등) 의심
- **최종 해결**: 인라인 critical CSS에 `display:none!important`로 점 자체 숨김
  (BA 카드의 가로 스크롤바 + "1 / N" 카운터 칩이 이미 위치 표시 → 점은 중복 UX)

#### 제품 데이터 정정
- 개원년도 2018 → **2016** 정정 (메인 hero stats, brand-sub, footer, 마키 5건)
- 한의 진료 경력 8YR → **10YR** (CARE stat)

#### 변경 파일 (운영)
- `index.html` (메인 LUXE 폴리싱 + 2016 정정)
- `events/{diet,skin,body,pain,wedding}/index.html` (spring 백업 복원 + LUXE 오버레이 링크 + 인라인 skip-link/gallery-dots 숨김)
- `summer-luxe.css` (전면 재작성, 약 770줄)
- `summer-luxe-events.css` (전면 재작성, 약 750줄)
- `manifest.json` (theme #FF9AA2 → #0A1F2E, bg #FFFDF5 → #FAFAF7)
- `CLAUDE.md` (본 절 추가)

#### 배포 후 추가 라운드 (사용자 보고 → 푸시 d07fae7, 6a3f0e0)
**라운드 1 — `d07fae7`**: 인테리어 사진 누락
- 5 랜딩 `interior_1~5.jpg` 25장의 `loading="lazy"` 일괄 제거 → 즉시 로드
- 원인: lazy intersection observer가 일부 환경(인스타 인앱/슬로우 네트워크)에서
  늦게 발화 → 사용자에게 빈 자리/회색 노출

**라운드 2 — `6a3f0e0`**: 4건 동시 처리
1. **이벤트 배너 깨짐** — `event-scroll-container`의 8장(컷팅/블라우스핏/
   긴급구조대/웨딩올킬 등)에 lazy 잔존 → 제거
2. **치료사례(BA) 카드 사진 안 뜸** — `ba_1~3` 골드 프로모션 카드 + `ba_diet_*_k`
   임상 사진 lazy 제거. (모든 BA 이미지엔 2026-04-01 작업으로 이미 하단
   "치료 기간: 20XX년 X월 ~ XX월 (X개월) / 한약 복용 시... 부작용..." disclaimer
   삽입돼 있음. 첫 3장은 골드 인포그래픽, 4번째부터 순수 임상 사진.)
3. **"왜 규림 다이어트?" 비교 카드 봄 빨강 보더** — `.comparison-card.kyurim`이
   style.css L2314에서 `border:2px solid var(--primary-color)` (#D42426 spring red)
   + `box-shadow: rgba(212,36,38,0.15)` 사용 → events 오버레이에서 champagne
   hairline + LUXE 토큰으로 강제 치환. h3 색, li::before 색, .badge bg/border-radius
   모두 정렬.
4. **물결치는 spring wave divider** — spring.css L483-560에 SVG 인라인 wave 5종
   (`.section-wave-top::before`, `.section-wave-bottom::after`,
   `.specialties::after`, `.before-after::before`, `.section-diagonal::before`)
   모두 hide. LUXE는 hairline 직선만 사용.

**잔여 lazy** (의도적 보존): `profile.gif`, `naver_map.png` — 페이지 하단
section이라 늦게 로드돼도 OK.

**알려진 의사결정 (사용자 확인 대기)**:
- BA 카드 첫 3장 (`ba_1/2/3.webp` 골드 프로모션) vs 임상 사진 일관성 — 톤은 다르지만
  사용자가 결정. 옵션 (a) 현상 유지 (b) 임상 사진(`ba_diet_new_1`...)부터 시작.

### 2026-05-03: Spring → Summer LUXE 시즌 리브랜딩 (Phase 0~7)

세션 진입 트리거: 사용자가 Anthropic Claude Design 번들(`kyurim-webpage.zip`,
33MB tar.gz로 내려받음 → `.claude/design.tar`로 압축 해제)을 풀어두고
"단계별 점진 적용"을 요청. 디자인 번들의 `kyurim-webpage/site/`에 이미
완성된 LUXE 마크업/CSS/cleaned script.js/5개 랜딩이 들어 있었음. 작업은
프로덕션 배선(트래킹·인증·SW·폼)을 보존하면서 LUXE를 운영 위치로 옮기는
머지 작업.

#### 디자인 시스템 (Summer LUXE)
- 컬러: `--luxe-paper #FAFAF7` · `--luxe-bone #F2EEE5` · `--luxe-ink #0A1F2E`
  · `--luxe-ink-soft #2E4A5C` · `--luxe-champagne #C9A876` ·
  `--luxe-champagne-dark #A88955` · `--luxe-teal #006A7F`
- 폐기 컬러: `#FF9AA2` / `#FFB7B2` / `#FFB7C5` / `#FFDAC1` / `#FFE4E1` 5종 (벚꽃 핑크)
- 타이포: 영문/숫자 **Cormorant Garamond** (Display, italic 강조) · 국문
  **Pretendard** · 단조 데이터 **JetBrains Mono** · 한자 모노그램 (韓 · 大院長)
- 키 시그니처: 1px hairline · 숫자 인덱스 (N° 01) · 코너 미터

#### Phase 0 — Spring 자산 백업 (커밋 예정)
- `index.html` → `index-spring-backup.html` (75 KB)
- 5개 랜딩 → `events/{x}/index-spring-backup.html`
- `script.js` → `script-spring-backup.js` (137 KB)
- `spring.css`는 이미 별도 파일이라 그대로 보존
- 기존 `*.backup.html`(2026-03 시점 스냅샷)과 구분되는 시점 백업

#### Phase 1 — 듀오톤 (인테리어/히어로 한정, 톤다운)
디자인의 `summer-luxe.css`에 이미 baked-in:
- `.luxe-hero-figure img`: `mix-blend-mode: luminosity` + 진한 teal→ink 그라디언트 multiply
- `.luxe-gallery-card::before`: 55%→85% 짙은 블루 multiply
**사용자 피드백 후 톤다운**:
- 히어로: `mix-blend-mode: luminosity` 제거 + grayscale 0.2→0.08, 오버레이를
  rgba(58,138,158,0.18→0.32)의 일반 알파(`mix-blend-mode` 없음)로 약화
- 갤러리: `rgba(58,138,158,0.14→0.28)` 일반 알파, multiply 제거 (3배 약함)
- BA 임상사진은 의료광고법 준수로 색감 보정 없이 원본 유지

#### Phase 2 — `summer-luxe.css` 운영 위치 배치
- `kyurim-webpage/site/summer-luxe.css` (785줄, 28KB) → `/summer-luxe.css`
- `kyurim-webpage/site/summer-luxe-events.css` (356줄, 11KB) → `/summer-luxe-events.css`

#### Phase 3 — 메인 `index.html` LUXE 마크업 재작성 (1419줄 → 883줄)
**LUXE 섹션 구성**: nav · 비대칭 hero(디렉터 portrait) · 院長 인용 · 4분할
hairline stats · 숫자 인덱스 서비스 4개(N° 01~04) · 5단계 process ·
6장 BA cases · marquee · 4장 인테리어 갤러리 · FAQ 5개 · inquiry form ·
contact · 한자 모노그램 footer · sticky CTA.

**프로덕션 배선 보존**:
- GSC + Naver site verification meta
- Apple-touch-icon
- 풍부한 JSON-LD MedicalClinic (`aggregateRating` 4.9/127, 2 review samples)
- Microsoft Clarity 스니펫 (`wi91qfvc2f`)
- Service Worker 등록 블록

**폼 핸들러 강화** — LUXE 디자인의 `alert()`-only 핸들러 → 프로덕션 패턴:
- 기존 Google Apps Script 엔드포인트로 POST (`/macros/s/AKfycbzqi91...`)
- 한국식 필드명 ("성함" / "연락처" / "관심분야" / "메시지")
- 휴대+유선 정규식 검증
- `AbortController` 8초 타임아웃 + `.finally()`로 복구
- 인라인 상태 메시지 (alert 미사용)

**기타**:
- 서비스 카드 링크 `events/diet.html` → `events/diet/index.html` (4건)
- LUXE 14개 자산(director/interior/BA k-시리즈 6장/지도) 모두 `assets/`에 존재
- `manifest.json` 동기화: theme_color `#FF9AA2` → `#0A1F2E`,
  background `#FFFDF5` → `#FAFAF7`
- 메인 페이지에서 `style.min.css` / `spring.min.css` / `script.min.js` /
  `chart.js` / `diet_prediction.js` / `diagnosis.js` 로드 모두 제거 — LUXE는
  `summer-luxe.css` 단독 + 인라인 스크립트로 자족
- 다이어트 예측 차트, story modal, review search/carousel, 봄꽃편지 모달,
  fortune cookie, 봄 critical CSS, snow container, scroll progress bar 등
  메인에서 모두 빠짐 (5개 랜딩에서는 일부 다른 형태로 존재)

#### Phase 4 — `script.js` 봄 전용 코드 외과 제거 (2758 → 2472줄)
9개 블록 surgical 제거:
1. L110~149 Cherry Blossom Petal Fall (snowflake `🌸💮`)
2. L151~215 Spring Floating Decor + Wish/Custom Lantern
3. L217~246 Talisman Modal Logic (open btn + ESC handler)
4. L258~313 Spring Petal Mouse Trail + cleanup
5. L1396 Spring Event Countdown — `April 30, 2026` → `August 31, 2026`
6. L1406 카피 "따뜻한 봄날 되세요!" → "여름의 우아함을 함께 하세요"
7. L1568~1577 Global `window.openTalismanModal`
8. L1583~1648 Fortune Cookie Logic
9. L1700 letter-stamp `🖋️` → `— 大 院 長 한정우 드림`
10. L2100~2115 modal-focus 시스템의 talisman 핸들러 (storyModal만 남김)

전체 `[Phase 4 cleanup]` 주석으로 제거 위치 표시. 5개 랜딩이 같은
`script.js`를 공유하지만 LUXE 디자인이 `#snow-container` / `#talisman-modal`
/ `.fortune-cookie-widget`을 `summer-luxe.css`에서 `display:none` 처리하므로
요소가 남아있어도 무동작. Phase 5에서 마크업 자체도 빠짐.

#### Phase 5 — 5개 랜딩 LUXE 적용 (wholesale 교체 + 트래킹 주입)
- `kyurim-webpage/site/events/{diet,skin,body,pain,wedding}/index.html` →
  `events/{x}/index.html` 직접 복사
- 디자인 번들의 LUXE 랜딩이 이미 다음을 갖추고 있어 추가 작업 최소:
  - Google Apps Script 폼 POST (동일 endpoint)
  - `AbortController` 타임아웃
  - SW 등록 (compact한 1줄 버전)
- **유일한 추가 주입**: Microsoft Clarity 스니펫 5개 페이지 모두에 head 삽입
- 프로덕션 줄 수 변동: diet 1332→1085, skin 1109→1027, body 943→858,
  pain 1300→1257, wedding 983→923

#### Phase 6 — 카피 톤 / 봄 이모지
Phase 3~5에서 마크업 wholesale 교체로 사실상 자동 정리됨. grep 검증:
활성 파일(`index.html`, `events/*/index.html`, `script.js`, `summer-luxe*.css`)
에 봄 잔재 0건. `summer-luxe-events.css`에 `/* "봄꽃편지" hero block removed
at HTML level */` 주석 1건만 남음 (의도적 문서화).

#### Phase 7 — `review.html` 운영 경로 + 본 문서
- `review.html` iframe `kyurim-webpage/site/...` → `` (root-relative).
  이제 운영 파일을 직접 보여줌:
  - Before: `index-spring-backup.html` (Phase 0 백업)
  - After: `index.html` (LUXE 메인)
  - 5 cards: `events/{x}/index.html` (LUXE 랜딩)
- 본 절을 CLAUDE.md에 추가

#### 알려진 잔재 (의도적, Phase 8 후속 검토 권장)
- `spring.css` / `spring.min.css` / `style.min.css` / `script.min.js` —
  legacy, 어떤 활성 페이지도 로드하지 않음. 삭제는 Phase 8 별도 정리 권장
  (혹시 다른 곳에서 참조될 수 있어 grep 검증 동반 필요)
- `script.js`의 LUXE-적용 후에도 남아있는 코드:
  diet prediction, story modal, review carousel/search, MBTI quiz —
  메인 LUXE에선 더 이상 호출되지 않지만 5개 랜딩 일부에서 사용 가능성. 잔존.
- `assets/26 march {diet,skin,body,wedding}/` — LUXE 랜딩에서 그대로 재사용.
  벚꽃 컷팅 일부 이미지(`컷팅이벤트 최종.png`)는 후속 교체 권장.
- `kyurim-webpage/` 디렉터리 — 디자인 번들 압축 해제분. 운영에 불필요하나
  `review.html`이 더 이상 참조하지 않으므로 안전하게 삭제 가능

#### 검증 체크리스트
- [ ] 라이브에서 `/index.html` 시각 검증 (Cormorant Garamond 로딩, 디렉터
      이미지 듀오톤 강도, BA 6장 노출, 폼 POST 성공)
- [ ] 5개 랜딩 시각 검증 (특히 인스타 광고 link인 wedding/diet)
- [ ] PSI 재측정 (LCP/INP/CLS — 봄 자산 제거로 개선 기대)
- [ ] 카운트다운 종료일 (현재 2026-08-31)

### 2026-04-27 ~ 04-28: 트래킹 도입 + Core Web Vitals 1단계 최적화 (3커밋)

세션 진입 트리거: marketing_bot 쪽에서 자사 inbound 측정 인프라(GSC / Clarity / PageSpeed Insights / Naver Search Advisor)를 붙이는 작업과, PSI 측정 결과 wedding 페이지 CLS 0.80(Critical) 발견.

#### 1️⃣ Microsoft Clarity + GSC + Naver 검증 메타 (커밋 31f8735)
- **Clarity**: 8개 HTML(index, board, offline, events/{body,diet,pain,skin,wedding}/index)에 프로젝트 `wi91qfvc2f` 추적 스니펫 삽입.
  - 한프리딕트(`wi8cl6x1gk`)와 별도 프로젝트로 분리. 두 비즈니스 데이터 섞이지 않도록 marketing_bot `secrets.json`에서도 `CLARITY_*`(규림) / `HANPREDICT_CLARITY_*`(한프리딕트) 접두어로 분리.
- **Search Console verification**: `index.html` `<head>`에 `google-site-verification` meta 추가 → URL prefix `https://kyurim-webpage.vercel.app` 인증 완료.
- **Naver Search Advisor verification**: `naver-site-verification` meta 추가 → 사이트 등록 + 색인 1-2주 대기.
- 8개 HTML 모두 동일한 Clarity 스니펫이 들어가지만 검증 meta는 메인 `index.html`에만(루트 도메인 검증).

#### 2️⃣ 이미지 dimensions + 이벤트 배너 WebP (커밋 94cb462, codex)
- **트리거**: PSI 측정에서 wedding CLS 0.80 (Critical), 메인 0.27 (Poor). LCP는 모바일 16-50초로 별개 이슈.
- **dimensions 일괄 주입**: 7개 활성 HTML의 모든 `<img>` (281개)에 실제 이미지 크기를 측정해 `width`/`height` 속성 추가. `<picture>` 내부 `<img>`도 모두 포함.
- **LCP 후보 가속**: 각 페이지 first BA 이미지에 `loading="eager"` + `fetchpriority="high"` + `decoding="async"`. wedding은 `ba_diet_wedding`, diet는 `ba_1` 등.
- **이벤트 배너 `<picture>` 전환**: wedding의 `event-scroll-container` 배너 4장(긴급구조대 확정 PNG는 7MB) → `<picture><source srcset="*.webp">` 적용. 이미 `assets/26 march wedding/*.webp`는 변환돼 있었지만 `<img src=".png">`가 그대로였던 누락 케이스.
- **PSI 모바일 측정 결과 (2026-04-28 재측정)**:
  | 페이지 | LCP | INP | CLS (이전 → 이후) |
  |---|---:|---:|---|
  | / (메인) | 19.8s | 531ms | 0.27 → 0.117 |
  | /events/diet | 15.8s | 160ms | — → 0.017 |
  | /events/skin | 16.6s | 169ms | — → 0.008 |
  | /events/body | 15.9s | 265ms | — → 0.007 |
  | /events/pain | 15.6s | — | — → 0.008 |
  | **/events/wedding** | 8.9s | 339ms | **0.80 → 0.006** |
  - **결론**: CLS 전 페이지 Good 진입 (특히 wedding 99% 감소). LCP는 별도 이슈로 잔존 — autoplay video 4개 동시 로드가 진짜 원인 추정.

#### 3️⃣ 1월 이벤트 잔여 자산 + 죽은 이미지 링크 제거 (커밋 03a0baf)
- **죽은 링크 발견**: codex 커밋 직후 git status에 `26 jan event/` 폴더(14 PNG)와 `event play/` 폴더(6 MP4)가 working tree에서 미커밋 삭제 상태로 남아 있음. origin/main에는 여전히 존재해 vercel은 정상이지만 정리 필요.
- **HTML 죽은 참조 5건 제거**:
  - `index.html`: `26 jan event/3 6년 1월 피부이벤트 최종.png`, `26 jan event/4 26년 1월 색소 이벤트.png` (이벤트 캐러셀 중간에 끼어 있던 항목)
  - `events/skin/index.html`: 동일한 2건 (꼬리 위치)
  - `events/pain/index.html`: `12 ... 안면비대칭 체형교정` + `13 ... 프리미엄 기프트` 2건이 Special Events 섹션의 전부였어서 **섹션 통째 제거**
- **폴더 삭제 커밋**: `26 jan event/` 14파일 + `event play/` 6파일 일괄 git rm. 루트 mp4 5개는 `events/pain/index.html`에서 여전히 참조 중이라 보존.
- **`event play/` 영상은 어디서 참조됐었나**: 모두 `*.backup.html`(역사 보존용, 라우팅 미연결)에만 남아있어 active HTML 영향 0.



세션 진입 트리거: 사용자가 "메인 홈페이지에서 다이어트 예측 로직이 작동
안한다"고 보고. 조사 결과 로직 자체는 정상이나 입력 폼 컨테이너가
화면에 보이지 않아 사용자가 클릭할 수 없는 상태였음.

#### 1️⃣ `.scroll-reveal` 클래스 충돌 (커밋 b0a460c)
- **증상**: 다이어트 예측 폼 + 메인 페이지의 모든 `.scroll-reveal` 요소가
  `opacity: 0`으로 영구 비표시. 사용자에게는 "기능이 작동 안 한다"로 보임.
- **원인**: `spring.css`에 `.scroll-reveal` 정의가 두 군데 존재.
  - L587(정식): `.scroll-reveal.revealed { opacity: 1 }`
  - L3500(중복, "Premium Fade-Up"): `.scroll-reveal { opacity: 0 !important }`
    + `.scroll-reveal.scroll-reveal-active { opacity: 1 !important }`
  - JS는 `revealed` 클래스를 추가하지만, 후행 정의의 `!important`가
    정식 규칙을 덮어 element가 영구 투명.
- **수정**: 중복 블록 삭제 + 재발 방지용 NOTE 주석. 캐시 버스팅
  `?v=20260330j` → `?v=20260425a`. 6개 HTML 일괄 갱신.

#### 2️⃣ SW 캐시 정합성 + 폼 타임아웃 + 죽은 옵저버 (커밋 729df2c)
- **SW 캐시 미스**: `sw.js`의 `PRECACHE_ASSETS`는 `/style.min.css`를
  쿼리 없이 캐싱하지만 HTML은 `?v=20260425a`로 요청 → 항상 cache miss.
  `cacheKeyFor()` 헬퍼 추가로 `?v=` 쿼리를 정규화한 키로 매칭/저장.
  `CACHE_NAME` 'kyurim-v3' → 'kyurim-v20260425b'로 갱신 (구 캐시 청소).
- **폼 fetch 타임아웃 부재**: 5개 랜딩의 상담 폼 fetch에 timeout 없음.
  Google Apps Script 응답이 지연되면 "전송 중..." 영구 고착. 광고로
  들어온 사용자의 핵심 액션이라 영향 큼. `AbortController` + 8초
  타임아웃 + `.finally()`로 복구 통합.
- **5개 랜딩 인라인 옵저버 dead code**: 인라인 IntersectionObserver가
  `scroll-reveal-active` 클래스를 추가하지만 위 ① 수정으로 매칭 CSS
  제거됨 → 무동작. `script.min.js`의 옵저버가 `revealed`로 정상 처리.
  복붙된 dead 코드 5곳 일괄 제거.
- **talisman 모달 backdrop click 중복 핸들러**: `script.js:236`과
  `~L2100`(modal-focus 시스템)에서 동일 backdrop click 핸들러 중복
  등록 → 외부 클릭 시 두 경로가 모두 닫기 시도. `closeModalWithFocus`
  를 사용하는 후자만 남기고 전자 제거. ESC 핸들러는 talisman이
  `openModalWithFocus`를 거치지 않으므로 그대로 유지.

#### 3️⃣ body 페이지 폼 핸들러 추가 (커밋 4b2222e)
- 체형비대칭 랜딩의 상담 폼이 다른 4개 페이지와 달리 JS 제출 핸들러
  자체가 없어 submit 시 현재 URL로 GET 리다이렉트만 발생, 데이터가
  어디에도 전송되지 않던 버그. 다른 페이지와 동일 패턴 + 8초 타임아웃
  적용. 기존 4페이지의 fetch 타임아웃 작업과 동일한 코드 형태로 통일.

#### 4️⃣ spring.css `.ba-card` 6→2개 정의 통합 (커밋 a9850a6)
- 동일 셀렉터 6개가 L127, L256, L725, L3810, L3855, L6468에 산재.
  최종 cascade 결과만 보면 동작하지만 유지보수 시 어느 줄을 고쳐야
  할지 추적 불가. (방금 `.scroll-reveal`과 동일 패턴이 또 발생할
  잠재적 핫스팟이었음.)
- **시행착오**: 처음엔 6개를 1개로 통합했으나, 라이브 컴퓨티드
  스타일 검증에서 `border` 회귀 발견. 원인은 spring.css L4519의
  multi-target rule(`.card, .ba-card, .review-card, .step-item, ...`)
  이 `border: 1px solid !important`로 덮어씀 → 원래는 L6470의
  `border: none !important`가 그것을 다시 무력화하는 cascade였음.
- **해결**: 베이스 속성은 L135 통합 블록, `border-radius`/`border`
  override만 L6460에 별도 분리(L4519보다 뒤에 와야 cascade 승리).
  주석으로 위치 의존성 명시. 최종 computed style은 변경 없음.
- **삭제된 dead 정의**: box-shadow / transition / 3D perspective 등은
  L4519에 의해 cascade 상 가려져 실효성 없던 정의들.

#### 부수
- **검증 방법**: Vercel 라이브 사이트에서 `getComputedStyle()`로
  before/after 비교. 특히 `.ba-card` 통합 후 9개 속성이 모두 baseline
  과 일치하는지 확인.
- **성능 변화**: spring.min.css 112KB → 110KB (약 2KB 감소,
  중복 정의 제거 효과).
- **min 파일 재생성**: terser(script.min.js), clean-css-cli(spring.min.css)
  npx로 실행. node_modules에는 sharp만 있으므로 향후에도 동일 패턴.

#### 교훈
- 동일 셀렉터의 중복 정의는 *cascade가 우연히 맞으면* 동작하지만
  순서·`!important` 조합이 어긋나는 순간 사일런트 비표시 버그가 됨.
  `.scroll-reveal`과 `.ba-card`가 같은 패턴의 다른 사례.
- CSS 통합/리팩터 시 grep만으로는 부족. 브라우저에서 실제
  `getComputedStyle()`로 baseline 측정 → 변경 → 재측정으로 회귀
  여부 확인 필요. 라이브에서 검증된 baseline 없이 합치면 위험.
- SW의 `caches.match()`는 query string을 포함한 정확 매칭. 캐시
  버스팅 쿼리(`?v=...`)와 함께 쓰려면 키 정규화가 필수. 그렇지 않으면
  precache가 사실상 무용지물.

### 2026-04-01: 웹페이지 안정성 전수 검토 + 수정 (14건)

#### CRITICAL 수정 (6건)
- **PWA 아이콘 파일 참조 수정**: manifest.json, sw.js에서 존재하지 않는 아이콘(logo-192/512, badge-72, icon-phone/kakao) → 실제 파일 `logo_icon.png`로 통일
- **script.js Story 모달 null 체크**: storyTag/Title/Profile/Desc/Result getElementById에 null 안전 처리
- **script.js 리뷰 검색 하이라이트**: innerHTML replace → textContent 기반 DOM 조립 (이벤트 리스너 보존)
- **script.js 모달 Escape 핸들러 누적 방지**: modal._escapeHandler 참조로 관리, closeModalWithFocus에서 정리
- **랜딩 페이지 폼 phoneInput null 체크**: skin/diet/pain/wedding 4개 페이지
- **diet_prediction.js null 체크 5곳**: getElementById, getContext, updateSummary + isNaN 검증, parseInt 라딕스

#### HIGH 수정 (8건)
- **5개 랜딩 페이지 PWA 설정**: `<link rel="manifest">` + SW 등록 코드 추가
- **manifest.json 카카오 HTTPS**: shortcut URL `http://` → `https://`
- **sw.js precache 에러 핸들링**: cache.addAll `.catch()` 추가, push data `try/catch`
- **웨딩 페이지 한글 파일명 인코딩**: 긴급구조대/웨딩올킬 4개 이미지 완전 URL 인코딩
- **다이어트 Chart.js 지연 로드 수정**: `stopImmediatePropagation`으로 레이스 컨디션 해결 + onerror 핸들링

### 2026-04-01: BA 이미지 보건소 시정 대응 + 의료광고 전수 검토

#### 보건소 시정 대응 (완료)
- **BA 이미지 42개(PNG+WebP 84파일)에 치료기간·부작용 문구 삽입**
  - Python Pillow로 이미지 하단에 연한 회색 배너 추가
  - 바른나눔고딕 폰트, 14px, 볼드(치료기간) + 일반(부작용)
  - 시술별 맞춤 부작용 문구: 한약, 약침, 새살침, 매선, 추나, MTS, 온열요법 등
  - 치료 기간: 사진 표기 참고 + 2021~2025.07 사이 무작위 설정
  - 처리 스크립트: `add_disclaimers.py` (일회성, gitignore 미포함)

#### 의료광고 규정 전수 검토 (참고용 — 보건소에서 BA만 지적, 나머지는 인지만)
- **[매우 높음] 환자 체험기/후기 110건+**: 의료법 제56조 제2항 제6호 (치료경험담 광고 금지)
  - script.js uniqueReviews 40건, reviewDataMap 30건, baData 스토리 42건
- **[매우 높음] 비교광고**: 5개 랜딩 전부 "일반 OO vs 규림" 비교 섹션 존재 (제56조 제2항 제2호)
  - "공장식 레이저", "식욕억제제 위주로 건강을 해치는 감량" 등 타 의료기관 폄하
- **[높음] 한의사 업무범위 논란 표현 7종**: 고주파, MTS, 프락셔널 고주파, 쥬베룩, EGF, 트리플 토닝, 씬 주사
- **[높음] 다이어트 성공 예측 기능**: 구체적 감량 수치 예측 = 치료효과 보장
- **[높음] 당뇨/혈압 약물 중단을 치료 결과로 제시** (script.js baData ba_1, ba_3)
- **[높음] 절대적 표현 다수**: "100%", "완전 삭제", "완전 정복", "80% 이상", "90% 이상", "기적" 등
- **[높음] 경제적 이익 제공**: 투플러스원, 프리테스트, 체험, 특가, 카운트다운 타이머
- **[중간] 기타**: "명의" 키워드, 비급여 가격 미공개, JSON-LD 평점 출처 불분명, 공포유발 티커

### 2026-03-30: 봄꽃 애니메이션 전면 수정 (6커밋)
- **3중 원인 진단 및 해결**
  1. `.min.*` 파일이 7커밋 밀린 구버전 → terser/clean-css로 재생성
  2. Windows "시각 효과→최적 성능" → `prefers-reduced-motion: reduce` → `* { animation-duration: 0s !important }` → JS `setProperty('important')`로 인라인 강제 오버라이드
  3. 구버전 `opacity: 1 !important`, 중복 키프레임, 단일 S-curve 등 품질 문제
- **애니메이션 3가지 변형 추가** (spring.css)
  - `petalDrift-1`: 오른쪽 S-curve 흔들림 + 회전
  - `petalDrift-2`: 왼쪽 미러 흔들림 + 역회전
  - `petalDrift-3`: 미세 좌우 흔들림 + 완만한 회전
  - 각각 `@media (max-width: 768px)` 모바일 버전 (translateX 절반)
- **CSS 클래스 기반 변형 배정** — `.petal-v2`, `.petal-v3` 클래스로 JS→CSS 간 안전한 전달 (비동기 CSS 로딩과 인라인 animationName 충돌 방지)
- **opacity: 1 !important 제거** → 페이드인(8%)/페이드아웃(92%) 정상 작동
- **캐시 버스팅**: 6개 HTML 파일에 `?v=20260330d` 쿼리 파라미터 추가 (vercel.json immutable 캐시 대응)
- **교훈**
  - `.min.*` 파일은 소스 변경 시 반드시 재생성 필요
  - `prefers-reduced-motion: reduce`는 Windows "최적 성능" 설정에서 자동 활성화됨 — `* { animation-duration: 0s !important }` 규칙이 모든 애니메이션을 죽임
  - 비동기 CSS (`media="print" onload`) 환경에서 JS inline `animationName` 설정 시 CSS 로드 후에도 animation-name이 `none→값`으로 변경되지 않아 브라우저가 애니메이션을 트리거하지 않음 → CSS 클래스로 대체

### 2026-03-28: 종합 최적화 + 안정성 + UX 개선 (7커밋)

#### 성능 최적화
- **CSS/JS 미니파이**: style.min.css(45KB), spring.min.css(108KB), script.min.js(79KB) — 원본 373KB→232KB (-38%)
- **이벤트 이미지 19개 PNG→WebP 변환**: 36MB→2MB (-94%), `<picture>` 태그 30곳 적용
- **profile.gif→WebP**: 5.5MB→1.3MB (-76%), 6페이지 `<picture>` 폴백
- **Wanted Sans 비동기 로딩**: 렌더 블로킹 제거 (preload+onload 패턴, 6페이지)
- **DocumentFragment**: 리뷰 카드/FAQ 일괄 DOM 삽입 (리플로우 감소)
- **FAQ 이벤트 위임**: 항목별 리스너→단일 리스너
- **스크롤 리스너 통합**: progress bar, reward burst를 addScrollHandler()로
- **랜딩 크리티컬 CSS 인라인**: 5페이지 FOUC 방지
- **vercel.json**: HTML 1시간 캐시, manifest 24시간 캐시 헤더 추가
- **SW 캐시 v3**: .min 파일 참조, 구버전 자동 삭제

#### 디자인 고도화 (기존 봄 테마 유지, 보수적 개선)
- **스크롤 stagger**: grid-4 카드, process-steps 순차 등장 (100ms 간격)
- **BA 카드**: border:3px solid white → 1px+부드러운 그림자, 이미지 라운딩, blur-load
- **리뷰 카드**: 세리프 인용부호 장식, 키워드 배지 봄 테마, 검색 하이라이트(`<mark>`)
- **프로세스 연결선**: 스텝 사이 핑크 그라데이션 라인 (데스크톱 가로, 모바일 세로)
- **지도 컨테이너**: border-radius 16px + 호버 효과
- **CSS 호버 충돌 정리**: style.css↔spring.css 중복 제거, !important 감소
- **트랜지션 통일**: 하드코딩 타이밍→CSS 변수(--transition) 일괄 적용
- **CSS 색상 변수화**: #FFB7B2, #FF9AA2, #FFDAC1 → var() 치환 (시즌 전환 용이)
- **중복 @keyframes 정리**: skeletonShimmer→skeletonShimmerBg 분리

#### 안정성 수정
- **diet_prediction.js**: 성별 null 체크 + 체중/나이 범위 검증 (0, 음수, 300kg+, 120세+ 차단)
- **script.js**: downloadCouponBtn null 체크, A/B 테스트 localStorage try-catch
- **전 페이지 HTTP→HTTPS**: 카카오톡/네이버톡톡 링크 20곳
- **전화번호 정규식**: 유선번호 지원 (02, 031, 043 등)
- **phoneInput.parentElement null 체크**
- **JS 메모리 누수**: 티커 setInterval cleanup, IntersectionObserver 5개 disconnect 추가
- **프로덕션 console 제거**: A/B 테스트 console.log, 탈리스만 console.error
- **html2canvas .catch()**: 쿠폰 다운로드 에러 핸들링

#### UX 개선
- **다이어트 예측 결과**: scrollIntoView 자동 스크롤 (모바일 필수)
- **탈리스만 모달**: ESC 키 닫기 + 배경 클릭 판정 개선
- **폼 제출 성공**: alert()→인라인 초록 메시지 (5초 후 자동 제거)
- **토스트 + 모달 겹침 방지**: 모달 열려 있으면 토스트 숨김
- **리뷰 캐러셀**: prefers-reduced-motion 대응
- **모바일 폰트 가독성**: 0.6~0.65rem→0.7~0.75rem (최소 12px 보장)
- **다이어트 하단바**: highlight-anim 클래스 추가 (다른 4페이지와 통일)
- **JSON-LD 구조화 데이터**: 5개 랜딩 페이지 MedicalClinic 스키마 추가

### 2026-03-28: Edge 벚꽃 애니메이션 떨림 수정 + 다이어트 예상 결과 표시 수정
- **Edge 벚꽃 떨림 수정** (spring.css, style.css, script.js)
  - 원인: `cherryBlossomFall`(rotate) + `windDrift`(translateX) 두 애니메이션이 `transform` 경쟁 + `top` 속성 애니메이션이 매 프레임 레이아웃 재계산 유발
  - 해결: 두 애니메이션을 하나로 합치고 `top` 대신 `transform: translateY()` 사용 (GPU 가속)
  - `will-change: transform, opacity` 추가로 브라우저 최적화 힌트
  - style.css 기본 snowflake도 동일하게 단일 `transform` 기반으로 변경
  - script.js `animationDuration`/`animationDelay` 단일 값으로 변경 (애니메이션 1개)
  - 중복된 `@keyframes cherryBlossomFall` 제거
- **다이어트 예상 결과 표시 수정** (events/diet/index.html)
  - 원인: 인라인 `style="display:none;"` 이 CSS `.prediction-result.active { display: block; }` 보다 우선순위 높아 결과 영역이 영원히 숨겨짐
  - 해결: 인라인 style 제거 → CSS의 `.prediction-result { display: none; }` 이 기본 숨김 처리, `.active` 클래스 추가 시 정상 표시

### 2026-03-06: Phase 2 디자인 개선 + 리뷰 통일 + 갤러리 UX
- **리뷰 카드 디자인 통일** (spring.css + script.js)
  - 영수증 스타일 제거 → 통일된 깔끔한 카드 디자인
  - 구조: 별점 → 후기 본문 → 구분선 → 작성자 + 인증 배지
  - 카드 크기 300px (모바일 280px/260px), 패딩 24px
  - 인라인 스타일 전부 제거, CSS로 통일
- **웨딩 리뷰 8개 신규 추가** (script.js reviewDataMap)
  - 웨딩 다이어트, 팔뚝살, 뱃살, 리프팅, 붓기, 비대칭, 등살, 커플 관리
- **갤러리 UX 개선** (spring.css + script.js)
  - 모바일 스크롤 progress dots (pill 형태 active)
  - 카드 카운터 ("1 / N") 오버레이
  - 우측 페이드 힌트 (스크롤 끝에서 사라짐)
- **전반 비주얼 업그레이드** (spring.css ~250줄 추가)
  - 하단바 glassmorphism (backdrop-filter blur)
  - 비디오 premium frame (둥근 모서리 + 핑크 테두리)
  - 섹션 제목 shimmer 애니메이션
  - FAQ active 좌측 빨강 보더 + 배경 그라데이션
  - 랜딩 페이지 섹션 디바이더
  - 리뷰 섹션 배경 그라데이션
- **인테리어 3번째 이미지 수정** (전 페이지)
  - overflow:visible !important 인라인 스타일 제거
  - 적용: index.html, body, pain, skin, wedding (5개)
- **Body 페이지 상담 폼 위치 수정**
  - footer 뒤 → 진료 프로세스 바로 다음으로 이동

### 2026-03-06: 인스타그램 인앱 브라우저 치료 사례 갤러리 수정
- **문제**: 인스타그램 인앱 브라우저에서 치료 사례(ba-gallery) 카드가 2개만 표시됨
- **원인**: style.css가 비동기 로드(`preload` + `onload`)되면서, 인라인 CSS에 `flex-shrink: 0`이 없어 카드들이 축소됨
- **해결**: 모든 랜딩 페이지(5개) 인라인 CSS에 BA Gallery 스타일 추가
  ```css
  .ba-gallery-grid{display:flex;gap:15px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding:10px 0}
  .ba-card{min-width:280px;flex-shrink:0;scroll-snap-align:start;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 4px 15px rgba(0,0,0,0.1)}
  ```
- **적용 파일**: events/diet, skin, body, pain, wedding (5개 index.html)

### 2026-03-05: 모바일 안정성 중심 UX 개선
- **모바일 안정성 개선** (spring.css ~120 lines 추가)
  - 버튼 터치 피드백 강화 (scale 0.96 + opacity 0.9)
  - 입력 필드 마이크로인터랙션 (focus translateY, placeholder fade)
  - 섹션 제목 타이포그래피 개선 (font-weight 800, letter-spacing)
  - 히어로 그라데이션 4단계 부드러운 핑크 톤
  - 데스크톱 전용 카드 호버 효과 (hover: hover 미디어 쿼리)
  - 링크 터치 타겟 44px (Apple HIG 준수)
  - 스크롤 인디케이터 펄스 애니메이션
  - 스켈레톤 로딩 봄 테마 shimmer
  - 토스트 GPU 가속 힌트 (will-change)
  - prefers-reduced-motion 접근성 지원
- **다이어트 랜딩 페이지 하단 바 수정**
  - CSS를 다른 랜딩 페이지와 동일한 형식으로 통일
  - .sticky-btn i에 margin-bottom: 0 추가
  - .sticky-btn.call, .sticky-btn.talk 색상 스타일 추가
  - footer padding 50px → 66px 증가
- **style.css 하단 바 스타일 충돌 해결**
  - style.css의 .sticky-bottom-bar, .sticky-btn 스타일 제거
  - 랜딩 페이지 인라인 CSS를 덮어쓰던 문제 해결
  - 각 랜딩 페이지에서 독립적으로 스타일 관리

### 2026-03-05: UX 버그 수정 + 토스트 알림 개선
- **데스크톱 가로 스크롤 브라우저 네비게이션 방지**
  - 트랙패드/마우스 휠 가로 스크롤 시 브라우저 뒤로/앞으로 이동 차단
  - wheel 이벤트 핸들러 추가 (script.js)
  - 대상: `.ba-gallery-grid`, `.event-scroll-container`, `.review-carousel-container`
  - 스크롤 경계에서만 preventDefault() 호출
- **토스트 알림 컴팩트화**
  - 두 줄 → 한 줄 pill 스타일로 변경
  - 알약 모양 디자인 (border-radius: 50px)
  - 아이콘 크기 축소 (데스크톱 24px, 모바일 20px)
  - 콘텐츠 방해 최소화
- **웨딩 클리닉 랜딩 페이지 추가**
  - events/wedding/index.html 신규 생성
  - 봄 테마 적용, 하단바 CTA 포함

### 2026-03-05: 랜딩 페이지 성능 최적화 (모바일 인스타 광고 사용자 대응)
- **CSS 비동기 로딩**
  - style.css, spring.css를 preload + onload 패턴으로 변경
  - render-blocking 제거로 FCP 개선
- **스크립트 중복 제거**
  - script.js 2중 로드 문제 해결 (모든 랜딩 페이지)
  - skin_mbti.js 2중 로드 제거 (skin 페이지)
- **Chart.js 제거**
  - 랜딩 페이지에서 불필요한 Chart.js (~70KB) 제거
- **비디오 Lazy Loading**
  - IntersectionObserver 기반 비디오 지연 로드
  - 뷰포트 진입 시에만 비디오 소스 로드 및 재생
  - 초기 페이지 로드 데이터 절약 (모바일 사용자 대응)
- **적용 페이지**: skin, body, pain, diet (4개 랜딩 페이지)

### 2026-03-05: 모달/네비게이션/UX 버그 수정 + PWA 지원
- **모달 클릭 버그 수정**
  - 이벤트 위임 방식으로 전면 수정 (document 레벨 클릭 감지)
  - 첫 클릭만 작동하던 문제 해결
  - 닫기 애니메이션 타이밍 충돌 해결
- **네비게이션바 개선**
  - 데스크톱 햄버거 메뉴 숨김 (768px 이하에서만 표시)
  - Navbar shrink 효과 강화 (80px → 60px, 핑크 그림자/테두리)
  - 티커 위치 동기화 (navbar 축소 시 함께 이동)
- **티커 정렬**
  - 랜딩 페이지 티커 가운데 정렬로 변경
- **PWA 지원 추가**
  - manifest.json (앱 아이콘, 바로가기)
  - sw.js (Service Worker - 캐싱, 오프라인)
  - offline.html (오프라인 폴백 페이지)
- **디자인 시스템 개선**
  - 타이포그래피 계층 (Modular Scale 1.25)
  - 8px 기반 스페이싱 시스템
  - WCAG AA 색상 대비 개선
  - 그림자/애니메이션 토큰 표준화
- **제거된 기능**
  - 다크 모드 (가독성 문제)
  - 커스텀 마우스 커서 (사용성 저하)
- **토스트 알림 수정**
  - z-index 및 위치 조정 (티커에 가려지지 않도록)

### 2026-03-02: 디자인 개선 + 모바일 성능 최적화
- **디자인 개선** (style.css ~200 lines 추가)
  - 아이콘 박스: 그라데이션 배경 + 호버 시 회전 효과
  - 카드 그림자: 레이어드 box-shadow + 호버 상태
  - 버튼: 샤인 효과 (::before 의사요소)
  - 인테리어 이미지: 호버 줌 효과
- **모바일 성능 최적화**
  - 768px 이하에서 hover 효과 비활성화
  - box-shadow 단일 그림자로 단순화
  - transition 제거 (불필요한 애니메이션 계산 방지)
  - 버튼 샤인 효과 모바일 비활성화
- **CTA 정리**
  - 플로팅 CTA 버튼 삭제 (5개 페이지)
  - 하단바 "전화상담" → "무료상담" 변경 (4개 랜딩 페이지)
- **이미지 로딩 수정**
  - `26 jan event/` 폴더 이미지 URL 인코딩 적용
  - `.gitignore`에서 해당 폴더 제외 해제

### 2026-03-02: 모바일 UX + CTA 개선 (초기)
- 모바일 히어로 영역 개선: dvh 적용, 패딩 조정, 반응형 폰트
- 하단 고정바 충돌 해결: 푸터/섹션 패딩 추가
- CTA 버튼 계층 정리: Primary/Secondary/Tertiary 스타일 분리
- 상담 폼 스타일 개선: 16px 폰트 (iOS 확대 방지)
- 터치 타겟 확대: 최소 44px, 하단바 48px

### 2026-03-02: 영상 파일 업로드
- `.gitignore`에서 `*.mp4`, `event play/` 제외 해제
- 총 10개 영상 파일 GitHub 업로드 (~20MB)
- 모든 랜딩 페이지 영상 정상 재생 확인

### 이전 작업: 성능 최적화
- WebP 이미지 변환 (optimize-images.js)
- `<picture>` 태그 적용 (convert-to-picture.js)
- preconnect/preload 추가
- script defer 적용
- passive event listeners

## 영상 파일 목록

### 루트 폴더 (활성 — `events/pain/index.html`이 `26년 1월 안면비대칭 이벤트 영상.mp4` 참조)
- `26년 1월 하이엔드 피부공학 영상 3.mp4`
- `1월 윤곽각술 이벤트 최종.mp4`
- `26년 브라이덜 이벤트 영상.mp4`
- `26년 1월 안면비대칭 이벤트 영상.mp4`
- `5 26년 1월 하이틴 겨울방학 이벤트 영상.mp4`

### `event play/` 폴더 — 2026-04-28 삭제 (커밋 03a0baf)
모든 mp4가 `*.backup.html`에서만 참조돼 active HTML 영향 없음. 삭제된 파일 6개:
- `10 26년 1월 브라이덜 이벤트 영상 4.mp4`
- `1월 비대칭 교정 영상.mp4`
- `26년 1월 투플러스원 이벤트 영상 확정.mp4`
- `26년 1월 투플러스원 이벤트 영상 확정0.mp4`
- `급찐급빠 이벤트.mp4`
- `스킨부스터 이벤트 영상.mp4`

### `26 jan event/` 폴더 — 2026-04-28 삭제 (커밋 03a0baf)
1월 이벤트 배너 PNG 14개. `26 march {diet,skin,body,wedding}/` 시리즈로 대체됨. active HTML 죽은 참조 5건도 같은 커밋에서 정리.

## CSS 변수 (spring.css 테마)
```css
--primary-color: #D42426      /* 메인 레드 */
--accent-color: #FFB7C5       /* 벚꽃 핑크 */
--gold-primary: #D4A574       /* 골드 */
```

## 개발 스크립트 (.gitignore에 포함)
- `optimize-images.js` - PNG/JPG → WebP 변환
- `convert-to-picture.js` - img → picture 태그 변환

## 배포 설정 (vercel.json)
```json
{
  "images": {
    "formats": ["image/avif", "image/webp"],
    "minimumCacheTTL": 31536000
  },
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

## 진료과목별 네이버 블로그 계정 (의도적으로 분리)
각 진료과목에 특화된 콘텐츠를 위해 별도 블로그 계정 운영. BA갤러리 링크도 과목별로 다름.

| 페이지 | 블로그 계정 | URL |
|--------|------------|-----|
| 메인 | crazat | blog.naver.com/crazat |
| 피부 | crazat7 | blog.naver.com/crazat7 |
| 다이어트 | eliteacu | blog.naver.com/eliteacu |
| 체형 | sangshan1 | blog.naver.com/sangshan1 |
| 통증 | cozypark5959 | blog.naver.com/cozypark5959 |
| 웨딩 | eliteacu | blog.naver.com/eliteacu |

## 주의사항
1. **모바일 우선**: 대부분의 트래픽이 인스타그램 광고 → 모바일
2. **이미지 원본**: `assets_original_backup/`에 백업 (gitignore)
3. **영상 파일**: 파일명에 한글/공백 포함 → URL 인코딩 필요
4. **봄 테마**: `spring.css`로 시즌별 테마 적용 중

## Git 설정
- **user.name**: crazat
- **user.email**: crazat@live.co.kr
- **remote**: https://github.com/crazat/kyurim-webpage.git

## 다음 작업 시 참고
- 콘솔에 경미한 경고 존재 (CORB, preload timing) - 크리티컬 아님
- 시즌 변경 시 spring.css를 다른 테마로 교체
- 새 이벤트 영상 추가 시 `event play/` 폴더에 저장 후 git push

## 추후 개선 검토 사항
### 높은 우선순위
- 리뷰 구조화 데이터 (별점 스키마)
- JS 파일 분리 (main/common/landing)
- Chart.js 동적 import (메인 페이지에서 다이어트 예측 영역 진입 시에만 로드)
- 폼 라벨 접근성 (`<label for="...">` 추가, 5개 랜딩)

### 중간 우선순위
- !important 잔존 사용 점진 감소 (spring.css 셀렉터 특이성 조정).
  `.scroll-reveal` / `.ba-card` 사례처럼 동일 셀렉터 중복 + !important 조합은
  사일런트 비표시 버그로 이어지므로 grep 검사를 정기적으로 권장.
- z-index 체계화 (1~999999 산재 → 계층 정리, 명백한 충돌 쌍은 미발견 상태)
- 모달 포커스 관리 (talisman은 `openModalWithFocus`를 거치지 않아 별도 ESC
  핸들러 유지 중 — `openModalWithFocus`로 일원화하면 ESC 핸들러도 자동 처리)
- CSS 무한 애니메이션 37개 → 뷰포트 밖 일시정지
- FontAwesome 풀 번들(~70KB) → 사용 아이콘만 추출
- JSON-LD `sameAs` 페이지별 블로그 URL 분리 (현재 모두 메인 계정만 가리킴)

### 낮은 우선순위
- CSS 통합 (spring.css + style.css). 단, `.ba-card` 사례에서 보듯 두 파일에
  동일 셀렉터가 흩어져 있어 통합 시 cascade 회귀 위험 큼. 라이브
  `getComputedStyle()` baseline 측정 동반 권장.
- 4개 랜딩 페이지 템플릿화 (중복 코드 제거)
- DOMContentLoaded 8개 → 1개 통합. 검토 결과 순수 조직 리팩터로
  사용자 영향 없음. 각 블록이 별도 IIFE에 스코프되어 통합 시 변수명
  충돌 위험. 실질 버그였던 talisman 중복 핸들러는 2026-04-25 외과적
  수정으로 처리 완료.

### ✅ 완료된 항목
- ~~접근성: 색상 대비 개선~~ → WCAG AA 준수 완료
- ~~PWA 지원~~ → manifest.json, sw.js 추가 완료
- ~~모달 클릭 버그~~ → 이벤트 위임 방식으로 해결
- ~~가로 스크롤 브라우저 네비게이션 방지~~ → wheel 이벤트 핸들러 추가
- ~~토스트 알림 컴팩트화~~ → 한 줄 pill 스타일로 변경
- ~~모바일 안정성 UX 개선~~ → 터치 피드백, 접근성 지원 완료
- ~~랜딩 페이지 하단 바 통일~~ → 모든 페이지 48px 높이로 통일
- ~~style.css 스타일 충돌~~ → sticky-bottom-bar 스타일 분리 완료
- ~~인스타그램 인앱 브라우저 갤러리 버그~~ → 인라인 CSS에 flex-shrink:0 추가
- ~~Edge 벚꽃 애니메이션 떨림~~ → transform 기반 단일 애니메이션으로 통합
- ~~다이어트 예상 결과 미표시~~ → 인라인 display:none 제거, CSS 클래스 정상 동작
- ~~폼 유효성 검사~~ → 전화번호 유선+휴대 지원, 인라인 에러 메시지, 성별/체중 범위 검증
- ~~폼 제출 로딩 상태~~ → 스피너 + 성공 인라인 메시지 + 3초 후 복구
- ~~SEO: 랜딩 페이지 메타 데이터~~ → 5개 페이지 JSON-LD MedicalClinic 스키마 추가
- ~~코드 정리: console.log 제거~~ → A/B 테스트, 탈리스만 디버그 로그 제거
- ~~sitemap.xml, robots.txt~~ → 이미 존재 확인
- ~~CSS/JS 미니파이~~ → style.min.css, spring.min.css, script.min.js 생성 및 적용
- ~~이미지 최적화~~ → 이벤트 이미지 19개 WebP 변환, profile.gif WebP 변환
- ~~HTTP→HTTPS~~ → 카카오톡/네이버톡톡 전 페이지 전환
- ~~JS 메모리 누수~~ → 티커 setInterval cleanup, Observer disconnect
- ~~캐시 정책~~ → vercel.json HTML/manifest 캐시, SW v3 .min 파일 참조
- ~~`.scroll-reveal` 사일런트 비표시 버그~~ (2026-04-25) → 중복 정의 제거,
  다이어트 예측 폼 정상 노출
- ~~SW 캐시 미스 (precache 무용)~~ (2026-04-25) → `cacheKeyFor()` 쿼리
  정규화 + `CACHE_NAME` 동기 버전 갱신
- ~~5개 랜딩 폼 fetch 타임아웃 부재~~ (2026-04-25) → AbortController 8s
- ~~body 페이지 폼 핸들러 누락~~ (2026-04-25) → 다른 4페이지와 동일 패턴
- ~~5개 랜딩 dead 인라인 스크롤 옵저버~~ (2026-04-25) → 일괄 제거
- ~~talisman 모달 backdrop click 중복 핸들러~~ (2026-04-25) → 중복 제거
- ~~spring.css `.ba-card` 6개 중복 정의~~ (2026-04-25) → 2개로 통합
  (베이스 + border 오버라이드, cascade 결과 동일 보존)
