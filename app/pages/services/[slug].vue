<script setup lang="ts">
import { Building2, Check, Info } from '@lucide/vue'
import { categories } from '~/data/site'

const route = useRoute()
const category = categories.find(c => c.slug === route.params.slug)

if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Service category not found', fatal: true })
}

useHead({ title: category.title })
useSeoMeta({ description: category.description })

const others = categories.filter(c => c.slug !== category.slug)
</script>

<template>
  <PageHeader
    :title="category!.title"
    :description="category!.description"
    :crumbs="[{ label: 'Services', to: '/services' }, { label: category!.short }]"
  />

  <div class="container-page grid gap-12 py-12 lg:grid-cols-[1fr_260px]">
    <div class="space-y-5">
      <article
        v-for="s in category!.services"
        :id="slugify(s.name)"
        :key="s.name"
        class="scroll-mt-24 rounded-lg border p-6 target:border-primary"
      >
        <h2 class="text-xl font-bold">{{ s.name }}</h2>
        <p class="mt-2 text-muted-foreground">{{ s.description }}</p>

        <p class="mt-4 inline-flex items-start gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground">
          <Building2 class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span><span class="sr-only">Where to go: </span>{{ s.office }}</span>
        </p>

        <h3 class="mt-5 text-sm font-semibold">What to bring</h3>
        <ul class="mt-2 space-y-2">
          <li v-for="r in s.requirements" :key="r" class="flex items-start gap-2.5 text-sm">
            <Check class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> {{ r }}
          </li>
        </ul>
      </article>

      <p class="flex items-start gap-3 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        Requirements and fees can change. Please confirm with the office before you go.
      </p>
    </div>

    <aside>
      <h2 class="mb-3 text-sm font-semibold">Other services</h2>
      <ul class="space-y-1 text-sm">
        <li v-for="c in others" :key="c.slug">
          <NuxtLink :to="`/services/${c.slug}`" class="flex items-center gap-2.5 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <component :is="c.icon" class="size-4 shrink-0 text-primary" aria-hidden="true" /> {{ c.short }}
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </div>
</template>
