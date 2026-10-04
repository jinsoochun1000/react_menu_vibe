import { useMemo, useState } from "react";
import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu";
import "./FullDownMenu.css";

function FullDownMenu({ menuData }) {
  const topMenus = useMemo(
    () =>
      menuData
        .filter((menu) => menu.parentId === null)
        .sort((a, b) => a.order - b.order),
    [menuData]
  );

  const [selectedTopId, setSelectedTopId] = useState(
    topMenus[0]?.id ?? null
  );
  const [selectedSideId, setSelectedSideId] = useState(null);

  const sideMenus = useMemo(
    () =>
      menuData
        .filter((menu) => menu.parentId === selectedTopId)
        .sort((a, b) => a.order - b.order),
    [menuData, selectedTopId]
  );

  const selectedTopMenu = topMenus.find((menu) => menu.id === selectedTopId);
  const selectedSideMenu = sideMenus.find(
    (menu) => menu.id === selectedSideId
  );

  const handleSelectTop = (topId) => {
    setSelectedTopId(topId);
    setSelectedSideId(null);
  };

  return (
    <div className="fulldown-menu">
      <TopMenu
        menus={topMenus}
        selectedId={selectedTopId}
        onSelect={handleSelectTop}
      />
      <div className="fulldown-menu__body">
        <SideMenu
          title={selectedTopMenu?.name ?? ""}
          menus={sideMenus}
          selectedId={selectedSideId}
          onSelect={setSelectedSideId}
        />
        <main className="fulldown-menu__content">
          <h1>
            {selectedTopMenu?.name}
            {selectedSideMenu ? ` / ${selectedSideMenu.name}` : ""}
          </h1>
          <p>
            {selectedSideMenu
              ? `${selectedSideMenu.name} 화면 영역입니다.`
              : "좌측 메뉴를 선택해주세요."}
          </p>
        </main>
      </div>
    </div>
  );
}

export default FullDownMenu;
