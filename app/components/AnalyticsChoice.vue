<script setup lang="ts">
import { Button } from '~/components/ui/button'

const { t } = useT()
const { consent, ready, accept, withdraw, ask } = useAnalytics()
</script>

<template>
  <div class="border p-5">
    <p class="font-semibold">{{ t('Your analytics choice') }}</p>
    <p class="mt-1 text-muted-foreground">
      <template v-if="!ready">…</template>
      <template v-else-if="consent === 'granted'">{{ t('You allowed Google Analytics on this device.') }}</template>
      <template v-else-if="consent === 'denied'">{{ t('You turned Google Analytics off on this device.') }}</template>
      <template v-else>{{ t('You have not chosen yet. Nothing is counted until you accept.') }}</template>
    </p>
    <div v-if="ready" class="mt-4 flex flex-wrap gap-2">
      <Button v-if="consent === 'granted'" variant="outline" @click="withdraw">{{ t('Turn off analytics') }}</Button>
      <Button v-else-if="consent === 'denied'" variant="outline" @click="accept">{{ t('Allow analytics') }}</Button>
      <Button v-else variant="outline" @click="ask">{{ t('Choose now') }}</Button>
    </div>
  </div>
</template>
