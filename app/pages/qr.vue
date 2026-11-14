<script setup lang="ts">
import { Printer } from '@lucide/vue'
import QRCode from 'qrcode'
import { barangays } from '~/data/barangays'
import { allServices } from '~/data/services'

/**
 * A printable A4 poster with a QR code for a barangay or service page.
 * The title comes from the site's own data for that path, never from the address, so a
 * poster can only ever name a real page on this site.
 */
const { t } = useT()
const route = useRoute()
const pageUrl = usePageUrl()

useHead({ title: 'QR poster' })
useSeoMeta({ robots: 'noindex' })

const path = typeof route.query.path === 'string' ? route.query.path : ''
const target = (() => {
  const b = barangays.find(x => path === `/barangays/${x.slug}`)
  if (b) return { title: `Barangay ${b.name}`, lines: ['Barangay officials and SK chairperson', 'Population, map, and official boundary', 'Schools and health facilities'] }
  const s = allServices.find(x => path === `/services/${x.category.slug}/${x.slug}`)
  if (s) return { title: s.name, lines: ['What to bring: the requirements checklist', `Where to go: ${s.office}`, 'How to apply'] }
  return null
})()

const printPage = () => window.print()
const qrSvg = ref('')
const shownUrl = ref('')
onMounted(async () => {
  if (!target) return
  shownUrl.value = pageUrl(path)
  qrSvg.value = await QRCode.toString(shownUrl.value, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#0b1f44', light: '#ffffff' } })
})
</script>

<template>
  <div class="container-page py-10 print:p-0">
    <div v-if="!target" class="mx-auto max-w-lg border border-dashed p-8 text-center">
      <p class="font-semibold">{{ t('There is no poster for this page.') }}</p>
      <NuxtLink to="/barangays" class="mt-3 inline-block font-semibold text-primary hover:underline">{{ t('Barangays') }}</NuxtLink>
    </div>

    <template v-else>
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p class="text-sm text-muted-foreground">{{ t('Print on A4 or Letter paper. The header, footer, and this bar are left out of the printout.') }}</p>
        <Button size="lg" @click="printPage"><Printer class="size-4" aria-hidden="true" /> {{ t('Print') }}</Button>
      </div>

      <!-- The poster -->
      <article class="mx-auto flex max-w-[680px] flex-col items-center border-4 border-primary p-10 text-center print:max-w-none print:border-[6px]">
        <div class="flex items-center gap-3">
          <LogoMark class="size-14" />
          <p class="flex flex-col items-start leading-none">
            <span class="text-2xl font-bold">Better<span class="text-primary">Catarman</span><span class="text-base font-semibold text-muted-foreground">.org</span></span>
            <span class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Northern Samar</span>
          </p>
        </div>
        <h1 class="mt-8 text-4xl font-bold leading-tight sm:text-5xl">{{ target.title }}</h1>
        <ul class="mt-5 space-y-1 text-lg text-muted-foreground">
          <li v-for="l in target.lines" :key="l">{{ l }}</li>
        </ul>
        <div class="mt-8 size-72 sm:size-80" role="img" :aria-label="`QR code for ${target.title}`" v-html="qrSvg" />
        <p class="mt-6 text-2xl font-bold">Scan with your phone camera</p>
        <p class="mt-2 break-all text-sm text-muted-foreground">{{ shownUrl }}</p>
        <p class="mt-8 text-xs text-muted-foreground">A community-run guide. Not the official website of the Municipal Government of Catarman.</p>
      </article>
    </template>
  </div>
</template>
