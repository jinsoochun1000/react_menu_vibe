import { describe, expect, it } from 'vitest'
import type { MenuRecord, MenuService } from '../models/menu'
import { buildMenus } from './buildMenus'
import {
  applyCloseFullMenu,
  applyOpenGroup,
  applySelect,
  applyToggleFullMenu,
  getBreadcrumb,
  getMenuCount,
  loadMenuState,
} from './menuState'
import { sampleMenuService } from '../services/menuService'

function fixedService(records: readonly MenuRecord[]): MenuService {
  return { getMenus: async () => records }
}

describe('FullDown menu', () => {
  it('loads 5 groups / 25 children and starts on 메뉴1 > 메뉴11', async () => {
    const state = await loadMenuState(sampleMenuService)
    expect(state.menus).toHaveLength(5)
    expect(getMenuCount(state.menus)).toBe(25)
    expect(state.selectedMenu?.name).toBe('메뉴11')
    expect(state.activeGroup?.name).toBe('메뉴1')
    expect(state.activeGroup?.children.every((child) => child.parent === state.activeGroup)).toBe(true)
  })

  it('filters the left menu to the selected top group only', async () => {
    let state = await loadMenuState(sampleMenuService)

    for (const group of state.menus) {
      state = applyOpenGroup(state, group)
      expect(state.activeGroup).toBe(group)
      expect(group.children).toHaveLength(5)
      expect(group.children.every((child) => child.parent === group)).toBe(true)
      expect(state.menus.filter((item) => item.id === state.activeGroup?.id)).toHaveLength(1)
      expect(state.selectedMenu?.parent).toBe(group)
      expect(state.isFullMenuOpen).toBe(false)

      const current = state.selectedMenu
      state = applyOpenGroup(state, group)
      expect(state.selectedMenu).toBe(current)

      for (const child of group.children) {
        state = applySelect(state, child)
        expect(state.selectedMenu).toBe(child)
        expect(getBreadcrumb(state.selectedMenu)).toBe(`${group.name}  /  ${child.name}`)
        expect(state.activeGroup).toBe(group)
        expect(state.isFullMenuOpen).toBe(false)
        expect(
          state.menus.flatMap((item) => item.children).filter((item) => item.id === state.selectedMenu?.id),
        ).toHaveLength(1)
      }
    }
  })

  it('toggles and closes the FullDown panel', async () => {
    let state = await loadMenuState(sampleMenuService)
    state = applyToggleFullMenu(state)
    expect(state.isFullMenuOpen).toBe(true)
    state = applyCloseFullMenu(state)
    expect(state.isFullMenuOpen).toBe(false)
  })

  it('maps DB names, parent links, and sort order', () => {
    const mapped = buildMenus([
      { id: 'child', parentId: 'root', name: 'DB에서 변경한 명칭', sortOrder: 2 },
      { id: 'root', parentId: null, name: '관리', sortOrder: 1 },
      { id: 'first', parentId: 'root', name: '첫 번째', sortOrder: 1 },
    ])
    expect(mapped[0].children[0].id).toBe('first')
    expect(mapped[0].children[1].name).toBe('DB에서 변경한 명칭')
  })

  it('rejects invalid menu graphs', () => {
    expect(() =>
      buildMenus([
        { id: 'a', parentId: null, name: 'A', sortOrder: 1 },
        { id: 'a', parentId: null, name: 'B', sortOrder: 2 },
      ]),
    ).toThrow()
    expect(() => buildMenus([{ id: 'a', parentId: 'missing', name: 'A', sortOrder: 1 }])).toThrow()
    expect(() =>
      buildMenus([
        { id: 'a', parentId: null, name: 'A', sortOrder: 1 },
        { id: 'b', parentId: 'a', name: 'B', sortOrder: 1 },
        { id: 'c', parentId: 'b', name: 'C', sortOrder: 1 },
      ]),
    ).toThrow()
  })

  it('handles empty data and load failures', async () => {
    const empty = await loadMenuState(fixedService([]))
    expect(getMenuCount(empty.menus)).toBe(0)
    expect(empty.selectedMenu).toBeNull()
    expect(empty.activeGroup).toBeNull()

    const failure = await loadMenuState(fixedService([{ id: 'a', parentId: 'missing', name: 'A', sortOrder: 1 }]))
    expect(failure.status).toContain('불러오지 못했습니다')
  })
})
