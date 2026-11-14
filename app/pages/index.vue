<script setup lang="ts">
import { ArrowRight, ChartColumn, Clock, ExternalLink, GraduationCap, Landmark, MapPin, Scale } from '@lucide/vue'
import { financeYears } from '~/data/finances'
import { notices } from '~/data/notices'
import { categories, glance, history, officials, popularSearches, popularSlugs, site } from '~/data/site'

useHead({ title: 'Welcome to BetterCatarman.org', titleTemplate: '%s · Catarman, Northern Samar' })
useSeoMeta({
  description: 'Requirements, offices, barangays, and public records for Catarman, Northern Samar, gathered in one simple place.',
})

const { t } = useT()

const explore = [
  { to: '/barangays', icon: MapPin, title: 'Barangays', text: `All ${glance.find(g => g.label === 'Barangays')!.value}, with officials and population` },
  { to: '/facilities', icon: GraduationCap, title: 'Schools and health facilities', text: 'Hospitals, health centers, and schools on a map' },
  { to: '/government', icon: Landmark, title: 'Government', text: 'Mayor, council, and municipal offices' },
  { to: '/statistics', icon: ChartColumn, title: 'Statistics', text: 'Population, census history, land area' },
  { to: '/transparency', icon: Scale, title: 'Transparency', text: `Audited finances, ${financeYears[financeYears.length - 1]!.year} to ${financeYears[0]!.year}` },
]

const latestNotices = notices.filter(n => n.kind === 'reminder').concat(notices.filter(n => n.kind === 'site')).slice(0, 3)
const popular = popularSlugs.map(s => categories.find(c => c.slug === s)!)
</script>

<template>
  <!-- Hero -->
  <section class="border-b">
    <div class="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12">
      <div class="lg:col-span-7">
      <p class="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <MapPin class="size-4" aria-hidden="true" /> {{ site.municipality }}, {{ site.province }}
      </p>
      <h1 class="max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
        {{ t('Welcome to') }} <span class="text-primary">BetterCatarman.org</span>
      </h1>
      <p class="mt-5 max-w-2xl text-lg text-muted-foreground">
        {{ t('Requirements, offices, barangays, and public records for every Catarmananon, gathered in one simple place.') }}
      </p>

      <div class="mt-8 max-w-2xl">
        <ServiceSearch to="/search" placeholder="Search services, barangays, offices, or names" />
        <div class="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span class="text-muted-foreground">{{ t('Popular:') }}</span>
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

      <nav aria-labelledby="explore-heading" class="lg:col-span-5">
        <h2 id="explore-heading" class="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{{ t('More than services') }}</h2>
        <ul class="divide-y border">
          <li v-for="e in explore" :key="e.to">
            <NuxtLink :to="e.to" class="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-accent">
              <span class="grid size-9 shrink-0 place-items-center bg-secondary text-primary group-hover:bg-background">
                <component :is="e.icon" class="size-4" aria-hidden="true" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-semibold leading-snug">{{ t(e.title) }}</span>
                <span class="block text-sm leading-snug text-muted-foreground">{{ t(e.text) }}</span>
              </span>
              <ArrowRight class="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </NuxtLink>
          </li>
        </ul>
      </nav>
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

  <!-- Weather and notices -->
  <section class="container-page pb-14">
    <SectionHeading
      title="Weather and advisories"
      description="Today’s weather in Catarman, and notices worth knowing."
      link-to="/advisories"
      link-label="All advisories"
    />
    <div class="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <WeatherPanel compact />
      <ul class="divide-y border">
        <li v-for="n in latestNotices" :key="n.title">
          <NuxtLink :to="n.to ?? '/advisories#notices'" class="block px-5 py-3.5 hover:bg-accent">
            <span class="block text-xs font-bold uppercase tracking-wider text-primary">{{ t(n.kind === 'reminder' ? 'Reminder' : 'Site update') }}</span>
            <span class="mt-0.5 block font-semibold leading-snug">{{ n.title }}</span>
            <span v-if="n.due" class="block text-sm text-muted-foreground">{{ n.due }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>

  <!-- At a glance -->
  <section class="bg-primary text-primary-foreground">
    <div class="container-page py-14">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 class="text-2xl font-bold">{{ t('Catarman at a glance') }}</h2>
        <NuxtLink to="/statistics" class="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
          {{ t('View statistics') }} <ArrowRight class="size-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/25 bg-white/25 lg:grid-cols-4">
        <div v-for="g in glance" :key="g.label" class="flex flex-col-reverse gap-1 bg-primary p-6">
          <dt>
            <span class="block font-medium">{{ t(g.label) }}</span>
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
          <ExternalLink class="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {{ t('Official LGU website') }}
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
