<script setup lang="ts">
import { Check, ClipboardCopy, ExternalLink, Info, Mail } from '@lucide/vue'

const { t } = useT()
const route = useRoute()
const config = useRuntimeConfig().public

useSeo('Report a correction', 'Tell BetterCatarman about wrong or outdated information so it can be checked and fixed.', { noindex: true })

const form = reactive({
  page: typeof route.query.page === 'string' ? route.query.page : '',
  wrong: '',
  correct: '',
  source: '',
  contact: '',
})
const tried = ref(false)
const copied = ref(false)
const ready = computed(() => form.wrong.trim().length > 0)

// The report as plain text, used for email, the clipboard, and the preview.
const report = computed(() => [
  'Correction for BetterCatarman',
  '',
  `Page: ${form.page || '(not given)'}`,
  '',
  'What is wrong or out of date:',
  form.wrong.trim() || '(not given)',
  '',
  'Correct information:',
  form.correct.trim() || '(not given)',
  '',
  'Where it can be checked:',
  form.source.trim() || '(not given)',
  ...(form.contact.trim() ? ['', `From: ${form.contact.trim()}`] : []),
].join('\n'))

const mailto = computed(() =>
  `mailto:${config.reportEmail}?subject=${encodeURIComponent('Correction for BetterCatarman')}&body=${encodeURIComponent(report.value)}`)

function guard(e: Event) {
  tried.value = true
  if (!ready.value) e.preventDefault()
}

async function copy() {
  tried.value = true
  if (!ready.value) return
  try {
    await navigator.clipboard.writeText(report.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2500)
  }
  catch { /* clipboard blocked: the preview below can still be selected by hand */ }
}

const field = 'w-full border border-input bg-background px-3.5 py-2.5 text-base outline-none focus-visible:border-primary'
</script>

<template>
  <PageHeader title="Report a correction" description="Tell us what is wrong or out of date, so it can be checked and fixed." />

  <div class="container-page grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
    <form class="space-y-6" novalidate @submit.prevent>
      <div>
        <label for="r-page" class="mb-1.5 block font-semibold">{{ t('Which page?') }}</label>
        <input id="r-page" v-model="form.page" type="text" :class="field" placeholder="/services/tax-payments/cedula">
      </div>

      <div>
        <label for="r-wrong" class="mb-1.5 block font-semibold">{{ t('What is wrong or out of date?') }} <span class="text-destructive" aria-hidden="true">*</span></label>
        <textarea id="r-wrong" v-model="form.wrong" rows="4" required :class="field" :aria-invalid="tried && !ready" aria-describedby="r-wrong-error" />
        <p v-if="tried && !ready" id="r-wrong-error" class="mt-1.5 text-sm font-medium text-destructive">{{ t('Please describe what is wrong.') }}</p>
      </div>

      <div>
        <label for="r-correct" class="mb-1.5 block font-semibold">{{ t('What is the correct information?') }}</label>
        <textarea id="r-correct" v-model="form.correct" rows="3" :class="field" />
      </div>

      <div>
        <label for="r-source" class="mb-1.5 block font-semibold">{{ t('Where can we check it?') }}</label>
        <input id="r-source" v-model="form.source" type="text" :class="field" aria-describedby="r-source-help">
        <p id="r-source-help" class="mt-1.5 text-sm text-muted-foreground">{{ t('A link, a document, or the office that told you. This helps us confirm it.') }}</p>
      </div>

      <div>
        <label for="r-contact" class="mb-1.5 block font-semibold">{{ t('Your name or contact (optional)') }}</label>
        <input id="r-contact" v-model="form.contact" type="text" autocomplete="off" :class="field" aria-describedby="r-contact-help">
        <p id="r-contact-help" class="mt-1.5 text-sm text-muted-foreground">{{ t('Only if you want a reply. It will not be published.') }}</p>
      </div>

      <div class="border-t pt-6">
        <h2 class="mb-3 text-lg font-bold">{{ t('How to send it') }}</h2>
        <div class="flex flex-wrap gap-3">
          <Button v-if="config.reportEmail" as-child size="lg" class="h-12">
            <a :href="mailto" @click="guard"><Mail class="size-4" aria-hidden="true" /> {{ t('Send by email') }}</a>
          </Button>
          <Button v-if="config.reportFormUrl" as-child size="lg" :variant="config.reportEmail ? 'outline' : 'default'" class="h-12">
            <a :href="config.reportFormUrl" target="_blank" rel="noopener">{{ t('Open the form') }} <ExternalLink class="size-4" aria-hidden="true" /></a>
          </Button>
          <Button type="button" size="lg" :variant="config.reportEmail || config.reportFormUrl ? 'outline' : 'default'" class="h-12" @click="copy">
            <component :is="copied ? Check : ClipboardCopy" class="size-4" aria-hidden="true" />
            <span aria-live="polite">{{ t(copied ? 'Copied' : 'Copy the report') }}</span>
          </Button>
        </div>
        <p v-if="!config.reportEmail && !config.reportFormUrl" class="mt-4 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
          <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          {{ t('A way to send reports directly is being set up. For now, copy your report and send it to the people who run this site.') }}
        </p>
      </div>

      <div v-if="ready">
        <h2 class="mb-2 text-sm font-semibold text-muted-foreground">{{ t('Your report') }}</h2>
        <pre class="overflow-x-auto whitespace-pre-wrap border bg-muted p-4 font-sans text-sm">{{ report }}</pre>
      </div>
    </form>

    <aside class="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <div class="border p-5">
        <h2 class="text-xs font-bold uppercase tracking-wider text-primary">{{ t('What helps most') }}</h2>
        <ul class="mt-3 space-y-2.5 text-sm">
          <li v-for="tip in ['The exact page and the part that is wrong.', 'The correct information, as you know it.', 'Where it can be confirmed.']" :key="tip" class="flex items-start gap-2.5">
            <Check class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> {{ t(tip) }}
          </li>
        </ul>
      </div>
      <p class="flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          {{ t('This is a community-run guide. Reports go to its volunteers, not to the municipal government.') }}
          {{ t('For urgent corrections to official requirements, contact the office concerned.') }}
          <NuxtLink to="/privacy" class="mt-2 block font-semibold text-primary hover:underline">{{ t('How we handle your report') }}</NuxtLink>
        </span>
      </p>
    </aside>
  </div>
</template>
