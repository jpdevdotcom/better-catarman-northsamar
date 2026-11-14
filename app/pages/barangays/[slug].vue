<script setup lang="ts">
import { ArrowLeft, ArrowRight, ExternalLink, Info, Phone, UserRound } from '@lucide/vue'
import { barangayOfficials, officialsRetrieved, officialsSource } from '~/data/barangayOfficials'
import { barangays, totalPop2020 } from '~/data/barangays'
import { boundarySource } from '~/data/boundaries'

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



const brgy = barangayOfficials[b.slug]
const captain = brgy?.officials.find(o => o.position === 'Punong Barangay')
const council = brgy?.officials.filter(o => o.position === 'Sangguniang Barangay Member') ?? []
const others = brgy?.officials.filter(o => o.position !== 'Punong Barangay' && o.position !== 'Sangguniang Barangay Member') ?? []

const loc = b.location
const hasLiveMap = Boolean(useRuntimeConfig().public.googleMapsKey)
const points = barangays.map(x => ({ slug: x.slug, name: x.name, lat: x.location.lat, lng: x.location.lng }))
const d = 0.012
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lng - d},${loc.lat - d},${loc.lng + d},${loc.lat + d}&layer=mapnik&marker=${loc.lat},${loc.lng}`
const mapLink = `https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lng}#map=15/${loc.lat}/${loc.lng}`

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
      <SectionHeading title="Location" description="Where the barangay sits within Catarman, and its official boundary." />

      <div class="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div class="border" :class="hasLiveMap ? 'h-64 lg:h-[352px]' : 'p-3'">
          <!-- Overview: the whole municipality, with this barangay highlighted -->
          <SiteMap :points="[]" boundaries :active="b.slug" :label="`Map of Catarman showing where ${b.name} is`">
            <BarangayMap :active="b.slug" />
          </SiteMap>
        </div>
        <div>
          <div class="h-80 overflow-hidden border lg:h-[352px]">
            <SiteMap :points="points" boundaries :focus="b.slug" :active="b.slug" :label="`Map of Barangay ${b.name}`">
              <iframe :src="mapSrc!" :title="`Street map of Barangay ${b.name}`" class="block size-full" loading="lazy" />
            </SiteMap>
          </div>
          <div class="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
            <span class="tabular-nums text-muted-foreground">{{ loc.lat.toFixed(4) }}° N, {{ loc.lng.toFixed(4) }}° E</span>
            <a :href="mapLink!" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              Open larger map <ExternalLink class="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <p class="mt-6 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          Population figures are from the Philippine Statistics Authority (Census of Population). The boundary is from the
          <a :href="boundarySource.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">{{ boundarySource.label }}</a>.
          {{ b.locationFrom === 'osm' ? 'The pin marks the village centre as mapped by © OpenStreetMap contributors.' : 'The pin is a point inside the official boundary.' }}
        </span>
      </p>
    </section>

    <section v-if="brgy?.officials.length" id="officials" class="scroll-mt-24">
      <SectionHeading title="Barangay officials" description="The elected and appointed officials of the barangay, as listed by the DILG." />

      <div class="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div class="space-y-4">
          <div v-if="captain" class="border">
            <div class="flex items-start gap-4 bg-muted p-5">
              
              <div class="min-w-0">
                <p class="text-xs font-bold uppercase tracking-wider text-primary">Punong Barangay</p>
                <p class="mt-1 text-lg font-bold leading-tight">{{ captain.name }}</p>
                <p class="mt-0.5 text-sm text-muted-foreground">Barangay captain</p>
              </div>
            </div>
            <div class="flex items-start gap-2.5 border-t px-5 py-3.5 text-sm">
              <Phone class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p class="text-muted-foreground">Barangay contact</p>
                <PhoneList :phones="brgy.contact ? [brgy.contact] : []" />
              </div>
            </div>
          </div>

          <ul v-if="others.length" class="divide-y border">
            <li v-for="o in others" :key="o.position + o.name" class="px-5 py-3.5">
              <p class="text-sm text-muted-foreground">{{ o.position }}</p>
              <p class="font-semibold">{{ o.name }}</p>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-3 text-sm font-semibold text-muted-foreground">Sangguniang Barangay members ({{ council.length }})</h3>
          <ul class="grid border-l border-t sm:grid-cols-2">
            <li v-for="o in council" :key="o.name" class="flex items-center gap-3 border-b border-r p-4">
              <span class="grid size-9 shrink-0 place-items-center bg-secondary text-primary">
                <UserRound class="size-4" aria-hidden="true" />
              </span>
              <span class="font-medium">{{ o.name }}</span>
            </li>
          </ul>
        </div>
      </div>

      <p class="mt-4 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          From the
          <a :href="officialsSource" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">DILG Barangay Officials Directory</a>,
          read on {{ officialsRetrieved }}. Barangay and SK elections were held on 2 November 2026, so this list may still show the outgoing officials until the DILG updates it.
        </span>
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
