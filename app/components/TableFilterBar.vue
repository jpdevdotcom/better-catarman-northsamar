<script setup lang="ts">
import { Search, X } from '@lucide/vue'

const props = defineProps<{
  barangayOptions?: string[]
  matched: number
  total: number
  placeholder?: string
}>()
const query = defineModel<string>('query', { required: true })
const barangay = defineModel<string>('barangay', { default: '' })
const { t } = useT()

const ALL = '__all__'
const selected = computed({
  get: () => barangay.value || ALL,
  set: (v: string) => { barangay.value = v === ALL ? '' : v },
})
const filtering = computed(() => query.value !== '' || barangay.value !== '')
const clear = () => { query.value = ''; barangay.value = '' }
const id = useId()
</script>

<template>
  <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
    <label class="relative flex-1">
      <span class="sr-only">{{ t('Search projects') }}</span>
      <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input
        v-model="query"
        type="search"
        :placeholder="t(placeholder ?? 'Search projects')"
        class="h-10 bg-background pl-9 focus-visible:border-primary focus-visible:ring-primary/30"
      />
    </label>
    <div v-if="props.barangayOptions?.length" class="sm:w-56">
      <label :for="id" class="sr-only">{{ t('Barangay') }}</label>
      <Select v-model="selected">
        <SelectTrigger :id="id" class="h-10! w-full bg-background shadow-none focus-visible:border-primary focus-visible:ring-primary/30">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="ALL">{{ t('All barangays') }}</SelectItem>
          <SelectItem v-for="b in props.barangayOptions" :key="b" :value="b">{{ b }}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
  <p class="mb-3 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground" aria-live="polite">
    <span v-if="filtering">{{ t('{n} of {total} projects match', { n: matched, total }) }}</span>
    <Button v-if="filtering" variant="link" size="sm" class="h-auto gap-1 p-0" @click="clear">
      <X class="size-3.5" aria-hidden="true" /> {{ t('Clear filters') }}
    </Button>
  </p>
</template>
