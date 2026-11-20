import type { MaybeRefOrGetter } from 'vue'

export function useTableFilter<T>(rows: MaybeRefOrGetter<T[]>, text: (row: T) => string, pageSize = 10) {
  const query = ref('')
  const barangay = ref('')
  const page = ref(1)

  const indexed = computed(() => toValue(rows).map((row) => {
    const t = text(row)
    return { row, folded: foldText(t), barangays: barangaysIn(t) }
  }))
  const barangayOptions = computed(() => [...new Set(indexed.value.flatMap(r => r.barangays))].sort())

  const filtered = computed(() => {
    const words = foldText(query.value).split(/\s+/).filter(Boolean)
    return indexed.value
      .filter(r => (!barangay.value || r.barangays.includes(barangay.value)) && words.every(w => r.folded.includes(w)))
      .map(r => r.row)
  })

  const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
  const pageRows = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))
  const from = computed(() => (filtered.value.length ? (page.value - 1) * pageSize + 1 : 0))
  const to = computed(() => Math.min(page.value * pageSize, filtered.value.length))

  watch([query, barangay, () => toValue(rows)], () => { page.value = 1 })
  watch(barangayOptions, (options) => {
    if (barangay.value && !options.includes(barangay.value)) barangay.value = ''
  })

  const reset = () => { query.value = ''; barangay.value = '' }

  return { query, barangay, barangayOptions, filtered, page, pageCount, pageRows, from, to, total: computed(() => indexed.value.length), reset }
}
