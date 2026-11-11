<script setup lang="ts">
import { ArrowRight, Clock, Info, Landmark, Mail, Phone, UserRound } from '@lucide/vue'
import { barangays } from '~/data/barangays'
import type { Official } from '~/data/government'
import { councilors, executive, exOfficio, offices, representative } from '~/data/government'
import { site } from '~/data/site'

useHead({ title: 'Government' })
useSeoMeta({ description: 'Elected officials, Sangguniang Bayan members, and municipal offices of Catarman, Northern Samar.' })

const sections = [
  { id: 'executive', label: 'Executive' },
  { id: 'legislative', label: 'Sangguniang Bayan' },
  { id: 'offices', label: 'Offices' },
  { id: 'barangays', label: 'Barangays' },
]
const sbGroups = [
  { title: 'Elected members', members: councilors, cols: 'xl:grid-cols-4' },
  // Hidden until names are filled in (in app/data/government.ts); it reappears automatically.
  { title: 'Ex officio members', members: exOfficio.filter(m => m.name), cols: '' },
].filter(g => g.members.length)

function contactRows(o: Official) {
  const digits = (p: string) => p.replace(/[^\d+]/g, '')
  const mobile = o.phones.find(p => digits(p).startsWith('09'))
  const landline = o.phones.find(p => !digits(p).startsWith('09'))
  return [
    { label: 'Landline', value: landline, href: landline && `tel:${digits(landline)}` },
    { label: 'Mobile', value: mobile, href: mobile && `tel:${digits(mobile)}` },
    { label: 'Email', value: o.email, href: o.email && `mailto:${o.email}` },
  ]
}
</script>

<template>
  <PageHeader title="Government" description="The officials and offices serving Catarman.">
    <nav class="mt-6 flex flex-wrap gap-2" aria-label="On this page">
      <a
        v-for="s in sections"
        :key="s.id"
        :href="`#${s.id}`"
        class="border bg-background px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:border-primary hover:bg-accent"
      >
        {{ s.label }}
      </a>
    </nav>
  </PageHeader>

  <div class="container-page space-y-16 py-12">
    <!-- Executive -->
    <section id="executive" class="scroll-mt-24">
      <SectionHeading title="Executive branch" description="The officials who lead the municipal government." />

      <div class="grid gap-4 md:grid-cols-2">
        <article v-for="o in executive" :key="o.role" class="flex flex-col border">
          <header class="flex items-start gap-4 border-b bg-muted p-5 sm:p-6">
            
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-wider text-primary">{{ o.role }}</p>
              <h3 class="mt-1 text-xl font-bold leading-tight">{{ o.name }}</h3>
              <p v-if="o.note" class="mt-1 text-sm text-muted-foreground">{{ o.note }}</p>
            </div>
          </header>

          <dl class="divide-y px-5 text-sm sm:px-6">
            <div v-for="row in contactRows(o)" :key="row.label" class="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-3">
              <dt class="text-muted-foreground">{{ row.label }}</dt>
              <dd class="min-w-0">
                <a v-if="row.href" :href="row.href" class="break-all font-medium tabular-nums hover:text-primary">{{ row.value }}</a>
                <span v-else class="text-muted-foreground">N/A</span>
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="flex items-start gap-3 border p-5">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-primary">{{ representative.role }}</p>
            <p class="mt-1 font-semibold">{{ representative.name }}</p>
            <p class="text-sm text-muted-foreground">Represents Catarman in the House of Representatives</p>
          </div>
        </div>
        <div class="flex items-start gap-3 border p-5">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-primary">Office hours</p>
            <p class="mt-1 font-semibold">{{ site.officeHours }}</p>
            <p class="text-sm text-muted-foreground">{{ site.address }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Legislative -->
    <section id="legislative" class="scroll-mt-24">
      <SectionHeading
        title="Sangguniang Bayan members"
        description="The municipal council, which passes ordinances and resolutions. The Vice Mayor presides."
      />
      <div v-for="group in sbGroups" :key="group.title" class="mb-6">
        <h3 class="mb-3 text-sm font-semibold text-muted-foreground">{{ group.title }}</h3>
        <!-- Borders are drawn per cell, so an unfilled last row leaves no coloured gap. -->
        <ul class="grid border-l border-t sm:grid-cols-2" :class="group.cols">
          <li v-for="(m, i) in group.members" :key="i" class="flex items-start gap-4 border-b border-r bg-background p-5">
            <span class="grid size-10 shrink-0 place-items-center bg-secondary text-primary">
              <UserRound class="size-5" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <p v-if="m.name" class="font-semibold">{{ m.name }}</p>
              <p v-else class="font-semibold text-muted-foreground">N/A</p>
              <p class="text-sm font-medium text-primary">{{ m.role }}</p>
              <p v-if="m.committees" class="mt-1 text-sm text-muted-foreground">{{ m.committees }}</p>
            </div>
          </li>
        </ul>
      </div>
      <p class="text-sm text-muted-foreground">
        Elected members serve the 2025–2028 term and are listed in order of votes received. Committee assignments will be added once confirmed.
      </p>
    </section>

    <!-- Offices -->
    <section id="offices" class="scroll-mt-24">
      <SectionHeading
        title="Department heads and key offices"
        description="The offices that deliver municipal services, and what each one handles."
      />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="o in offices" :key="o.name" class="flex flex-col border p-5">
          <div class="flex items-start gap-3">
            <span class="grid size-10 shrink-0 place-items-center bg-secondary text-primary">
              <component :is="o.icon" class="size-5" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <h3 class="font-semibold leading-snug">
                {{ o.name }} <span class="font-normal text-muted-foreground">({{ o.short }})</span>
              </h3>
              <p class="mt-1 text-sm text-muted-foreground">{{ o.handles }}</p>
            </div>
          </div>

          <ul class="mt-4 space-y-2 border-t pt-4 text-sm">
            <li class="flex items-center gap-2.5">
              <UserRound class="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span v-if="o.head" class="font-medium">{{ o.head }}</span>
              <span v-else class="text-muted-foreground">N/A</span>
            </li>
            <li class="flex items-start gap-2.5">
              <Phone class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <PhoneList :phones="o.phones" />
            </li>
            <li class="flex items-start gap-2.5">
              <Mail class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a v-if="o.email" :href="`mailto:${o.email}`" class="break-all font-medium hover:text-primary">{{ o.email }}</a>
              <span v-else class="text-muted-foreground">N/A</span>
            </li>
          </ul>

          <NuxtLink
            v-if="o.services"
            :to="`/services/${o.services}`"
            class="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary hover:underline"
          >
            View services <ArrowRight class="size-4" aria-hidden="true" />
          </NuxtLink>
        </article>
      </div>
    </section>

    <!-- Barangays -->
    <section id="barangays" class="scroll-mt-24">
      <SectionHeading
        :title="`${barangays.length} barangays`"
        description="Each barangay has its own profile with population and location."
        link-to="/barangays"
        link-label="Barangay directory"
      />
      <ul class="columns-2 gap-8 text-sm sm:columns-3 lg:columns-5">
        <li v-for="b in barangays" :key="b.slug" class="border-b">
          <NuxtLink :to="`/barangays/${b.slug}`" class="block py-2 hover:text-primary">{{ b.name }}</NuxtLink>
        </li>
      </ul>
    </section>

    <p class="flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
      <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <span>
        Office heads and contact details are from the municipal government’s website,
        <a :href="`${site.officialWebsite}/governance`" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">catarman.gov.ph</a>.
        Sangguniang Bayan members are from the DILG masterlist and the 2025 election results. “N/A” means the detail is not published by those sources.
      </span>
    </p>
  </div>
</template>
