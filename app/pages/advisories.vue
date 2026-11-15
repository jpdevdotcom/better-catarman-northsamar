<script setup lang="ts">
import { ArrowRight, Check, ExternalLink, Info } from '@lucide/vue'
import { notices, officialChannels, preparedness, windSignals } from '~/data/notices'
import { hotlines } from '~/data/site'

const { t } = useT()

useSeo('Weather and typhoon advisories for Catarman', 'Weather forecast, typhoon information, and notices for Catarman, Northern Samar.')

const pagasa = officialChannels.filter(c => c.label.startsWith('PAGASA'))
const callList = hotlines.filter(h => ['Catarman MDRRMO', 'National Emergency Hotline', 'Northern Samar PDRRMO'].includes(h.name))
// Formatted by hand so the server and the browser always print the same text.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m! - 1]} ${y}`
}
</script>

<template>
  <PageHeader title="Advisories" description="Weather, typhoon information, and notices for Catarman." />

  <div class="container-page space-y-14 py-12">
    <section id="weather" class="scroll-mt-24">
      <SectionHeading title="Weather in Catarman" />
      <WeatherPanel />
    </section>

    <section id="typhoon" class="scroll-mt-24">
      <SectionHeading
        title="If a typhoon is coming"
        description="PAGASA issues the official bulletins and wind signals. Check them first."
      />
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-6">
          <ul class="divide-y border">
            <li v-for="l in pagasa" :key="l.href">
              <a :href="l.href" target="_blank" rel="noopener" class="flex items-center justify-between gap-3 px-5 py-4 font-semibold hover:bg-accent hover:text-primary">
                {{ t(l.label) }} <ExternalLink class="size-4 shrink-0 text-primary" aria-hidden="true" />
              </a>
            </li>
          </ul>

          <div>
            <h3 class="mb-3 text-sm font-semibold text-muted-foreground">{{ t('Who to call') }}</h3>
            <ul class="divide-y border">
              <li v-for="h in callList" :key="h.name" class="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                <span class="font-medium">{{ t(h.name) }}</span>
                <span class="flex flex-wrap gap-2">
                  <a
                    v-for="n in h.numbers"
                    :key="n"
                    :href="`tel:${n.replace(/[^\d+]/g, '')}`"
                    class="bg-primary px-3 py-1.5 text-sm font-bold tabular-nums text-primary-foreground hover:bg-primary/90"
                  >{{ n }}</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-sm font-semibold text-muted-foreground">{{ t('What the wind signals mean') }}</h3>
          <div class="overflow-x-auto border">
            <table class="w-full text-sm">
              <thead class="bg-muted text-left">
                <tr>
                  <th scope="col" class="px-4 py-3 font-semibold">{{ t('Signal') }}</th>
                  <th scope="col" class="px-4 py-3 font-semibold">{{ t('Winds') }}</th>
                  <th scope="col" class="px-4 py-3 font-semibold">{{ t('Expected within') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="s in windSignals" :key="s.signal">
                  <th scope="row" class="px-4 py-3 text-left">
                    <span class="inline-grid size-7 place-items-center bg-primary text-sm font-bold text-primary-foreground">{{ s.signal }}</span>
                  </th>
                  <td class="px-4 py-3 tabular-nums">{{ s.winds }} km/h <template v-if="s.orHigher">{{ t('or higher') }}</template></td>
                  <td class="px-4 py-3 tabular-nums">{{ t('{n} hours', { n: s.hours }) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">{{ t('Tropical Cyclone Wind Signals as defined by PAGASA.') }}</p>
        </div>
      </div>
    </section>

    <section id="prepare" class="scroll-mt-24">
      <SectionHeading
        title="Get ready before the storm"
        description="General preparedness advice. Follow instructions from the MDRRMO and your barangay officials."
      />
      <ul class="grid border-l border-t sm:grid-cols-2">
        <li v-for="p in preparedness" :key="p" class="flex items-start gap-3 border-b border-r bg-background p-4">
          <Check class="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /> {{ t(p) }}
        </li>
      </ul>
    </section>

    <section id="notices" class="scroll-mt-24">
      <SectionHeading
        title="Notices and reminders"
        description="Dates and updates worth knowing. These are reminders from BetterCatarman, not official announcements."
      />
      <ul class="divide-y border">
        <li v-for="n in notices" :key="n.title" class="grid gap-x-8 gap-y-2 p-5 md:grid-cols-[150px_1fr]">
          <div class="text-sm">
            <p class="font-bold uppercase tracking-wider text-primary">{{ t(n.kind === 'reminder' ? 'Reminder' : 'Site update') }}</p>
            <p class="tabular-nums text-muted-foreground">{{ fmtDate(n.date) }}</p>
          </div>
          <div>
            <h3 class="text-lg font-bold leading-snug">{{ n.title }}</h3>
            <p v-if="n.due" class="mt-1 font-semibold text-primary">{{ n.due }}</p>
            <p class="mt-1 text-muted-foreground">{{ n.body }}</p>
            <p v-if="n.basis" class="mt-2 text-xs text-muted-foreground">{{ n.basis }}</p>
            <NuxtLink v-if="n.to" :to="n.to" class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              {{ t('Read more') }} <ArrowRight class="size-4" aria-hidden="true" />
            </NuxtLink>
          </div>
        </li>
      </ul>
    </section>

    <section id="official" class="scroll-mt-24">
      <SectionHeading
        title="Official announcements"
        description="For class suspensions, power interruptions, and other official advisories, follow these channels."
      />
      <ul class="grid gap-4 sm:grid-cols-2">
        <li v-for="c in officialChannels.slice(0, 2)" :key="c.href">
          <a :href="c.href" target="_blank" rel="noopener" class="flex items-center justify-between gap-3 border p-5 font-semibold hover:border-primary hover:bg-accent">
            {{ t(c.label) }} <ExternalLink class="size-4 shrink-0 text-primary" aria-hidden="true" />
          </a>
        </li>
      </ul>
      <p class="mt-4 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <NuxtLink to="/about" class="font-semibold text-primary hover:underline">{{ t('See where our information comes from') }}</NuxtLink>
      </p>
    </section>
  </div>
</template>
