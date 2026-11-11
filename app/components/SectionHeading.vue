<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'

defineProps<{ title: string; description?: string; linkTo?: string; linkLabel?: string }>()
</script>

<template>
  <div class="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
    <div>
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <p v-if="description" class="mt-1 text-muted-foreground">{{ description }}</p>
    </div>
    <NuxtLink v-if="linkTo" :to="linkTo" class="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
      {{ linkLabel }} <ArrowRight class="size-4" aria-hidden="true" />
    </NuxtLink>
  </div>
</template>
