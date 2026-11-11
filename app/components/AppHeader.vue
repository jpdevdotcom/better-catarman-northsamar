<script setup lang="ts">
import { Menu, Phone } from '@lucide/vue'
import { hotlines, nav } from '~/data/site'

const open = ref(false)
const barHotlines = hotlines.filter(h => h.short && h.numbers.length)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <!-- Hotline bar: one label, four numbers, tap to call. Scrolls sideways on narrow screens. -->
  <div class="bg-primary text-primary-foreground">
    <div class="container-page flex h-9 items-center gap-5 text-[13px]">
      <span class="flex shrink-0 items-center gap-2 font-semibold">
        <Phone class="size-3.5" aria-hidden="true" /> Hotlines
      </span>
      <ul class="flex flex-1 items-center divide-x divide-white/25 overflow-x-auto whitespace-nowrap [scrollbar-width:none]" aria-label="Emergency hotlines">
        <li v-for="h in barHotlines" :key="h.name" class="px-4 first:pl-0">
          <a :href="`tel:${h.numbers[0]!.replace(/[^\d+]/g, '')}`" class="group flex items-baseline gap-2" :aria-label="`Call ${h.name}: ${h.numbers[0]}`">
            <span class="text-primary-foreground/70">{{ h.short }}</span>
            <span class="font-medium tabular-nums underline-offset-4 group-hover:underline">{{ h.numbers[0] }}</span>
          </a>
        </li>
      </ul>
      <NuxtLink to="/contact" class="hidden shrink-0 text-primary-foreground/80 underline-offset-4 hover:text-primary-foreground hover:underline lg:block">
        All hotlines
      </NuxtLink>
    </div>
  </div>

  <header class="sticky top-0 z-40 border-b bg-background">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <AppLogo />

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Main">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          active-class="!text-primary bg-accent"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

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
              v-for="item in [{ label: 'Home', to: '/' }, ...nav]"
              :key="item.to"
              :to="item.to"
              class="rounded-md px-3 py-3 text-base font-medium hover:bg-accent"
              exact-active-class="bg-accent text-primary"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </header>
</template>
