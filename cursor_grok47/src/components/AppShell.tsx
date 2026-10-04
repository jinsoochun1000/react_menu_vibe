import { ContentArea } from './ContentArea'
import { FullDownPanel } from './FullDownPanel'
import { LeftMenu } from './LeftMenu'
import { TopMenu } from './TopMenu'
import { useMenuState } from '../hooks/useMenuState'

export function AppShell() {
  const menu = useMenuState()

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            R
          </div>
          <div>
            <p className="brand-title">react_cursor</p>
            <p className="brand-subtitle">WORKSPACE</p>
          </div>
        </div>
        <p className="app-header-label">FullDown Menu</p>
      </header>

      <div className="app-body">
        <LeftMenu
          groupName={menu.activeGroup?.name ?? '메뉴'}
          items={menu.activeGroup?.children ?? []}
          selectedId={menu.selectedMenu?.id ?? null}
          onSelect={menu.selectMenu}
        />
        <div className="workspace">
          <TopMenu
            groups={menu.menus}
            activeGroupId={menu.activeGroup?.id ?? null}
            onOpenGroup={menu.openGroup}
            onToggleFullMenu={menu.toggleFullMenu}
          />
          <div className="workspace-main">
            <ContentArea
              breadcrumb={menu.breadcrumb}
              selectedName={menu.selectedMenu?.name ?? null}
              menuCount={menu.menuCount}
            />
            {menu.isFullMenuOpen ? (
              <FullDownPanel
                groups={menu.menus}
                selectedId={menu.selectedMenu?.id ?? null}
                onSelect={menu.selectMenu}
                onClose={menu.closeFullMenu}
              />
            ) : null}
          </div>
        </div>
      </div>

      <footer className="status-bar">
        <p>{menu.status}</p>
        <p>React  /  Vite</p>
      </footer>
    </div>
  )
}
