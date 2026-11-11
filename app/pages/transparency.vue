<script setup lang="ts">
import { ExternalLink, Info } from '@lucide/vue'
import { finances, transparencyLinks } from '~/data/site'

useHead({ title: 'Transparency' })
useSeoMeta({ description: 'Municipal finances and open government resources for Catarman, Northern Samar.' })

const peso = (m: number) => (m >= 1000 ? `₱${(m / 1000).toFixed(2)}B` : `₱${m.toFixed(1)}M`)
</script>

<template>
  <PageHeader title="Transparency" description="How public money is raised and spent, and where to find official records." />

  <div class="container-page space-y-14 py-12">
    <section>
      <SectionHeading :title="`Municipal finances, ${finances.year}`" />
      <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border lg:grid-cols-4">
        <div v-for="i in finances.items" :key="i.label" class="flex flex-col-reverse gap-1 bg-background p-6">
          <dt>
            <span class="block font-medium">{{ i.label }}</span>
            <span class="block text-xs tabular-nums text-muted-foreground">{{ i.exact }}</span>
          </dt>
          <dd class="text-3xl font-bold tabular-nums text-primary">{{ peso(i.value) }}</dd>
        </div>
      </dl>
      <div class="mt-4 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <div class="space-y-2">
          <p>
            These are the figures recorded for Catarman from the
            <a :href="finances.source.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">Commission on Audit’s {{ finances.year }} Annual Audit Report</a>.
            We read them from the
            <a :href="finances.via.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">{{ finances.via.label }}</a>,
            which cites that report, and have not yet checked them against the report itself.
          </p>
          <p>They are year-end totals from the audited financial statements, not the approved budget. For anything official, use the COA report.</p>
        </div>
      </div>
    </section>

    <section>
      <SectionHeading title="Official records and open data" />
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="l in transparencyLinks" :key="l.href">
          <a :href="l.href" target="_blank" rel="noopener" class="group flex h-full flex-col rounded-lg border p-5 transition-colors hover:border-primary hover:bg-accent">
            <span class="flex items-center justify-between gap-2 font-semibold">
              {{ l.label }} <ExternalLink class="size-4 shrink-0 text-primary" aria-hidden="true" />
            </span>
            <span class="mt-1 text-sm text-muted-foreground">{{ l.note }}</span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
