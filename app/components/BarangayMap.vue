<script setup lang="ts">
import { barangays } from '~/data/barangays'
import { barangayShapes, municipalBoundary } from '~/data/boundaries'

/**
 * Locator map drawn without Google: Catarman's official barangay boundaries, each linking to
 * its barangay. Used when no Google Maps key is set.
 */
const props = defineProps<{ active?: string }>()

type Ring = [number, number][]
const H = 320
const PAD = 8
const pts = municipalBoundary.flatMap(p => p[0]!)
const lng0 = Math.min(...pts.map(p => p[0]))
const lat0 = Math.min(...pts.map(p => p[1]))
const lat1 = Math.max(...pts.map(p => p[1]))
const k = H / (lat1 - lat0)
const cos = Math.cos(((lat0 + lat1) / 2) * Math.PI / 180)
const x = (lng: number) => PAD + (lng - lng0) * cos * k
const y = (lat: number) => PAD + (lat1 - lat) * k
const W = (Math.max(...pts.map(p => p[0])) - lng0) * cos * k

const toPath = (polys: Ring[][]) =>
  polys.map(rings => rings.map(r => `M${r.map(([lng, lat]) => `${x(lng).toFixed(1)} ${y(lat).toFixed(1)}`).join(' L')}Z`).join(' ')).join(' ')

const outlinePath = toPath(municipalBoundary)
const shapes = barangays.map(b => ({ slug: b.slug, name: b.name, d: toPath(barangayShapes[b.slug]!.polygons) }))
const current = computed(() => barangays.find(b => b.slug === props.active))
</script>

<template>
  <svg
    :viewBox="`0 0 ${W + PAD * 2} ${H + PAD * 2}`"
    role="img"
    :aria-label="current ? `Map of Catarman showing where ${current.name} is` : 'Map of Catarman showing its barangays'"
    class="h-auto w-full"
  >
    <NuxtLink v-for="s in shapes" :key="s.slug" :to="`/barangays/${s.slug}`" :aria-label="s.name">
      <title>{{ s.name }}</title>
      <path
        :d="s.d"
        fill-rule="evenodd"
        class="stroke-primary transition-colors hover:fill-primary/30"
        :class="s.slug === active ? 'fill-primary' : 'fill-secondary'"
        stroke-width="0.6"
        stroke-linejoin="round"
      />
    </NuxtLink>
    <path :d="outlinePath" fill="none" class="stroke-primary" stroke-width="1.5" stroke-linejoin="round" pointer-events="none" />
  </svg>
</template>
