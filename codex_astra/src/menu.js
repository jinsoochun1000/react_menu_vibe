// DB/API 연결 시 [{ id, name, children: [{ id, name }] }] 형식으로 교체합니다.
// 화면 표시에는 name을, 선택 상태와 React key에는 고유 id를 사용합니다.
export const menus = Array.from({ length: 5 }, (_, group) => ({
  id: `menu-${group + 1}`,
  name: `메뉴${group + 1}`,
  children: Array.from({ length: 5 }, (_, child) => ({
    id: `menu-${group + 1}-${child + 1}`,
    name: `메뉴${group + 1}${child + 1}`,
  })),
}));
