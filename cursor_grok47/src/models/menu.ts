export type MenuRecord = {
  id: string
  parentId: string | null
  name: string
  sortOrder: number
}

export type MenuNode = {
  id: string
  name: string
  parent: MenuNode | null
  children: MenuNode[]
}

export type MenuService = {
  getMenus: (signal?: AbortSignal) => Promise<readonly MenuRecord[]>
}
