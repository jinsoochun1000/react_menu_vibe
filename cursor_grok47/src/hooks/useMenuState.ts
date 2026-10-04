import { useCallback, useEffect, useState } from 'react'
import type { MenuNode, MenuService } from '../models/menu'
import {
  applyCloseFullMenu,
  applyOpenGroup,
  applySelect,
  applyToggleFullMenu,
  getBreadcrumb,
  getMenuCount,
  initialMenuState,
  loadMenuState,
} from '../menu/menuState'
import { sampleMenuService } from '../services/menuService'

export function useMenuState(service: MenuService = sampleMenuService) {
  const [state, setState] = useState(initialMenuState)

  useEffect(() => {
    let cancelled = false
    loadMenuState(service).then((next) => {
      if (!cancelled) setState(next)
    })
    return () => {
      cancelled = true
    }
  }, [service])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setState(applyCloseFullMenu)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const openGroup = useCallback((item: MenuNode) => {
    setState((current) => applyOpenGroup(current, item))
  }, [])

  const selectMenu = useCallback((menu: MenuNode) => {
    setState((current) => applySelect(current, menu))
  }, [])

  const toggleFullMenu = useCallback(() => {
    setState(applyToggleFullMenu)
  }, [])

  const closeFullMenu = useCallback(() => {
    setState(applyCloseFullMenu)
  }, [])

  return {
    ...state,
    breadcrumb: getBreadcrumb(state.selectedMenu),
    menuCount: getMenuCount(state.menus),
    openGroup,
    selectMenu,
    toggleFullMenu,
    closeFullMenu,
  }
}
