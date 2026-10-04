import type { MenuNode, MenuService } from '../models/menu'
import { buildMenus } from './buildMenus'

export type MenuState = {
  menus: MenuNode[]
  selectedMenu: MenuNode | null
  activeGroup: MenuNode | null
  isFullMenuOpen: boolean
  status: string
}

export const initialMenuState: MenuState = {
  menus: [],
  selectedMenu: null,
  activeGroup: null,
  isFullMenuOpen: false,
  status: '메뉴를 불러오는 중입니다.',
}

export function getMenuCount(menus: readonly MenuNode[]): number {
  return menus.reduce((count, group) => count + group.children.length, 0)
}

export function getBreadcrumb(selectedMenu: MenuNode | null): string {
  return selectedMenu ? `${selectedMenu.parent?.name}  /  ${selectedMenu.name}` : '메뉴를 선택해 주세요'
}

export function applySelect(state: MenuState, menu: MenuNode): MenuState {
  if (menu.parent == null) return state
  return {
    ...state,
    selectedMenu: menu,
    activeGroup: menu.parent,
    isFullMenuOpen: false,
  }
}

export function applyOpenGroup(state: MenuState, item: MenuNode): MenuState {
  const group = item.parent ?? item
  if (state.selectedMenu?.parent !== group) {
    const first = group.children[0]
    if (first) return applySelect(state, first)
  }
  return { ...state, activeGroup: group }
}

export function applyToggleFullMenu(state: MenuState): MenuState {
  return { ...state, isFullMenuOpen: !state.isFullMenuOpen }
}

export function applyCloseFullMenu(state: MenuState): MenuState {
  return { ...state, isFullMenuOpen: false }
}

export async function loadMenuState(service: MenuService): Promise<MenuState> {
  try {
    const records = await service.getMenus()
    const menus = buildMenus(records)
    const first = menus.flatMap((group) => group.children)[0]
    if (first) {
      return applySelect(
        {
          menus,
          selectedMenu: null,
          activeGroup: null,
          isFullMenuOpen: false,
          status: '메뉴를 선택하여 작업을 시작하세요.',
        },
        first,
      )
    }
    return {
      menus,
      selectedMenu: null,
      activeGroup: menus[0] ?? null,
      isFullMenuOpen: false,
      status: '등록된 하위 메뉴가 없습니다.',
    }
  } catch {
    return {
      menus: [],
      selectedMenu: null,
      activeGroup: null,
      isFullMenuOpen: false,
      status: '메뉴를 불러오지 못했습니다. 메뉴 데이터와 연결 상태를 확인해 주세요.',
    }
  }
}
