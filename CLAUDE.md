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
├── script.js               # 메인 JavaScript (~2200 lines)
├── manifest.json           # PWA 매니페스트
├── sw.js                   # Service Worker (캐싱/오프라인)
├── offline.html            # 오프라인 폴백 페이지
├── assets/                 # 이미지 파일 (WebP 변환됨)
├── events/                 # 랜딩 페이지들
│   ├── skin/index.html     # 피부 클리닉
│   ├── diet/index.html     # 다이어트 클리닉
│   ├── pain/index.html     # 통증 클리닉
│   └── body/index.html     # 체형 클리닉
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
- 폼 유효성 검사 (전화번호 형식 검증)
- 폼 제출 시 로딩 상태 표시
- SEO: 랜딩 페이지별 고유 메타 데이터
- 코드 정리: console.log 제거

### 중간 우선순위
- sitemap.xml, robots.txt 추가
- 리뷰 구조화 데이터 (별점 스키마)
- JS 파일 분리 (main/common/landing)
- 모달 포커스 관리

### 낮은 우선순위
- CSS 통합 (spring.css + style.css)
- 4개 랜딩 페이지 템플릿화 (중복 코드 제거)

### ✅ 완료된 항목
- ~~접근성: 색상 대비 개선~~ → WCAG AA 준수 완료
- ~~PWA 지원~~ → manifest.json, sw.js 추가 완료
- ~~모달 클릭 버그~~ → 이벤트 위임 방식으로 해결
