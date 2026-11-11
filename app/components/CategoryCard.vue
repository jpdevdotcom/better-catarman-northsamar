<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import type { Category } from '~/data/site'

defineProps<{ category: Category }>()
</script>

<template>
  <NuxtLink
    :to="`/services/${category.slug}`"
    class="group flex h-full gap-4 rounded-lg border bg-card p-5 transition-colors hover:border-primary hover:bg-accent"
  >
    <span class="grid size-11 shrink-0 place-items-center rounded-md bg-secondary text-primary group-hover:bg-background">
      <component :is="category.icon" class="size-5" aria-hidden="true" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="flex items-center justify-between gap-2 font-semibold">
        {{ category.title }}
        <ArrowRight class="size-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      </span>
      <span class="mt-1 block text-sm text-muted-foreground">{{ category.description }}</span>
    </span>
  </NuxtLink>
</template>
