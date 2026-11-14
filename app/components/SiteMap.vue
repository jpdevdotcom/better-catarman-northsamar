<script setup lang="ts">
import type { MapPoint } from './GoogleMap.client.vue'

/**
 * Shows a Google map when NUXT_PUBLIC_GOOGLE_MAPS_KEY is set; otherwise renders
 * whatever is passed in the default slot (outline map or OpenStreetMap embed).
 */
defineProps<{
  points: MapPoint[]
  active?: string
  center?: { lat: number, lng: number }
  zoom?: number
  boundaries?: boolean
  focus?: string
  labels?: 'auto' | 'active' | 'none'
  label: string
}>()

const hasKey = Boolean(useRuntimeConfig().public.googleMapsKey)
</script>

<template>
  <ClientOnly v-if="hasKey">
    <GoogleMap :points="points" :active="active" :center="center" :zoom="zoom" :boundaries="boundaries" :focus="focus" :labels="labels" :label="label" />
    <template #fallback>
      <div class="size-full bg-muted" />
    </template>
  </ClientOnly>
  <slot v-else />
</template>
