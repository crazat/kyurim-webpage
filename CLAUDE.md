# CLAUDE.md - 규림한의원 청주점 웹사이트

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

### 루트 폴더
- `26년 1월 하이엔드 피부공학 영상 3.mp4`
- `1월 윤곽각술 이벤트 최종.mp4`
- `26년 브라이덜 이벤트 영상.mp4`
- `26년 1월 안면비대칭 이벤트 영상.mp4`
- `5 26년 1월 하이틴 겨울방학 이벤트 영상.mp4`

### event play/ 폴더
- `10 26년 1월 브라이덜 이벤트 영상 4.mp4`
- `1월 비대칭 교정 영상.mp4`
- `26년 1월 투플러스원 이벤트 영상 확정.mp4`
- `26년 1월 투플러스원 이벤트 영상 확정0.mp4`
- `급찐급빠 이벤트.mp4`

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
- JS DOMContentLoaded 9개 통합 (현재 분산)
- IntersectionObserver 9개 통합 (2-3개로)
- 리뷰 구조화 데이터 (별점 스키마)
- JS 파일 분리 (main/common/landing)

### 중간 우선순위
- !important 440개 감소 (spring.css 셀렉터 특이성 조정)
- z-index 체계화 (1~999999 산재 → 계층 정리)
- 모달 포커스 관리
- CSS 무한 애니메이션 37개 → 뷰포트 밖 일시정지

### 낮은 우선순위
- CSS 통합 (spring.css + style.css)
- 4개 랜딩 페이지 템플릿화 (중복 코드 제거)

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
