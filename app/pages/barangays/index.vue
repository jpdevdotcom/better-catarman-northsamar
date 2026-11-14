<script setup lang="ts">
import { ArrowRight, Search, SearchX } from '@lucide/vue'
import { barangayOfficials } from '~/data/barangayOfficials'
import { barangays, totalPop2020 } from '~/data/barangays'

useHead({ title: 'Barangays' })
useSeoMeta({ description: 'Profiles of all 55 barangays of Catarman, Northern Samar, with population and location.' })

const q = ref('')
const sort = ref<'name' | 'population'>('name')

const list = computed(() => {
  const term = slugify(q.value)
  const rows = barangays.filter(b => !term || b.slug.includes(term))
  return sort.value === 'population' ? [...rows].sort((a, b) => b.pop2020 - a.pop2020) : rows
})

const maxPop = Math.max(...barangays.map(b => b.pop2020))
const fmt = (n: number) => n.toLocaleString('en-PH')
const captainOf = (slug: string) => barangayOfficials[slug]?.officials.find(o => o.position === 'Punong Barangay')?.name

const points = barangays.map(b => ({ slug: b.slug, name: b.name, lat: b.location.lat, lng: b.location.lng }))
const hasLiveMap = Boolean(useRuntimeConfig().public.googleMapsKey)
</script>

<template>
  <PageHeader
    title="Barangays"
    :description="`Catarman has ${barangays.length} barangays, home to ${fmt(totalPop2020)} people (2020 Census). Select one to see its profile.`"
  />

  <div class="container-page grid gap-12 py-12 lg:grid-cols-[1fr_380px]">
    <section>
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <Search class="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input v-model="q" type="search" aria-label="Find a barangay" placeholder="Find a barangay" class="h-11 pl-11 text-base md:text-base" />
        </div>
        <div class="flex shrink-0 items-center gap-2 text-sm" role="group" aria-label="Sort barangays">
          <span class="text-muted-foreground">Sort:</span>
          <Button :variant="sort === 'name' ? 'default' : 'outline'" size="sm" :aria-pressed="sort === 'name'" @click="sort = 'name'">A–Z</Button>
          <Button :variant="sort === 'population' ? 'default' : 'outline'" size="sm" :aria-pressed="sort === 'population'" @click="sort = 'population'">Population</Button>
        </div>
      </div>

      <ul v-if="list.length" class="divide-y border">
        <li v-for="b in list" :key="b.slug">
          <NuxtLink :to="`/barangays/${b.slug}`" class="group grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3 hover:bg-accent sm:px-5">
            <span class="min-w-0">
              <span class="flex flex-wrap items-center gap-2 font-semibold">
                {{ b.name }}
                <Badge v-if="b.poblacion" variant="secondary">Poblacion</Badge>
              </span>
              <span v-if="captainOf(b.slug)" class="block text-sm text-muted-foreground">Punong Barangay: {{ captainOf(b.slug) }}</span>
              <span class="mt-1.5 block h-1.5 bg-secondary" aria-hidden="true">
                <span class="block h-full bg-primary" :style="{ width: `${(b.pop2020 / maxPop) * 100}%` }" />
              </span>
            </span>
            <span class="text-right">
              <span class="block font-semibold tabular-nums">{{ fmt(b.pop2020) }}</span>
              <span class="block text-xs text-muted-foreground">residents</span>
            </span>
            <ArrowRight class="size-4 text-primary" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>
      <div v-else class="border border-dashed px-6 py-12 text-center">
        <SearchX class="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
        <p class="mt-3 font-semibold">No barangay matches “{{ q }}”</p>
        <p class="mt-1 text-sm text-muted-foreground">Check the spelling or clear the search to see all barangays.</p>
      </div>
    </section>

    <aside class="lg:sticky lg:top-24 lg:self-start">
      <h2 class="mb-3 text-sm font-semibold">Map of Catarman</h2>
      <div class="border" :class="hasLiveMap ? 'h-[420px]' : 'p-3'">
        <SiteMap :points="points" boundaries label="Map of Catarman showing its barangays">
          <BarangayMap />
        </SiteMap>
      </div>
      <p class="mt-3 text-sm text-muted-foreground">
        Each shape is a barangay’s official boundary — select one to open its profile. The small barangays on the north coast are the poblacion (town proper).
      </p>
    </aside>
  </div>

  <div class="container-page">
    <p class="text-sm text-muted-foreground">
      Population: Philippine Statistics Authority, 2020 Census of Population. Boundaries: NAMRIA and PSA. Pins mark village centres, from © OpenStreetMap contributors.
    </p>
  </div>
</template>
