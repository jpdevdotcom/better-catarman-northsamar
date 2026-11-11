import type { Component } from 'vue'
import {
  Baby,
  Briefcase,
  Building2,
  FileText,
  GraduationCap,
  HandHeart,
  HardHat,
  HeartPulse,
  Landmark,
  Leaf,
  Receipt,
  ShieldAlert,
  Sprout,
  Store,
  Users,
  Accessibility,
  Heart,
  Home,
} from '@lucide/vue'

/**
 * All site content lives in this file so it is easy to review and correct.
 * Anything marked `verified: false` (or left as `null`) still needs to be
 * confirmed with the Municipal Government of Catarman before going live.
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

export interface Service {
  name: string
  description: string
  office: string
  requirements: string[]
}

export interface Category {
  slug: string
  title: string
  short: string
  description: string
  icon: Component
  services: Service[]
}

export const categories: Category[] = [
  {
    slug: 'certificates',
    title: 'Certificates & Vital Records',
    short: 'Certificates',
    description: 'Birth, marriage, and death certificates, and other civil registry documents.',
    icon: FileText,
    services: [
      {
        name: 'Birth Certificate',
        description: 'Request a certified copy of a birth record registered in Catarman, or register a newborn.',
        office: 'Municipal Civil Registrar',
        requirements: ['Valid ID of the requester', 'Full name, date and place of birth, and parents’ names', 'Authorization letter if requesting for someone else'],
      },
      {
        name: 'Marriage License & Certificate',
        description: 'Apply for a marriage license or request a certified copy of a marriage record.',
        office: 'Municipal Civil Registrar',
        requirements: ['PSA birth certificates of both applicants', 'Certificate of No Marriage (CENOMAR)', 'Valid IDs', 'Pre-marriage counseling certificate', 'Parental consent or advice, if applicable by age'],
      },
      {
        name: 'Death Certificate',
        description: 'Register a death or request a certified copy of a death record.',
        office: 'Municipal Civil Registrar',
        requirements: ['Valid ID of the requester', 'Name of the deceased, and date and place of death', 'Medical certificate of death (for registration)'],
      },
      {
        name: 'Correction of Clerical Error',
        description: 'File a petition to correct a typographical error or change a first name in a civil registry record (RA 9048 / RA 10172).',
        office: 'Municipal Civil Registrar',
        requirements: ['Certified copy of the record to be corrected', 'At least two supporting public or private documents', 'Valid ID of the petitioner'],
      },
    ],
  },
  {
    slug: 'business',
    title: 'Business, Trade & Investment',
    short: 'Business Permits',
    description: 'New business permits, renewals, and registration requirements.',
    icon: Store,
    services: [
      {
        name: 'New Business Permit',
        description: 'Apply for a Mayor’s Permit to legally operate a new business in Catarman.',
        office: 'Business Permits and Licensing Office (BPLO)',
        requirements: ['DTI, SEC, or CDA registration', 'Barangay business clearance', 'Contract of lease or proof of ownership of the business location', 'Community Tax Certificate (cedula)', 'Occupancy permit and fire safety inspection certificate'],
      },
      {
        name: 'Business Permit Renewal',
        description: 'Renew your Mayor’s Permit. Renewals are due every January.',
        office: 'Business Permits and Licensing Office (BPLO)',
        requirements: ['Previous year’s Mayor’s Permit', 'Barangay business clearance', 'Declaration of gross sales or receipts for the previous year', 'Community Tax Certificate (cedula)'],
      },
      {
        name: 'Business Closure / Retirement',
        description: 'Formally close a business so that taxes and fees stop accruing.',
        office: 'Business Permits and Licensing Office (BPLO)',
        requirements: ['Letter of request for retirement of business', 'Original Mayor’s Permit', 'Barangay certification of closure', 'Proof of payment of taxes due'],
      },
    ],
  },
  {
    slug: 'tax-payments',
    title: 'Taxation & Payments',
    short: 'Tax Payments',
    description: 'Real property tax, business tax, cedula, and tax clearances.',
    icon: Receipt,
    services: [
      {
        name: 'Real Property Tax (Amilyar)',
        description: 'Pay the annual tax on land, buildings, and machinery.',
        office: 'Municipal Treasurer’s Office',
        requirements: ['Latest tax declaration or previous official receipt', 'Valid ID'],
      },
      {
        name: 'Community Tax Certificate (Cedula)',
        description: 'Get a cedula, commonly required for permits, notarized documents, and other transactions.',
        office: 'Municipal Treasurer’s Office',
        requirements: ['Valid ID', 'Declaration of income or proof of earnings'],
      },
      {
        name: 'Tax Clearance',
        description: 'Certification that you have no unpaid real property or business taxes.',
        office: 'Municipal Treasurer’s Office',
        requirements: ['Official receipts of taxes paid for the current year', 'Valid ID'],
      },
      {
        name: 'Tax Declaration & Assessment',
        description: 'Request a certified copy of a tax declaration, or have a property assessed or transferred.',
        office: 'Municipal Assessor’s Office',
        requirements: ['Title or deed of the property', 'Tax clearance', 'Valid ID of the owner or authorized representative'],
      },
    ],
  },
  {
    slug: 'social-services',
    title: 'Social Services & Assistance',
    short: 'Social Services',
    description: 'Support for senior citizens, persons with disability, solo parents, and families in crisis.',
    icon: HandHeart,
    services: [
      {
        name: 'Senior Citizen ID',
        description: 'ID for residents aged 60 and above, used for discounts and benefits.',
        office: 'Office for Senior Citizens Affairs (OSCA)',
        requirements: ['Birth certificate or any valid ID showing date of birth', 'Barangay certificate of residency', '1x1 ID photos'],
      },
      {
        name: 'PWD ID',
        description: 'ID for persons with disability, used for discounts and benefits.',
        office: 'Municipal Social Welfare and Development Office (MSWDO)',
        requirements: ['Medical certificate or certificate of disability', 'Barangay certificate of residency', '1x1 ID photos'],
      },
      {
        name: 'Solo Parent ID',
        description: 'ID and benefits for solo parents under the Expanded Solo Parents Welfare Act.',
        office: 'Municipal Social Welfare and Development Office (MSWDO)',
        requirements: ['Barangay certificate of residency and solo-parent status', 'Birth certificates of children', 'Proof of income', '1x1 ID photos'],
      },
      {
        name: 'Assistance to Individuals in Crisis',
        description: 'Medical, burial, and emergency assistance for residents in difficult situations.',
        office: 'Municipal Social Welfare and Development Office (MSWDO)',
        requirements: ['Barangay certificate of indigency', 'Valid ID', 'Supporting documents (medical abstract, hospital bill, or death certificate)'],
      },
    ],
  },
  {
    slug: 'health',
    title: 'Health & Wellness',
    short: 'Health Services',
    description: 'Check-ups, immunization, health certificates, and medical programs.',
    icon: HeartPulse,
    services: [
      {
        name: 'Medical Consultation',
        description: 'Free primary care check-ups at the Rural Health Unit and barangay health stations.',
        office: 'Municipal Health Office',
        requirements: ['Any ID or individual treatment record, if available'],
      },
      {
        name: 'Immunization',
        description: 'Routine vaccines for infants and children, and other vaccination programs.',
        office: 'Municipal Health Office',
        requirements: ['Child’s immunization card or mother-and-baby booklet'],
      },
      {
        name: 'Health Certificate',
        description: 'Required for food handlers and workers in certain establishments.',
        office: 'Municipal Health Office',
        requirements: ['Laboratory results as required (e.g. stool exam, chest X-ray)', 'Community Tax Certificate (cedula)', '1x1 ID photo'],
      },
      {
        name: 'Maternal & Child Care',
        description: 'Prenatal check-ups, family planning, and nutrition services.',
        office: 'Municipal Health Office',
        requirements: ['Mother-and-baby booklet, if available'],
      },
    ],
  },
  {
    slug: 'agriculture',
    title: 'Agriculture & Fisheries',
    short: 'Agriculture',
    description: 'Farmer and fisherfolk registration, seeds, and technical assistance.',
    icon: Sprout,
    services: [
      {
        name: 'Farmer Registration (RSBSA)',
        description: 'Register in the Registry System for Basic Sectors in Agriculture to qualify for government programs.',
        office: 'Municipal Agriculture Office',
        requirements: ['Valid ID', 'Proof of land ownership or tenancy', '2x2 ID photo'],
      },
      {
        name: 'Fisherfolk Registration (FishR)',
        description: 'Register as a municipal fisherfolk and register fishing boats and gear.',
        office: 'Municipal Agriculture Office',
        requirements: ['Valid ID', 'Barangay certificate of residency', '2x2 ID photo'],
      },
      {
        name: 'Seeds, Seedlings & Farm Inputs',
        description: 'Request available seeds, seedlings, fertilizer, and technical advice.',
        office: 'Municipal Agriculture Office',
        requirements: ['RSBSA registration', 'Letter of request'],
      },
    ],
  },
  {
    slug: 'infrastructure',
    title: 'Infrastructure & Building',
    short: 'Building Permits',
    description: 'Building, occupancy, and zoning permits and public works requests.',
    icon: HardHat,
    services: [
      {
        name: 'Building Permit',
        description: 'Required before constructing, renovating, or demolishing a structure.',
        office: 'Municipal Engineering Office / Office of the Building Official',
        requirements: ['Proof of lot ownership or consent of the owner', 'Signed and sealed building plans', 'Bill of materials and specifications', 'Zoning / locational clearance', 'Barangay clearance'],
      },
      {
        name: 'Occupancy Permit',
        description: 'Required before a newly built structure can be used.',
        office: 'Municipal Engineering Office / Office of the Building Official',
        requirements: ['Approved building permit and plans', 'Certificate of completion', 'Fire safety inspection certificate'],
      },
      {
        name: 'Zoning / Locational Clearance',
        description: 'Confirms that a planned land use is allowed in its location.',
        office: 'Municipal Planning and Development Office',
        requirements: ['Proof of lot ownership', 'Vicinity map and site plan', 'Barangay clearance'],
      },
    ],
  },
  {
    slug: 'education',
    title: 'Education & Scholarship',
    short: 'Education',
    description: 'Scholarships, student assistance, and local schools.',
    icon: GraduationCap,
    services: [
      {
        name: 'Scholarship & Educational Assistance',
        description: 'Financial support for qualified students residing in Catarman, subject to program availability.',
        office: 'Office of the Municipal Mayor',
        requirements: ['Certificate of enrollment or registration', 'Latest grades', 'Barangay certificate of residency and indigency'],
      },
      {
        name: 'Schools in Catarman',
        description: 'Catarman is home to the University of Eastern Philippines, Catarman National High School, and many other public and private schools.',
        office: 'DepEd Northern Samar Division / respective schools',
        requirements: ['Contact the school directly for admission requirements'],
      },
    ],
  },
  {
    slug: 'public-safety',
    title: 'Public Safety & Disaster Response',
    short: 'Public Safety',
    description: 'Emergency response, disaster preparedness, and clearances.',
    icon: ShieldAlert,
    services: [
      {
        name: 'Emergency Response',
        description: 'Rescue and response during typhoons, floods, fires, and accidents. For life-threatening emergencies, call 911.',
        office: 'Municipal Disaster Risk Reduction and Management Office (MDRRMO)',
        requirements: ['None — call for help right away'],
      },
      {
        name: 'Police Clearance',
        description: 'Clearance for employment, travel, and other legal purposes.',
        office: 'Catarman Municipal Police Station',
        requirements: ['Two valid IDs', 'Barangay clearance', 'Online appointment via the National Police Clearance System'],
      },
      {
        name: 'Fire Safety Inspection Certificate',
        description: 'Required for business permits and occupancy permits.',
        office: 'Bureau of Fire Protection – Catarman',
        requirements: ['Application form', 'Business or building permit documents', 'Fire insurance policy, if any'],
      },
    ],
  },
  {
    slug: 'environment',
    title: 'Environment & Natural Resources',
    short: 'Environment',
    description: 'Waste collection, tree-cutting permits, and environmental programs.',
    icon: Leaf,
    services: [
      {
        name: 'Solid Waste Collection',
        description: 'Garbage collection schedules and segregation rules for households and businesses.',
        office: 'Municipal Environment and Natural Resources Office (MENRO)',
        requirements: ['Segregate waste at source (biodegradable, recyclable, residual)'],
      },
      {
        name: 'Tree-Cutting Endorsement',
        description: 'Local endorsement needed before applying for a DENR tree-cutting permit.',
        office: 'Municipal Environment and Natural Resources Office (MENRO)',
        requirements: ['Letter of request', 'Proof of land ownership', 'Barangay certification', 'Photos of the trees concerned'],
      },
    ],
  },
]

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
  { label: 'Paying property tax', icon: Building2, to: '/services/tax-payments' },
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
    a: 'If your birth was registered in Catarman, go to the Municipal Civil Registrar with a valid ID and your birth details. You can also request a PSA copy at any PSA outlet or online.',
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
    a: 'Fees are set by local ordinance and can change. This site does not list amounts — please confirm the current fee with the office handling your request.',
  },
  {
    q: 'Something on this site is wrong or outdated. What should I do?',
    a: 'Please tell us. BetterCatarman is maintained by volunteers and corrections are welcome — see the Contact page.',
  },
]
