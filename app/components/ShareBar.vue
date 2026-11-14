<script setup lang="ts">
import { Check, Download, Link2, Printer, QrCode, Share2 } from '@lucide/vue'
import QRCode from 'qrcode'

/** Share buttons for a page: the phone's own share sheet, Facebook, Viber, copy link, and a QR code. */
const props = defineProps<{ title: string, path: string }>()
const { t } = useT()
const pageUrl = usePageUrl()

const canNativeShare = ref(false)
onMounted(() => (canNativeShare.value = typeof navigator !== 'undefined' && 'share' in navigator))

const copied = ref(false)
const showQr = ref(false)
const qrSvg = ref('')

const url = () => pageUrl(props.path)

async function nativeShare() {
  try { await navigator.share({ title: props.title, url: url() }) }
  catch { /* cancelled */ }
}
function facebook() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`, '_blank', 'noopener,width=600,height=500')
}
function viber() {
  window.location.href = `viber://forward?text=${encodeURIComponent(`${props.title} ${url()}`)}`
}
async function copyLink() {
  try {
    await navigator.clipboard.writeText(url())
    copied.value = true
    setTimeout(() => (copied.value = false), 2500)
  }
  catch { /* clipboard blocked */ }
}
async function toggleQr() {
  showQr.value = !showQr.value
  if (showQr.value && !qrSvg.value) {
    qrSvg.value = await QRCode.toString(url(), { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#0b1f44', light: '#ffffff' } })
  }
}
function downloadQr() {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([qrSvg.value], { type: 'image/svg+xml' }))
  a.download = `bettercatarman-qr-${props.path.split('/').filter(Boolean).join('-') || 'home'}.svg`
  a.click()
  URL.revokeObjectURL(a.href)
}

const btn = 'inline-flex h-9 items-center gap-2 border px-3 text-sm font-medium hover:border-primary hover:bg-accent'
</script>

<template>
  <div class="print:hidden">
    <div class="flex flex-wrap items-center gap-2" role="group" :aria-label="t('Share this page')">
      <span class="mr-1 text-sm font-semibold text-muted-foreground">{{ t('Share') }}:</span>
      <button v-if="canNativeShare" type="button" :class="btn" @click="nativeShare">
        <Share2 class="size-4 text-primary" aria-hidden="true" /> {{ t('Share') }}
      </button>
      <button type="button" :class="btn" @click="facebook">
        <svg class="size-4 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.5V21h3Z" /></svg>
        Facebook
      </button>
      <button type="button" :class="btn" @click="viber">
        <svg class="size-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h10a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4h-4l-4 3v-3H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" /></svg>
        Viber
      </button>
      <button type="button" :class="btn" @click="copyLink">
        <component :is="copied ? Check : Link2" class="size-4 text-primary" aria-hidden="true" />
        <span aria-live="polite">{{ t(copied ? 'Link copied' : 'Copy link') }}</span>
      </button>
      <button type="button" :class="btn" :aria-expanded="showQr" @click="toggleQr">
        <QrCode class="size-4 text-primary" aria-hidden="true" /> {{ t('QR code') }}
      </button>
    </div>

    <div v-if="showQr" class="mt-3 flex flex-wrap items-center gap-5 border p-4">
      <!-- The SVG is generated locally by the qrcode library from this page's address. -->
      <div class="size-36 shrink-0" :aria-label="t('QR code for this page')" role="img" v-html="qrSvg" />
      <div class="space-y-3 text-sm">
        <p class="max-w-xs text-muted-foreground">{{ t('Scan with a phone camera to open this page. Print it for a notice board or barangay hall.') }}</p>
        <div class="flex flex-wrap gap-2">
          <NuxtLink :to="{ path: '/qr', query: { path } }" :class="btn">
            <Printer class="size-4 text-primary" aria-hidden="true" /> {{ t('Print poster') }}
          </NuxtLink>
          <button type="button" :class="btn" @click="downloadQr">
            <Download class="size-4 text-primary" aria-hidden="true" /> {{ t('Download') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
