const ROUTE_ORDER = ['home', 'about', 'skills', 'works', 'contact'] as const

export type RouteName = typeof ROUTE_ORDER[number]

export function compareRoutePos(aName: string, bName: string): -1 | 0 | 1 {
  const a = ROUTE_ORDER.indexOf(aName as RouteName)
  const b = ROUTE_ORDER.indexOf(bName as RouteName)
  if (a > b) return 1
  if (a < b) return -1
  return 0
}
