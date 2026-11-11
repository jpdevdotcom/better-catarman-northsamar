<script setup lang="ts">
import { Menu, Phone } from '@lucide/vue'
import { nav } from '~/data/site'

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <div class="bg-primary text-primary-foreground">
    <div class="container-page flex h-9 items-center justify-between text-xs sm:text-sm">
      <span class="truncate">Community guide to Catarman, Northern Samar</span>
      <a href="tel:911" class="flex shrink-0 items-center gap-1.5 font-semibold underline-offset-4 hover:underline">
        <Phone class="size-3.5" aria-hidden="true" /> Emergency: 911
      </a>
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
