<script setup lang="ts">
import { BadgeCheck, CircleDashed, ExternalLink, Info, Scale } from '@lucide/vue'
import { auditObservations, auditOverview, auditSource, auditTerms } from '~/data/audit'
import { auditReplies } from '~/data/auditReplies'
import { audit2025, coaReportsUrl, financeVia, financeYears } from '~/data/finances'
import type { ChartSeries } from '~/components/FinanceChart.vue'
import { budgetPortal, transparencyLinks } from '~/data/site'

useHead({ title: 'Transparency' })
useSeoMeta({ description: 'Municipal finances from 2011 to 2025, audit observations, and open government resources for Catarman, Northern Samar.' })

type Field = 'income' | 'expenses' | 'liabilities' | 'assets'
const fields: { key: Field, label: string }[] = [
  { key: 'income', label: 'Income' },
  { key: 'expenses', label: 'Expenses' },
  { key: 'liabilities', label: 'Liabilities' },
  { key: 'assets', label: 'Assets' },
]

const latest = financeYears[0]!
const oldest = financeYears[financeYears.length - 1]!
const checked = financeYears.filter(y => y.source !== 'wikidata')
const unchecked = financeYears.filter(y => y.source === 'wikidata').map(y => y.year).reverse()
const noted = financeYears.filter(y => y.note)

// Charts run oldest to newest; the table runs newest first.
const chrono = [...financeYears].reverse()
const chartYears = chrono.map(y => y.year)
const BLUE = '#1d4ed8'
const LIGHT_BLUE = '#60a5fa'
const flowSeries = [
  { label: 'Income', color: BLUE, values: chrono.map(y => y.income) },
  { label: 'Expenses', color: LIGHT_BLUE, values: chrono.map(y => y.expenses) },
] as [ChartSeries, ChartSeries]
const stockSeries = [
  { label: 'Assets', color: BLUE, values: chrono.map(y => y.assets) },
  { label: 'Liabilities', color: LIGHT_BLUE, values: chrono.map(y => y.liabilities) },
] as [ChartSeries, ChartSeries]
const noteNumber = (year: number) => noted.findIndex(y => y.year === year) + 1

const sourceLabel = {
  summary: 'COA Executive Summary',
  report: 'COA Annual Audit Report',
  comparison: 'Next year’s COA summary',
  wikidata: 'Not yet checked',
}

const short = (n: number) => (n >= 1e9 ? `₱${(n / 1e9).toFixed(2)}B` : `₱${(n / 1e6).toFixed(1)}M`)
const exact = (n: number) => `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
</script>

<template>
  <PageHeader title="Transparency" description="How public money is raised and spent, and where to find official records.">
    <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
      <a
        :href="budgetPortal.url"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {{ budgetPortal.label }} <ExternalLink class="size-4" aria-hidden="true" />
      </a>
      <p class="text-sm text-muted-foreground">{{ budgetPortal.note }}</p>
    </div>
  </PageHeader>

  <div class="container-page space-y-14 py-12">
    <section>
      <SectionHeading :title="`Municipal finances, ${latest.year}`" description="The most recent audited year, from the Commission on Audit’s report." />
      <dl class="grid grid-cols-2 gap-px overflow-hidden border bg-border lg:grid-cols-4">
        <div v-for="f in fields" :key="f.key" class="flex flex-col-reverse gap-1 bg-background p-6">
          <dt>
            <span class="block font-medium">{{ f.label }}</span>
            <span class="block text-xs tabular-nums text-muted-foreground">{{ exact(latest[f.key]) }}</span>
          </dt>
          <dd class="text-3xl font-bold tabular-nums text-primary">{{ short(latest[f.key]) }}</dd>
        </div>
      </dl>
      <ul class="mt-4 space-y-2 border p-5 text-sm">
        <li class="flex items-start gap-2.5">
          <BadgeCheck class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>The auditor gave an <strong>{{ audit2025.opinion }} opinion</strong> on the {{ latest.year }} financial statements, meaning they were found to be fairly presented.</span>
        </li>
        <li class="flex items-start gap-2.5">
          <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            Total appropriations for {{ latest.year }} were <strong class="tabular-nums">{{ exact(audit2025.appropriations) }}</strong>,
            of which <strong class="tabular-nums">{{ exact(audit2025.obligations) }}</strong> was obligated. Equity at year end was
            <strong class="tabular-nums">{{ exact(audit2025.equity) }}</strong>.
          </span>
        </li>
      </ul>
    </section>

    <section id="by-year" class="scroll-mt-24">
      <SectionHeading
        :title="`Year by year, ${oldest.year} to ${latest.year}`"
        :description="`${checked.length} of ${financeYears.length} years have been checked against the Commission on Audit’s own reports.`"
      />
      <div class="mb-6 grid gap-4 xl:grid-cols-2">
        <FinanceChart title="Income and expenses" :years="chartYears" :series="flowSeries" :unchecked="unchecked" />
        <FinanceChart title="Assets and liabilities" :years="chartYears" :series="stockSeries" :unchecked="unchecked" />
      </div>
      <div class="overflow-x-auto border">
        <table class="w-full min-w-[720px] text-sm">
          <thead class="bg-muted text-left">
            <tr>
              <th scope="col" class="px-4 py-3 font-semibold">Year</th>
              <th v-for="f in fields" :key="f.key" scope="col" class="px-4 py-3 text-right font-semibold">{{ f.label }}</th>
              <th scope="col" class="px-4 py-3 font-semibold">Checked against</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="y in financeYears" :key="y.year" :class="y.source === 'wikidata' && 'text-muted-foreground'">
              <th scope="row" class="px-4 py-3 text-left font-bold tabular-nums">
                {{ y.year }}<sup v-if="y.note" class="ml-0.5 font-semibold text-primary">{{ noteNumber(y.year) }}</sup>
              </th>
              <td v-for="f in fields" :key="f.key" class="px-4 py-3 text-right tabular-nums" :title="exact(y[f.key])">{{ short(y[f.key]) }}</td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <BadgeCheck v-if="y.source !== 'wikidata'" class="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <CircleDashed v-else class="size-4 shrink-0" aria-hidden="true" />
                  {{ sourceLabel[y.source] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ol v-if="noted.length" class="mt-3 space-y-1 text-sm text-muted-foreground">
        <li v-for="y in noted" :key="y.year" class="flex gap-2">
          <sup class="mt-2 font-semibold text-primary">{{ noteNumber(y.year) }}</sup>
          <span><strong class="text-foreground">{{ y.year }}:</strong> {{ y.note }}</span>
        </li>
      </ol>

      <div class="mt-4 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <div class="space-y-2">
          <p>
            Each year shows the figures stated in that year’s own Commission on Audit report. Later reports sometimes restate an earlier year; the notes above say where.
            The reports are on the
            <a :href="coaReportsUrl" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">COA Annual Audit Reports page</a>,
            under each year › Region VIII › Municipalities › Northern Samar.
          </p>
          <p v-if="unchecked.length">
            {{ unchecked.join(' and ') }} have not been checked. Those figures are recorded on the
            <a :href="financeVia.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">{{ financeVia.label }}</a>,
            which cites the COA reports. Confirm them with COA before quoting them.
          </p>
          <p>These are year-end totals from the audited financial statements, not the approved budget. Hover over a figure to see the exact amount.</p>
        </div>
      </div>
    </section>

    <section id="audit" class="scroll-mt-24">
      <SectionHeading
        :title="`What the auditor observed, ${auditSource.year}`"
        description="From the Commission on Audit’s yearly audit of the municipal government."
      />

      <!-- Read-this-first notice -->
      <div class="border-l-4 border-primary bg-muted p-5">
        <h3 class="flex items-center gap-2 font-bold">
          <Scale class="size-4 text-primary" aria-hidden="true" /> Please read this first
        </h3>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm marker:text-primary">
          <li>
            <strong>These are audit observations, not findings of wrongdoing.</strong>
            They describe weaknesses the auditor saw in records, documents, and controls, together with what it recommended. Where the auditor says a practice was contrary to a law or circular, that is its audit assessment. It is not a ruling that any person or office is liable, which only the proper bodies can decide, and it should not be read or repeated as one.
          </li>
          <li>
            <strong>The municipal government’s responses are included.</strong>
            Under each observation you will find what municipal officials told the auditors, as recorded in the full Annual Audit Report, and what the audit team said in return.
          </li>
          <li>
            <strong>The observations are in the auditor’s exact words.</strong>
            So are the responses. Only the short headings were written for this site, the recommendations are shortened, and the responses are excerpts. The full report has more detail, and if anything here differs from it, the report is correct.
          </li>
          <li>
            <strong>Things may have changed since.</strong>
            The audit covers {{ auditSource.year }}. Some recommendations may already have been acted on.
          </li>
        </ul>
      </div>

      <!-- Overall results, for balance -->
      <dl class="mt-6 grid gap-px overflow-hidden border bg-border md:grid-cols-3">
        <div v-for="o in auditOverview" :key="o.label" class="bg-background p-5">
          <dt class="text-sm text-muted-foreground">{{ o.label }}</dt>
          <dd class="mt-1 text-xl font-bold text-primary">{{ o.value }}</dd>
          <dd class="mt-2 text-sm text-muted-foreground">{{ o.detail }}</dd>
        </div>
      </dl>

      <h3 class="mb-3 mt-8 text-lg font-bold">Significant observations and recommendations ({{ auditObservations.length }})</h3>
      <Accordion type="multiple" class="border px-5">
        <AccordionItem v-for="(o, i) in auditObservations" :key="i" :value="`obs-${i}`">
          <AccordionTrigger class="py-5 text-left text-base font-semibold">
            <span class="flex items-start gap-3">
              <span class="grid size-7 shrink-0 place-items-center bg-secondary text-sm font-bold text-primary">{{ i + 1 }}</span>
              {{ o.title }}
            </span>
          </AccordionTrigger>
          <AccordionContent class="space-y-5 pb-6 text-base">
            <div>
              <p class="mb-2 text-xs font-bold uppercase tracking-wider text-primary">The auditor’s observation, in its own words</p>
              <blockquote class="border-l-4 border-border pl-4 text-foreground">“{{ o.observation }}”</blockquote>
            </div>
            <div>
              <p class="mb-2 text-xs font-bold uppercase tracking-wider text-primary">What the auditor recommended</p>
              <p class="mb-2 text-sm text-muted-foreground">Addressed to: {{ o.addressedTo }}.</p>
              <ul class="list-disc space-y-1.5 pl-5 text-sm marker:text-primary">
                <li v-for="r in o.recommendations" :key="r">{{ r }}</li>
              </ul>
            </div>
            <div v-if="auditReplies[i]?.response.length">
              <p class="mb-2 text-xs font-bold uppercase tracking-wider text-primary">What the municipal government said, as recorded in the report</p>
              <blockquote class="space-y-2 border-l-4 border-primary/40 pl-4 text-sm">
                <p v-for="r in auditReplies[i]!.response" :key="r">“{{ r }}”</p>
              </blockquote>
            </div>
            <div v-if="auditReplies[i]?.auditorReply.length">
              <p class="mb-2 text-xs font-bold uppercase tracking-wider text-primary">What the audit team said in return</p>
              <blockquote class="space-y-2 border-l-4 border-border pl-4 text-sm">
                <p v-for="r in auditReplies[i]!.auditorReply" :key="r">“{{ r }}”</p>
              </blockquote>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <details class="mt-4 border p-5 text-sm">
        <summary class="cursor-pointer font-semibold">Abbreviations used in the auditor’s wording</summary>
        <dl class="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          <div v-for="t in auditTerms" :key="t.term" class="flex gap-2">
            <dt class="shrink-0 font-semibold">{{ t.term }}</dt>
            <dd class="text-muted-foreground">{{ t.meaning }}</dd>
          </div>
        </dl>
      </details>

      <p class="mt-4 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
        <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          Sources: <em>{{ auditSource.title }}</em> and the full <em>Catarman Annual Audit Report 2025</em>, {{ auditSource.publisher }}, read on {{ auditSource.read }}.
          Find it on the
          <a :href="auditSource.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">COA Annual Audit Reports page</a>
          under {{ auditSource.where }}.
        </span>
      </p>
    </section>

    <section>
      <SectionHeading title="Official records and open data" />
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="l in transparencyLinks" :key="l.href">
          <a :href="l.href" target="_blank" rel="noopener" class="group flex h-full flex-col border p-5 transition-colors hover:border-primary hover:bg-accent">
            <span class="flex items-center justify-between gap-2 font-semibold">
              {{ l.label }} <ExternalLink class="size-4 shrink-0 text-primary" aria-hidden="true" />
            </span>
            <span class="mt-1 text-sm text-muted-foreground">{{ l.note }}</span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
