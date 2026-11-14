<script setup lang="ts">
import { ArrowRight, Search, SearchX } from '@lucide/vue'
import type { ResultType } from '~/utils/search'
import { search } from '~/utils/search'

const { t } = useT()
const route = useRoute()

useHead({ title: 'Search' })
useSeoMeta({ description: 'Search services, barangays, offices, officials, schools, and health facilities in Catarman, Northern Samar.' })

const q = ref(typeof route.query.q === 'string' ? route.query.q : '')
watch(() => route.query.q, v => (q.value = typeof v === 'string' ? v : ''))

// Keep the address in step with the box, so a search can be shared or bookmarked.
let timer: ReturnType<typeof setTimeout> | undefined
watch(q, (v) => {
  clearTimeout(timer)
  timer = setTimeout(() => navigateTo({ query: v.trim() ? { q: v.trim() } : {} }, { replace: true }), 300)
})

const results = computed(() => search(q.value))

const LABELS: Record<ResultType, string> = {
  page: 'Pages', service: 'Services', barangay: 'Barangays', office: 'Offices', hotline: 'Hotlines',
  facility: 'Schools and health facilities', official: 'Officials', faq: 'Frequently asked questions',
}
const ORDER: ResultType[] = ['page', 'service', 'barangay', 'office', 'hotline', 'facility', 'official', 'faq']
const PER_GROUP = 8
const expanded = ref<Partial<Record<ResultType, boolean>>>({})
watch(q, () => (expanded.value = {}))

const groups = computed(() => ORDER
  .map(type => ({ type, label: LABELS[type], items: results.value.filter(r => r.type === type) }))
  .filter(g => g.items.length))

const examples = ['cedula', 'Cawayan', 'business permit', 'MDRRMO', 'hospital', 'senior citizen']
</script>

<template>
  <PageHeader title="Search" description="Services, barangays, offices, officials, schools, and health facilities, all in one place.">
    <form role="search" class="mt-6 max-w-2xl" @submit.prevent>
      <div class="relative">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          v-model="q"
          type="search"
          autofocus
          :aria-label="t('Search the site')"
          :placeholder="t('Try “cedula”, a barangay, or a name')"
          class="h-12 bg-background pl-11 text-base md:text-base"
        />
      </div>
    </form>
  </PageHeader>

  <div class="container-page py-10">
    <div v-if="!q.trim()">
      <p class="mb-3 text-sm text-muted-foreground">{{ t('Try one of these:') }}</p>
      <div class="flex flex-wrap gap-2">
        <button v-for="e in examples" :key="e" type="button" class="border px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:border-primary hover:bg-accent" @click="q = e">
          {{ e }}
        </button>
      </div>
    </div>

    <div v-else-if="!results.length" class="border border-dashed px-6 py-12 text-center">
      <SearchX class="mx-auto size-8 text-muted-foreground" aria-hidden="true" />
      <p class="mt-3 font-semibold">{{ t('No results for') }} “{{ q }}”</p>
      <p class="mt-1 text-sm text-muted-foreground">{{ t('Check the spelling, or try a shorter word.') }}</p>
    </div>

    <div v-else class="space-y-8" aria-live="polite">
      <p class="text-sm text-muted-foreground">{{ results.length }} {{ t(results.length === 1 ? 'result' : 'results') }}</p>
      <section v-for="g in groups" :key="g.type">
        <h2 class="mb-2 text-sm font-semibold text-muted-foreground">{{ t(g.label) }} <span class="tabular-nums">({{ g.items.length }})</span></h2>
        <ul class="divide-y border">
          <li v-for="r in (expanded[g.type] ? g.items : g.items.slice(0, PER_GROUP))" :key="r.type + r.to + r.title">
            <NuxtLink :to="r.to" class="group flex items-center justify-between gap-4 px-4 py-3 hover:bg-accent">
              <span class="min-w-0">
                <span class="block font-semibold leading-snug group-hover:text-primary">{{ r.title }}</span>
                <span class="block text-sm text-muted-foreground">{{ r.detail }}</span>
              </span>
              <ArrowRight class="size-4 shrink-0 text-primary" aria-hidden="true" />
            </NuxtLink>
          </li>
        </ul>
        <button
          v-if="g.items.length > PER_GROUP && !expanded[g.type]"
          type="button"
          class="mt-2 text-sm font-semibold text-primary hover:underline"
          @click="expanded[g.type] = true"
        >
          {{ t('Show all') }} {{ g.items.length }}
        </button>
      </section>
    </div>
  </div>
</template>
