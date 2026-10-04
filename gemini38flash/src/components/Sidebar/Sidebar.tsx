import type { MenuItem, SubMenuItem } from '../../types/menu';
import { renderMenuIcon } from '../Header/Header';
import { ChevronRight, FolderTree } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  currentMenu?: MenuItem;
  activeSubMenuId: string;
  onSelectSubMenu: (subMenuId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMenu,
  activeSubMenuId,
  onSelectSubMenu,
}) => {
  if (!currentMenu) {
    return (
      <aside className="sidebar-container">
        <div className="sidebar-empty">
          <FolderTree size={36} />
          <p>선택된 메뉴가 없습니다.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar-container">
      {/* 현재 상위 메뉴 헤더 영역 */}
      <div className="sidebar-header">
        <div className="sidebar-title-group">
          <div className="sidebar-icon-box">
            {renderMenuIcon(currentMenu.iconName, 22)}
          </div>
          <div className="sidebar-info">
            <span className="sidebar-parent-label">소속 대메뉴</span>
            <h2 className="sidebar-menu-title">{currentMenu.name}</h2>
          </div>
        </div>
        {currentMenu.description && (
          <p className="sidebar-menu-desc">{currentMenu.description}</p>
        )}
      </div>

      {/* 소속 하위 메뉴 목록 (상단 메뉴 소속 메뉴만 보여짐) */}
      <div className="sidebar-body">
        <div className="sidebar-section-label">
          <span>하위 상세 메뉴 ({currentMenu.subMenus.length})</span>
        </div>

        <nav className="sidebar-nav">
          {currentMenu.subMenus.map((subMenu: SubMenuItem) => {
            const isActive = subMenu.id === activeSubMenuId;
            return (
              <button
                key={subMenu.id}
                type="button"
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSubMenu(subMenu.id)}
              >
                <div className="nav-item-content">
                  <span className="sub-badge">{subMenu.order ?? '•'}</span>
                  <div className="sub-text">
                    <span className="sub-name">{subMenu.name}</span>
                    {subMenu.description && (
                      <span className="sub-desc">{subMenu.description}</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="nav-arrow-icon" size={16} />
              </button>
            );
          })}
        </nav>
      </div>

      {/* 사이드바 하단 정보 카드 */}
      <div className="sidebar-footer">
        <div className="current-context-card">
          <span className="context-label">현재 연결 경로</span>
          <span className="context-value">
            {currentMenu.name} &gt; {currentMenu.subMenus.find(s => s.id === activeSubMenuId)?.name || '선택 없음'}
          </span>
        </div>
      </div>
    </aside>
  );
};
