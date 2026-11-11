<script setup lang="ts">
import { barangays, outline } from '~/data/barangays'

/** Locator map: Catarman's outline with one dot per mapped barangay. */
const props = defineProps<{ active?: string }>()

const H = 320
const PAD = 14
const lngs = outline.map(p => p[0])
const lats = outline.map(p => p[1])
const lng0 = Math.min(...lngs)
const lat0 = Math.min(...lats)
const lat1 = Math.max(...lats)
const k = H / (lat1 - lat0)
const cos = Math.cos(((lat0 + lat1) / 2) * Math.PI / 180)
const x = (lng: number) => PAD + (lng - lng0) * cos * k
const y = (lat: number) => PAD + (lat1 - lat) * k
const W = (Math.max(...lngs) - lng0) * cos * k

const path = `M${outline.map(([lng, lat]) => `${x(lng).toFixed(1)} ${y(lat).toFixed(1)}`).join(' L')}Z`
const dots = barangays
  .filter(b => b.location)
  .map(b => ({ slug: b.slug, name: b.name, cx: x(b.location!.lng), cy: y(b.location!.lat) }))
const current = computed(() => dots.find(d => d.slug === props.active))
</script>

<template>
  <svg
    :viewBox="`0 0 ${W + PAD * 2} ${H + PAD * 2}`"
    role="img"
    :aria-label="current ? `Map of Catarman showing where ${current.name} is` : 'Map of Catarman showing its barangays'"
    class="h-auto w-full"
  >
    <path :d="path" class="fill-secondary stroke-primary" stroke-width="1.5" stroke-linejoin="miter" />
    <NuxtLink v-for="d in dots" :key="d.slug" :to="`/barangays/${d.slug}`" :aria-label="d.name">
      <title>{{ d.name }}</title>
      <!-- larger invisible hit area for easier tapping -->
      <circle :cx="d.cx" :cy="d.cy" r="9" fill="transparent" />
      <circle
        :cx="d.cx"
        :cy="d.cy"
        r="3.5"
        class="stroke-background transition-colors hover:fill-foreground"
        :class="active ? 'fill-primary/35' : 'fill-primary'"
        stroke-width="1"
      />
    </NuxtLink>
    <g v-if="current" pointer-events="none">
      <circle :cx="current.cx" :cy="current.cy" r="13" class="fill-primary/15 stroke-primary" stroke-width="1.5" />
      <circle :cx="current.cx" :cy="current.cy" r="5" class="fill-primary stroke-background" stroke-width="1.5" />
    </g>
  </svg>
</template>
