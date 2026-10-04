import type { MenuRecord, MenuService } from '../models/menu'

export const sampleMenuService: MenuService = {
  getMenus(signal) {
    signal?.throwIfAborted()
    const records: MenuRecord[] = []
    for (let group = 1; group <= 5; group += 1) {
      const groupId = `menu-${group}`
      records.push({ id: groupId, parentId: null, name: `메뉴${group}`, sortOrder: group })
      for (let child = 1; child <= 5; child += 1) {
        records.push({
          id: `${groupId}-${child}`,
          parentId: groupId,
          name: `메뉴${group}${child}`,
          sortOrder: child,
        })
      }
    }
    return Promise.resolve(records)
  },
}
