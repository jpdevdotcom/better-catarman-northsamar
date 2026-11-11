<script setup lang="ts">
import { ArrowRight, Clock, ExternalLink, MapPin } from '@lucide/vue'
import { categories, glance, history, officials, popularSearches, popularSlugs, site } from '~/data/site'

useHead({ title: 'Government services for Catarman, Northern Samar', titleTemplate: '%s · BetterCatarman' })
useSeoMeta({
  description: 'Find government services, requirements, offices, and public information for Catarman, Northern Samar.',
})

const popular = popularSlugs.map(s => categories.find(c => c.slug === s)!)
</script>

<template>
  <!-- Hero -->
  <section class="border-b">
    <div class="container-page py-14 sm:py-20">
      <p class="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <MapPin class="size-4" aria-hidden="true" /> {{ site.municipality }}, {{ site.province }}
      </p>
      <h1 class="max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
        Government services in Catarman, <span class="text-primary">easier to find.</span>
      </h1>
      <p class="mt-5 max-w-2xl text-lg text-muted-foreground">
        Requirements, offices, and public information for every Catarmananon — in one simple place.
      </p>

      <div class="mt-8 max-w-2xl">
        <ServiceSearch />
        <div class="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span class="text-muted-foreground">Popular:</span>
          <NuxtLink
            v-for="p in popularSearches"
            :key="p"
            :to="{ path: '/services', query: { q: p } }"
            class="rounded-none border px-3 py-1 font-medium text-secondary-foreground transition-colors hover:border-primary hover:bg-accent"
          >
            {{ p }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Popular services -->
  <section class="container-page py-14">
    <SectionHeading
      title="Popular services"
      description="The things residents ask about most."
      link-to="/services"
      link-label="All services"
    />
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CategoryCard v-for="c in popular" :key="c.slug" :category="c" />
    </div>
  </section>

  <!-- At a glance -->
  <section class="bg-primary text-primary-foreground">
    <div class="container-page py-14">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 class="text-2xl font-bold">Catarman at a glance</h2>
        <NuxtLink to="/statistics" class="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
          View statistics <ArrowRight class="size-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/25 bg-white/25 lg:grid-cols-4">
        <div v-for="g in glance" :key="g.label" class="flex flex-col-reverse gap-1 bg-primary p-6">
          <dt>
            <span class="block font-medium">{{ g.label }}</span>
            <span class="block text-sm text-primary-foreground/75">{{ g.note }}</span>
          </dt>
          <dd class="text-3xl font-bold tabular-nums sm:text-4xl">{{ g.value }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- History + leadership -->
  <section class="container-page grid gap-14 py-14 lg:grid-cols-5">
    <div class="lg:col-span-3">
      <SectionHeading title="A brief history" />
      <ol class="space-y-6 border-l-2 border-border pl-6">
        <li v-for="h in history" :key="h.period" class="relative">
          <span class="absolute -left-[31px] top-1.5 size-3 rounded-none border-2 border-background bg-primary" aria-hidden="true" />
          <p class="text-sm font-bold text-primary">{{ h.period }}</p>
          <p class="mt-1 text-muted-foreground">{{ h.text }}</p>
        </li>
      </ol>
    </div>

    <div class="lg:col-span-2">
      <SectionHeading title="Leadership" link-to="/government" link-label="Government" />
      <ul class="divide-y rounded-lg border">
        <li v-for="o in officials" :key="o.role" class="px-5 py-4">
          <p class="text-sm text-muted-foreground">{{ o.role }}</p>
          <p class="font-semibold">{{ o.name }}</p>
        </li>
      </ul>

      <div class="mt-6 space-y-3 rounded-lg border p-5 text-sm">
        <p class="flex items-start gap-3"><MapPin class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> {{ site.address }}</p>
        <p class="flex items-start gap-3"><Clock class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> {{ site.officeHours }}</p>
        <a :href="site.officialWebsite" target="_blank" rel="noopener" class="flex items-start gap-3 font-medium text-primary hover:underline">
          <ExternalLink class="mt-0.5 size-4 shrink-0" aria-hidden="true" /> Official LGU website
        </a>
      </div>
    </div>
  </section>

  <!-- Emergency -->
  <section class="container-page pb-4">
    <SectionHeading title="Emergency hotlines" description="Save these numbers before you need them." link-to="/contact" link-label="All contacts" />
    <HotlineList />
  </section>
</template>
