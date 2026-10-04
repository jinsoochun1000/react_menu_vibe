import "./TopMenu.css";

function TopMenu({ menus, selectedId, onSelect }) {
  return (
    <nav className="top-menu">
      <ul className="top-menu__list">
        {menus.map((menu) => (
          <li key={menu.id}>
            <button
              type="button"
              className={
                "top-menu__item" +
                (menu.id === selectedId ? " top-menu__item--active" : "")
              }
              onClick={() => onSelect(menu.id)}
            >
              {menu.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TopMenu;
