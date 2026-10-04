import type { MenuItem } from '../types/menu';
import { INITIAL_MENU_DATA } from '../data/initialMenuData';

/**
 * MenuService
 * 차후 백엔드 데이터베이스(DB) 및 REST/GraphQL API 연동을 지원하기 위한 서비스 계층입니다.
 */
export const MenuService = {
  /**
   * DB 또는 백엔드 API로부터 전체 메뉴 계층 구조를 비동기로 조회합니다.
   * 추후 `return await fetch('/api/menus').then(res => res.json());` 과 같이 교체 가능합니다.
   */
  async getMenus(): Promise<MenuItem[]> {
    // 실제 네트워크 요청 지연 시간을 시뮬레이션(선택 사항)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(INITIAL_MENU_DATA);
      }, 100);
    });
  },

  /**
   * 특정 메뉴 항목 단건 조회
   */
  async getMenuById(menuId: string): Promise<MenuItem | undefined> {
    const menus = await this.getMenus();
    return menus.find((m) => m.id === menuId);
  },
};
