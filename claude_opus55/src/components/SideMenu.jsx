import "./SideMenu.css";

function SideMenu({ title, menus, selectedId, onSelect }) {
  return (
    <aside className="side-menu">
      <div className="side-menu__title">{title}</div>
      <ul className="side-menu__list">
        {menus.map((menu) => (
          <li key={menu.id}>
            <button
              type="button"
              className={
                "side-menu__item" +
                (menu.id === selectedId ? " side-menu__item--active" : "")
              }
              onClick={() => onSelect(menu.id)}
            >
              {menu.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideMenu;
