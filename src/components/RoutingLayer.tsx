import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { useMap } from 'react-leaflet'
import 'leaflet-routing-machine'

export type RoutingLayerProps = {
  /** At least two WGS-84 [lat, lng] points. */
  waypoints: [number, number][]
}

function waypointsKey(waypoints: [number, number][]) {
  return waypoints.map((p) => `${p[0]},${p[1]}`).join('|')
}

/**
 * OSRM-backed route line and itinerary UI. Must render inside `MapContainer`.
 * Uses the default public OSRM service from leaflet-routing-machine.
 */
export function RoutingLayer({ waypoints }: RoutingLayerProps) {
  const map = useMap()
  const key = useMemo(() => waypointsKey(waypoints), [waypoints])

  useEffect(() => {
    if (waypoints.length < 2) return

    const latLngs = waypoints.map((p) => L.latLng(p[0], p[1]))
    const control = L.routing.control({
      waypoints: latLngs,
      lineOptions: {
        styles: [{ color: '#3388ff', weight: 5, opacity: 0.85 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      },
      fitSelectedRoutes: true,
    })
    control.addTo(map)

    return () => {
      map.removeControl(control)
    }
  }, [map, key, waypoints])

  return null
}
