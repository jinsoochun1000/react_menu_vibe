// 메뉴 테이블 구조 (추후 DB 조회 API 응답으로 대체 예정)
// id: 메뉴 고유 식별자
// parentId: 상위 메뉴 id (최상위 메뉴는 null)
// name: 메뉴 명칭
// order: 정렬 순서
export const menuData = [
  { id: "M1", parentId: null, name: "메뉴1", order: 1 },
  { id: "M2", parentId: null, name: "메뉴2", order: 2 },
  { id: "M3", parentId: null, name: "메뉴3", order: 3 },
  { id: "M4", parentId: null, name: "메뉴4", order: 4 },
  { id: "M5", parentId: null, name: "메뉴5", order: 5 },

  { id: "M11", parentId: "M1", name: "메뉴11", order: 1 },
  { id: "M12", parentId: "M1", name: "메뉴12", order: 2 },
  { id: "M13", parentId: "M1", name: "메뉴13", order: 3 },
  { id: "M14", parentId: "M1", name: "메뉴14", order: 4 },
  { id: "M15", parentId: "M1", name: "메뉴15", order: 5 },

  { id: "M21", parentId: "M2", name: "메뉴21", order: 1 },
  { id: "M22", parentId: "M2", name: "메뉴22", order: 2 },
  { id: "M23", parentId: "M2", name: "메뉴23", order: 3 },
  { id: "M24", parentId: "M2", name: "메뉴24", order: 4 },
  { id: "M25", parentId: "M2", name: "메뉴25", order: 5 },

  { id: "M31", parentId: "M3", name: "메뉴31", order: 1 },
  { id: "M32", parentId: "M3", name: "메뉴32", order: 2 },
  { id: "M33", parentId: "M3", name: "메뉴33", order: 3 },
  { id: "M34", parentId: "M3", name: "메뉴34", order: 4 },
  { id: "M35", parentId: "M3", name: "메뉴35", order: 5 },

  { id: "M41", parentId: "M4", name: "메뉴41", order: 1 },
  { id: "M42", parentId: "M4", name: "메뉴42", order: 2 },
  { id: "M43", parentId: "M4", name: "메뉴43", order: 3 },
  { id: "M44", parentId: "M4", name: "메뉴44", order: 4 },
  { id: "M45", parentId: "M4", name: "메뉴45", order: 5 },

  { id: "M51", parentId: "M5", name: "메뉴51", order: 1 },
  { id: "M52", parentId: "M5", name: "메뉴52", order: 2 },
  { id: "M53", parentId: "M5", name: "메뉴53", order: 3 },
  { id: "M54", parentId: "M5", name: "메뉴54", order: 4 },
  { id: "M55", parentId: "M5", name: "메뉴55", order: 5 },
];
