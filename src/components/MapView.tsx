import L from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  DEFAULT_ROUTE_WAYPOINTS,
  type MapViewProps,
} from './mapViewDefaults'
import { RoutingLayer } from './RoutingLayer'

// Fix default marker images with Vite bundler (path resolution)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

/**
 * OpenStreetMap tiles with Leaflet Routing Machine (default demo route). Adjust `center` / `zoom` / `routeWaypoints` via props.
 */
export function MapView({
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
  className = 'map-view',
  routeWaypoints = DEFAULT_ROUTE_WAYPOINTS,
  children,
}: MapViewProps) {
  return (
    <MapContainer
      className={className}
      center={center}
      zoom={zoom}
      scrollWheelZoom
    >
      {/* <MapResizeOnMount /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {routeWaypoints.length >= 2 ? (
        <RoutingLayer waypoints={routeWaypoints} />
      ) : null}
      {children}
    </MapContainer>
  )
}
