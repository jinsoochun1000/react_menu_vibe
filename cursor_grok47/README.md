# react_cursor — React FullDown Menu

React / Vite 기반의 상단 전체 펼침 메뉴와 좌측 메뉴 예제입니다.

## 실행

Node.js가 필요합니다.

```powershell
npm install
npm run dev
```

자동 검증은 `npm test`로 실행합니다. 메뉴 데이터, 25개 항목 선택, 상단 그룹에 따른 좌측 필터, DB 형식 매핑, 잘못된 데이터를 확인합니다.

## 기능

- 메뉴1~메뉴5, 각 그룹마다 5개 하위 메뉴(총 25개)
- 상단 그룹 또는 `전체 메뉴` 클릭 시 모든 그룹의 하위 메뉴를 한 번에 표시
- 상단 메뉴가 선택되면 좌측 메뉴는 그 그룹의 하위 메뉴만 표시
- 두 메뉴 영역의 선택 상태, 본문 제목, 경로 동기화
- 항목 선택, 본문 배경 클릭, 닫기 버튼 또는 Esc로 전체 메뉴 닫기
- 초기 선택: 메뉴1 > 메뉴11
- 본문은 선택 정보를 보여 주는 예제 화면입니다. 업무별 화면은 아직 포함하지 않습니다.

## 구조와 DB 연동

- `src/models/menu.ts`: 메뉴 테이블 매핑 모델 (`id`, `parentId`, `name`, `sortOrder`)
- `src/services/menuService.ts`: 비동기 메뉴 조회 인터페이스와 샘플 데이터
- `src/menu/buildMenus.ts`: 평탄 레코드 → 2단계 트리
- `src/menu/menuState.ts`: 선택 상태, 활성 그룹, FullDown 열림 여부
- `src/components/`: 데이터 기반 화면

DB 연동 시 `MenuService.getMenus`를 구현하고 `useMenuState`에 넘기면 됩니다. UI에 메뉴 명칭을 하드코딩하지 않으므로 조회된 `name`이 상단·좌측·본문에 반영됩니다. 명칭이 바뀌어도 안정적으로 식별할 수 있도록 고유 ID를 사용합니다.

| id | parentId | name | sortOrder |
| --- | --- | --- | --- |
| menu-1 | null | 메뉴1 | 1 |
| menu-1-1 | menu-1 | 메뉴11 | 1 |

최상위 메뉴는 `parentId = null`입니다. 현재 UI는 2단계 구조이며 ID 중복, 없는 부모, 3단계 이상의 관계 및 빈 ID/명칭은 오류로 처리합니다. 동일 정렬 순서에서는 ID 순으로 표시합니다. 실제 DB 연결이나 접속 정보는 포함하지 않습니다.
