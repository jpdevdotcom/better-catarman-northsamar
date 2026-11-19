<script setup lang="ts">
import { ChevronDown, Menu, Phone, Search } from '@lucide/vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { hotlines, mainNav, moreNav } from '~/data/site'

const { t } = useT()
const open = ref(false)
const barHotlines = hotlines.filter(h => h.short && h.numbers.length)
const route = useRoute()
watch(() => route.fullPath, () => {
  open.value = false
  // The menu disappears from under the mouse, so no "leave" event comes: reset by hand.
  moreOpen.value = false
  hovering = false
  onTrigger = false
})

// "More" opens when the mouse rests on it, and closes shortly after the mouse leaves both
// the button and the menu (the delay lets the mouse cross the gap between them).
// Touch and keyboard users still open it with a tap, Enter or Space, and close it with Escape.
const moreOpen = ref(false)
let hovering = false
let onTrigger = false
let closeTimer: ReturnType<typeof setTimeout> | undefined
function hoverIn(e: PointerEvent, trigger = false) {
  if (e.pointerType !== 'mouse') return
  hovering = true
  onTrigger = trigger
  clearTimeout(closeTimer)
  moreOpen.value = true
}
function hoverOut(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  hovering = false
  onTrigger = false
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => { if (!hovering) moreOpen.value = false }, 200)
}
// A click on "More" while the mouse is on it would otherwise close the menu the hover just opened.
function setMoreOpen(value: boolean) {
  if (!value && onTrigger) return
  moreOpen.value = value
}

// Underline "More" when the current page is one of the links inside it.
const inMore = computed(() => moreNav.some(i => route.path === i.to || route.path.startsWith(`${i.to}/`)))
const link = '-mb-px flex items-center whitespace-nowrap border-b-2 border-transparent px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground'
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

      <nav class="hidden items-stretch self-stretch lg:flex" aria-label="Main">
        <NuxtLink
          v-for="item in mainNav"
          :key="item.to"
          :to="item.to"
          :class="link"
          active-class="!border-primary !text-primary"
        >
          {{ t(item.label) }}
        </NuxtLink>
        <DropdownMenu :open="moreOpen" :modal="false" @update:open="setMoreOpen">
          <DropdownMenuTrigger
            :class="[link, 'gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:text-foreground', inMore && '!border-primary !text-primary']"
            @pointerenter="hoverIn($event, true)"
            @pointerleave="hoverOut"
          >
            {{ t('More') }} <ChevronDown class="size-3.5 transition-transform" :class="moreOpen && 'rotate-180'" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            :side-offset="0"
            class="min-w-60 border p-1"
            @pointerenter="hoverIn"
            @pointerleave="hoverOut"
          >
            <DropdownMenuItem v-for="item in moreNav" :key="item.to" as-child class="cursor-pointer px-3 py-2.5 text-sm">
              <NuxtLink :to="item.to" active-class="text-primary font-semibold">{{ t(item.label) }}</NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div class="flex items-center gap-2">
      <Button as-child variant="outline" size="icon" class="shrink-0">
        <NuxtLink to="/search" :aria-label="t('Search the site')"><Search class="size-5" /></NuxtLink>
      </Button>
      <Sheet v-model:open="open">
        <SheetTrigger as-child>
          <Button variant="outline" size="icon" class="lg:hidden" aria-label="Open menu">
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
              v-for="item in [{ label: 'Home', to: '/' }, ...mainNav]"
              :key="item.to"
              :to="item.to"
              class="px-3 py-3 text-base font-medium hover:bg-accent"
              exact-active-class="bg-accent text-primary"
            >
              {{ t(item.label) }}
            </NuxtLink>
            <p class="mt-3 border-t px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{{ t('More') }}</p>
            <NuxtLink
              v-for="item in moreNav"
              :key="item.to"
              :to="item.to"
              class="px-3 py-2.5 text-[15px] hover:bg-accent"
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
