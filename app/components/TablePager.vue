<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = defineProps<{ pageCount: number, from: number, to: number, count: number }>()
const page = defineModel<number>('page', { required: true })
const { t } = useT()

const pages = computed<(number | '…')[]>(() => {
  const n = props.pageCount
  if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1)
  const near = [...new Set([1, page.value - 1, page.value, page.value + 1, n])].filter(p => p >= 1 && p <= n).sort((a, b) => a - b)
  return near.flatMap((p, i) => (i && p - near[i - 1]! > 1 ? ['…' as const, p] : [p]))
})

const root = ref<HTMLElement>()
function go(p: number) {
  page.value = p
  const table = root.value?.previousElementSibling
  if (!table) return
  const top = table.getBoundingClientRect().top
  if (top >= 96) return
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: top + window.scrollY - 96, behavior: smooth ? 'smooth' : 'auto' })
}

const square = 'size-9 border hover:border-primary hover:bg-transparent disabled:opacity-40'
</script>

<template>
  <div v-if="count > 0" ref="root" class="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
    <p class="text-muted-foreground">{{ t('Showing {from}–{to} of {count}', { from, to, count }) }}</p>
    <Pagination
      v-if="pageCount > 1"
      :page="page"
      @update:page="go"
      :total="pageCount"
      :items-per-page="1"
      :aria-label="t('Pages')"
      class="mx-0 w-auto"
    >
      <PaginationContent class="gap-1">
        <PaginationPrevious size="icon" :class="square">
          <ChevronLeft class="size-4" aria-hidden="true" /><span class="sr-only">{{ t('Previous page') }}</span>
        </PaginationPrevious>
        <template v-for="(p, i) in pages" :key="i">
          <PaginationEllipsis v-if="p === '…'" :index="i" class="w-auto px-1 text-muted-foreground">…</PaginationEllipsis>
          <PaginationItem
            v-else
            :value="p"
            :is-active="p === page"
            class="tabular-nums"
            :class="[square, p === page && 'border-primary bg-primary font-semibold text-primary-foreground hover:bg-primary hover:text-primary-foreground']"
          >{{ p }}</PaginationItem>
        </template>
        <PaginationNext size="icon" :class="square">
          <ChevronRight class="size-4" aria-hidden="true" /><span class="sr-only">{{ t('Next page') }}</span>
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  </div>
</template>
