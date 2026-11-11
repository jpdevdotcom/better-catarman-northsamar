<script setup lang="ts">
import { Phone } from '@lucide/vue'
import { hotlines, hotlineSource } from '~/data/site'
</script>

<template>
  <div>
  <ul class="divide-y border">
    <li v-for="h in hotlines" :key="h.name" class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="min-w-0">
        <p class="font-medium">{{ h.name }}</p>
        <p class="text-sm text-muted-foreground">{{ h.note }}</p>
      </div>
      <div v-if="h.numbers.length" class="flex shrink-0 flex-wrap gap-2">
        <a
          v-for="n in h.numbers"
          :key="n"
          :href="`tel:${n.replace(/[^\d+]/g, '')}`"
          class="inline-flex items-center gap-2 bg-primary px-4 py-2 text-base font-bold tabular-nums text-primary-foreground hover:bg-primary/90"
        >
          <Phone class="size-4" aria-hidden="true" /> {{ n }}
        </a>
      </div>
      <span v-else class="shrink-0 text-sm text-muted-foreground">N/A</span>
    </li>
  </ul>
  <p class="mt-3 text-sm text-muted-foreground">
    Local numbers are from the
    <a :href="hotlineSource.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">{{ hotlineSource.label }}</a>
    and the municipal and provincial governments.
    <NuxtLink to="/about#sources" class="font-medium text-primary hover:underline">About the data</NuxtLink>
  </p>
  </div>
</template>
