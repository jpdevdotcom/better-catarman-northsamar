<script setup lang="ts">
import { Info } from '@lucide/vue'

const { t } = useT()

useHead({ title: 'Terms of use' })
useSeoMeta({ description: 'How the information on BetterCatarman may be used, and its limits.' })

const UPDATED = '14 November 2026'
</script>

<template>
  <PageHeader title="Terms of use" description="How you may use this site, and what it can and cannot promise." />

  <div class="container-page max-w-3xl space-y-10 py-12 text-[17px] leading-relaxed">
    <p class="text-sm text-muted-foreground">{{ t('Last updated') }} {{ UPDATED }}</p>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Not an official website</h2>
      <p>
        BetterCatarman is a community-run guide. It is not the website of the Municipal Government of Catarman, and nothing on it is an official
        announcement, decision, or document of any government office. For official transactions, the office concerned has the final word.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Information is for reference</h2>
      <p>
        We work to keep the information accurate and show where each part comes from, but requirements, fees, contact details, and officials change.
        Some parts are based on national rules or general guidance rather than Catarman’s own published information, and are labelled that way.
        Please confirm with the office concerned before you rely on anything here, especially before a trip, a payment, or a deadline.
      </p>
      <p>
        The weather forecast comes from a forecast model, not from PAGASA. In an emergency or a typhoon, follow PAGASA, the MDRRMO, and your
        barangay officials, and call 911 if lives are at risk.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">No guarantee</h2>
      <p>
        The site is provided as it is, free of charge, by volunteers. We cannot guarantee that it is complete, current, or always available,
        and we are not responsible for decisions made using it. Where you find a mistake, please
        <NuxtLink to="/report" class="font-semibold text-primary hover:underline">report it</NuxtLink> so it can be fixed.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Using and sharing the information</h2>
      <p>
        You are welcome to share pages from this site and to reuse its information for any lawful purpose. Please name the original source
        listed on the <NuxtLink to="/about" class="font-semibold text-primary hover:underline">About the Data</NuxtLink> page, and follow that
        source’s terms. In particular:
      </p>
      <ul class="list-disc space-y-2 pl-5 marker:text-primary">
        <li>Map data and the schools and health facilities list are © OpenStreetMap contributors, under the Open Database License.</li>
        <li>Barangay and municipal boundaries are from NAMRIA and the PSA, via OCHA, under the Creative Commons Attribution IGO licence.</li>
        <li>Documents quoted from government offices, such as the Commission on Audit’s reports, remain theirs.</li>
      </ul>
      <p>Please do not present information from this site as an official statement of the municipal government.</p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Links to other sites</h2>
      <p>We link to government offices and other websites for convenience. We do not control them and are not responsible for what they publish.</p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Changes</h2>
      <p>We may update these terms and the <NuxtLink to="/privacy" class="font-semibold text-primary hover:underline">privacy notice</NuxtLink>. The date at the top shows when they last changed.</p>
    </section>

    <p class="flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
      <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      {{ t('These terms are in English, the language they are maintained in.') }}
    </p>
  </div>
</template>
