<script setup lang="ts">
import { Clock, ExternalLink, Globe, MapPin } from '@lucide/vue'
import { site } from '~/data/site'

useHead({ title: 'Contact' })
useSeoMeta({ description: 'Address, office hours, and emergency hotlines for Catarman, Northern Samar.' })

const { lat, lng } = site.coordinates
const hallPoint = [{ name: 'Catarman Municipal Hall (town proper)', lat, lng }]
const d = 0.02
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d},${lat - d},${lng + d},${lat + d}&layer=mapnik&marker=${lat},${lng}`
const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`
</script>

<template>
  <PageHeader title="Contact" description="Where to go and who to call." />

  <div class="container-page space-y-14 py-12">
    <section class="grid gap-8 lg:grid-cols-2">
      <div>
        <SectionHeading title="Municipal Hall" />
        <ul class="divide-y rounded-lg border">
          <li class="flex items-start gap-4 px-5 py-4">
            <MapPin class="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div><p class="text-sm text-muted-foreground">Address</p><p class="font-medium">{{ site.address }}</p></div>
          </li>
          <li class="flex items-start gap-4 px-5 py-4">
            <Clock class="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div><p class="text-sm text-muted-foreground">Office hours</p><p class="font-medium">{{ site.officeHours }}</p></div>
          </li>
          <li class="flex items-start gap-4 px-5 py-4">
            <Globe class="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p class="text-sm text-muted-foreground">Official website</p>
              <a :href="site.officialWebsite" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                catarman-nsamar.gov.ph <ExternalLink class="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <SectionHeading title="Map" />
        <div class="h-72 overflow-hidden border">
          <SiteMap :points="hallPoint" :active="hallPoint[0]!.name" :center="site.coordinates" :zoom="14" label="Map of Catarman town proper, Northern Samar">
            <iframe :src="mapSrc" title="Map of Catarman town proper, Northern Samar" class="block size-full" loading="lazy" />
          </SiteMap>
        </div>
        <a :href="mapLink" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Open larger map <ExternalLink class="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>

    <section>
      <SectionHeading title="Emergency hotlines" description="For life-threatening emergencies, call 911." />
      <HotlineList />
    </section>
  </div>
</template>
