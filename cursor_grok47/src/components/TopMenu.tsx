import type { MenuNode } from '../models/menu'

type TopMenuProps = {
  groups: readonly MenuNode[]
  activeGroupId: string | null
  onOpenGroup: (group: MenuNode) => void
  onToggleFullMenu: () => void
}

export function TopMenu({ groups, activeGroupId, onOpenGroup, onToggleFullMenu }: TopMenuProps) {
  return (
    <div className="top-menu" data-testid="top-menu">
      <div className="top-menu-groups" role="navigation" aria-label="상단 메뉴">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            className={group.id === activeGroupId ? 'top-menu-button is-selected' : 'top-menu-button'}
            onClick={() => onOpenGroup(group)}
          >
            {group.name}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="on-dark-button full-menu-toggle"
        onClick={onToggleFullMenu}
        title="전체 메뉴 펼치기 / 접기 (Esc로 닫기)"
      >
        ☰  전체 메뉴
      </button>
    </div>
  )
}
