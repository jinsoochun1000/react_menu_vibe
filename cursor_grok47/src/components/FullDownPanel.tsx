import type { MenuNode } from '../models/menu'

type FullDownPanelProps = {
  groups: readonly MenuNode[]
  selectedId: string | null
  onSelect: (menu: MenuNode) => void
  onClose: () => void
}

export function FullDownPanel({ groups, selectedId, onSelect, onClose }: FullDownPanelProps) {
  return (
    <div className="fulldown" data-testid="fulldown">
      <button
        type="button"
        className="fulldown-backdrop"
        onClick={onClose}
        aria-label="전체 메뉴 닫기"
      />
      <div className="fulldown-panel">
        <div className="fulldown-header">
          <h3>전체 메뉴</h3>
          <button type="button" className="on-dark-button" onClick={onClose}>
            닫기  ✕
          </button>
        </div>
        <div className="fulldown-columns">
          {groups.map((group) => (
            <section key={group.id} className="fulldown-column">
              <h4>{group.name}</h4>
              {group.children.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  className={
                    child.id === selectedId ? 'fulldown-item is-selected' : 'fulldown-item'
                  }
                  onClick={() => onSelect(child)}
                >
                  {child.name}
                </button>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
