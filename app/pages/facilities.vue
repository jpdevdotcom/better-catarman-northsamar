<script setup lang="ts">
import { ExternalLink, GraduationCap, HeartPulse, Info, Search } from '@lucide/vue'
import { barangays } from '~/data/barangays'
import type { Facility } from '~/data/facilities'
import { facilities, facilitiesRetrieved } from '~/data/facilities'

const { t } = useT()

useHead({ title: 'Schools and health facilities' })
useSeoMeta({ description: 'Schools, colleges, hospitals, and health centers in Catarman, Northern Samar, on a map and by barangay.' })

const nameOf = Object.fromEntries(barangays.map(b => [b.slug, b.name]))
const hasLiveMap = Boolean(useRuntimeConfig().public.googleMapsKey)

const HEALTH = '#b91c1c'
const SCHOOL = '#047857'

const filter = ref<'all' | 'health' | 'school'>('all')
const q = ref('')

const shown = computed(() => {
  const term = q.value.trim().toLowerCase()
  return facilities.filter(f =>
    (filter.value === 'all' || f.kind === filter.value)
    && (!term || `${f.name} ${f.detail} ${nameOf[f.barangay ?? ''] ?? ''}`.toLowerCase().includes(term)))
})

// Grouped by type, in the order the data file lists them (hospitals first).
const groups = computed(() => {
  const out: { detail: string, kind: Facility['kind'], items: Facility[] }[] = []
  for (const f of shown.value) {
    let g = out.find(x => x.detail === f.detail)
    if (!g) out.push(g = { detail: f.detail, kind: f.kind, items: [] })
    g.items.push(f)
  }
  return out
})

const points = computed(() => shown.value.map(f => ({ name: f.name, lat: f.lat, lng: f.lng, color: f.kind === 'health' ? HEALTH : SCHOOL })))
const count = (kind: Facility['kind']) => facilities.filter(f => f.kind === kind).length
const tabs = computed(() => [
  { key: 'all' as const, label: t('All'), n: facilities.length },
  { key: 'health' as const, label: t('Health'), n: count('health') },
  { key: 'school' as const, label: t('Schools'), n: count('school') },
])
</script>

<template>
  <PageHeader
    title="Schools and health facilities"
    description="Hospitals, health centers, and schools in Catarman, on a map and by barangay."
  />

  <div class="container-page space-y-8 py-12">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-wrap gap-2" role="group" :aria-label="t('Show')">
        <Button
          v-for="tab in tabs"
          :key="tab.key"
          :variant="filter === tab.key ? 'default' : 'outline'"
          :aria-pressed="filter === tab.key"
          @click="filter = tab.key"
        >
          {{ tab.label }} <span class="tabular-nums opacity-75">{{ tab.n }}</span>
        </Button>
      </div>
      <div class="relative md:w-80">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input v-model="q" type="search" :aria-label="t('Find a school or facility')" :placeholder="t('Find a school or facility')" class="h-11 pl-11 text-base md:text-base" />
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1fr_420px]">
      <!-- List -->
      <div class="order-2 space-y-6 lg:order-1">
        <p v-if="!shown.length" class="border border-dashed p-6 text-center text-muted-foreground">{{ t('Nothing matches your search.') }}</p>
        <section v-for="g in groups" :key="g.detail">
          <h2 class="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <component :is="g.kind === 'health' ? HeartPulse : GraduationCap" class="size-4" :class="g.kind === 'health' ? 'text-red-700' : 'text-emerald-700'" aria-hidden="true" />
            {{ t(g.detail) }} <span class="tabular-nums">({{ g.items.length }})</span>
          </h2>
          <ul class="divide-y border">
            <li v-for="f in g.items" :key="f.osm" class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
              <span class="min-w-0">
                <span class="block font-semibold leading-snug">{{ f.name }}</span>
                <span v-if="f.district" class="block text-xs text-muted-foreground">{{ f.district }}</span>
              </span>
              <NuxtLink v-if="f.barangay" :to="`/barangays/${f.barangay}#places`" class="shrink-0 text-sm font-medium text-primary hover:underline">
                {{ nameOf[f.barangay] }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>

      <!-- Map -->
      <aside class="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">
        <div v-if="hasLiveMap" class="h-80 border lg:h-[520px]">
          <SiteMap :points="points" boundaries labels="none" :label="t('Map of schools and health facilities in Catarman')">
            <span />
          </SiteMap>
        </div>
        <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span class="inline-flex items-center gap-1.5"><span class="size-3 rounded-full" :style="{ background: HEALTH }" /> {{ t('Health') }}</span>
          <span class="inline-flex items-center gap-1.5"><span class="size-3 rounded-full" :style="{ background: SCHOOL }" /> {{ t('Schools') }}</span>
        </p>
      </aside>
    </div>

    <div class="flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
      <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <div class="space-y-2">
        <p>
          {{ t('This list comes from OpenStreetMap, a map anyone can edit, read on') }} {{ facilitiesRetrieved }}.
          {{ t('It is not complete: some schools and health stations, including the Rural Health Unit, are not mapped yet. Pharmacies, dental clinics, and private doctors’ clinics are left out.') }}
        </p>
        <p>
          {{ t('Each place is assigned to the barangay it falls in on the official NAMRIA and PSA boundaries.') }}
          <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-medium text-primary hover:underline">
            {{ t('Add or correct a place on OpenStreetMap') }} <ExternalLink class="size-3.5" aria-hidden="true" />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
