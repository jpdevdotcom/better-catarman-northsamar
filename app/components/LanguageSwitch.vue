<script setup lang="ts">
import { ChevronDown, Globe } from '@lucide/vue'
// Imported directly rather than relying on auto-import, so a running dev server that
// started before this component existed still renders it.
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import type { Locale } from '~/composables/useT'
import { locales } from '~/composables/useT'

const { locale, setLocale, t } = useT()

const current = computed(() => locales.find(l => l.code === locale.value)!)
const choice = computed({
  get: () => locale.value,
  set: (v: string) => setLocale(v as Locale),
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="flex shrink-0 items-center gap-1 px-1.5 py-1 sm:gap-1.5 sm:px-2 text-[13px] font-semibold text-primary-foreground outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary-foreground/60 data-[state=open]:bg-white/15"
      :aria-label="`${t('Language')}: ${current.label}`"
    >
      <Globe class="hidden size-3.5 sm:block" aria-hidden="true" />
      <span :lang="current.htmlLang" class="hidden sm:inline">{{ current.label }}</span>
      <span :lang="current.htmlLang" class="sm:hidden">{{ current.short }}</span>
      <ChevronDown class="size-3 opacity-80 sm:size-3.5" aria-hidden="true" />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" :side-offset="6" class="min-w-44 border">
      <DropdownMenuLabel class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {{ t('Language') }}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="choice">
        <DropdownMenuRadioItem
          v-for="l in locales"
          :key="l.code"
          :value="l.code"
          :lang="l.htmlLang"
          class="cursor-pointer py-2 text-sm"
        >
          {{ l.label }}
          <span v-if="l.code === 'war'" class="ml-auto text-xs text-muted-foreground">beta</span>
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
