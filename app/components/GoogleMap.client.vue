<script setup lang="ts">
/// <reference types="google.maps" />
import { barangayShapes, municipalBoundary } from '~/data/boundaries'
import { barangays } from '~/data/barangays'

export interface MapPoint {
  name: string
  lat: number
  lng: number
  /** When set, clicking the point opens /barangays/<slug>. */
  slug?: string
  /** Dot colour. Defaults to the site blue. */
  color?: string
}

const props = withDefaults(defineProps<{
  points: MapPoint[]
  /** Slug (or name) of the point and barangay to highlight. */
  active?: string
  /** Centre and zoom. When omitted the map fits the whole municipality (or `focus`). */
  center?: { lat: number, lng: number }
  zoom?: number
  /** Draw the official barangay boundaries. */
  boundaries?: boolean
  /** Barangay slug to frame the map around, using its official boundary. */
  focus?: string
  /**
   * Name labels under the pins. 'auto' labels every pin once zoomed in far enough
   * to read them (the highlighted pin is always labelled); 'active' labels only the
   * highlighted pin; 'none' shows no labels.
   */
  labels?: 'auto' | 'active' | 'none'
  label: string
}>(), { zoom: 14, labels: 'auto', boundaries: false })

/** From this zoom level the pins are far enough apart for every label to be readable. */
const LABEL_ZOOM = 13

const BLUE = '#1d4ed8'
const INK = '#0b1f44'

const el = ref<HTMLDivElement>()
const failed = ref(false)
const key = useRuntimeConfig().public.googleMapsKey
const nameOf = Object.fromEntries(barangays.map(b => [b.slug, b.name]))

type Ring = [number, number][]
const toPaths = (polys: Ring[][]) => polys.map(rings => rings.map(r => r.map(([lng, lat]) => ({ lat, lng }))))

/** Loads the Google Maps script once per page, however many maps are shown. */
function loadGoogleMaps(): Promise<void> {
  const w = window as typeof window & { __gmapsReady?: Promise<void>, __gmapsInit?: () => void }
  w.__gmapsReady ??= new Promise<void>((resolve, reject) => {
    w.__gmapsInit = () => resolve()
    const s = document.createElement('script')
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&loading=async&callback=__gmapsInit`
    s.async = true
    s.onerror = () => reject(new Error('Google Maps failed to load'))
    document.head.appendChild(s)
  })
  return w.__gmapsReady
}

/**
 * Centre and zoom that fit the given shapes in the map. Worked out up front (rather than
 * with fitBounds) so the map opens already in place, with no animation.
 */
function frame(polys: Ring[][], maxZoom: number) {
  const pts = polys.flatMap(p => p[0]!)
  const lngs = pts.map(p => p[0])
  const lats = pts.map(p => p[1])
  const [w, s, e, n] = [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)]
  const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) / (2 * Math.PI)
  const { clientWidth, clientHeight } = el.value!
  const fit = Math.min(clientWidth / (((e - w) / 360) * 256), clientHeight / ((mercY(n) - mercY(s)) * 256))
  return { center: { lat: (s + n) / 2, lng: (w + e) / 2 }, zoom: Math.min(maxZoom, Math.max(8, Math.floor(Math.log2(fit * 0.9)))) }
}

let map: google.maps.Map | undefined

function drawPoints() {
  if (!map) return
  map.data.forEach((f) => {
    if (f.getProperty('kind') === 'point') map!.data.remove(f)
  })
  for (const p of props.points) {
    map.data.add(new google.maps.Data.Feature({
      geometry: new google.maps.Data.Point({ lat: p.lat, lng: p.lng }),
      properties: { kind: 'point', name: p.name, slug: p.slug ?? '', color: p.color ?? '', active: (p.slug ?? p.name) === props.active },
    }))
  }
}

onMounted(async () => {
  // Google calls this global when the key is invalid, restricted, or billing is off.
  ;(window as typeof window & { gm_authFailure?: () => void }).gm_authFailure = () => (failed.value = true)

  try {
    await loadGoogleMaps()
    const { Map, InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary

    const focusShape = props.focus ? barangayShapes[props.focus] : undefined
    const view = props.center && !focusShape
      ? { center: props.center, zoom: props.zoom }
      : focusShape ? frame(focusShape.polygons, 16) : frame(municipalBoundary, 14)

    map = new Map(el.value!, {
      ...view,
      // Page scrolling is never hijacked: ctrl/⌘ + scroll or two fingers to move the map.
      gestureHandling: 'cooperative',
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
    })

    // Official municipal boundary, then the barangay boundaries on top of it.
    map.data.add(new google.maps.Data.Feature({
      geometry: new google.maps.Data.MultiPolygon(toPaths(municipalBoundary)),
      properties: { kind: 'municipal' },
    }))
    if (props.boundaries) {
      for (const [slug, shape] of Object.entries(barangayShapes)) {
        map.data.add(new google.maps.Data.Feature({
          geometry: new google.maps.Data.MultiPolygon(toPaths(shape.polygons)),
          properties: { kind: 'barangay', slug, name: nameOf[slug] ?? slug, active: slug === props.active },
        }))
      }
    }

    const zoomedIn = () => (map?.getZoom() ?? 0) >= LABEL_ZOOM
    const style = (f: google.maps.Data.Feature): google.maps.Data.StyleOptions => {
      const kind = f.getProperty('kind')
      const active = Boolean(f.getProperty('active'))
      if (kind === 'municipal') {
        return { fillColor: BLUE, fillOpacity: props.boundaries ? 0 : 0.06, strokeColor: BLUE, strokeWeight: 2, clickable: false, zIndex: 0 }
      }
      if (kind === 'barangay') {
        return {
          fillColor: BLUE,
          fillOpacity: active ? 0.22 : 0.04,
          strokeColor: active ? INK : BLUE,
          strokeOpacity: active ? 1 : 0.55,
          strokeWeight: active ? 2.5 : 1,
          cursor: 'pointer',
          zIndex: active ? 2 : 1,
        }
      }
      const showLabel = props.labels !== 'none' && (active || (props.labels === 'auto' && zoomedIn()))
      const dot = String(f.getProperty('color') || '') || (active ? INK : BLUE)
      return {
        title: String(f.getProperty('name')),
        cursor: f.getProperty('slug') ? 'pointer' : 'default',
        zIndex: active ? 4 : 3,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          // Overview maps (whole municipality) are zoomed far out, so their dots are smaller.
          scale: active ? (zoomedIn() ? 10 : 8) : (zoomedIn() ? 6 : 4.5),
          fillColor: dot,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: zoomedIn() ? 2 : 1.5,
          // Places the label just below the dot (symbol units; the circle's radius is 1).
          labelOrigin: new google.maps.Point(0, active ? 2.2 : 2.9),
        },
        label: showLabel
          ? {
              text: String(f.getProperty('name')),
              className: 'map-pin-label',
              color: active ? INK : (String(f.getProperty('color') || '') || BLUE),
              fontFamily: 'Public Sans Variable, sans-serif',
              fontSize: active ? '14px' : '12px',
              fontWeight: '700',
            }
          : undefined,
      }
    }
    map.data.setStyle(style)
    // Re-evaluate labels and dot sizes whenever the zoom level changes.
    map.addListener('zoom_changed', () => map?.data.setStyle(style))
    drawPoints()

    const info = new InfoWindow({ disableAutoPan: true, headerDisabled: true })
    map.data.addListener('mouseover', (e: google.maps.Data.MouseEvent) => {
      const kind = e.feature.getProperty('kind')
      if (!e.latLng || kind === 'municipal') return
      if (kind === 'point' && ((props.labels === 'auto' && zoomedIn()) || e.feature.getProperty('active'))) return
      if (kind === 'barangay') map!.data.overrideStyle(e.feature, { fillOpacity: 0.14 })
      const label = document.createElement('span')
      label.textContent = kind === 'barangay' ? `Barangay ${e.feature.getProperty('name')}` : String(e.feature.getProperty('name'))
      info.setContent(label)
      info.setPosition(e.latLng)
      info.setOptions({ pixelOffset: new google.maps.Size(0, -10) })
      info.open({ map })
    })
    map.data.addListener('mouseout', (e: google.maps.Data.MouseEvent) => {
      map!.data.revertStyle(e.feature)
      info.close()
    })
    map.data.addListener('click', (e: google.maps.Data.MouseEvent) => {
      const slug = e.feature.getProperty('slug')
      if (slug && slug !== props.active) navigateTo(`/barangays/${slug}`)
    })
  }
  catch {
    failed.value = true
  }
})

watch(() => [props.points, props.active], drawPoints)
</script>

<template>
  <div class="relative size-full">
    <div ref="el" class="size-full" role="application" :aria-label="label" />
    <p v-if="failed" class="absolute inset-0 grid place-items-center bg-muted p-6 text-center text-sm text-muted-foreground">
      The map could not be loaded. Check the Google Maps API key and that the Maps JavaScript API is enabled.
    </p>
  </div>
</template>
