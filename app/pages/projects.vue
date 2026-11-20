<script setup lang="ts">
import { BadgeCheck, ChevronRight, ExternalLink, Info, Scale } from '@lucide/vue'
import { TabsIndicator } from 'reka-ui'
import { budgetPortal } from '~/data/site'
import { budgetProjects, budgetSource, dpwhSource, enactedProjects, enactedSource, enactedYears, type BudgetProject } from '~/data/budgetProjects'
import type { ContentsItem } from '~/components/PageContents.vue'

useSeo('National projects in Catarman', 'Projects in Catarman, Northern Samar, in the national budget: the enacted budgets since 2020 and the proposed 2027 budget, with amounts.')

const short = (n: number) => (n >= 1e9 ? `₱${(n / 1e9).toFixed(2)}B` : `₱${(n / 1e6).toFixed(1)}M`)
const peso = (n: number | null) => (n === null ? '—' : `₱${n.toLocaleString('en-PH')}`)

const firstEnacted = enactedYears[0]!
const lastEnacted = enactedYears[enactedYears.length - 1]!
const enactedByYear = enactedYears.map((year) => {
  const projects = enactedProjects
    .filter(p => p.amounts[year] !== undefined)
    .map(p => ({ title: p.title, department: p.department, amount: p.amounts[year]! }))
    .sort((a, b) => b.amount - a.amount)
  return { year, projects, total: projects.reduce((s, p) => s + p.amount, 0) }
}).reverse()
const enactedMax = Math.max(...enactedByYear.map(y => y.total))
const selectedYear = ref(lastEnacted)
const selected = computed(() => enactedByYear.find(y => y.year === selectedYear.value)!)

const townProjects = budgetProjects.filter(p => p.kind === 'town')
const roadProjects = budgetProjects.filter(p => p.kind === 'road')
const sum = (list: BudgetProject[], key: 'nep' | 'house') => list.reduce((s, p) => s + (p[key] ?? 0), 0)
const townHouse = sum(townProjects, 'house')
const townNep = sum(townProjects, 'nep')
const roadHouse = sum(roadProjects, 'house')
const longDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const builtOn = longDate(budgetSource.builtAt)

const dpwhConfirmed = townProjects.filter(p => p.dpwh)
const dpwhSavedOn = dpwhSource.savedOn ? longDate(dpwhSource.savedOn) : null

const town = reactive(useTableFilter(townProjects, p => `${p.title} ${p.program ?? ''} ${p.dpwh?.code ?? ''}`))
const roads = reactive(useTableFilter(roadProjects, p => `${p.title} ${p.program ?? ''} ${p.dpwh?.code ?? ''}`))
const enacted = reactive(useTableFilter(() => selected.value.projects, p => `${p.title} ${p.department}`))

const contents: ContentsItem[] = [
  { id: 'read-first', label: 'Please read this first' },
  { id: 'proposed-2027', label: 'Proposed for 2027' },
  { id: 'enacted', label: `Enacted budgets, ${firstEnacted} to ${lastEnacted}` },
]

const tabItems = [
  { id: 'proposed-2027', label: 'Proposed for 2027', detail: `${townProjects.length} projects, ${short(townHouse)}` },
  { id: 'enacted', label: 'Enacted budgets', detail: `${enactedYears.length} years, ${firstEnacted} to ${lastEnacted}` },
]
const TABS = tabItems.map(x => x.id)
const tab = ref('proposed-2027')
const tabsEl = ref<HTMLElement>()
const route = useRoute()
function fromHash() {
  const id = (location.hash || route.hash).slice(1)
  if (!TABS.includes(id)) return
  tab.value = id
  nextTick(() => tabsEl.value?.scrollIntoView())
}
watch(tab, (id) => {
  if (location.hash.slice(1) !== id) history.replaceState(history.state, '', `#${id}`)
  nextTick(() => window.dispatchEvent(new Event('scroll')))
})
const indicatorReady = ref(false)
onMounted(() => {
  requestAnimationFrame(() => requestAnimationFrame(() => { indicatorReady.value = true }))
  fromHash()
  window.addEventListener('hashchange', fromHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', fromHash))
watch(() => route.hash, fromHash)
</script>

<template>
  <PageHeader
    title="National projects"
    description="Projects in Catarman named in the national budget. National agencies such as the DPWH pay for them, not the municipal government."
    :crumbs="[{ label: 'Transparency', to: '/transparency' }, { label: 'National projects' }]"
  >
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

  <div class="container-page py-12 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
    <aside class="mb-10 lg:mb-0">
      <PageContents :items="contents" />
    </aside>

    <div class="min-w-0 space-y-14">
      <section id="read-first" class="scroll-mt-24">
        <div class="border-l-4 border-primary bg-muted p-5">
          <h3 class="flex items-center gap-2 font-bold">
            <Scale class="size-4 text-primary" aria-hidden="true" /> Please read this first
          </h3>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm marker:text-primary">
            <li>
              <strong>Budgeted is not the same as spent.</strong>
              An amount in the budget is money set aside for a project. It does not show whether the money was released, spent, or the project finished.
            </li>
            <li>
              <strong>The 2027 budget is a proposal, not yet law.</strong>
              Its amounts come from the National Expenditure Program (NEP), the President’s proposed budget, and from House Bill 10858, the House of Representatives’ version. The final budget may differ.
            </li>
            <li>
              <strong>A difference between versions or years is not wrongdoing.</strong>
              Projects added, removed, or changed are a normal part of the budget process, and the comparison of the 2027 versions is BetterGov.PH’s own reading of the documents.
            </li>
            <li>
              <strong>The list may be incomplete.</strong>
              Projects were found by the words “Catarman, Northern Samar” in their titles. A project in a Catarman barangay whose title does not name the town will not appear here.
            </li>
          </ul>
        </div>
      </section>

      <Tabs v-model="tab" :unmount-on-hide="false" class="gap-0">
        <div ref="tabsEl" class="scroll-mt-24">
          <TabsList aria-label="Budgets" class="relative grid h-auto w-full grid-cols-2 gap-0 rounded-none border-b-2 bg-transparent p-0">
            <TabsIndicator
              class="absolute top-0 -bottom-0.5 left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) border-b-2 border-primary bg-accent motion-reduce:transition-none"
              :class="indicatorReady ? 'transition-[width,translate] duration-300 ease-out' : 'opacity-0'"
            />
            <TabsTrigger
              v-for="x in tabItems"
              :key="x.id"
              :value="x.id"
              class="relative z-10 -mb-0.5 h-auto cursor-pointer flex-col items-start gap-0.5 border-0 border-b-2 border-transparent px-4 py-3 text-left whitespace-normal shadow-none hover:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none sm:px-5"
              :class="!indicatorReady && 'data-[state=active]:border-primary data-[state=active]:bg-accent!'"
            >
              <span class="text-base font-bold transition-colors duration-300 sm:text-lg" :class="tab === x.id && 'text-primary'">{{ x.label }}</span>
              <span class="text-sm font-normal text-muted-foreground">{{ x.detail }}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="proposed-2027" class="pt-8">
          <section id="proposed-2027" class="scroll-mt-24">
            <p class="mb-6 text-muted-foreground">The President’s proposal (NEP) and the House of Representatives’ version, side by side.</p>

            <dl class="grid gap-px overflow-hidden border bg-border md:grid-cols-3">
              <div class="bg-background p-5">
                <dt class="text-sm text-muted-foreground">Projects located in Catarman</dt>
                <dd class="mt-1 text-3xl font-bold tabular-nums text-primary">{{ townProjects.length }}</dd>
                <dd class="mt-2 text-sm text-muted-foreground">Public works by the Department of Public Works and Highways (DPWH).</dd>
              </div>
              <div class="bg-background p-5">
                <dt class="text-sm text-muted-foreground">Their total in the House bill</dt>
                <dd class="mt-1 text-3xl font-bold tabular-nums text-primary" :title="peso(townHouse)">{{ short(townHouse) }}</dd>
                <dd class="mt-2 text-sm text-muted-foreground">
                  <template v-if="townHouse === townNep">The same total as the NEP.</template>
                  <template v-else>Against {{ short(townNep) }} in the NEP.</template>
                </dd>
              </div>
              <div class="bg-background p-5">
                <dt class="text-sm text-muted-foreground">On national roads named after Catarman</dt>
                <dd class="mt-1 text-3xl font-bold tabular-nums text-primary" :title="peso(roadHouse)">{{ short(roadHouse) }}</dd>
                <dd class="mt-2 text-sm text-muted-foreground">{{ roadProjects.length }} road sections and bridges, many of them in neighbouring towns. Listed below.</dd>
              </div>
            </dl>

            <h3 class="mb-3 mt-6 font-bold">Located in Catarman ({{ townProjects.length }})</h3>
            <p v-if="dpwhSavedOn" class="mb-3 flex items-start gap-2.5 border p-4 text-sm">
              <BadgeCheck class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <strong>{{ dpwhConfirmed.length === townProjects.length ? `All ${townProjects.length}` : `${dpwhConfirmed.length} of ${townProjects.length}` }} are listed on the
                  <a :href="dpwhSource.url" target="_blank" rel="noopener" class="text-primary hover:underline">DPWH Transparency Portal</a></strong>
                at the same amount, checked on {{ dpwhSavedOn }}. Search the portal for a project’s DPWH code to see its supporting documents.
              </span>
            </p>
            <TableFilterBar
              v-model:query="town.query"
              v-model:barangay="town.barangay"
              :barangay-options="town.barangayOptions"
              :matched="town.filtered.length"
              :total="town.total"
              placeholder="Search by project, barangay, or DPWH code"
            />
            <div class="overflow-x-auto border">
              <table class="w-full min-w-[720px] text-sm">
                <thead class="bg-muted text-left">
                  <tr>
                    <th scope="col" class="px-4 py-3 font-semibold">Project, as written in the budget</th>
                    <th scope="col" class="px-4 py-3 text-right font-semibold">NEP</th>
                    <th scope="col" class="px-4 py-3 text-right font-semibold">House bill</th>
                    <th scope="col" class="px-4 py-3 font-semibold">Comparison</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  <tr v-if="!town.filtered.length">
                    <td colspan="4" class="px-4 py-8 text-center text-muted-foreground">No projects match. Try another word or barangay.</td>
                  </tr>
                  <tr v-for="p in town.pageRows" :key="p.id">
                    <td class="px-4 py-3">
                      <a :href="p.url" target="_blank" rel="noopener" class="font-medium hover:text-primary hover:underline">{{ p.title }}</a>
                      <span class="mt-0.5 block text-xs text-muted-foreground">{{ p.agency }} · {{ p.program }}</span>
                      <span v-if="p.dpwh" class="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <BadgeCheck class="size-3.5 text-primary" aria-hidden="true" /> DPWH code <span class="font-mono">{{ p.dpwh.code }}</span>
                      </span>
                    </td>
                    <td class="px-4 py-3 text-right tabular-nums">
                      <a v-if="p.pdf.nep" :href="p.pdf.nep" target="_blank" rel="noopener" class="hover:text-primary hover:underline" title="Open the page in the NEP">{{ peso(p.nep) }}</a>
                      <template v-else>{{ peso(p.nep) }}</template>
                    </td>
                    <td class="px-4 py-3 text-right tabular-nums">
                      <a v-if="p.pdf.hgab3" :href="p.pdf.hgab3" target="_blank" rel="noopener" class="hover:text-primary hover:underline" title="Open the page in the House bill">{{ peso(p.house) }}</a>
                      <template v-else>{{ peso(p.house) }}</template>
                    </td>
                    <td class="px-4 py-3">
                      {{ p.change }}<span v-if="p.unconfirmed" class="block text-xs text-muted-foreground">Match not yet confirmed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TablePager v-model:page="town.page" :page-count="town.pageCount" :from="town.from" :to="town.to" :count="town.filtered.length" />

            <Collapsible :unmount-on-hide="false" class="mt-4 border p-5 text-sm">
              <CollapsibleTrigger class="group flex w-full cursor-pointer items-center gap-2 text-left font-semibold">
                <ChevronRight class="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-90" aria-hidden="true" />On national roads named after Catarman ({{ roadProjects.length }})
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p class="mt-3 text-muted-foreground">
                  Sections and bridges of the Catarman–Laoang, Catarman–Calbayog, and Allen–Catarman roads. The budget does not say which town each one is in, and many are outside Catarman, so they are not counted above.
                </p>
                <div class="mt-4">
                  <TableFilterBar
                    v-model:query="roads.query"
                    :matched="roads.filtered.length"
                    :total="roads.total"
                    placeholder="Search by road or bridge name"
                  />
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full min-w-[600px]">
                    <thead class="text-left">
                      <tr class="border-b">
                        <th scope="col" class="py-2 pr-4 font-semibold">Project, as written in the budget</th>
                        <th scope="col" class="py-2 pr-4 text-right font-semibold">NEP</th>
                        <th scope="col" class="py-2 text-right font-semibold">House bill</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y">
                      <tr v-if="!roads.filtered.length">
                        <td colspan="3" class="py-6 text-center text-muted-foreground">No projects match. Try another word.</td>
                      </tr>
                      <tr v-for="p in roads.pageRows" :key="p.id">
                        <td class="py-2 pr-4">
                          <a :href="p.url" target="_blank" rel="noopener" class="hover:text-primary hover:underline">{{ p.title }}</a>
                          <span class="block text-xs text-muted-foreground">{{ p.program }}<template v-if="p.dpwh"> · DPWH code <span class="font-mono">{{ p.dpwh.code }}</span></template></span>
                        </td>
                        <td class="py-2 pr-4 text-right tabular-nums">{{ peso(p.nep) }}</td>
                        <td class="py-2 text-right tabular-nums">{{ peso(p.house) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <TablePager v-model:page="roads.page" :page-count="roads.pageCount" :from="roads.from" :to="roads.to" :count="roads.filtered.length" />
              </CollapsibleContent>
            </Collapsible>

            <p class="mt-4 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
              <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Source: <a :href="budgetSource.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">{{ budgetSource.name }}</a>,
                {{ budgetSource.publisher }}, data as of {{ builtOn }}. Each amount links to its page in the budget document; each title links to BetterGov.PH’s record of the project.
                Projects in Catarman, Camiguin and in Barangay Catarman, Cebu, which share the name, are left out.
              </span>
            </p>
            <p v-if="dpwhSavedOn" class="mt-2 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
              <BadgeCheck class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Checked against the <a :href="dpwhSource.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">{{ dpwhSource.name }}</a>,
                for the {{ dpwhSource.office }}, on {{ dpwhSavedOn }}.
                <template v-for="(o, i) in dpwhSource.officeWide" :key="o.code">
                  {{ i === 0 ? 'DPWH also lists' : 'and' }} “{{ o.title }}” ({{ peso(o.amount) }}), which names the district office but not a town, so it is not counted here.
                </template>
              </span>
            </p>
          </section>
        </TabsContent>

        <TabsContent value="enacted" class="pt-8">
          <section id="enacted" class="scroll-mt-24">
            <p class="mb-6 text-muted-foreground">The yearly General Appropriations Act, the budget as passed into law. Choose a year to see its projects.</p>
            <ul class="space-y-1.5">
              <li v-for="y in enactedByYear" :key="y.year">
                <Button
                  variant="ghost"
                  :aria-pressed="selectedYear === y.year"
                  class="grid h-auto w-full grid-cols-[3rem_minmax(0,1fr)_auto] items-center justify-normal gap-3 whitespace-normal px-2 py-1.5 text-left font-normal has-[>svg]:px-2"
                  :class="selectedYear === y.year && 'bg-accent'"
                  @click="selectedYear = y.year"
                >
                  <span class="font-bold tabular-nums" :class="selectedYear === y.year && 'text-primary'">{{ y.year }}</span>
                  <span class="h-5 bg-muted">
                    <span class="block h-full" :class="selectedYear === y.year ? 'bg-primary' : 'bg-primary/40'" :style="{ width: `${(y.total / enactedMax) * 100}%` }" />
                  </span>
                  <span class="w-36 text-right tabular-nums sm:w-48">
                    <strong>{{ short(y.total) }}</strong>
                    <span class="text-muted-foreground"> · {{ y.projects.length }} projects</span>
                  </span>
                </Button>
              </li>
            </ul>

            <h3 class="mb-3 mt-6 font-bold">{{ selected.year }}: {{ selected.projects.length }} projects, {{ peso(selected.total) }}</h3>
            <TableFilterBar
              v-model:query="enacted.query"
              v-model:barangay="enacted.barangay"
              :barangay-options="enacted.barangayOptions"
              :matched="enacted.filtered.length"
              :total="enacted.total"
              placeholder="Search by project or barangay"
            />
            <div class="overflow-x-auto border">
              <table class="w-full min-w-[600px] text-sm">
                <thead class="bg-muted text-left">
                  <tr>
                    <th scope="col" class="px-4 py-3 font-semibold">Project, as written in the budget</th>
                    <th scope="col" class="px-4 py-3 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  <tr v-if="!enacted.filtered.length">
                    <td colspan="2" class="px-4 py-8 text-center text-muted-foreground">No projects match. Try another word or barangay.</td>
                  </tr>
                  <tr v-for="p in enacted.pageRows" :key="p.title">
                    <td class="px-4 py-3">
                      {{ p.title }}
                      <span class="mt-0.5 block text-xs text-muted-foreground">{{ p.department }}</span>
                    </td>
                    <td class="px-4 py-3 text-right tabular-nums">{{ peso(p.amount) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TablePager v-model:page="enacted.page" :page-count="enacted.pageCount" :from="enacted.from" :to="enacted.to" :count="enacted.filtered.length" />
            <p class="mt-4 flex items-start gap-3 bg-muted p-4 text-sm text-muted-foreground">
              <Info class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Source: <a :href="enactedSource.url" target="_blank" rel="noopener" class="font-medium text-primary hover:underline">{{ enactedSource.name }}</a>, {{ enactedSource.publisher }}.
                A project that runs in phases appears in each year it was given money. Sections of national roads named after Catarman are not counted, because the budget does not say which town they are in.
              </span>
            </p>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
