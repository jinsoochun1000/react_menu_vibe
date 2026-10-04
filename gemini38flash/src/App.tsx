import { useState, useEffect, useCallback } from 'react';
import type { MenuItem } from './types/menu';
import { INITIAL_MENU_DATA } from './data/initialMenuData';
import { MenuService } from './services/menuService';
import { Layout } from './components/Layout/Layout';

export function App() {
  const [menus, setMenus] = useState<MenuItem[]>(INITIAL_MENU_DATA);
  const [activeMenuId, setActiveMenuId] = useState<string>('menu1');
  const [activeSubMenuId, setActiveSubMenuId] = useState<string>('menu11');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 차후 백엔드 DB 연동을 시뮬레이션하는 비동기 데이터 로딩 훅
  useEffect(() => {
    let isMounted = true;
    const loadMenuData = async () => {
      try {
        const data = await MenuService.getMenus();
        if (isMounted) {
          setMenus(data);
          if (data.length > 0) {
            setActiveMenuId(data[0].id);
            if (data[0].subMenus.length > 0) {
              setActiveSubMenuId(data[0].subMenus[0].id);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load menu data:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMenuData();
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * 상단 메뉴 선택 핸들러
   * 상단 메뉴가 변경되면 좌측 사이드바는 해당 상위 메뉴의 서브메뉴로 자동 갱신됩니다.
   * subMenuId가 전달되지 않은 경우 해당 메뉴의 첫 번째 서브메뉴를 기본 선택합니다.
   */
  const handleSelectMenu = useCallback((menuId: string, subMenuId?: string) => {
    setActiveMenuId(menuId);
    
    const targetMenu = menus.find((m) => m.id === menuId);
    if (targetMenu && targetMenu.subMenus.length > 0) {
      if (subMenuId && targetMenu.subMenus.some((s) => s.id === subMenuId)) {
        setActiveSubMenuId(subMenuId);
      } else {
        // 첫 번째 서브메뉴 기본 활성화
        setActiveSubMenuId(targetMenu.subMenus[0].id);
      }
    }
  }, [menus]);

  /**
   * 좌측 사이드바 서브메뉴 선택 핸들러
   */
  const handleSelectSubMenu = useCallback((subMenuId: string) => {
    setActiveSubMenuId(subMenuId);
  }, []);

  return (
    <Layout
      menus={menus}
      activeMenuId={activeMenuId}
      activeSubMenuId={activeSubMenuId}
      onSelectMenu={handleSelectMenu}
      onSelectSubMenu={handleSelectSubMenu}
      isLoading={isLoading}
    />
  );
}

export default App;
