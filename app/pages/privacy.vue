<script setup lang="ts">
import { Info } from '@lucide/vue'

const { t } = useT()
const email = useRuntimeConfig().public.reportEmail

useSeo('Privacy notice', 'What information BetterCatarman collects, what it publishes, and the services it relies on.')

const UPDATED = '15 November 2026'
</script>

<template>
  <PageHeader title="Privacy notice" description="What this site collects about you, what it publishes, and why." />

  <div class="container-page max-w-3xl space-y-10 py-12 text-[17px] leading-relaxed">
    <p class="text-sm text-muted-foreground">{{ t('Last updated') }} {{ UPDATED }}</p>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">The short version</h2>
      <ul class="list-disc space-y-2 pl-5 marker:text-primary">
        <li>You do not need an account, and this site does not ask for your name or contact details to read it.</li>
        <li>There are no advertising cookies. Google Analytics counts visits only if you tap “Accept”, and you can change your mind any time.</li>
        <li>Your language and analytics choices are saved only on your own device.</li>
        <li>If you send a correction by email, we see what you choose to send, and use it only to check and fix the site.</li>
        <li>Maps and the weather forecast are loaded from outside services, which receive your device’s internet address when they load.</li>
      </ul>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Who runs this site</h2>
      <p>
        BetterCatarman is a community-run guide, maintained by volunteers. It is not the website of the Municipal Government of Catarman,
        and is not affiliated with or endorsed by it.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Information you give us</h2>
      <p>
        The only way to send us information is the <NuxtLink to="/report" class="font-semibold text-primary hover:underline">Report a correction</NuxtLink> page.
        It does not send anything by itself: it prepares an email in your own email app, or text you can copy. Nothing reaches us until you send it.
      </p>
      <p>
        If you do send a report, we receive your email address and whatever you wrote, including a name or contact if you added one.
        We use it only to check the information and correct the site, and to reply if you asked us to. We do not publish it, sell it, or share it,
        and we delete reports once they have been dealt with.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Information saved on your device</h2>
      <p>
        If you choose a language, or answer the analytics question, the choice is saved in your browser’s storage so the site
        remembers it next time. It stays on your device and is never sent to us. Clearing your browser’s site data removes it.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Outside services this site uses</h2>
      <p>Some parts of the site are loaded from other services when you open them. Each receives your device’s internet address and the usual browser details, under its own privacy policy:</p>
      <ul class="list-disc space-y-2 pl-5 marker:text-primary">
        <li><strong>Google Maps</strong>, for the maps on the Barangays, Contact, and Schools and health facilities pages. Google may set its own cookies.</li>
        <li><strong>OpenStreetMap</strong>, for the street map when Google Maps is not available.</li>
        <li><strong>Open-Meteo</strong>, for the weather forecast on the home and Advisories pages.</li>
        <li><strong>Google Analytics</strong>, only if you accept it. See <a href="#analytics" class="font-semibold text-primary hover:underline">Visit counting</a> below.</li>
        <li>The company that hosts this website, which may keep standard server logs, such as the pages requested and the time.</li>
      </ul>
      <p>Links to other websites, such as government offices and social media pages, take you to sites with their own privacy policies.</p>
    </section>

    <section id="analytics" class="scroll-mt-24 space-y-3">
      <h2 class="text-2xl font-bold">Visit counting (Google Analytics)</h2>
      <p>
        We would like to know which pages people use, so we can improve the ones that matter most. If, and only if, you tap
        <strong>Accept</strong> on the notice at the bottom of the screen, the site loads Google Analytics. Until then, nothing from Google
        Analytics is loaded, and saying no changes nothing else about the site.
      </p>
      <p>
        If you accept, Google Analytics sets cookies on your device and records things like the pages you open, how you arrived
        (for example, from a Google search or a Facebook link), your general area (city or province, not your exact location), and your
        type of device and browser. We see only totals and trends, such as how many people opened the cedula page this week.
        We cannot see who you are, and we do not use this for advertising. Google processes this information under its own
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="font-semibold text-primary hover:underline">privacy policy</a>.
      </p>
      <AnalyticsChoice />
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Personal information this site publishes</h2>
      <p>
        The site lists public officials and government offices: names, positions, and official contact numbers and emails, as published by the
        Department of the Interior and Local Government, the Municipal Government of Catarman, and the Commission on Audit.
        We publish this so residents know who serves them and how to reach them, and we show where each piece of information comes from on the
        <NuxtLink to="/about" class="font-semibold text-primary hover:underline">About the Data</NuxtLink> page.
      </p>
      <p>
        We leave out personal email addresses that appear in some government directories, and contact numbers that are not well formed.
      </p>
      <p>
        If you are listed and something about you is wrong, out of date, or should not be shown, tell us and we will review it promptly.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Your rights</h2>
      <p>
        Under the Data Privacy Act of 2012 (Republic Act 10173), you may ask what information about you we hold, and ask us to correct or delete it.
        You may also raise a concern with the National Privacy Commission.
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Contact</h2>
      <p v-if="email">
        Email <a :href="`mailto:${email}`" class="font-semibold text-primary hover:underline">{{ email }}</a>,
        or use the <NuxtLink to="/report" class="font-semibold text-primary hover:underline">Report a correction</NuxtLink> page.
      </p>
      <p v-else>
        Use the <NuxtLink to="/report" class="font-semibold text-primary hover:underline">Report a correction</NuxtLink> page.
      </p>
    </section>

    <p class="flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
      <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      {{ t('This notice is in English, the language it is maintained in.') }}
    </p>
  </div>
</template>
