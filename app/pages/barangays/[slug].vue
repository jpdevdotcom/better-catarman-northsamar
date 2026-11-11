<script setup lang="ts">
import { ArrowLeft, ArrowRight, ExternalLink, Info, MapPinOff } from '@lucide/vue'
import { barangays, totalPop2020 } from '~/data/barangays'

const route = useRoute()
const index = barangays.findIndex(b => b.slug === route.params.slug)
if (index === -1) {
  throw createError({ statusCode: 404, statusMessage: 'Barangay not found', fatal: true })
}
const b = barangays[index]!
const prev = barangays[(index - 1 + barangays.length) % barangays.length]!
const next = barangays[(index + 1) % barangays.length]!

useHead({ title: `Barangay ${b.name}` })
useSeoMeta({ description: `Population and location of Barangay ${b.name}, Catarman, Northern Samar.` })

const fmt = (n: number) => n.toLocaleString('en-PH')
const rank = [...barangays].sort((x, y) => y.pop2020 - x.pop2020).findIndex(x => x.slug === b.slug) + 1
const change = ((b.pop2020 - b.pop2015) / b.pop2015) * 100
const share = (b.pop2020 / totalPop2020) * 100

const stats = [
  { label: 'Population', note: '2020 Census', value: fmt(b.pop2020) },
  { label: 'Population', note: '2015 Census', value: fmt(b.pop2015) },
  { label: 'Change', note: '2015 to 2020', value: `${change > 0 ? '+' : ''}${change.toFixed(1)}%` },
  { label: 'Share of Catarman', note: `Ranked ${rank} of ${barangays.length} by population`, value: `${share.toFixed(1)}%` },
]

const loc = b.location
const d = 0.012
const mapSrc = loc && `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lng - d},${loc.lat - d},${loc.lng + d},${loc.lat + d}&layer=mapnik&marker=${loc.lat},${loc.lng}`
const mapLink = loc && `https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lng}#map=15/${loc.lat}/${loc.lng}`
</script>

<template>
  <PageHeader
    :title="`Barangay ${b.name}`"
    :description="b.poblacion ? 'A poblacion barangay in the town proper of Catarman, Northern Samar.' : 'A barangay of Catarman, Northern Samar.'"
    :crumbs="[{ label: 'Barangays', to: '/barangays' }, { label: b.name }]"
  />

  <div class="container-page space-y-12 py-12">
    <dl class="grid grid-cols-2 gap-px overflow-hidden border bg-border lg:grid-cols-4">
      <div v-for="s in stats" :key="s.label + s.note" class="flex flex-col-reverse gap-1 bg-background p-5 sm:p-6">
        <dt>
          <span class="block font-medium">{{ s.label }}</span>
          <span class="block text-sm text-muted-foreground">{{ s.note }}</span>
        </dt>
        <dd class="text-3xl font-bold tabular-nums text-primary">{{ s.value }}</dd>
      </div>
    </dl>

    <section>
      <SectionHeading title="Location" :description="loc ? 'Where the barangay sits within Catarman.' : undefined" />

      <div v-if="loc" class="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div class="border p-3">
          <BarangayMap :active="b.slug" />
        </div>
        <div>
          <div class="overflow-hidden border">
            <iframe :src="mapSrc!" :title="`Street map of Barangay ${b.name}`" class="block h-80 w-full lg:h-[352px]" loading="lazy" />
          </div>
          <div class="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span class="tabular-nums text-muted-foreground">{{ loc.lat.toFixed(4) }}° N, {{ loc.lng.toFixed(4) }}° E</span>
            <a :href="mapLink!" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              Open larger map <ExternalLink class="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div v-else class="flex items-start gap-3 border border-dashed p-5">
        <MapPinOff class="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div>
          <p class="font-semibold">Location not yet mapped</p>
          <p class="mt-1 text-sm text-muted-foreground">
            We don’t have a reliable map point for Barangay {{ b.name }} yet, so we’re not showing a guess.
          </p>
        </div>
      </div>

      <p class="mt-6 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        Population figures are from the Philippine Statistics Authority (Census of Population). Map points are approximate and come from © OpenStreetMap contributors; they are not official boundaries.
      </p>
    </section>

    <nav class="grid grid-cols-2 gap-4 border-t pt-6" aria-label="Other barangays">
      <NuxtLink :to="`/barangays/${prev.slug}`" class="group flex items-center gap-3 border p-4 hover:border-primary hover:bg-accent">
        <ArrowLeft class="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span><span class="block text-xs text-muted-foreground">Previous</span><span class="font-semibold">{{ prev.name }}</span></span>
      </NuxtLink>
      <NuxtLink :to="`/barangays/${next.slug}`" class="group flex items-center justify-end gap-3 border p-4 text-right hover:border-primary hover:bg-accent">
        <span><span class="block text-xs text-muted-foreground">Next</span><span class="font-semibold">{{ next.name }}</span></span>
        <ArrowRight class="size-4 shrink-0 text-primary" aria-hidden="true" />
      </NuxtLink>
    </nav>
  </div>
</template>
