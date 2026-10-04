import type { MenuItem } from '../types/menu';

export const INITIAL_MENU_DATA: MenuItem[] = [
  {
    id: 'menu1',
    name: '메뉴1',
    description: '시스템 관리 및 대시보드',
    iconName: 'LayoutDashboard',
    order: 1,
    subMenus: [
      { id: 'menu11', name: '메뉴11', description: '메뉴1의 첫 번째 상세 관리 항목', order: 1 },
      { id: 'menu12', name: '메뉴12', description: '메뉴1의 두 번째 상세 관리 항목', order: 2 },
      { id: 'menu13', name: '메뉴13', description: '메뉴1의 세 번째 상세 관리 항목', order: 3 },
      { id: 'menu14', name: '메뉴14', description: '메뉴1의 네 번째 상세 관리 항목', order: 4 },
      { id: 'menu15', name: '메뉴15', description: '메뉴1의 다섯 번째 상세 관리 항목', order: 5 },
    ],
  },
  {
    id: 'menu2',
    name: '메뉴2',
    description: '회원 및 권한 관리',
    iconName: 'Users',
    order: 2,
    subMenus: [
      { id: 'menu21', name: '메뉴21', description: '메뉴2의 첫 번째 상세 관리 항목', order: 1 },
      { id: 'menu22', name: '메뉴22', description: '메뉴2의 두 번째 상세 관리 항목', order: 2 },
      { id: 'menu23', name: '메뉴23', description: '메뉴2의 세 번째 상세 관리 항목', order: 3 },
      { id: 'menu24', name: '메뉴24', description: '메뉴2의 네 번째 상세 관리 항목', order: 4 },
      { id: 'menu25', name: '메뉴25', description: '메뉴2의 다섯 번째 상세 관리 항목', order: 5 },
    ],
  },
  {
    id: 'menu3',
    name: '메뉴3',
    description: '서비스 및 상품 운영',
    iconName: 'Package',
    order: 3,
    subMenus: [
      { id: 'menu31', name: '메뉴31', description: '메뉴3의 첫 번째 상세 관리 항목', order: 1 },
      { id: 'menu32', name: '메뉴32', description: '메뉴3의 두 번째 상세 관리 항목', order: 2 },
      { id: 'menu33', name: '메뉴33', description: '메뉴3의 세 번째 상세 관리 항목', order: 3 },
      { id: 'menu34', name: '메뉴34', description: '메뉴3의 네 번째 상세 관리 항목', order: 4 },
      { id: 'menu35', name: '메뉴35', description: '메뉴3의 다섯 번째 상세 관리 항목', order: 5 },
    ],
  },
  {
    id: 'menu4',
    name: '메뉴4',
    description: '통계 분석 및 모니터링',
    iconName: 'BarChart3',
    order: 4,
    subMenus: [
      { id: 'menu41', name: '메뉴41', description: '메뉴4의 첫 번째 상세 관리 항목', order: 1 },
      { id: 'menu42', name: '메뉴42', description: '메뉴4의 두 번째 상세 관리 항목', order: 2 },
      { id: 'menu43', name: '메뉴43', description: '메뉴4의 세 번째 상세 관리 항목', order: 3 },
      { id: 'menu44', name: '메뉴44', description: '메뉴4의 네 번째 상세 관리 항목', order: 4 },
      { id: 'menu45', name: '메뉴45', description: '메뉴4의 다섯 번째 상세 관리 항목', order: 5 },
    ],
  },
  {
    id: 'menu5',
    name: '메뉴5',
    description: '환경 설정 및 API 연동',
    iconName: 'Settings',
    order: 5,
    subMenus: [
      { id: 'menu51', name: '메뉴51', description: '메뉴5의 첫 번째 상세 관리 항목', order: 1 },
      { id: 'menu52', name: '메뉴52', description: '메뉴5의 두 번째 상세 관리 항목', order: 2 },
      { id: 'menu53', name: '메뉴53', description: '메뉴5의 세 번째 상세 관리 항목', order: 3 },
      { id: 'menu54', name: '메뉴54', description: '메뉴5의 네 번째 상세 관리 항목', order: 4 },
      { id: 'menu55', name: '메뉴55', description: '메뉴5의 다섯 번째 상세 관리 항목', order: 5 },
    ],
  },
];
