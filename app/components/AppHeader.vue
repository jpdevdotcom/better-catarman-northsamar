<script setup lang="ts">
import { Menu, Phone, Search } from '@lucide/vue'
import { hotlines, nav } from '~/data/site'

const { t } = useT()
const open = ref(false)
const barHotlines = hotlines.filter(h => h.short && h.numbers.length)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <!-- Hotline bar: one label, four numbers, tap to call. Scrolls sideways on narrow screens. -->
  <div class="bg-primary text-primary-foreground print:hidden">
    <div class="container-page flex h-9 items-center gap-3 text-[13px] sm:gap-5">
      <span class="flex shrink-0 items-center gap-2 font-semibold">
        <Phone class="size-3.5" aria-hidden="true" /> <span class="hidden sm:inline">{{ t('Hotlines') }}</span>
      </span>
      <ul class="flex flex-1 items-center divide-x divide-white/25 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [mask-image:linear-gradient(to_right,black_80%,transparent)] lg:[mask-image:none]" aria-label="Emergency hotlines">
        <li v-for="h in barHotlines" :key="h.name" class="px-4 first:pl-0">
          <a :href="`tel:${h.numbers[0]!.replace(/[^\d+]/g, '')}`" class="group flex items-baseline gap-2" :aria-label="`Call ${h.name}: ${h.numbers[0]}`">
            <span class="text-primary-foreground/70">{{ t(h.short!) }}</span>
            <span class="font-medium tabular-nums underline-offset-4 group-hover:underline">{{ h.numbers[0] }}</span>
          </a>
        </li>
      </ul>
      <NuxtLink to="/contact" class="hidden shrink-0 text-primary-foreground/80 underline-offset-4 hover:text-primary-foreground hover:underline xl:block">
        {{ t('All hotlines') }}
      </NuxtLink>
      <LanguageSwitch />
    </div>
  </div>

  <header class="sticky top-0 z-40 border-b bg-background print:hidden">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <AppLogo />

      <nav class="hidden items-stretch self-stretch xl:flex" aria-label="Main">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="-mb-px flex items-center whitespace-nowrap border-b-2 border-transparent px-2 text-sm font-medium 2xl:px-3 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          active-class="!border-primary !text-primary"
        >
          {{ t(item.label) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
      <Button as-child variant="outline" size="icon" class="shrink-0">
        <NuxtLink to="/search" :aria-label="t('Search the site')"><Search class="size-5" /></NuxtLink>
      </Button>
      <Sheet v-model:open="open">
        <SheetTrigger as-child>
          <Button variant="outline" size="icon" class="xl:hidden" aria-label="Open menu">
            <Menu class="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" class="w-72">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription class="sr-only">Site navigation</SheetDescription>
          </SheetHeader>
          <nav class="flex flex-col gap-1 px-4" aria-label="Mobile">
            <NuxtLink
              v-for="item in [{ label: 'Home', to: '/' }, ...nav]"
              :key="item.to"
              :to="item.to"
              class="rounded-md px-3 py-3 text-base font-medium hover:bg-accent"
              exact-active-class="bg-accent text-primary"
            >
              {{ t(item.label) }}
            </NuxtLink>
          </nav>
        </SheetContent>
      </Sheet>
      </div>
    </div>
  </header>
</template>
