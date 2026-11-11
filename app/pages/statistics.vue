<script setup lang="ts">
import { barangays, census, glance, quickFacts } from '~/data/site'

useHead({ title: 'Statistics' })
useSeoMeta({ description: 'Population, land area, barangays, and key figures for Catarman, Northern Samar.' })

const max = Math.max(...census.map(c => c.population))
const fmt = (n: number) => n.toLocaleString('en-PH')
</script>

<template>
  <PageHeader title="Statistics" description="Key figures about Catarman and its people." />

  <div class="container-page space-y-14 py-12">
    <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border lg:grid-cols-4">
      <div v-for="g in glance" :key="g.label" class="flex flex-col-reverse gap-1 bg-background p-6">
        <dt>
          <span class="block font-medium">{{ g.label }}</span>
          <span class="block text-sm text-muted-foreground">{{ g.note }}</span>
        </dt>
        <dd class="text-3xl font-bold tabular-nums text-primary">{{ g.value }}</dd>
      </div>
    </dl>

    <section>
      <SectionHeading title="Population over time" description="Census counts from 1903 to 2024." />
      <div class="rounded-lg border p-5 sm:p-6">
        <ul class="space-y-2">
          <li v-for="c in census" :key="c.year" class="grid grid-cols-[3rem_1fr_4.5rem] items-center gap-3 text-sm">
            <span class="font-medium tabular-nums text-muted-foreground">{{ c.year }}</span>
            <span class="h-4 rounded-sm bg-secondary">
              <span class="block h-full rounded-sm bg-primary" :style="{ width: `${(c.population / max) * 100}%` }" />
            </span>
            <span class="text-right font-semibold tabular-nums">{{ fmt(c.population) }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <SectionHeading title="Quick facts" />
      <dl class="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="f in quickFacts" :key="f.label" class="bg-background px-5 py-4">
          <dt class="text-sm text-muted-foreground">{{ f.label }}</dt>
          <dd class="font-semibold">{{ f.value }}</dd>
        </div>
      </dl>
    </section>

    <section>
      <SectionHeading :title="`${barangays.length} barangays`" description="“Pob.” marks barangays in the poblacion (town proper)." />
      <ul class="columns-2 gap-8 text-sm sm:columns-3 lg:columns-5">
        <li v-for="b in barangays" :key="b" class="border-b py-2">{{ b }}</li>
      </ul>
    </section>

    <p class="text-sm text-muted-foreground">
      Sources: Philippine Statistics Authority (Census of Population), as compiled on Wikipedia. Retrieved November 2026.
    </p>
  </div>
</template>
