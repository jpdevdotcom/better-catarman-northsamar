<script setup lang="ts">
import { BadgeCheck, Building2, Download, ExternalLink, Info, Mail, Phone, RotateCcw, Scale, UserRound } from '@lucide/vue'
import { offices } from '~/data/government'
import { categories } from '~/data/site'

const route = useRoute()
const category = categories.find(c => c.slug === route.params.slug)
const service = category?.services.find(s => s.slug === route.params.service)

if (!category || !service) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}

useHead({ title: service.name })
useSeoMeta({ description: `${service.description} Requirements and how to apply in Catarman, Northern Samar.` })

const office = offices.find(o => o.short === service.officeShort)
const siblings = category.services.filter(s => s.slug !== service.slug)
const listLabel = service.listLabel ?? 'Requirements checklist'

// Tick-off state, kept only for this visit so residents can track what they have ready.
const checked = ref<Record<string, boolean>>({})
const total = service.groups.reduce((n, g) => n + g.items.length, 0)
const done = computed(() => Object.values(checked.value).filter(Boolean).length)
const key = (g: number, i: number) => `${g}-${i}`
</script>

<template>
  <PageHeader
    :title="service!.name"
    :description="service!.description"
    :crumbs="[{ label: 'Services', to: '/services' }, { label: category!.short, to: `/services/${category!.slug}` }, { label: service!.name }]"
  >
    <p class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
      <span class="inline-flex items-center gap-2"><Building2 class="size-4 text-primary" aria-hidden="true" /> {{ service!.office }}</span>
      <span v-if="service!.official" class="inline-flex items-center gap-1.5 text-primary">
        <BadgeCheck class="size-4" aria-hidden="true" /> From the official municipal checklist
      </span>
      <span v-else-if="service!.sources" class="inline-flex items-center gap-1.5 text-muted-foreground">
        <Scale class="size-4" aria-hidden="true" /> Based on national rules
      </span>
    </p>
  </PageHeader>

  <div class="container-page grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
    <div class="space-y-12">
      <!-- Requirements -->
      <section aria-labelledby="requirements">
        <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="requirements" class="text-2xl font-bold">{{ listLabel }}</h2>
            <p class="mt-1 text-sm text-muted-foreground">
              Tick each item as you get it ready.
              <template v-if="service!.groups.length > 1">Only the sections that match your situation apply to you.</template>
            </p>
          </div>
          <div class="flex items-center gap-3 text-sm" aria-live="polite">
            <span class="font-semibold tabular-nums">{{ done }} of {{ total }} ticked</span>
            <Button v-if="done" variant="outline" size="sm" @click="checked = {}">
              <RotateCcw class="size-3.5" aria-hidden="true" /> Clear
            </Button>
          </div>
        </div>

        <div class="space-y-5">
          <div v-for="(g, gi) in service!.groups" :key="gi" class="border">
            <h3 v-if="g.title" class="border-b bg-muted px-5 py-3 text-sm font-bold">{{ g.title }}</h3>
            <ul class="divide-y">
              <li v-for="(item, ii) in g.items" :key="ii">
                <label class="flex cursor-pointer items-start gap-3.5 px-5 py-4 hover:bg-accent">
                  <input v-model="checked[key(gi, ii)]" type="checkbox" class="mt-0.5 size-5 shrink-0 accent-primary">
                  <span class="min-w-0 flex-1">
                    <span class="font-medium" :class="checked[key(gi, ii)] && 'text-muted-foreground line-through'">{{ item.text }}</span>
                    <span v-if="item.where" class="mt-1 block text-sm text-secondary-foreground">
                      <span class="text-muted-foreground">Where to get it:</span> {{ item.where }}
                    </span>
                    <ul v-if="item.sub" class="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-primary">
                      <li v-for="s in item.sub" :key="s">{{ s }}</li>
                    </ul>
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <ul v-if="service!.notes" class="mt-5 space-y-2 bg-muted p-4 text-sm">
          <li v-for="n in service!.notes" :key="n" class="flex items-start gap-3">
            <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> {{ n }}
          </li>
        </ul>
      </section>

      <!-- Steps -->
      <section v-if="service!.steps" aria-labelledby="steps">
        <h2 id="steps" class="mb-5 text-2xl font-bold">How to apply</h2>
        <ol class="space-y-4">
          <li v-for="(step, i) in service!.steps" :key="i" class="flex items-start gap-4">
            <span class="grid size-8 shrink-0 place-items-center bg-primary text-sm font-bold text-primary-foreground">{{ i + 1 }}</span>
            <p class="pt-1">{{ step }}</p>
          </li>
        </ol>
      </section>

      <div v-if="!service!.official" class="flex items-start gap-3 border border-dashed p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <div v-if="service!.sources">
          <p>
            The municipal government has not published its own checklist for this service. These details come from the national rules below, so the office in Catarman may ask for something more. Please confirm before you go.
          </p>
          <ul class="mt-2 space-y-1">
            <li v-for="src in service!.sources" :key="src.label">
              <a v-if="src.url" :href="src.url" target="_blank" rel="noopener" class="inline-flex items-start gap-1 font-medium text-primary hover:underline">
                {{ src.label }} <ExternalLink class="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              </a>
              <span v-else class="font-medium text-foreground">{{ src.label }}</span>
            </li>
            <li><NuxtLink to="/about" class="font-medium text-primary hover:underline">See all sources used on this site</NuxtLink></li>
          </ul>
        </div>
        <p v-else>
          This is general guidance based on the usual requirements, not an official checklist from the municipal government. Please confirm with the office before you go.
        </p>
      </div>
    </div>

    <!-- Sidebar -->
    <aside class="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <div v-if="service!.official" class="space-y-2">
        <Button as-child size="lg" class="h-12 w-full">
          <a :href="service!.official.page" target="_blank" rel="noopener">
            Apply online <ExternalLink class="size-4" aria-hidden="true" />
          </a>
        </Button>
        <Button v-for="c in service!.official.checklists" :key="c.url" as-child variant="outline" class="h-11 w-full">
          <a :href="c.url" target="_blank" rel="noopener"><Download class="size-4" aria-hidden="true" /> {{ c.label }}</a>
        </Button>
        <p class="text-xs text-muted-foreground">
          Both open the municipal government’s site, catarman.gov.ph.
          <NuxtLink to="/about" class="font-medium text-primary hover:underline">All sources</NuxtLink>
        </p>
      </div>

      <div v-if="service!.fee" class="border p-5">
        <h2 class="text-xs font-bold uppercase tracking-wider text-primary">Fee</h2>
        <p class="mt-1 text-2xl font-bold tabular-nums">{{ service!.fee.amount }}</p>
        <p class="mt-2 text-xs text-muted-foreground">{{ service!.fee.basis }}</p>
      </div>

      <div class="border p-5">
        <h2 class="text-xs font-bold uppercase tracking-wider text-primary">Where to go</h2>
        <p class="mt-1 font-semibold leading-snug">{{ service!.office }}</p>
        <ul v-if="office" class="mt-4 space-y-2.5 border-t pt-4 text-sm">
          <li v-if="office.head" class="flex items-start gap-2.5">
            <UserRound class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> <span class="font-medium">{{ office.head }}</span>
          </li>
          <li class="flex items-start gap-2.5">
            <Phone class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> <PhoneList :phones="office.phones" />
          </li>
          <li class="flex items-start gap-2.5">
            <Mail class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <a v-if="office.email" :href="`mailto:${office.email}`" class="break-all font-medium hover:text-primary">{{ office.email }}</a>
            <span v-else class="text-muted-foreground">N/A</span>
          </li>
        </ul>
      </div>

      <div v-if="siblings.length">
        <h2 class="mb-2 text-sm font-semibold">More in {{ category!.short }}</h2>
        <ul class="space-y-1 text-sm">
          <li v-for="s in siblings" :key="s.slug">
            <NuxtLink :to="`/services/${category!.slug}/${s.slug}`" class="block px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              {{ s.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
