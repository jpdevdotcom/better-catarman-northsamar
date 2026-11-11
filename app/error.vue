<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
useHead({ title: is404.value ? 'Page not found' : 'Something went wrong' })
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main class="container-page flex-1 py-24 text-center">
      <p class="text-sm font-bold text-primary">{{ error.statusCode }}</p>
      <h1 class="mt-2 text-3xl font-bold sm:text-4xl">{{ is404 ? 'We couldn’t find that page' : 'Something went wrong' }}</h1>
      <p class="mx-auto mt-3 max-w-md text-muted-foreground">
        {{ is404 ? 'The link may be old or mistyped. Try browsing the services directory instead.' : 'Please try again in a moment.' }}
      </p>
      <div class="mt-8 flex justify-center gap-3">
        <Button @click="clearError({ redirect: '/' })">Go home</Button>
        <Button variant="outline" @click="clearError({ redirect: '/services' })">Browse services</Button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
