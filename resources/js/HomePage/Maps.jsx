import React, { useEffect, useRef, useState } from 'react'

// Vite exposes env vars prefixed with VITE_. Change if you use another bundler.
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

/*
  Sample markets. Replace with your real locations.
  `radiusKm` controls the size of the white halo around each dot.
*/
const MARKETS = [
  { name: 'Seattle', lat: 47.61, lng: -122.33, radiusKm: 220 },
  { name: 'San Francisco', lat: 37.77, lng: -122.42, radiusKm: 250 },
  { name: 'Los Angeles', lat: 34.05, lng: -118.24, radiusKm: 260 },
  { name: 'Phoenix', lat: 33.45, lng: -112.07, radiusKm: 220 },
  { name: 'Denver', lat: 39.74, lng: -104.99, radiusKm: 240 },
  { name: 'Dallas', lat: 32.78, lng: -96.8, radiusKm: 260 },
  { name: 'Houston', lat: 29.76, lng: -95.37, radiusKm: 230 },
  { name: 'Chicago', lat: 41.88, lng: -87.63, radiusKm: 270 },
  { name: 'Nashville', lat: 36.16, lng: -86.78, radiusKm: 220 },
  { name: 'Atlanta', lat: 33.75, lng: -84.39, radiusKm: 250 },
  { name: 'Miami', lat: 25.76, lng: -80.19, radiusKm: 230 },
  { name: 'Washington, DC', lat: 38.9, lng: -77.04, radiusKm: 230 },
  { name: 'Philadelphia', lat: 39.95, lng: -75.17, radiusKm: 200 },
  { name: 'New York', lat: 40.71, lng: -74.0, radiusKm: 260 },
  { name: 'Boston', lat: 42.36, lng: -71.06, radiusKm: 220 },
  { name: 'Toronto', lat: 43.65, lng: -79.38, radiusKm: 200 },
]

// Dark navy map style
const MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#1f2a52' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8b94b8' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1f2a52' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#18213f' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#3a4675' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#212c56' }] },
]

let mapsPromise
function loadGoogleMaps() {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'))
  if (window.google?.maps) return Promise.resolve(window.google)
  if (mapsPromise) return mapsPromise
  mapsPromise = new Promise((resolve, reject) => {
    const cb = '__initGoogleMaps'
    window[cb] = () => resolve(window.google)
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=weekly&callback=${cb}`
    script.async = true
    script.onerror = () => {
      mapsPromise = undefined
      reject(new Error('Google Maps failed to load'))
    }
    document.head.appendChild(script)
  })
  return mapsPromise
}

// Zoom and halo size depend on screen width
function getLayout() {
  const w = window.innerWidth
  if (w < 640) return { zoom: 3, center: { lat: 37, lng: -92 }, scale: 1.8 }
  if (w < 1024) return { zoom: 3, center: { lat: 36, lng: -92 }, scale: 1.6 }
  return { zoom: 4, center: { lat: 33, lng: -93 }, scale: 1 }
}

export default function Maps({
  title = 'In Key Markets and Destinations',
  subtitle = 'Across the United States, Canada, and the Caribbean',
}) {
  const mapEl = useRef(null)
  const [status, setStatus] = useState(API_KEY ? 'loading' : 'nokey')

  useEffect(() => {
    if (!API_KEY) return
    let cancelled = false
    let map
    let circles = []
    let markers = []
    let onResize

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !mapEl.current) return
        const layout = getLayout()

        map = new google.maps.Map(mapEl.current, {
          center: layout.center,
          zoom: layout.zoom,
          minZoom: 2,
          styles: MAP_STYLES,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
          gestureHandling: 'cooperative', // one-finger scroll on mobile keeps scrolling the page
          clickableIcons: false,
        })

        circles = MARKETS.map(
          (m) =>
            new google.maps.Circle({
              map,
              center: { lat: m.lat, lng: m.lng },
              radius: m.radiusKm * 1000 * layout.scale,
              fillColor: '#ffffff',
              fillOpacity: 0.6,
              strokeWeight: 0,
              clickable: false,
            })
        )

        markers = MARKETS.map(
          (m) =>
            new google.maps.Marker({
              map,
              position: { lat: m.lat, lng: m.lng },
              title: m.name,
              clickable: false,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 3.5,
                fillColor: '#f26a1b',
                fillOpacity: 1,
                strokeWeight: 0,
              },
            })
        )

        // Re-fit when crossing breakpoints (e.g. rotating a phone)
        let last = layout.zoom + '-' + layout.scale
        onResize = () => {
          const l = getLayout()
          const key = l.zoom + '-' + l.scale
          if (key === last) return
          last = key
          map.setZoom(l.zoom)
          map.setCenter(l.center)
          circles.forEach((c, i) => c.setRadius(MARKETS[i].radiusKm * 1000 * l.scale))
        }
        window.addEventListener('resize', onResize)
        setStatus('ready')
      })
      .catch(() => !cancelled && setStatus('error'))

    return () => {
      cancelled = true
      if (onResize) window.removeEventListener('resize', onResize)
      circles.forEach((c) => c.setMap(null))
      markers.forEach((m) => m.setMap(null))
    }
  }, [])

  return (
    <section className="relative h-[460px] w-full overflow-hidden bg-[#1f2a52] sm:h-[520px] lg:h-[640px]">
      <div ref={mapEl} className="absolute inset-0" />

      {/* Fallback / status messages */}
      {status !== 'ready' && (
        <div className="absolute inset-0 flex items-end justify-center p-6 pb-10 text-center text-sm text-white/70">
          {status === 'nokey' && 'Add VITE_GOOGLE_MAPS_API_KEY to your .env file to show the map.'}
          {status === 'error' && 'The map could not be loaded. Check your API key and network.'}
        </div>
      )}

      {/* Overlay text: soft gradient keeps it readable on small screens */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-[#1f2a52]/90 via-[#1f2a52]/50 to-transparent px-6 pb-16 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12">
        <h2 className="max-w-md text-2xl font-semibold leading-snug text-white sm:text-3xl">{title}</h2>
        <p className="mt-4 max-w-md text-sm text-white sm:mt-6 sm:text-base">{subtitle}</p>
      </div>
    </section>
  )
}