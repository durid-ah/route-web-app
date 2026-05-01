import type { ReactNode } from 'react'

export const DEFAULT_MAP_CENTER: [number, number] = [40.7128, -74.006]
export const DEFAULT_MAP_ZOOM = 12

/** Short Manhattan segment for demo routing (WGS-84 [lat, lng]). */
export const DEFAULT_ROUTE_WAYPOINTS: [number, number][] = [
  [40.7614, -73.9776],
  [40.7484, -73.9857],
]

export type MapViewProps = {
  /** WGS-84 [lat, lng] */
  center?: [number, number]
  zoom?: number
  className?: string
  /** Route A→B… using Leaflet Routing Machine (public OSRM demo; not for heavy production use). */
  routeWaypoints?: [number, number][]
  /** Renders as last children inside the map (e.g. more markers, layers) */
  children?: ReactNode
}
