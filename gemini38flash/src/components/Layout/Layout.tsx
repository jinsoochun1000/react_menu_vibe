import type { MenuItem, SubMenuItem } from '../../types/menu';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { ContentArea } from '../Content/ContentArea';
import './Layout.css';

interface LayoutProps {
  menus: MenuItem[];
  activeMenuId: string;
  activeSubMenuId: string;
  onSelectMenu: (menuId: string, subMenuId?: string) => void;
  onSelectSubMenu: (subMenuId: string) => void;
  isLoading?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  menus,
  activeMenuId,
  activeSubMenuId,
  onSelectMenu,
  onSelectSubMenu,
  isLoading = false,
}) => {
  const currentMenu = menus.find((m) => m.id === activeMenuId);
  const currentSubMenu = currentMenu?.subMenus.find((s: SubMenuItem) => s.id === activeSubMenuId);

  return (
    <div className="app-layout">
      {/* 1. 상단 풀다운 헤더 네비게이션 */}
      <Header
        menus={menus}
        activeMenuId={activeMenuId}
        activeSubMenuId={activeSubMenuId}
        onSelectMenu={onSelectMenu}
        isDbMode={true}
      />

      {/* 2. 바디 영역: 좌측 사이드바 + 우측 본문 */}
      <div className="layout-body">
        {isLoading ? (
          <div className="layout-loading">
            <div className="spinner"></div>
            <p>메뉴 데이터를 비동기로 불러오는 중입니다...</p>
          </div>
        ) : (
          <>
            {/* 좌측 사이드바: 상단 메뉴 소속 하위 메뉴만 표시 */}
            <Sidebar
              currentMenu={currentMenu}
              activeSubMenuId={activeSubMenuId}
              onSelectSubMenu={onSelectSubMenu}
            />

            {/* 우측 메인 콘텐츠 영역 */}
            <ContentArea
              currentMenu={currentMenu}
              currentSubMenu={currentSubMenu}
              allMenus={menus}
              onSelectMenu={onSelectMenu}
            />
          </>
        )}
      </div>
    </div>
  );
};
