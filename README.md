# React FullDown Menu — AI 모델별 구현 비교 및 분석

이 저장소는 동일한 요구 사양서([prompt.md](./prompt.md))를 바탕으로 다양한 최신 AI 코딩 어시스턴트 및 모델들이 구현한 **React FullDown Menu** 프로젝트들을 비교·분석한 레포지토리입니다.

---

## 📌 1. 공통 요구사항 요약 (`prompt.md`)

- **기능 요구사항**:
  - 상단 메뉴 및 좌측 메뉴 구현
  - **상단 메뉴가 선택되었을 때, 좌측 메뉴는 해당 상단 메뉴의 소속 하위 메뉴만 표시**되어야 함.
- **메뉴 데이터 구조**:
  - 메뉴 5개 그룹 × 그룹당 5개 하위 메뉴 (총 25개 하위 메뉴)
  - `메뉴1`: 메뉴11, 메뉴12, 메뉴13, 메뉴14, 메뉴15
  - `메뉴2`: 메뉴21, 메뉴22, 메뉴23, 메뉴24, 메뉴25
  - `메뉴3`: 메뉴31, 메뉴32, 메뉴33, 메뉴34, 메뉴35
  - `메뉴4`: 메뉴41, 메뉴42, 메뉴43, 메뉴44, 메뉴45
  - `메뉴5`: 메뉴51, 메뉴52, 메뉴53, 메뉴54, 메뉴55
- **아키텍처 요구사항**:
  - React 프레임워크 기반
  - 향후 데이터베이스(DB)에서 동적으로 호출된 메뉴 데이터를 사용할 수 있도록 확장성 고려

---

## 📂 2. AI 모델별 디렉토리 및 프로젝트 개요

| 디렉토리 | AI 도구 / 모델 | 프로젝트명 | 주요 기술 스택 | 핵심 특징 및 구현 스타일 |
| :--- | :--- | :--- | :--- | :--- |
| [`claude_opus55`](./claude_opus55) | **Claude Opus 3.5 / 55** | `react_claude` | React 19, Vite 8, JS, Oxlint | 모듈형 컴포넌트 구조, Flat RDBMS 스타일 데이터 모델 (`parentId`), 명확한 관심사 분리 |
| [`codex_astra`](./codex_astra) | **OpenAI Codex / Astra** | `react_claude` | React 19, Vite 6, JS | 고도화된 UI/UX 메가메뉴, 최근 방문 기록, 실시간 메뉴 검색, 내장 SVG 아이콘, 풍부한 대시보드 |
| [`copilot`](./copilot) | **GitHub Copilot** | `react_copilot` | React 19, Vite 8, JS, Oxlint | 직관적이고 심플한 그룹 기반 구조, 직관적인 네비게이션 인덱싱(`01~05`), 빠른 프로토타이핑 |
| [`cursor_grok47`](./cursor_grok47) | **Cursor (Grok)** | `react_cursor` | React 19, TS 6, Vite 8, Vitest | 엔터프라이즈급 아키텍처 (Model-Service-Hook-Component), Flat→Tree 빌더 및 유효성 검증, 단위 테스트(Vitest) |
| [`gemini38flash`](./gemini38flash) | **Gemini 3.8 Flash (Antigravity)** | `react_antigravity` | React 19, TS 6, Vite 8, Lucide React | 비동기 DB 시뮬레이션 서비스, Lucide 아이콘 시스템, 디바운스 호버 메가메뉴, 완성도 높은 반응형 대시보드 |

---

## 🔍 3. 폴더별 상세 분석

### 3.1 [`claude_opus55`](./claude_opus55) — Claude Opus 3.5 / 55
- **프로젝트명**: `react_claude`
- **언어 및 도구**: JavaScript (JSX), React 19.2, Vite 8.3, Oxlint
- **디렉토리 구조**:
  ```text
  claude_opus55/
  ├── src/
  │   ├── components/
  │   │   ├── FullDownMenu.jsx      # 최상위 통합 메뉴 및 본문 레이아웃 컨테이너
  │   │   ├── FullDownMenu.css
  │   │   ├── TopMenu.jsx           # 상단 네비게이션 바
  │   │   ├── TopMenu.css
  │   │   ├── SideMenu.jsx          # 좌측 사이드바 메뉴
  │   │   └── SideMenu.css
  │   ├── data/
  │   │   └── menuData.js           # RDBMS 호환 Flat 구조 메뉴 데이터
  │   ├── App.jsx
  │   └── main.jsx
  ```
- **데이터 모델링 & DB 연동 설계**:
  - 관계형 데이터베이스 테이블 구조와 1:1 매핑되는 평탄 배열(Flat Array) 형태(`id`, `parentId`, `name`, `order`) 채택.
  - 최상위 메뉴는 `parentId: null`, 서브메뉴는 상위 `id`를 참조(`parentId: 'M1'`).
  - `useMemo`를 통해 `parentId === null`로 상단 메뉴를 추출하고, `parentId === selectedTopId` 조건으로 좌측 메뉴를 동적 필터링.
- **특징 및 평가**:
  - 컴포넌트별로 CSS가 분리되어 모듈성과 가독성이 뛰어남.
  - DB의 인라인 레코드를 가장 변환 비용 없이 바로 매핑할 수 있는 실용적 설계.

---

### 3.2 [`codex_astra`](./codex_astra) — OpenAI Codex / Astra
- **프로젝트명**: `react_claude`
- **언어 및 도구**: JavaScript (JSX), React 19.0, Vite 6.0
- **디렉토리 구조**:
  ```text
  codex_astra/
  ├── src/
  │   ├── main.jsx                  # 고도화된 UI 컴포넌트 전체 (단일 파일 아키텍처)
  │   ├── menu.js                   # 계층형 메뉴 데이터 정의
  │   └── styles.css                # 15KB 규모의 정교한 디자인 시스템 CSS
  ```
- **주요 기능 & UI/UX 인터랙션**:
  - **전체 메가메뉴(FullDown)**: 마우스 호버 및 클릭 지원, 5개 카테고리와 25개 하위 메뉴를 전면 오버레이 드롭다운으로 표시.
  - **접근성 및 키보드 이벤트**: `Escape` 키 입력 시 메뉴 자동 닫힘, 외부 영역 클릭(`pointerdown`) 감지 닫기.
  - **실시간 메뉴 검색**: 상단 및 본문 디렉토리에서 검색어(`query`)를 통한 서브메뉴 필터링.
  - **최근 방문 기록**: 사용자가 클릭한 메뉴를 최대 4개까지 메모리에 보관하여 빠른 재방문 지원.
  - **좌측 아코디언 메뉴**: 상위 카테고리별 접힘/펼침 토글, 하위 메뉴 개수 배지(`item-count`), 활성 메뉴 표시.
  - **자체 SVG 아이콘**: 별도 외부 라이브러리 없이 순수 SVG 컴포넌트로 경량화 달성.
- **특징 및 평가**:
  - 단일 파일 중심이나 가장 화려하고 실무 SaaS/Admin 대시보드에 가까운 UX/UI 완성도를 자랑함.

---

### 3.3 [`copilot`](./copilot) — GitHub Copilot
- **프로젝트명**: `react_copilot`
- **언어 및 도구**: JavaScript (JSX), React 19.2, Vite 8.3, Oxlint
- **디렉토리 구조**:
  ```text
  copilot/
  ├── src/
  │   ├── data/
  │   │   └── menuData.js           # 그룹형 계층 데이터 구조
  │   ├── App.jsx                   # 상단 및 좌측 네비게이션 통합 구현
  │   ├── App.css
  │   └── main.jsx
  ```
- **데이터 모델링 & DB 연동 설계**:
  - 카테고리 객체 내부에 하위 문자열 배열을 포함하는 그룹형 모델(`{ id, label, description, items: [...] }`).
  - 상단 메뉴 선택 시 `activeGroupId`와 `activeItem`을 즉시 첫 번째 항목으로 갱신하는 깔끔한 상태 흐름.
- **특징 및 평가**:
  - 코드 구조가 가장 직관적이고 심플하여 러닝 커브가 낮음.
  - 상단 메뉴의 숫자 인덱스(`01`, `02`) 및 우측 비주얼 서클 그래픽으로 세련된 미니멀 디자인 제공.

---

### 3.4 [`cursor_grok47`](./cursor_grok47) — Cursor (Grok)
- **프로젝트명**: `react_cursor`
- **언어 및 도구**: TypeScript (~6.0), React 19.2, Vite 8.3, Vitest 5.0, Oxlint
- **디렉토리 구조**:
  ```text
  cursor_grok47/
  ├── src/
  │   ├── models/
  │   │   └── menu.ts               # MenuRecord, MenuNode, MenuService 타입 정의
  │   ├── services/
  │   │   └── menuService.ts        # 비동기 데이터 fetch 및 AbortSignal 처리
  │   ├── menu/
  │   │   ├── buildMenus.ts         # Flat DB Record → Tree 변환 및 정밀 유효성 검사기
  │   │   ├── menuState.ts          # 메뉴 네비게이션 커스텀 상태 훅
  │   │   └── menu.test.ts          # Vitest 기반 단위/통합 테스트 (25개 항목, 에러 케이스 검증)
  │   ├── components/
  │   │   ├── AppShell.tsx          # 전체 레이아웃 셸
  │   │   ├── TopMenu.tsx           # 상단 메뉴바
  │   │   ├── FullDownPanel.tsx     # 전체 하위 메뉴 펼침 패널
  │   │   ├── LeftMenu.tsx          # 좌측 사이드바 (소속 메뉴 필터링)
  │   │   └── ContentArea.tsx       # 본문 컨텐츠 영역
  │   ├── App.tsx
  │   └── main.tsx
  ```
- **아키텍처 및 공학적 완성도**:
  - **계층 분리**: Domain Model (`models`) → Business Logic (`menu`) → Infrastructure/Service (`services`) → Presentation (`components`).
  - **강력한 데이터 검증 (`buildMenus.ts`)**:
    - 중복 ID 검출, 존재하지 않는 부모 ID 참조 차단, 3단계 이상의 비정상 계층 검출 시 명시적 오류 반환.
  - **자동화된 테스트 (`npm test`)**:
    - Vitest를 통해 25개 하위 메뉴의 완전성, 상단-좌측 상태 동기화, 비정상 DB 데이터 예외 처리를 검증.
- **특징 및 평가**:
  - 엔터프라이즈 프로덕션 환경에 즉시 투입 가능한 수준의 가장 견고한 소프트웨어 아키텍처와 타입 안정성을 보여줌.

---

### 3.5 [`gemini38flash`](./gemini38flash) — Gemini 3.8 Flash (Antigravity)
- **프로젝트명**: `react_antigravity`
- **언어 및 도구**: TypeScript (~6.0), React 19.2, Vite 8.3, Lucide React 1.47, Oxlint
- **디렉토리 구조**:
  ```text
  gemini38flash/
  ├── src/
  │   ├── types/
  │   │   └── menu.ts               # MenuItem, SubMenuItem, MenuNavigationState 타입 정의
  │   ├── services/
  │   │   └── menuService.ts        # 비동기 백엔드 API 연동 서비스
  │   ├── data/
  │   │   └── initialMenuData.ts    # 정적 폴백 및 초기 시드 데이터
  │   ├── components/
  │   │   ├── Header/               # 메가 풀다운 패널, 호버 딜레이, Lucide 아이콘 매핑
  │   │   ├── Sidebar/              # 상단 소속 서브메뉴 동적 표시 및 액티브 뱃지
  │   │   ├── Content/              # 대시보드 위젯, 브레드크럼, 통계 카드, 빠른 액션
  │   │   └── Layout/               # 반응형 통합 레이아웃
  │   ├── App.tsx                   # 비동기 데이터 로딩 생명주기 및 네비게이션 핸들러
  │   └── main.tsx
  ```
- **주요 기능 & 인터랙션**:
  - **마우스 호버 디바운스 FullDown**: 진입 시 즉시 펼쳐지고, 이탈 시 200ms의 딜레이(`hoverTimeoutRef`)를 두어 사용자의 의도치 않은 마우스 이탈 시 메뉴가 닫히는 현상 방지.
  - **Lucide Icons 연동**: 각 메뉴별 시맨틱 아이콘 매핑 (`LayoutDashboard`, `Users`, `Package`, `BarChart3`, `Settings` 등).
  - **DB 모드 지원**: 비동기 데이터 로딩 스켈레톤/로딩 처리 및 향후 REST API/GraphQL 연동 구조 완비.
  - **상세 본문 대시보드**: 선택한 상위/하위 메뉴에 따라 메트릭 통계 카드, 상태 뱃지, 실시간 변경 화면 제공.
- **특징 및 평가**:
  - UI/UX 완성도와 비동기 서비스 아키텍처, 타입 안정성을 균형 있게 조화시킨 완성도 높은 구현.

---

## 📊 4. AI 모델별 종합 비교 분석표

| 비교 항목 | `claude_opus55` | `codex_astra` | `copilot` | `cursor_grok47` | `gemini38flash` |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **언어 (Language)** | JavaScript | JavaScript | JavaScript | **TypeScript** | **TypeScript** |
| **아키텍처 패턴** | Component-Driven | Single-File Focused | Simple Minimal | **Layered (Clean Arch)** | **Modular Component** |
| **데이터 구조** | Flat (`parentId`) | Tree (Nested) | Group Array | **Flat + Tree Builder** | Tree / Service-based |
| **DB 연동성** | ⭐⭐⭐⭐ (RDBMS 최적) | ⭐⭐⭐ (JSON/NoSQL) | ⭐⭐⭐ (간단 구조) | ⭐⭐⭐⭐⭐ (Service+유효성 검사) | ⭐⭐⭐⭐⭐ (비동기 서비스 완비) |
| **FullDown 인터랙션** | 클릭 전환 | **호버 + 메가메뉴 + ESC** | 클릭 전환 | **전체 펼침 토글 + ESC** | **호버(디바운스) + 메가메뉴** |
| **아이콘 시스템** | 기본 텍스트 | 내장 SVG | 유니코드 기호 | 기본 텍스트/화살표 | **Lucide React** |
| **부가 기능** | 브레드크럼 | **검색, 최근 방문, 통계** | 인덱스 배지 | **정밀 에러 핸들링** | **대시보드 위젯, 비동기 로딩** |
| **단위 테스트** | ❌ | ❌ | ❌ | **✅ Vitest 포함** | ❌ |
| **린터 / 품질도구** | Oxlint | - | Oxlint | Oxlint | Oxlint |

---

## 🚀 5. 프로젝트 실행 가이드

각 모델별 디렉토리로 이동하여 독립적으로 개발 서버를 구동하거나 빌드할 수 있습니다.

### 특정 모델 폴더 실행 (예: `gemini38flash` 또는 `cursor_grok47`)

```bash
# 1. 원하는 폴더로 이동 (예: gemini38flash)
cd gemini38flash

# 2. 의존성 패키지 설치
npm install

# 3. 로컬 개발 서버 시작
npm run dev
```

### 테스트 실행 (cursor_grok47 전용)

```bash
cd cursor_grok47
npm install
npm test
```

---

## 💡 6. 결론 및 종합 시각

1. **소프트웨어 공학 및 아키텍처 측면 (`cursor_grok47`)**:
   - 도메인 모델, 비동기 서비스, 데이터 유효성 검증 함수, 단위 테스트까지 가장 프로덕션 지향적인 클린 아키텍처를 보여줍니다.
2. **풍부한 UI/UX 및 완성도 측면 (`gemini38flash`, `codex_astra`)**:
   - `gemini38flash`는 Lucide 아이콘과 200ms 마우스 딜레이 메가메뉴, 비동기 로딩 상태 처리가 돋보입니다.
   - `codex_astra`는 실시간 검색, 최근 방문 기록, ESC 키 제어 등 사용자 경험(UX) 측면에서 매우 디테일한 편의 기능을 제공합니다.
3. **직관성과 단순성 측면 (`claude_opus55`, `copilot`)**:
   - `claude_opus55`는 RDBMS DB 스키마에 가장 부합하는 데이터 모델과 깔끔한 컴포넌트 모듈화를 제시합니다.
   - `copilot`은 빠르고 간결하게 핵심 요구사항(상단-좌측 메뉴 연동)을 충족하는 미니멀 코드를 제공합니다.
