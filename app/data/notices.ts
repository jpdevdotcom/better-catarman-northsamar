/**
 * Notices and reminders shown on the Advisories page and the home page.
 *
 * These are written by the people who run BetterCatarman. They are NOT official
 * announcements of the municipal government. Add an entry only when it is true and has a
 * basis you can point to; put the newest first. Remove reminders once their date passes.
 */
export interface Notice {
  date: string
  kind: 'reminder' | 'site'
  title: string
  body: string
  due?: string
  to?: string
  basis?: string
}

export const notices: Notice[] = [
  {
    date: '2026-11-14',
    kind: 'site',
    title: 'Weather, advisories, and Filipino and Waray versions added',
    body: 'This page now shows the forecast for Catarman and what to do when a typhoon is coming. You can also read much of the site in Filipino or Waray using the language buttons at the top.',
  },
  {
    date: '2026-11-14',
    kind: 'reminder',
    title: 'Real property tax: fourth-quarter instalment',
    due: 'On or before 31 December 2026',
    body: 'If you pay your real property tax (amilyar) by quarter, the last instalment for the year is due at the Municipal Treasurer’s Office.',
    to: '/services/tax-payments/real-property-tax',
    basis: 'Local Government Code, Section 250',
  },
  {
    date: '2026-11-14',
    kind: 'reminder',
    title: 'Business permit renewal and business taxes',
    due: 'Within the first 20 days of January 2027',
    body: 'Business taxes are due in the first twenty days of January, when business permits are also renewed. The municipal government may extend the deadline, so check with the BPLO.',
    to: '/services/business/business-permit',
    basis: 'Local Government Code, Section 167',
  },
  {
    date: '2026-11-12',
    kind: 'site',
    title: 'Barangay officials may be changing',
    body: 'Barangay and Sangguniang Kabataan elections were held on 2 November 2026. The officials listed on each barangay page come from the DILG directory and may still be the outgoing ones until it is updated.',
    to: '/barangays',
  },
  {
    date: '2026-11-11',
    kind: 'site',
    title: '2025 audit report added to Transparency',
    body: 'The Commission on Audit’s 2025 report for Catarman is now on the Transparency page: income, expenses, assets, and liabilities, the auditor’s observations, and the municipal government’s responses.',
    to: '/transparency',
    basis: 'Commission on Audit, Catarman Annual Audit Report 2025',
  },
]

/** Where official advisories are posted. */
export const officialChannels = [
  { label: 'Municipal government website', href: 'https://catarman.gov.ph' },
  { label: 'Catarman MDRRMO on Facebook', href: 'https://www.facebook.com/catarman.mdrrmo.9' },
  { label: 'PAGASA tropical cyclone bulletin', href: 'https://www.pagasa.dost.gov.ph/tropical-cyclone/severe-weather-bulletin' },
  { label: 'PAGASA daily weather forecast', href: 'https://www.pagasa.dost.gov.ph/weather' },
  { label: 'PAGASA Visayas regional forecast', href: 'https://www.pagasa.dost.gov.ph/regional-forecast/visprsd' },
]

/** PAGASA Tropical Cyclone Wind Signals (system in use since 2022). Wind speeds in km/h. */
export const windSignals = [
  { signal: 1, winds: '39–61', hours: 36 },
  { signal: 2, winds: '62–88', hours: 24 },
  { signal: 3, winds: '89–117', hours: 18 },
  { signal: 4, winds: '118–184', hours: 12 },
  { signal: 5, winds: '185', hours: 12, orHigher: true },
]

/** General preparedness steps. Not specific to Catarman's evacuation plan. */
export const preparedness = [
  'Charge phones, power banks, and flashlights.',
  'Store drinking water and food that needs no cooking, enough for three days.',
  'Prepare a go bag: medicines, first aid, clothes, cash, and a whistle.',
  'Keep IDs and important documents in a waterproof bag.',
  'Ask your barangay where the evacuation center is, and how you will get there.',
  'If you live near the river or the coast, leave early when told to evacuate.',
  'Save the hotlines on this page.',
]
