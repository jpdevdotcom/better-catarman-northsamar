<script setup lang="ts">
import { ArrowRight, BadgeCheck, Building2 } from '@lucide/vue'
import { categories } from '~/data/site'

const route = useRoute()
const category = categories.find(c => c.slug === route.params.slug)

if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Service category not found', fatal: true })
}

useHead({ title: category.title })
useSeoMeta({ description: category.description })

const others = categories.filter(c => c.slug !== category.slug)
const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`
</script>

<template>
  <PageHeader
    :title="category!.title"
    :description="category!.description"
    :crumbs="[{ label: 'Services', to: '/services' }, { label: category!.short }]"
  />

  <div class="container-page grid gap-12 py-12 lg:grid-cols-[1fr_260px]">
    <div>
      <p class="mb-4 text-sm text-muted-foreground">
        {{ count(category!.services.length, 'service') }}. Select one to see its full requirements and how to apply.
      </p>
      <ul class="divide-y border">
        <li v-for="s in category!.services" :key="s.slug">
          <NuxtLink :to="`/services/${category!.slug}/${s.slug}`" class="group flex items-center gap-4 p-5 hover:bg-accent">
            <span class="min-w-0 flex-1">
              <span class="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span class="text-lg font-bold group-hover:text-primary">{{ s.name }}</span>
                <span v-if="s.official" class="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  <BadgeCheck class="size-3.5" aria-hidden="true" /> Official checklist
                </span>
                <span v-else-if="s.sources" class="text-xs font-medium text-muted-foreground">National rules</span>
              </span>
              <span class="mt-1 block text-sm text-muted-foreground">{{ s.description }}</span>
              <span class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-secondary-foreground">
                <span class="inline-flex items-center gap-1.5"><Building2 class="size-3.5" aria-hidden="true" /> {{ s.office }}</span>
                <span v-if="s.fee" class="tabular-nums">Fee: {{ s.fee.amount }}</span>
              </span>
            </span>
            <ArrowRight class="size-4 shrink-0 text-primary" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>
    </div>

    <aside>
      <h2 class="mb-3 text-sm font-semibold">Other services</h2>
      <ul class="space-y-1 text-sm">
        <li v-for="c in others" :key="c.slug">
          <NuxtLink :to="`/services/${c.slug}`" class="flex items-center gap-2.5 px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <component :is="c.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" /> {{ c.short }}
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </div>
</template>
