import { useState } from 'react'
import { menuGroups } from './data/menuData'
import './App.css'

function App() {
  const [activeGroupId, setActiveGroupId] = useState(menuGroups[0].id)
  const [activeItem, setActiveItem] = useState(menuGroups[0].items[0])
  const activeGroup = menuGroups.find((group) => group.id === activeGroupId)

  const selectGroup = (group) => {
    setActiveGroupId(group.id)
    setActiveItem(group.items[0])
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-label="FullDown 홈"><span className="brand-dot" /><span>FULLDOWN</span></div>
        <nav className="top-nav" aria-label="상단 메뉴">
          {menuGroups.map((group, index) => <button className={group.id === activeGroupId ? 'top-link active' : 'top-link'} key={group.id} type="button" onClick={() => selectGroup(group)}><span className="menu-index">0{index + 1}</span>{group.label}</button>)}
        </nav>
        <button className="profile-button" type="button" aria-label="사용자 메뉴"><span>JS</span><span className="chevron">⌄</span></button>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-heading"><span className="eyebrow">NAVIGATION</span><h1>{activeGroup.label}</h1></div>
          <nav className="side-nav" aria-label={`${activeGroup.label} 하위 메뉴`}>
            {activeGroup.items.map((item, index) => <button className={item === activeItem ? 'side-link active' : 'side-link'} key={item} type="button" onClick={() => setActiveItem(item)}><span className="side-number">0{index + 1}</span><span>{item}</span><span className="arrow">↗</span></button>)}
          </nav>
          <div className="sidebar-footer"><span className="status-dot" /><span>서비스 정상 운영 중</span></div>
        </aside>

        <main className="content">
          <div className="content-topline"><span>WORKSPACE / {activeGroup.label}</span><span>2026.09.17</span></div>
          <section className="welcome-panel">
            <div className="panel-copy"><span className="eyebrow accent">SELECTED MENU</span><h2>{activeItem}</h2><p>{activeGroup.description}</p><button className="action-button" type="button">{activeItem} 열기 <span>→</span></button></div>
            <div className="panel-art" aria-hidden="true"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-core">{activeGroup.label.slice(-1)}</div><span className="art-label">FULL DOWN<br />MENU SYSTEM</span></div>
          </section>
          <div className="content-note"><span className="note-line" /><span>상단 메뉴를 선택하면 관련 하위 메뉴가 자동으로 갱신됩니다.</span></div>
        </main>
      </div>
    </div>
  )
}

export default App
