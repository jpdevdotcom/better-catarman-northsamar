<script setup lang="ts">
/**
 * Line chart of two money series over the years (e.g. income and expenses).
 * Hand-drawn SVG: one shared axis, 2px lines, end dots with a white ring, values at the
 * line ends, a legend, and a crosshair tooltip that lists both series for the hovered year.
 * Years whose figures are not yet checked are shaded and labelled.
 *
 * Colours: the site blue (#1d4ed8) and a light blue (#60a5fa), checked with the dataviz
 * palette validator (CVD ΔE 21.8). The light blue is below 3:1 against white, so both
 * lines carry direct value labels and the page keeps the full table view.
 */
export interface ChartSeries {
  label: string
  color: string
  values: number[]
}

const props = defineProps<{
  title: string
  years: number[]
  series: [ChartSeries, ChartSeries]
  /** Years shown shaded as "not yet checked". */
  unchecked?: number[]
}>()

const { t } = useT()

// Drawn at the container's real width so text stays the same size on any screen.
const box = ref<HTMLDivElement>()
const width = ref(600)
let observer: ResizeObserver | undefined
onMounted(() => {
  observer = new ResizeObserver(([e]) => (width.value = Math.max(300, Math.round(e!.contentRect.width))))
  observer.observe(box.value!)
})
onBeforeUnmount(() => observer?.disconnect())

const H = 260
const M = { top: 16, right: 64, bottom: 28, left: 52 }
const innerW = computed(() => width.value - M.left - M.right)
const innerH = H - M.top - M.bottom

const allValues = computed(() => props.series.flatMap(s => s.values))
// A clean top value: 1, 2 or 5 times a power of ten, in four steps.
const niceMax = computed(() => {
  const max = Math.max(...allValues.value) * 1.05
  const step = max / 4
  const p = 10 ** Math.floor(Math.log10(step))
  const n = [1, 2, 2.5, 5, 10].find(k => k * p >= step)! * p
  return n * 4
})
const ticks = computed(() => [0, 1, 2, 3, 4].map(i => (niceMax.value / 4) * i))

const x = (i: number) => M.left + (props.years.length === 1 ? 0 : (i / (props.years.length - 1)) * innerW.value)
const y = (v: number) => M.top + innerH - (v / niceMax.value) * innerH

const money = (n: number) => (n >= 1e9 ? `₱${(n / 1e9).toFixed(2)}B` : `₱${(n / 1e6).toFixed(1)}M`)
const tick = (n: number) => (n === 0 ? '₱0' : n >= 1e9 ? `₱${+(n / 1e9).toFixed(1)}B` : `₱${Math.round(n / 1e6)}M`)

const paths = computed(() => props.series.map(s => s.values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')))
const last = props.years.length - 1

// End labels: keep the two values at least 14px apart so they never overlap.
const endLabels = computed(() => {
  const ys = props.series.map(s => y(s.values[last]!))
  const [a, b] = ys as [number, number]
  if (Math.abs(a - b) < 14) {
    const mid = (a + b) / 2
    const up = a < b ? 0 : 1
    ys[up] = mid - 7
    ys[1 - up] = mid + 7
  }
  return props.series.map((s, i) => ({ y: ys[i]!, text: money(s.values[last]!) }))
})

const shade = computed(() => {
  const idx = (props.unchecked ?? []).map(yr => props.years.indexOf(yr)).filter(i => i >= 0)
  if (!idx.length) return null
  const lo = Math.min(...idx)
  const hi = Math.max(...idx)
  const step = innerW.value / (props.years.length - 1)
  return { x: Math.max(M.left, x(lo) - step / 2), w: x(hi) + step / 2 - Math.max(M.left, x(lo) - step / 2) }
})

// Every other year on narrow charts, so the labels fit.
const yearEvery = computed(() => (innerW.value / props.years.length < 34 ? 2 : 1))

// Hover and keyboard: the crosshair snaps to the nearest year.
const hover = ref<number | null>(null)
function onMove(e: PointerEvent) {
  const rect = (e.currentTarget as SVGElement).getBoundingClientRect()
  const px = e.clientX - rect.left
  const i = Math.round(((px - M.left) / innerW.value) * (props.years.length - 1))
  hover.value = Math.min(last, Math.max(0, i))
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault()
    const cur = hover.value ?? last
    hover.value = Math.min(last, Math.max(0, cur + (e.key === 'ArrowRight' ? 1 : -1)))
  }
  if (e.key === 'Escape') hover.value = null
}
const tipLeft = computed(() => {
  if (hover.value === null) return 0
  const px = x(hover.value)
  const left = px > width.value - 190 ? px - 182 : px + 12
  // Never past either edge of the chart, however narrow the screen.
  return Math.min(Math.max(0, left), width.value - 176)
})
</script>

<template>
  <figure class="border p-4 sm:p-5">
    <figcaption class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <span class="font-bold">{{ t(title) }}</span>
      <!-- Legend: a short line key per series, mirroring the marks -->
      <span class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span v-for="s in series" :key="s.label" class="inline-flex items-center gap-2">
          <svg width="18" height="4" aria-hidden="true"><line x1="1" y1="2" x2="17" y2="2" :stroke="s.color" stroke-width="2.5" stroke-linecap="round" /></svg>
          {{ t(s.label) }}
        </span>
      </span>
    </figcaption>

    <div ref="box" class="relative mt-3">
      <svg
        :width="width"
        :height="H"
        :viewBox="`0 0 ${width} ${H}`"
        class="block max-w-full touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-ring"
        role="img"
        tabindex="0"
        :aria-label="`${t(title)}, ${years[0]} to ${years[last]}. ${series.map(s => `${t(s.label)} ${money(s.values[last]!)} in ${years[last]}`).join('; ')}. ${t('Use the arrow keys to read each year.')}`"
        @pointermove="onMove"
        @pointerleave="hover = null"
        @keydown="onKey"
        @blur="hover = null"
      >
        <!-- Years not yet checked -->
        <g v-if="shade">
          <rect :x="shade.x" :y="M.top" :width="shade.w" :height="innerH" fill="#f1f5f9" />
          <text :x="shade.x + 4" :y="M.top + 12" font-size="10" fill="#64748b">{{ t('Not checked') }}</text>
        </g>

        <!-- Gridlines and y-axis -->
        <g font-size="11" fill="#64748b">
          <g v-for="v in ticks" :key="v">
            <line :x1="M.left" :x2="width - M.right" :y1="y(v)" :y2="y(v)" stroke="#e2e8f0" stroke-width="1" />
            <text :x="M.left - 8" :y="y(v) + 4" text-anchor="end" class="tabular-nums">{{ tick(v) }}</text>
          </g>
          <text
            v-for="(yr, i) in years"
            v-show="i % yearEvery === (last % yearEvery) || i === last"
            :key="yr"
            :x="x(i)"
            :y="H - 8"
            text-anchor="middle"
            class="tabular-nums"
          >{{ yr }}</text>
        </g>

        <!-- Lines -->
        <path v-for="(d, i) in paths" :key="i" :d="d" fill="none" :stroke="series[i]!.color" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />

        <!-- End dots and values -->
        <g v-for="(s, i) in series" :key="`end-${i}`">
          <circle :cx="x(last)" :cy="y(s.values[last]!)" r="4" :fill="s.color" stroke="#fff" stroke-width="2" />
          <text :x="x(last) + 9" :y="endLabels[i]!.y + 4" font-size="12" font-weight="600" fill="#0b1f44" class="tabular-nums">{{ endLabels[i]!.text }}</text>
        </g>

        <!-- Crosshair -->
        <g v-if="hover !== null" pointer-events="none">
          <line :x1="x(hover)" :x2="x(hover)" :y1="M.top" :y2="M.top + innerH" stroke="#94a3b8" stroke-width="1" />
          <circle v-for="(s, i) in series" :key="`h-${i}`" :cx="x(hover)" :cy="y(s.values[hover]!)" r="4.5" :fill="s.color" stroke="#fff" stroke-width="2" />
        </g>
      </svg>

      <!-- Tooltip: values lead, labels follow -->
      <div
        v-if="hover !== null"
        class="pointer-events-none absolute top-2 w-44 border bg-background p-3 text-sm"
        :style="{ left: `${tipLeft}px` }"
        aria-live="polite"
      >
        <p class="font-bold tabular-nums">
          {{ years[hover] }}
          <span v-if="unchecked?.includes(years[hover]!)" class="ml-1 text-xs font-medium text-muted-foreground">{{ t('Not checked') }}</span>
        </p>
        <p v-for="s in series" :key="s.label" class="mt-1.5 flex items-center gap-2">
          <svg width="12" height="4" aria-hidden="true"><line x1="1" y1="2" x2="11" y2="2" :stroke="s.color" stroke-width="2.5" stroke-linecap="round" /></svg>
          <span class="font-semibold tabular-nums">{{ money(s.values[hover]!) }}</span>
          <span class="text-muted-foreground">{{ t(s.label) }}</span>
        </p>
      </div>
    </div>
  </figure>
</template>
