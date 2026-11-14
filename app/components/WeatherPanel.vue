<script setup lang="ts">
import type { Component } from 'vue'
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, Droplets, Sun, TriangleAlert, Wind } from '@lucide/vue'
import { site } from '~/data/site'

const props = defineProps<{ compact?: boolean }>()
const { t } = useT()

interface Forecast {
  current: { time: string, temperature_2m: number, apparent_temperature: number, relative_humidity_2m: number, precipitation: number, weather_code: number, wind_speed_10m: number, wind_gusts_10m: number }
  daily: { time: string[], weather_code: number[], temperature_2m_max: number[], temperature_2m_min: number[], precipitation_sum: number[], precipitation_probability_max: number[], wind_speed_10m_max: number[] }
}

const data = ref<Forecast | null>(null)
const failed = ref(false)

const { lat, lng } = site.coordinates
const url = 'https://api.open-meteo.com/v1/forecast'
  + `?latitude=${lat}&longitude=${lng}`
  + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m'
  + '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max'
  + '&timezone=Asia%2FManila&forecast_days=5'

onMounted(async () => {
  try { data.value = await $fetch<Forecast>(url) }
  catch { failed.value = true }
})

// WMO weather codes, grouped.
function describe(code: number): { label: string, icon: Component } {
  if (code === 0) return { label: 'Clear sky', icon: Sun }
  if (code === 1) return { label: 'Mostly clear', icon: Sun }
  if (code === 2) return { label: 'Partly cloudy', icon: CloudSun }
  if (code === 3) return { label: 'Cloudy', icon: Cloud }
  if (code === 45 || code === 48) return { label: 'Fog', icon: CloudFog }
  if (code >= 51 && code <= 57) return { label: 'Drizzle', icon: CloudDrizzle }
  if (code === 61 || code === 63 || code === 66) return { label: 'Light rain', icon: CloudRain }
  if (code === 80 || code === 81) return { label: 'Showers', icon: CloudRain }
  if (code === 65 || code === 67 || code === 82) return { label: 'Heavy rain', icon: CloudRain }
  if (code >= 95) return { label: 'Thunderstorm', icon: CloudLightning }
  return { label: 'Cloudy', icon: Cloud }
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const days = computed(() => {
  const d = data.value?.daily
  if (!d) return []
  return d.time.map((date, i) => ({
    date,
    name: i === 0 ? 'Today' : WEEKDAYS[new Date(`${date}T12:00:00+08:00`).getUTCDay()]!,
    ...describe(d.weather_code[i]!),
    max: Math.round(d.temperature_2m_max[i]!),
    min: Math.round(d.temperature_2m_min[i]!),
    rain: d.precipitation_sum[i]!,
    chance: d.precipitation_probability_max[i]!,
    wind: Math.round(d.wind_speed_10m_max[i]!),
  })).slice(0, props.compact ? 4 : 5)
})
const now = computed(() => data.value && { ...data.value.current, ...describe(data.value.current.weather_code) })

const heavyRain = computed(() => days.value.some(d => d.rain >= 50))
const strongWind = computed(() => days.value.some(d => d.wind >= 62))
const updated = computed(() => data.value?.current.time.slice(11, 16))
</script>

<template>
  <div class="border">
    <div v-if="failed" class="p-5 text-sm text-muted-foreground">
      {{ t('The forecast could not be loaded. Check PAGASA for the latest weather.') }}
    </div>
    <div v-else-if="!now" class="p-5 text-sm text-muted-foreground" aria-live="polite">{{ t('Loading the forecast…') }}</div>

    <template v-else>
      <div v-if="heavyRain || strongWind" class="flex items-start gap-3 border-b bg-secondary p-4 text-sm text-secondary-foreground">
        <TriangleAlert class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <div>
          <p class="font-semibold">
            <span v-if="heavyRain">{{ t('Heavy rain is in the forecast') }}</span><span v-if="heavyRain && strongWind"> · </span><span v-if="strongWind">{{ t('Strong winds are in the forecast') }}</span>
          </p>
          <p class="mt-0.5">{{ t('This is an automatic reading of the forecast, not an official warning. Check PAGASA and the MDRRMO.') }}</p>
        </div>
      </div>

      <div class="grid gap-px bg-border" :class="compact ? 'sm:grid-cols-[1fr_1.4fr]' : 'lg:grid-cols-[1fr_1.6fr]'">
        <!-- Now -->
        <div class="bg-background p-5 sm:p-6">
          <p class="text-xs font-bold uppercase tracking-wider text-primary">{{ t('Now') }} · {{ site.municipality }}</p>
          <div class="mt-3 flex items-center gap-4">
            <component :is="now.icon" class="size-12 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p class="text-4xl font-bold tabular-nums leading-none">{{ Math.round(now.temperature_2m) }}°C</p>
              <p class="mt-1 font-medium">{{ t(now.label) }}</p>
            </div>
          </div>
          <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t pt-4 text-sm">
            <div><dt class="text-muted-foreground">{{ t('Feels like') }}</dt><dd class="font-semibold tabular-nums">{{ Math.round(now.apparent_temperature) }}°C</dd></div>
            <div><dt class="text-muted-foreground">{{ t('Humidity') }}</dt><dd class="font-semibold tabular-nums">{{ now.relative_humidity_2m }}%</dd></div>
            <div><dt class="text-muted-foreground">{{ t('Wind') }}</dt><dd class="font-semibold tabular-nums">{{ Math.round(now.wind_speed_10m) }} km/h</dd></div>
            <div><dt class="text-muted-foreground">{{ t('Gusts') }}</dt><dd class="font-semibold tabular-nums">{{ Math.round(now.wind_gusts_10m) }} km/h</dd></div>
          </dl>
        </div>

        <!-- Next days -->
        <ul class="grid bg-background" :class="compact ? 'grid-cols-4' : 'grid-cols-5'" :aria-label="t('Next days')">
          <li v-for="d in days" :key="d.date" class="flex flex-col items-center gap-1.5 border-l px-1 py-5 text-center first:border-l-0">
            <p class="text-sm font-semibold">{{ t(d.name) }}</p>
            <component :is="d.icon" class="size-7 text-primary" :aria-label="t(d.label)" />
            <p class="tabular-nums"><span class="font-bold">{{ d.max }}°</span> <span class="text-muted-foreground">{{ d.min }}°</span></p>
            <p class="flex items-center gap-1 text-xs tabular-nums text-muted-foreground" :title="t('Chance of rain')">
              <Droplets class="size-3" aria-hidden="true" /> {{ d.chance }}%
            </p>
            <p v-if="!compact" class="flex items-center gap-1 text-xs tabular-nums text-muted-foreground" :title="t('Wind')">
              <Wind class="size-3" aria-hidden="true" /> {{ d.wind }}
            </p>
          </li>
        </ul>
      </div>

      <p class="border-t px-5 py-3 text-xs text-muted-foreground">
        {{ t('Updated') }} {{ updated }} ·
        {{ t('Forecast from Open-Meteo. For official forecasts and warnings, see PAGASA.') }}
      </p>
    </template>
  </div>
</template>
