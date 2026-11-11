<script setup lang="ts">
import { Phone } from '@lucide/vue'
import { hotlines } from '~/data/site'
</script>

<template>
  <ul class="divide-y rounded-lg border">
    <li v-for="h in hotlines" :key="h.name" class="flex items-center justify-between gap-4 px-5 py-4">
      <div class="min-w-0">
        <p class="font-medium">{{ h.name }}</p>
        <p class="text-sm text-muted-foreground">{{ h.note }}</p>
      </div>
      <a
        v-if="h.number"
        :href="`tel:${h.number}`"
        class="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-base font-bold text-primary-foreground hover:bg-primary/90"
      >
        <Phone class="size-4" aria-hidden="true" /> {{ h.number }}
      </a>
      <span v-else class="shrink-0 text-sm text-muted-foreground">Number to be confirmed</span>
    </li>
  </ul>
</template>
