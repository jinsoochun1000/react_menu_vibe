export interface SubMenuItem {
  id: string;
  name: string;
  description?: string;
  badge?: string;
  order?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  iconName?: string;
  order?: number;
  subMenus: SubMenuItem[];
}

export interface MenuNavigationState {
  activeMenuId: string;
  activeSubMenuId: string;
}
