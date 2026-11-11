<script setup lang="ts">
import { ExternalLink } from '@lucide/vue'
import { offices, officials, site } from '~/data/site'

useHead({ title: 'Government' })
useSeoMeta({ description: 'Elected officials and municipal offices of Catarman, Northern Samar.' })
</script>

<template>
  <PageHeader title="Government" description="Who leads Catarman, and which office handles what." />

  <div class="container-page space-y-14 py-12">
    <section>
      <SectionHeading title="Elected officials" />
      <div class="grid gap-4 sm:grid-cols-3">
        <div v-for="o in officials" :key="o.role" class="rounded-lg border p-6">
          <p class="text-sm font-medium text-primary">{{ o.role }}</p>
          <p class="mt-1 text-lg font-bold">{{ o.name }}</p>
        </div>
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        For the full list of Sangguniang Bayan members and barangay officials, see the
        <a :href="site.officialWebsite" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-medium text-primary hover:underline">
          official LGU website <ExternalLink class="size-3.5" aria-hidden="true" />
        </a>.
      </p>
    </section>

    <section>
      <SectionHeading title="Municipal offices" description="Most offices are at or near the Municipal Hall." />
      <ul class="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
        <li v-for="o in offices" :key="o.name" class="flex items-start gap-4 bg-background p-5">
          <span class="grid size-10 shrink-0 place-items-center rounded-md bg-secondary text-primary">
            <component :is="o.icon" class="size-5" aria-hidden="true" />
          </span>
          <div>
            <p class="font-semibold">{{ o.name }}</p>
            <p class="text-sm text-muted-foreground">{{ o.handles }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
