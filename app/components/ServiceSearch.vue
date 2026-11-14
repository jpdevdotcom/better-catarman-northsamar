<script setup lang="ts">
import { Search } from '@lucide/vue'

const props = withDefaults(defineProps<{ initial?: string, to?: string, placeholder?: string }>(), { to: '/services', placeholder: 'What do you need? e.g. birth certificate' })
const q = ref(props.initial ?? '')
const { t } = useT()

function submit() {
  navigateTo({ path: props.to, query: q.value.trim() ? { q: q.value.trim() } : {} })
}
</script>

<template>
  <form role="search" class="flex flex-col gap-2 sm:flex-row" @submit.prevent="submit">
    <div class="relative flex-1">
      <Search class="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input
        v-model="q"
        type="search"
        :aria-label="t('Search services')"
        :placeholder="t(placeholder)"
        class="h-12 bg-background pl-11 text-base md:text-base"
      />
    </div>
    <Button type="submit" size="lg" class="h-12 px-6">{{ t('Search') }}</Button>
  </form>
</template>
