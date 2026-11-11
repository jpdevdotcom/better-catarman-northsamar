import type { Component } from 'vue'
import { Accessibility, Baby, Briefcase, Building2, HandHeart, Heart, Home, Users } from '@lucide/vue'

/**
 * General site content. Services live in ./services, officials and offices in
 * ./government, and barangays in ./barangays.
 */

export const site = {
  name: 'BetterCatarman',
  municipality: 'Catarman',
  province: 'Northern Samar',
  region: 'Eastern Visayas (Region VIII)',
  zip: '6400',
  officialWebsite: 'https://catarman.gov.ph',
  coordinates: { lat: 12.4994, lng: 124.6328 },
  officeHours: 'Monday to Friday, 8:00 AM – 5:00 PM',
  address: 'Municipal Hall, Catarman, Northern Samar 6400',
  phones: ['(055) 500-0712', '0915-836-8555'],
  email: 'lgu.catarman@gmail.com',
}

export const nav = [
  { label: 'Services', to: '/services' },
  { label: 'Barangays', to: '/barangays' },
  { label: 'Government', to: '/government' },
  { label: 'Statistics', to: '/statistics' },
  { label: 'Transparency', to: '/transparency' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export * from './services'

export const popularSlugs = ['certificates', 'business', 'tax-payments', 'social-services', 'health', 'public-safety']

export const popularSearches = ['Birth Certificate', 'Business Permit', 'Real Property Tax', 'Senior Citizen ID']

export const lifeEvents: { label: string; icon: Component; to: string }[] = [
  { label: 'Having a baby', icon: Baby, to: '/services/certificates' },
  { label: 'Getting married', icon: Heart, to: '/services/certificates' },
  { label: 'Starting a business', icon: Briefcase, to: '/services/business' },
  { label: 'Building or renovating', icon: Home, to: '/services/infrastructure' },
  { label: 'Need financial help', icon: HandHeart, to: '/services/social-services' },
  { label: 'Turning 60', icon: Users, to: '/services/social-services' },
  { label: 'Living with a disability', icon: Accessibility, to: '/services/social-services' },
  { label: 'Buying or inheriting land', icon: Building2, to: '/services/property' },
]

/** Source: Philippine Statistics Authority, via Wikipedia (retrieved Nov 2026). */
export const glance = [
  { value: '97,738', label: 'Population', note: '2024 Census' },
  { value: '55', label: 'Barangays', note: 'Administrative units' },
  { value: '1st Class', label: 'Municipality', note: 'Income classification' },
  { value: '464.43 km²', label: 'Land area', note: 'Total municipal area' },
]

export const quickFacts = [
  { label: 'Role', value: 'Capital of Northern Samar' },
  { label: 'Region', value: 'Eastern Visayas (Region VIII)' },
  { label: 'Legislative district', value: '1st District of Northern Samar' },
  { label: 'Households', value: '20,836 (2024)' },
  { label: 'Population density', value: '210 per km²' },
  { label: 'Registered voters', value: '63,766 (2025)' },
  { label: 'Poverty incidence', value: '24.44% (2023)' },
  { label: 'Demonym', value: 'Catarmananon' },
  { label: 'Languages', value: 'Waray (Ninorte Samarnon), Tagalog' },
  { label: 'ZIP code', value: '6400' },
  { label: 'Area code', value: '+63 (0)55' },
  { label: 'Electricity', value: 'NORSAMELCO' },
]

export const census = [
  { year: 1903, population: 9994 },
  { year: 1918, population: 13278 },
  { year: 1939, population: 21007 },
  { year: 1948, population: 33153 },
  { year: 1960, population: 39434 },
  { year: 1970, population: 44438 },
  { year: 1975, population: 53267 },
  { year: 1980, population: 59021 },
  { year: 1990, population: 50965 },
  { year: 1995, population: 61705 },
  { year: 2000, population: 67671 },
  { year: 2007, population: 81067 },
  { year: 2010, population: 84833 },
  { year: 2015, population: 94037 },
  { year: 2020, population: 97879 },
  { year: 2024, population: 97738 },
]

export const history = [
  {
    period: 'Before Spanish rule',
    text: 'Catarman, also known as Calatman or Cataruman, was a settlement at the mouth of the river of the same name, in the region then called Ibabao.',
  },
  {
    period: 'Spanish era',
    text: 'The settlement was one of the 13 villages in Samar adopted as pueblos by the Spaniards. The pueblo was named Calatman.',
  },
  {
    period: '1965',
    text: 'Northern Samar became a separate province, with Catarman as its capital.',
  },
  {
    period: '1974',
    text: 'Catarman became the seat of the newly established Roman Catholic Diocese of Catarman, with Our Lady of the Annunciation Parish Church as its cathedral.',
  },
  {
    period: 'Today',
    text: 'Catarman is the commercial, educational, and political center of Northern Samar, and the most populous municipality in Eastern Visayas.',
  },
]

/** Source: Wikipedia / DILG listing (retrieved Nov 2026). Confirm before launch. */
export const officials = [
  { role: 'Municipal Mayor', name: 'Hon. Dianne E. Rosales' },
  { role: 'Municipal Vice Mayor', name: 'Hon. Francisco C. Rosales Jr.' },
  { role: 'Representative, 1st District', name: 'Hon. Niko Raul S. Daza' },
]

/**
 * MDRRMO number is from catarman.gov.ph. Police and fire numbers are not published
 * there and must be supplied and verified before they are shown.
 */
export const hotlines: { name: string; numbers: string[]; note: string }[] = [
  { name: 'National Emergency Hotline', numbers: ['911'], note: 'Police, fire, and medical emergencies' },
  { name: 'Philippine Red Cross', numbers: ['143'], note: 'Ambulance and rescue' },
  { name: 'Catarman MDRRMO', numbers: ['0906-357-0985', '0949-141-3810'], note: 'Disaster and rescue' },
  { name: 'Catarman Police Station', numbers: [], note: 'Police assistance' },
  { name: 'BFP Catarman', numbers: [], note: 'Fire emergencies' },
]

/** Source: figures for fiscal year 2024 as cited on Wikipedia. Confirm with COA / BLGF. */
export const finances = {
  year: 2024,
  items: [
    { label: 'Revenue', value: 514.1 },
    { label: 'Expenditure', value: 471.9 },
    { label: 'Liabilities', value: 514.9 },
    { label: 'Assets', value: 1661 },
  ],
}

export const transparencyLinks = [
  { label: 'Official LGU Catarman website', href: 'https://catarman.gov.ph', note: 'Announcements, bids, and full disclosure documents' },
  { label: 'Freedom of Information (eFOI)', href: 'https://www.foi.gov.ph/', note: 'Request government records' },
  { label: 'BLGF Portal', href: 'https://blgf.gov.ph/', note: 'Local government financial data' },
  { label: 'Commission on Audit', href: 'https://www.coa.gov.ph/', note: 'Annual audit reports' },
  { label: 'PhilGEPS', href: 'https://www.philgeps.gov.ph/', note: 'Government procurement notices' },
  { label: 'Open Data Philippines', href: 'https://data.gov.ph', note: 'Public datasets' },
]

export const faqs = [
  {
    q: 'Is BetterCatarman the official website of the municipal government?',
    a: 'No. BetterCatarman is a community-run guide that makes public information about Catarman easier to find. For official transactions and announcements, contact the Municipal Hall or visit the official LGU website.',
  },
  {
    q: 'What are the Municipal Hall’s office hours?',
    a: 'Government offices are generally open Monday to Friday, 8:00 AM to 5:00 PM, except on holidays.',
  },
  {
    q: 'How do I get a copy of my birth certificate?',
    a: 'If your birth was registered in Catarman, request it from the Local Civil Registry Office, in person or through the municipal e-services site, with your name and date of birth. You can also request a PSA copy at any PSA outlet or online.',
  },
  {
    q: 'When should I renew my business permit?',
    a: 'Business permits are renewed every January. Renewing after the deadline usually comes with a surcharge, so prepare your barangay clearance and declaration of gross sales early.',
  },
  {
    q: 'Where do I pay real property tax?',
    a: 'At the Municipal Treasurer’s Office. Bring your latest tax declaration or your previous official receipt.',
  },
  {
    q: 'How much are the fees?',
    a: 'Fees are set by local ordinance and can change. Where the municipal government publishes a fee, such as for Assessor’s Office requests, it is shown on the service page. For everything else, please confirm the current fee with the office handling your request.',
  },
  {
    q: 'Something on this site is wrong or outdated. What should I do?',
    a: 'Please tell us. BetterCatarman is maintained by volunteers and corrections are welcome — see the Contact page.',
  },
]
