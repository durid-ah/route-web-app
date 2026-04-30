import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, type MapViewProps } from './mapViewDefaults'

// Fix default marker images with Vite bundler (path resolution)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

/**
 * In dev, React StrictMode double-invokes effects; a single `invalidateSize`
 * on mount helps when the map container is laid out after first paint.
 */
function MapResizeOnMount() {
  const map = useMap()
  useEffect(() => {
    map.invalidateSize()
  }, [map])
  return null
}

/**
 * OpenStreetMap tiles with a single demo marker. Adjust `center` / `zoom` via props.
 */
export function MapView({
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
  className = 'map-view',
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
      <Marker position={center}>
        <Popup>Example marker</Popup>
      </Marker>
      {children}
    </MapContainer>
  )
}
