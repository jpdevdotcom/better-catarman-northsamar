<script setup lang="ts">
import { ArrowRight, SearchX } from '@lucide/vue'
import { allServices, categories, lifeEvents, requirementText } from '~/data/site'

useHead({ title: 'Services' })
useSeoMeta({ description: 'Browse all municipal services in Catarman, Northern Samar, with requirements and the office to visit.' })

const route = useRoute()
const query = computed(() => String(route.query.q ?? '').trim())

const results = computed(() => {
  const terms = query.value.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return allServices.filter((s) => {
    const hay = `${s.name} ${s.description} ${s.office} ${s.category.title} ${requirementText(s)}`.toLowerCase()
    return terms.every(t => hay.includes(t))
  })
})
</script>

<template>
  <PageHeader title="Services" description="Find what you need, what to bring, and which office to visit.">
    <div class="mt-6 max-w-2xl">
      <ServiceSearch :key="query" :initial="query" />
    </div>
  </PageHeader>

  <div class="container-page py-12">
    <!-- Search results -->
    <section v-if="query" aria-live="polite">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-xl font-bold">
          {{ results.length }} {{ results.length === 1 ? 'result' : 'results' }} for “{{ query }}”
        </h2>
        <Button variant="outline" as-child><NuxtLink to="/services">Clear search</NuxtLink></Button>
      </div>

      <ul v-if="results.length" class="divide-y rounded-lg border">
        <li v-for="r in results" :key="r.category.slug + r.slug">
          <NuxtLink
            :to="`/services/${r.category.slug}/${r.slug}`"
            class="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-accent"
          >
            <span>
              <span class="block font-semibold">{{ r.name }}</span>
              <span class="mt-0.5 block text-sm text-muted-foreground">{{ r.description }}</span>
              <span class="mt-2 block text-xs font-medium text-primary">{{ r.category.title }} · {{ r.office }}</span>
            </span>
            <ArrowRight class="size-4 shrink-0 text-primary" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>

      <div v-else class="rounded-lg border border-dashed px-6 py-12 text-center">
        <SearchX class="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
        <p class="mt-3 font-semibold">No services matched your search</p>
        <p class="mt-1 text-sm text-muted-foreground">Try a shorter keyword such as “permit” or “certificate”, or browse the categories below.</p>
      </div>
    </section>

    <section :class="query && 'mt-14'">
      <SectionHeading title="Browse by category" />
      <div class="grid gap-4 sm:grid-cols-2">
        <CategoryCard v-for="c in categories" :key="c.slug" :category="c" />
      </div>
    </section>

    <section class="mt-14">
      <SectionHeading title="Browse by life event" description="Start from what is happening in your life." />
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <NuxtLink
          v-for="e in lifeEvents"
          :key="e.label"
          :to="e.to"
          class="flex items-center gap-3 rounded-lg border p-4 text-sm font-medium transition-colors hover:border-primary hover:bg-accent"
        >
          <component :is="e.icon" class="size-5 shrink-0 text-primary" aria-hidden="true" />
          {{ e.label }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
