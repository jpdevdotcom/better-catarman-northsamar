<script setup lang="ts">
/// <reference types="google.maps" />
import { outline } from '~/data/barangays'

export interface MapPoint {
  name: string
  lat: number
  lng: number
  /** When set, clicking the point opens /barangays/<slug>. */
  slug?: string
}

const props = withDefaults(defineProps<{
  points: MapPoint[]
  /** Slug (or name) of the point to highlight. */
  active?: string
  /** Centre and zoom. When omitted the map fits the whole municipality. */
  center?: { lat: number, lng: number }
  zoom?: number
  /**
   * Name labels under the pins. 'auto' labels every pin once zoomed in far enough
   * to read them (the highlighted pin is always labelled); 'active' labels only the
   * highlighted pin; 'none' shows no labels.
   */
  labels?: 'auto' | 'active' | 'none'
  label: string
}>(), { zoom: 14, labels: 'auto' })

/** From this zoom level the pins are far enough apart for every label to be readable. */
const LABEL_ZOOM = 13

const BLUE = '#1d4ed8'
const INK = '#0b1f44'

const el = ref<HTMLDivElement>()
const failed = ref(false)
const key = useRuntimeConfig().public.googleMapsKey

/** Loads the Google Maps script once per page, however many maps are shown. */
function loadGoogleMaps(): Promise<void> {
  const w = window as typeof window & { __gmapsReady?: Promise<void>, __gmapsInit?: () => void, gm_authFailure?: () => void }
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

let map: google.maps.Map | undefined

function drawPoints() {
  if (!map) return
  map.data.forEach((f) => {
    if (f.getGeometry()?.getType() === 'Point') map!.data.remove(f)
  })
  for (const p of props.points) {
    map.data.add(new google.maps.Data.Feature({
      geometry: new google.maps.Data.Point({ lat: p.lat, lng: p.lng }),
      properties: { name: p.name, slug: p.slug ?? '', active: (p.slug ?? p.name) === props.active },
    }))
  }
}

onMounted(async () => {
  // Google calls this global when the key is invalid, restricted, or billing is off.
  ;(window as typeof window & { gm_authFailure?: () => void }).gm_authFailure = () => (failed.value = true)

  try {
    await loadGoogleMaps()
    const { Map, InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary

    // Without an explicit centre, frame the whole municipality. The zoom is worked out
    // up front (rather than with fitBounds) so the map opens already in place, with no animation.
    let center = props.center
    let zoom = props.zoom
    if (!center) {
      const lngs = outline.map(p => p[0])
      const lats = outline.map(p => p[1])
      const [w, s, e, n] = [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)]
      const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) / (2 * Math.PI)
      const { clientWidth, clientHeight } = el.value!
      const fit = Math.min(clientWidth / (((e - w) / 360) * 256), clientHeight / ((mercY(n) - mercY(s)) * 256))
      center = { lat: (s + n) / 2, lng: (w + e) / 2 }
      zoom = Math.max(8, Math.floor(Math.log2(fit * 0.94)))
    }

    map = new Map(el.value!, {
      center,
      zoom,
      // Page scrolling is never hijacked: ctrl/⌘ + scroll or two fingers to move the map.
      gestureHandling: 'cooperative',
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
    })

    // Municipal outline
    map.data.add(new google.maps.Data.Feature({
      geometry: new google.maps.Data.Polygon([outline.map(([lng, lat]) => ({ lat, lng }))]),
    }))

    const style = (f: google.maps.Data.Feature): google.maps.Data.StyleOptions => {
      if (f.getGeometry()?.getType() !== 'Point') {
        return { fillColor: BLUE, fillOpacity: 0.06, strokeColor: BLUE, strokeWeight: 2, clickable: false }
      }
      const active = Boolean(f.getProperty('active'))
      const showLabel = props.labels !== 'none'
        && (active || (props.labels === 'auto' && (map?.getZoom() ?? 0) >= LABEL_ZOOM))
      return {
        title: String(f.getProperty('name')),
        cursor: f.getProperty('slug') ? 'pointer' : 'default',
        zIndex: active ? 2 : 1,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          // Overview maps (no centre given) are zoomed far out, so their dots are smaller.
          scale: active ? (props.center ? 10 : 8) : (props.center ? 6 : 4.5),
          fillColor: active ? INK : BLUE,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: props.center ? 2 : 1.5,
          // Places the label just below the dot (symbol units; the circle's radius is 1).
          labelOrigin: new google.maps.Point(0, active ? 2.2 : 2.9),
        },
        label: showLabel
          ? {
              text: String(f.getProperty('name')),
              className: active ? 'map-pin-label map-pin-label-active' : 'map-pin-label',
              color: active ? INK : BLUE,
              fontFamily: 'Public Sans Variable, sans-serif',
              fontSize: active ? '14px' : '12px',
              fontWeight: '700',
            }
          : undefined,
      }
    }
    map.data.setStyle(style)
    // Re-evaluate which labels to show whenever the zoom level changes.
    map.addListener('zoom_changed', () => map?.data.setStyle(style))
    drawPoints()

    const info = new InfoWindow({ disableAutoPan: true, headerDisabled: true })
    map.data.addListener('mouseover', (e: google.maps.Data.MouseEvent) => {
      if (e.feature.getGeometry()?.getType() !== 'Point' || !e.latLng) return
      const labelled = props.labels === 'auto' && (map?.getZoom() ?? 0) >= LABEL_ZOOM
      if (labelled || e.feature.getProperty('active')) return
      const label = document.createElement('span')
      label.textContent = String(e.feature.getProperty('name'))
      info.setContent(label)
      info.setPosition(e.latLng)
      info.setOptions({ pixelOffset: new google.maps.Size(0, -10) })
      info.open({ map })
    })
    map.data.addListener('mouseout', () => info.close())
    map.data.addListener('click', (e: google.maps.Data.MouseEvent) => {
      const slug = e.feature.getProperty('slug')
      if (slug) navigateTo(`/barangays/${slug}`)
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
