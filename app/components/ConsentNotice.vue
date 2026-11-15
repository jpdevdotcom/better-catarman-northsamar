<script setup lang="ts">
import { ChartColumn } from '@lucide/vue'
import { Button } from '~/components/ui/button'

const { t } = useT()
const { consent, ready, enabled, accept, decline } = useAnalytics()
</script>

<template>
  <section
    v-if="enabled && ready && consent === null"
    class="fixed inset-x-0 bottom-0 z-50 border-t-2 border-primary bg-background print:hidden"
    role="region"
    :aria-label="t('Analytics choice')"
  >
    <div class="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p class="flex items-start gap-3 text-sm sm:text-[15px]">
        <ChartColumn class="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <span>
          {{ t('May we count visits with Google Analytics? It shows us which pages people use, so we know what to improve. No ads, and you can change this any time.') }}
          <NuxtLink to="/privacy#analytics" class="font-semibold text-primary hover:underline">{{ t('Learn more') }}</NuxtLink>
        </span>
      </p>
      <div class="flex shrink-0 gap-2">
        <Button variant="outline" @click="decline">{{ t('No, thanks') }}</Button>
        <Button @click="accept">{{ t('Accept') }}</Button>
      </div>
    </div>
  </section>
</template>
