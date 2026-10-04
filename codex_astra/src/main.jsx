import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { menus } from './menu';
import './styles.css';

function Icon({ name = 'grid', size = 20, ...props }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    chevron: <path d="m9 5 7 7-7 7"/>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    layers: <><path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5"/></>,
    folder: <path d="M3 7V5a2 2 0 0 1 2-2h5l3 4h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [expanded, setExpanded] = useState(menus[0].id);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([]);
  const navRef = useRef(null);
  const activeGroup = menus.find(group => group.id === selectedGroupId);
  const sidebarMenus = activeGroup ? [activeGroup] : menus;
  const activeItem = activeGroup?.children.find(child => child.id === selectedId);
  const visibleMenus = menus.map(group => ({ ...group, children: group.children.filter(child => `${group.name} ${child.name}`.includes(query.trim())) })).filter(group => group.children.length);

  useEffect(() => {
    const dismiss = event => {
      if (event.type === 'keydown' && event.key !== 'Escape') return;
      if (event.type === 'pointerdown' && navRef.current?.contains(event.target)) return;
      setMegaOpen(false);
      if (event.type === 'keydown') setMobileOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', dismiss);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', dismiss); };
  }, []);

  function select(group, item) {
    setSelectedGroupId(group.id);
    setSelectedId(item.id);
    setExpanded(group.id);
    setMegaOpen(false);
    setMobileOpen(false);
    setRecent(previous => [{ group, item }, ...previous.filter(entry => entry.item.id !== item.id)].slice(0, 4));
  }
  function selectGroup(group) {
    setSelectedGroupId(group.id);
    if (selectedGroupId !== group.id) setSelectedId(null);
    setExpanded(group.id);
    setMegaOpen(true);
  }
  function home() { setSelectedId(null); setSelectedGroupId(null); setExpanded(menus[0].id); setQuery(''); setMobileOpen(false); setMegaOpen(false); }

  return <div className="app">
    <a className="skip-link" href="#main">본문 바로가기</a>
    <header className="header">
      <button className="brand" onClick={home} aria-label="react_claude 홈"><span className="brand-symbol"><Icon name="layers" size={23}/></span><span>react<span className="brand-light">_claude</span><small>MENU WORKSPACE</small></span></button>
      <div className="top-nav" ref={navRef} onMouseLeave={() => setMegaOpen(false)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMegaOpen(false); }}>
        <nav aria-label="상단 메뉴" className="top-links">
          {menus.map(group => <button key={group.id} className={activeGroup?.id === group.id ? 'active' : ''} aria-expanded={megaOpen} aria-controls="full-menu" onMouseEnter={() => setMegaOpen(true)} onClick={() => selectGroup(group)}>{group.name}<span className="down">⌄</span></button>)}
        </nav>
        {megaOpen && <div className="mega-menu" id="full-menu"><div className="mega-intro"><span className="eyebrow">EXPLORE WORKSPACE</span><strong>모든 메뉴, 한눈에.</strong><p>원하는 메뉴로 빠르게 이동하세요.</p></div><div className="mega-columns">{menus.map(group => <section key={group.id}><h2>{group.name}</h2>{group.children.map(item => <button key={item.id} className={selectedId === item.id ? 'selected' : ''} onClick={() => select(group, item)}>{item.name}<Icon name="arrow" size={14}/></button>)}</section>)}</div></div>}
      </div>
      <div className="header-right"><span className="workspace-tag"><i/>Personal workspace</span><span className="avatar" aria-label="사용자">RC</span><button className="icon-button mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="좌측 메뉴 열기" aria-expanded={mobileOpen}><Icon name={mobileOpen ? 'close' : 'menu'}/></button></div>
    </header>

    {mobileOpen && <button className="sidebar-backdrop" aria-label="메뉴 닫기" onClick={() => setMobileOpen(false)}/>}
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="workspace-label"><span className="workspace-icon">W</span><div><strong>내 워크스페이스</strong><small>Personal space</small></div><span className="workspace-dots">···</span></div>
      <button className={`overview-link ${!selectedGroupId ? 'selected' : ''}`} onClick={home}><Icon/>워크스페이스 홈<Icon name="arrow" size={16}/></button>
      <div className="nav-label">{activeGroup ? activeGroup.name : 'WORKSPACE'} <span>{String(sidebarMenus.length).padStart(2, '0')}</span></div>
      <nav className="side-nav" aria-label="좌측 메뉴">{sidebarMenus.map(group => <div className="side-group" key={group.id}><button className={`group-button ${activeGroup?.id === group.id ? 'current' : ''}`} onClick={() => setExpanded(expanded === group.id ? null : group.id)} aria-expanded={expanded === group.id} aria-controls={`side-${group.id}`}><Icon name="folder" size={18}/><span>{group.name}</span><span className="item-count">5</span><Icon name="chevron" size={13} className={expanded === group.id ? 'rotated' : ''}/></button>{expanded === group.id && <div className="side-children" id={`side-${group.id}`}>{group.children.map(item => <button key={item.id} className={selectedId === item.id ? 'selected' : ''} aria-current={selectedId === item.id ? 'page' : undefined} onClick={() => select(group, item)}><span className="child-dot"/>{item.name}{selectedId === item.id && <span className="active-dot"/>}</button>)}</div>}</div>)}</nav>
      <div className="sidebar-bottom"><div className="tip-icon"><Icon name="layers" size={19}/></div><strong>간결하게, 더 효율적으로</strong><p>필요한 메뉴를 한 곳에서.<br/>나만의 작업 흐름을 만들어 보세요.</p><span className="version"><i/>Workspace v1.0</span></div>
    </aside>

    <main id="main" tabIndex={-1}>
      <div className="breadcrumb"><Icon size={14}/><span>워크스페이스</span><Icon name="chevron" size={12}/><strong>{activeItem ? `${activeGroup.name} / ${activeItem.name}` : activeGroup?.name ?? '홈'}</strong></div>
      <div className="page-heading"><div><span className="eyebrow">YOUR WORKSPACE, SIMPLIFIED</span><h1>{activeItem ? activeItem.name : activeGroup?.name ?? '워크스페이스'}</h1><p>{activeItem ? `${activeGroup.name}의 ${activeItem.name} 페이지입니다. 이곳에서 작업을 시작하세요.` : '흩어져 있는 메뉴를 한눈에, 원하는 작업을 더 빠르게 시작하세요.'}</p></div><span className="page-badge"><i/>{activeItem ? '메뉴 선택됨' : '모든 메뉴 준비 완료'}</span></div>

      <section className="welcome-card"><div className="welcome-copy"><span className="welcome-kicker">A BETTER WAY TO NAVIGATE</span><h2>{activeItem ? `${activeItem.name}에 오신 것을 환영합니다.` : <>좋은 작업의 시작,<br/>정리된 워크스페이스.</>}</h2><p>{activeItem ? '상단과 좌측 메뉴에서 언제든 다른 페이지로 이동할 수 있습니다.' : '상단 전체 메뉴와 좌측 탐색으로 필요한 페이지에 바로 연결됩니다.'}</p><button onClick={() => { setQuery(''); document.getElementById('menu-directory').scrollIntoView({ behavior: 'smooth' }); }}>메뉴 둘러보기<Icon name="arrow" size={17}/></button></div><div className="welcome-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-card back-card"><span/><span/><span/></div><div className="art-card front-card"><div className="art-title"><span className="art-logo"><Icon name="grid" size={17}/></span><span className="art-line"/><span className="art-dot"/></div><div className="art-row active"><span/><i/><Icon name="check" size={14}/></div><div className="art-row"><span/><i/></div><div className="art-row"><span/><i/></div></div><span className="floating-check"><Icon name="check" size={23}/></span><span className="art-spark">✳</span></div></section>

      <div className="stats"><div><span className="stat-icon"><Icon name="layers"/></span><span><small>상위 메뉴</small><strong>5 <em>개 카테고리</em></strong></span><span className="stat-note">체계적인 분류</span></div><div><span className="stat-icon"><Icon name="grid"/></span><span><small>전체 하위 메뉴</small><strong>25 <em>개 페이지</em></strong></span><span className="stat-note">빠른 페이지 탐색</span></div><div><span className="stat-icon"><Icon name="clock"/></span><span><small>최근 방문</small><strong>{recent.length} <em>개 메뉴</em></strong></span><span className="stat-note">나의 작업 기록</span></div></div>

      <section className="directory" id="menu-directory"><div className="section-heading"><div><h2>메뉴 바로가기 <span>DIRECTORY</span></h2><p>카테고리별 메뉴를 확인하고 원하는 페이지로 이동하세요.</p></div><label className="search"><Icon name="search" size={17}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="메뉴 검색..." aria-label="메뉴 검색"/>{query && <button onClick={() => setQuery('')} aria-label="검색어 지우기"><Icon name="close" size={14}/></button>}</label></div><div className="menu-cards">{visibleMenus.map(group => <article className="menu-card" key={group.id}><div className="card-heading"><span className="card-icon"><Icon name="folder"/></span><span className="card-number">0{menus.findIndex(menu => menu.id === group.id) + 1}</span></div><h3>{group.name}</h3><p>{group.children.length}개의 하위 메뉴</p><div className="card-links">{group.children.map(item => <button key={item.id} className={selectedId === item.id ? 'selected' : ''} onClick={() => select(group, item)}>{item.name}<Icon name="arrow" size={14}/></button>)}</div></article>)}</div>{!visibleMenus.length && <div className="empty-state">“{query}”에 해당하는 메뉴가 없습니다.<button onClick={() => setQuery('')}>전체 메뉴 보기</button></div>}</section>
      <section className="recent-section"><div className="recent-title"><Icon name="clock" size={17}/><h2>최근 방문한 메뉴</h2></div>{recent.length ? <div className="recent-links">{recent.map(({group, item}) => <button key={item.id} onClick={() => select(group, item)}><span>{group.name} /</span> {item.name}<Icon name="arrow" size={14}/></button>)}</div> : <p>아직 방문한 메뉴가 없습니다. 위 메뉴를 선택해 첫 작업을 시작해 보세요.</p>}</section>
      <footer><span>© {new Date().getFullYear()} react_claude</span><span>Designed for a simpler workflow.<span className="footer-dot"/>React workspace</span></footer>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
