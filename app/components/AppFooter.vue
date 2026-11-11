<script setup lang="ts">
import { categories, nav, site, transparencyLinks } from '~/data/site'
</script>

<template>
  <footer class="mt-20 border-t bg-muted">
    <div class="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div class="space-y-3">
        <AppLogo />
        <p class="text-sm text-muted-foreground">
          A community-run guide to government services in {{ site.municipality }}, {{ site.province }}.
          Not the official website of the municipal government.
        </p>
      </div>

      <div>
        <h2 class="mb-3 text-sm font-semibold">Services</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="c in categories.slice(0, 6)" :key="c.slug">
            <NuxtLink :to="`/services/${c.slug}`" class="text-muted-foreground hover:text-primary">{{ c.short }}</NuxtLink>
          </li>
          <li><NuxtLink to="/services" class="font-medium text-primary hover:underline">All services</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h2 class="mb-3 text-sm font-semibold">Explore</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink :to="item.to" class="text-muted-foreground hover:text-primary">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="mb-3 text-sm font-semibold">Government links</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="l in transparencyLinks.slice(0, 4)" :key="l.href">
            <a :href="l.href" target="_blank" rel="noopener" class="text-muted-foreground hover:text-primary">{{ l.label }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t">
      <div class="container-page py-5 text-xs text-muted-foreground">
        © {{ new Date().getFullYear() }} BetterCatarman. Information is provided for public reference; always confirm with the office concerned.
        <NuxtLink to="/about" class="font-semibold text-primary hover:underline">See where our information comes from</NuxtLink>
      </div>
    </div>
  </footer>
</template>
