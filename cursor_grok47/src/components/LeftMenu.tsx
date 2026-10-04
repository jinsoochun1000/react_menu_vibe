import type { MenuNode } from '../models/menu'

type LeftMenuProps = {
  groupName: string
  items: readonly MenuNode[]
  selectedId: string | null
  onSelect: (menu: MenuNode) => void
}

export function LeftMenu({ groupName, items, selectedId, onSelect }: LeftMenuProps) {
  return (
    <aside className="left-menu" data-testid="left-menu">
      <div className="left-menu-heading">
        <p className="eyebrow">NAVIGATION</p>
        <h2>{groupName}</h2>
      </div>
      <nav className="left-menu-nav" aria-label="좌측 메뉴">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === selectedId ? 'menu-button is-selected' : 'menu-button'}
            onClick={() => onSelect(item)}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  )
}
