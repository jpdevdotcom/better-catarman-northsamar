<script setup lang="ts">
import { BadgeCheck, ExternalLink, Info, Scale } from '@lucide/vue'
import type { Scope } from '~/data/sources'
import { gaps, glossary, handEdits, howToRead, lastChecked, notices, scopes, selectionRules, sources } from '~/data/sources'
import { allServices } from '~/data/site'

useSeo('About the Data', 'Where the information on BetterCatarman comes from, how to read it, and what was changed or left out.')

const order: Scope[] = ['catarman-official', 'catarman-data', 'national', 'open']
const grouped = order.map(scope => ({ scope, ...scopes[scope], items: sources.filter(s => s.scope === scope) }))

// Built from the service data itself, so this list can never drift from what the pages show.
const serviceGroups = [
  {
    title: 'From Catarman’s official checklists',
    icon: BadgeCheck,
    note: 'Copied from catarman.gov.ph. Each page links to the official checklist and online application.',
    items: allServices.filter(s => s.official),
  },
  {
    title: 'Based on national rules',
    icon: Scale,
    note: 'Catarman has not published its own checklist for these, so the local office may ask for more.',
    items: allServices.filter(s => !s.official && s.sources),
  },
  {
    title: 'General guidance only',
    icon: Info,
    note: 'No published source was found. Treat these as a starting point and confirm with the office.',
    items: allServices.filter(s => !s.official && !s.sources),
  },
]

const sections = [
  { id: 'how-to-read', label: 'How to read this site' },
  { id: 'words', label: 'Words used here' },
  { id: 'how-chosen', label: 'How information is chosen' },
  { id: 'changed', label: 'Changed by hand' },
  { id: 'sources', label: 'The sources' },
  { id: 'services', label: 'Every service' },
  { id: 'gaps', label: 'What’s missing' },
  { id: 'notices', label: 'Notices' },
]
</script>

<template>
  <div class="border-b bg-muted">
    <div class="container-page py-10 sm:py-14">
      <p class="mb-3 text-sm font-semibold text-primary">About the data · Catarman, Northern Samar</p>
      <h1 class="max-w-3xl text-3xl font-bold sm:text-4xl">Where this information comes from</h1>
      <p class="mt-3 max-w-2xl text-lg text-muted-foreground">
        Here is how to read this site, how each piece of information was chosen, and the {{ sources.length }} sources behind it, so you can check any of it yourself. Where there is no source, the page says so.
      </p>
      <nav class="mt-6 flex flex-wrap gap-2" aria-label="On this page">
        <a
          v-for="s in sections"
          :key="s.id"
          :href="`#${s.id}`"
          class="border bg-background px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:border-primary hover:bg-accent"
        >
          {{ s.label }}
        </a>
      </nav>
    </div>
  </div>

  <div class="container-page space-y-14 py-12">
    <!-- How to read -->
    <section id="how-to-read" class="scroll-mt-24 border p-5 sm:p-7">
      <h2 class="text-2xl font-bold">How to read this site</h2>
      <ul class="mt-4 list-disc space-y-2.5 pl-5 marker:text-primary">
        <li v-for="h in howToRead" :key="h">{{ h }}</li>
      </ul>
    </section>

    <!-- Glossary -->
    <section id="words" class="scroll-mt-24">
      <SectionHeading title="Words used here" />
      <dl class="grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="g in glossary" :key="g.term" class="border-b border-r p-5">
          <dt class="font-bold">{{ g.term }}</dt>
          <dd class="mt-1 text-sm text-muted-foreground">{{ g.meaning }}</dd>
        </div>
      </dl>
    </section>

    <!-- Selection rules -->
    <section id="how-chosen" class="scroll-mt-24">
      <SectionHeading title="How information is chosen" description="The order of preference used for everything on this site." />
      <ol class="divide-y border">
        <li v-for="(r, i) in selectionRules" :key="r.rule" class="flex items-start gap-4 p-5">
          <span class="grid size-8 shrink-0 place-items-center bg-primary text-sm font-bold text-primary-foreground">{{ i + 1 }}</span>
          <div>
            <p class="font-semibold">{{ r.rule }}</p>
            <p class="mt-0.5 text-sm text-muted-foreground">{{ r.detail }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- Hand edits -->
    <section id="changed" class="scroll-mt-24">
      <SectionHeading
        :title="`Changed by hand: ${handEdits.length}`"
        description="Every place where a source was adjusted before being shown here, and why."
      />
      <ul class="divide-y border">
        <li v-for="e in handEdits" :key="e.what" class="grid gap-x-8 gap-y-1 p-5 md:grid-cols-[1fr_2fr]">
          <p class="font-semibold">{{ e.what }}</p>
          <p class="text-sm text-muted-foreground">{{ e.why }}</p>
        </li>
      </ul>
    </section>

    <!-- Sources -->
    <section id="sources" class="scroll-mt-24">
      <SectionHeading title="The sources" :description="`${sources.length} sources, grouped by how closely they relate to Catarman.`" />
      <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <a v-for="g in grouped" :key="g.scope" :href="`#${g.scope}`" class="border p-5 hover:border-primary hover:bg-accent">
          <p class="text-3xl font-bold tabular-nums text-primary">{{ g.items.length }}</p>
          <p class="mt-1 font-semibold">{{ g.label }}</p>
          <p class="mt-1 text-sm text-muted-foreground">{{ g.description }}</p>
        </a>
      </div>

      <div v-for="g in grouped" :id="g.scope" :key="g.scope" class="mb-8 scroll-mt-24">
        <h3 class="text-lg font-bold">{{ g.label }}</h3>
        <p class="mb-3 text-sm text-muted-foreground">{{ g.description }}</p>
        <ul class="divide-y border">
          <li v-for="s in g.items" :key="s.name" class="grid gap-x-8 gap-y-2 p-5 md:grid-cols-[1fr_1fr]">
            <div>
              <a v-if="s.url" :href="s.url" target="_blank" rel="noopener" class="inline-flex items-start gap-1.5 font-semibold text-primary hover:underline">
                {{ s.name }} <ExternalLink class="mt-1 size-3.5 shrink-0" aria-hidden="true" />
              </a>
              <p v-else class="font-semibold">{{ s.name }}</p>
              <p class="text-sm text-muted-foreground">{{ s.publisher }}</p>
            </div>
            <p class="text-sm"><span class="text-muted-foreground">Used for:</span> {{ s.usedFor }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Services by source -->
    <section id="services" class="scroll-mt-24">
      <SectionHeading title="Every service, by source" description="Which kind of source stands behind each service page." />
      <div class="grid gap-4 lg:grid-cols-3">
        <div v-for="g in serviceGroups" :key="g.title" class="border">
          <div class="border-b bg-muted p-5">
            <h3 class="flex items-center gap-2 font-bold">
              <component :is="g.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" /> {{ g.title }}
              <span class="ml-auto tabular-nums text-muted-foreground">{{ g.items.length }}</span>
            </h3>
            <p class="mt-1 text-sm text-muted-foreground">{{ g.note }}</p>
          </div>
          <ul class="divide-y text-sm">
            <li v-for="s in g.items" :key="s.category.slug + s.slug">
              <NuxtLink :to="`/services/${s.category.slug}/${s.slug}`" class="block px-5 py-2.5 hover:bg-accent hover:text-primary">{{ s.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Gaps -->
    <section id="gaps" class="scroll-mt-24">
      <SectionHeading title="What we don’t have yet" description="Information we could not find a source for. It is left blank on the site rather than guessed." />
      <ul class="divide-y border">
        <li v-for="g in gaps" :key="g" class="px-5 py-3.5">{{ g }}</li>
      </ul>
    </section>

    <!-- Notices -->
    <section id="notices" class="scroll-mt-24">
      <SectionHeading title="Notices" />
      <div class="space-y-4 border p-5 sm:p-7">
        <p v-for="n in notices" :key="n.title">
          <strong>{{ n.title }}</strong> {{ n.text }}
        </p>
        <p>
          <NuxtLink to="/contact" class="font-semibold text-primary hover:underline">See contact details</NuxtLink>
        </p>
      </div>
      <p class="mt-4 text-sm text-muted-foreground">Sources last checked {{ lastChecked }}.</p>
    </section>
  </div>
</template>
