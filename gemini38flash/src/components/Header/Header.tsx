import React, { useState, useRef, useEffect } from 'react';
import type { MenuItem, SubMenuItem } from '../../types/menu';
import { 
  Menu as MenuIcon, 
  ChevronDown, 
  Layers, 
  LayoutDashboard, 
  Users, 
  Package, 
  BarChart3, 
  Settings,
  Database
} from 'lucide-react';
import './Header.css';

interface HeaderProps {
  menus: MenuItem[];
  activeMenuId: string;
  activeSubMenuId: string;
  onSelectMenu: (menuId: string, subMenuId?: string) => void;
  isDbMode?: boolean;
}

// 아이콘 매퍼
export const renderMenuIcon = (iconName?: string, size: number = 18) => {
  switch (iconName) {
    case 'LayoutDashboard':
      return <LayoutDashboard size={size} />;
    case 'Users':
      return <Users size={size} />;
    case 'Package':
      return <Package size={size} />;
    case 'BarChart3':
      return <BarChart3 size={size} />;
    case 'Settings':
      return <Settings size={size} />;
    default:
      return <Layers size={size} />;
  }
};

export const Header: React.FC<HeaderProps> = ({
  menus,
  activeMenuId,
  activeSubMenuId,
  onSelectMenu,
  isDbMode = true,
}) => {
  const [isFullDownOpen, setIsFullDownOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 마우스 진입 시 풀다운 열기
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsFullDownOpen(true);
  };

  // 마우스 이탈 시 잠시 후 풀다운 닫기
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsFullDownOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleTopMenuClick = (menu: MenuItem) => {
    onSelectMenu(menu.id);
  };

  const handleSubMenuClick = (menuId: string, subMenu: SubMenuItem) => {
    onSelectMenu(menuId, subMenu.id);
    setIsFullDownOpen(false);
  };

  return (
    <header 
      className="header-container"
      onMouseLeave={handleMouseLeave}
    >
      {/* 탑 네비게이션 메인 바 */}
      <div className="header-bar">
        <div className="header-left">
          <div className="logo-area">
            <div className="logo-badge">
              <Layers className="logo-icon" size={22} />
            </div>
            <div className="logo-text">
              <span className="brand-name">react_antigravity</span>
              <span className="brand-sub">FullDown Menu System</span>
            </div>
          </div>
        </div>

        {/* 1차 상단 메뉴 리스트 */}
        <nav 
          className="top-nav-menu" 
          onMouseEnter={handleMouseEnter}
        >
          {menus.map((menu) => {
            const isActive = menu.id === activeMenuId;
            return (
              <button
                key={menu.id}
                type="button"
                className={`top-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleTopMenuClick(menu)}
                title={menu.description}
              >
                <span className="nav-icon">{renderMenuIcon(menu.iconName, 18)}</span>
                <span className="nav-title">{menu.name}</span>
                <ChevronDown className="nav-arrow" size={14} />
              </button>
            );
          })}
        </nav>

        {/* 우측 퀵 컨트롤 */}
        <div className="header-right">
          {isDbMode && (
            <div className="db-ready-indicator" title="DB API 연동 준비 완료 상태">
              <Database size={15} />
              <span>DB 연동 모드</span>
            </div>
          )}
          <button
            type="button"
            className={`full-down-toggle-btn ${isFullDownOpen ? 'active' : ''}`}
            onClick={() => setIsFullDownOpen((prev) => !prev)}
            aria-label="전체 메뉴 풀다운 토글"
            title="전체 메뉴 풀다운 토글"
          >
            <MenuIcon size={18} />
            <span>전체메뉴</span>
          </button>
        </div>
      </div>

      {/* 풀다운 (Full-Down) 메가 메뉴 패널 */}
      <div 
        className={`fulldown-panel ${isFullDownOpen ? 'open' : ''}`}
        onMouseEnter={handleMouseEnter}
      >
        <div className="fulldown-wrapper">
          <div className="fulldown-header">
            <div className="fulldown-info">
              <h4>전체 카테고리 풀다운 메뉴</h4>
              <p>상단 메뉴 호버 또는 전체메뉴 버튼 클릭 시 모든 1차 및 2차 메뉴가 전체 펼침됩니다.</p>
            </div>
          </div>

          <div className="fulldown-grid">
            {menus.map((menu) => {
              const isParentActive = menu.id === activeMenuId;
              return (
                <div 
                  key={menu.id} 
                  className={`fulldown-column ${isParentActive ? 'parent-active' : ''}`}
                >
                  <div 
                    className="fulldown-column-title"
                    onClick={() => {
                      handleTopMenuClick(menu);
                      setIsFullDownOpen(false);
                    }}
                  >
                    <span className="col-icon">{renderMenuIcon(menu.iconName, 18)}</span>
                    <span className="col-name">{menu.name}</span>
                  </div>

                  <ul className="fulldown-sub-list">
                    {menu.subMenus.map((sub) => {
                      const isSubActive = isParentActive && sub.id === activeSubMenuId;
                      return (
                        <li key={sub.id}>
                          <button
                            type="button"
                            className={`fulldown-sub-item ${isSubActive ? 'active' : ''}`}
                            onClick={() => handleSubMenuClick(menu.id, sub)}
                          >
                            <span className="bullet">›</span>
                            <span className="sub-name">{sub.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 오버레이 딤 배경 (풀다운 열렸을 때) */}
      {isFullDownOpen && (
        <div 
          className="fulldown-backdrop" 
          onClick={() => setIsFullDownOpen(false)}
        />
      )}
    </header>
  );
};
