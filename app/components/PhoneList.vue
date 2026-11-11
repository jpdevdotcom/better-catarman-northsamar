<script setup lang="ts">
/** One number per line, each tagged Landline or Mobile. Shows "N/A" when there is none. */
const props = defineProps<{ phones: string[] }>()

const rows = computed(() => props.phones.map(p => ({
  number: p,
  type: p.replace(/\D/g, '').startsWith('09') ? 'Mobile' : 'Landline',
  href: `tel:${p.replace(/[^\d+]/g, '')}`,
})))
</script>

<template>
  <ul v-if="rows.length" class="space-y-1">
    <li v-for="r in rows" :key="r.number" class="grid grid-cols-[4.25rem_1fr] items-baseline gap-2">
      <span class="text-xs text-muted-foreground">{{ r.type }}</span>
      <a :href="r.href" class="whitespace-nowrap font-medium tabular-nums hover:text-primary">{{ r.number }}</a>
    </li>
  </ul>
  <span v-else class="text-muted-foreground">N/A</span>
</template>
