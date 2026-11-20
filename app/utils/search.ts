import { barangayOfficials } from '~/data/barangayOfficials'
import { barangays } from '~/data/barangays'
import { facilities } from '~/data/facilities'
import { councilors, executive, offices, representative } from '~/data/government'
import { allServices, requirementText } from '~/data/services'
import { faqs, hotlines } from '~/data/site'

/**
 * One search across the whole site. The index is built from the same data files the pages
 * use, so it never falls out of step with them. Everything runs in the browser.
 */
export type ResultType = 'service' | 'barangay' | 'office' | 'official' | 'facility' | 'hotline' | 'page' | 'faq'

export interface SearchEntry {
  type: ResultType
  title: string
  /** Short line shown under the title. */
  detail: string
  to: string
  /** Main words: a match here ranks higher. */
  primary: string
  /** Everything else that should match. */
  extra: string
}

const nameOf = Object.fromEntries(barangays.map(b => [b.slug, b.name]))

const PAGES: [string, string, string][] = [
  ['Services', '/services', 'requirements permits certificates what to bring'],
  ['Barangays', '/barangays', 'barangay directory population map'],
  ['Advisories', '/advisories', 'weather typhoon bagyo signal pagasa forecast notices reminders'],
  ['Schools and health facilities', '/facilities', 'schools hospital health center clinic eskwelahan ospital'],
  ['Government', '/government', 'mayor vice mayor council sangguniang bayan offices department heads'],
  ['Statistics', '/statistics', 'population census households area'],
  ['Transparency', '/transparency', 'budget finances income expenses audit coa'],
  ['National projects', '/projects', 'dpwh projects roads bridges budget nep gaa infrastructure proyekto'],
  ['About the Data', '/about', 'sources where information comes from'],
  ['FAQ', '/faq', 'questions'],
  ['Contact', '/contact', 'address office hours map hotline'],
  ['Report a correction', '/report', 'wrong mistake outdated error feedback'],
]

export const searchIndex: SearchEntry[] = [
  ...allServices.map(s => ({
    type: 'service' as const, title: s.name, detail: `${s.category.short} · ${s.office}`,
    to: `/services/${s.category.slug}/${s.slug}`, primary: s.name, extra: `${s.description} ${s.office} ${s.category.title} ${requirementText(s)}`,
  })),
  ...barangays.map(b => ({
    type: 'barangay' as const, title: `Barangay ${b.name}`, detail: `${b.pop2020.toLocaleString('en-PH')} residents (2020)${b.poblacion ? ' · Poblacion' : ''}`,
    to: `/barangays/${b.slug}`, primary: b.name, extra: 'barangay',
  })),
  ...offices.map(o => ({
    type: 'office' as const, title: o.name, detail: [o.short, o.head].filter(Boolean).join(' · '),
    to: '/government#offices', primary: `${o.name} ${o.short}`, extra: `${o.handles} ${o.head ?? ''} ${o.phones.join(' ')} ${o.email ?? ''}`,
  })),
  ...executive.map(o => ({
    type: 'official' as const, title: o.name, detail: o.role, to: '/government#executive', primary: o.name, extra: `${o.role} ${o.phones.join(' ')}`,
  })),
  { type: 'official' as const, title: representative.name, detail: representative.role, to: '/government#executive', primary: representative.name, extra: representative.role },
  ...councilors.filter(c => c.name).map(c => ({
    type: 'official' as const, title: c.name!, detail: 'Sangguniang Bayan member', to: '/government#legislative', primary: c.name!, extra: `${c.role} councilor konsehal`,
  })),
  ...Object.entries(barangayOfficials).flatMap(([slug, b]) => b.officials.map(o => ({
    type: 'official' as const, title: o.name, detail: `${o.position}, Barangay ${nameOf[slug]}`,
    to: `/barangays/${slug}#officials`, primary: o.name, extra: `${o.position} ${nameOf[slug]} ${o.position === 'Punong Barangay' ? 'kapitan captain' : ''}`,
  }))),
  ...facilities.map(f => ({
    type: 'facility' as const, title: f.name, detail: `${f.detail}${f.barangay ? ` · Barangay ${nameOf[f.barangay]}` : ''}`,
    to: f.barangay ? `/barangays/${f.barangay}#places` : '/facilities', primary: f.name, extra: `${f.detail} ${f.district ?? ''} ${nameOf[f.barangay ?? ''] ?? ''}`,
  })),
  ...hotlines.map(h => ({
    type: 'hotline' as const, title: h.name, detail: h.numbers.join(' · ') || 'N/A', to: '/contact', primary: h.name, extra: `${h.note} ${h.numbers.join(' ')} hotline emergency`,
  })),
  ...faqs.map(f => ({ type: 'faq' as const, title: f.q, detail: 'FAQ', to: '/faq', primary: f.q, extra: f.a })),
  ...PAGES.map(([title, to, extra]) => ({ type: 'page' as const, title, detail: 'Page', to, primary: title, extra })),
]

/** Lowercase, no accents, so "dona" finds "Doña" and "cedula" finds "Cédula". */
export const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const prepared = searchIndex.map(e => ({ e, primary: normalize(e.primary), all: normalize(`${e.title} ${e.primary} ${e.detail} ${e.extra}`) }))

/** Entries containing every word of the query, best matches first. */
export function search(query: string): SearchEntry[] {
  const words = normalize(query).split(/\s+/).filter(w => w.length > 1 || /\d/.test(w))
  if (!words.length) return []
  const typeRank: Record<ResultType, number> = { page: 0, service: 1, barangay: 2, office: 3, hotline: 4, facility: 5, official: 6, faq: 7 }
  return prepared
    .filter(p => words.every(w => p.all.includes(w)))
    .map((p) => {
      let score = typeRank[p.e.type]
      if (p.primary === words.join(' ')) score -= 30
      else if (p.primary.startsWith(words[0]!)) score -= 20
      else if (words.every(w => p.primary.includes(w))) score -= 10
      return { e: p.e, score }
    })
    .sort((a, b) => a.score - b.score)
    .map(r => r.e)
}
