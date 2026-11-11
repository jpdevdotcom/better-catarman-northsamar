<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'

interface Crumb { label: string, to?: string }

const props = defineProps<{
  title: string
  description?: string
  crumbs?: Crumb[]
}>()

const trail = computed<Crumb[]>(() => props.crumbs ?? [{ label: props.title }])
</script>

<template>
  <div class="border-b bg-muted">
    <div class="container-page py-10 sm:py-14">
      <nav aria-label="Breadcrumb" class="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
        <template v-for="c in trail" :key="c.label">
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <NuxtLink v-if="c.to" :to="c.to" class="hover:text-primary">{{ c.label }}</NuxtLink>
          <span v-else class="text-foreground" aria-current="page">{{ c.label }}</span>
        </template>
      </nav>
      <h1 class="text-3xl font-bold sm:text-4xl">{{ title }}</h1>
      <p v-if="description" class="mt-3 max-w-2xl text-lg text-muted-foreground">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>
