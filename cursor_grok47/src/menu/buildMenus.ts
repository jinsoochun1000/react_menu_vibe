import type { MenuNode, MenuRecord } from '../models/menu'

export function buildMenus(records: readonly MenuRecord[]): MenuNode[] {
  if (records.some((record) => !record.id?.trim() || !record.name?.trim())) {
    throw new Error('메뉴 ID와 명칭은 필수입니다.')
  }

  const lookup = new Map<string, MenuRecord>()
  for (const record of records) {
    if (lookup.has(record.id)) {
      throw new Error('메뉴 ID가 중복됩니다.')
    }
    lookup.set(record.id, record)
  }

  for (const record of records.filter((item) => item.parentId != null)) {
    const parent = lookup.get(record.parentId!)
    if (!parent || parent.parentId != null) {
      throw new Error('하위 메뉴는 최상위 메뉴를 부모로 지정해야 합니다.')
    }
  }

  return records
    .filter((record) => record.parentId == null)
    .toSorted((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id))
    .map((record) => {
      const group: MenuNode = {
        id: record.id,
        name: record.name,
        parent: null,
        children: [],
      }
      group.children = records
        .filter((item) => item.parentId === record.id)
        .toSorted((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id))
        .map((child) => ({
          id: child.id,
          name: child.name,
          parent: group,
          children: [],
        }))
      return group
    })
}
