import type { ReactNode } from 'react'

export const DEFAULT_MAP_CENTER: [number, number] = [40.7128, -74.006]
export const DEFAULT_MAP_ZOOM = 12

export type MapViewProps = {
  /** WGS-84 [lat, lng] */
  center?: [number, number]
  zoom?: number
  className?: string
  /** Renders as last children inside the map (e.g. more markers, layers) */
  children?: ReactNode
}
