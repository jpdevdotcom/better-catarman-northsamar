/**
 * Where the information on this site comes from. Shown on the /about (About the Data) page.
 * Keep this in step with the data files whenever content is added or changed.
 */

export type Scope = 'catarman-official' | 'catarman-data' | 'national' | 'open'

export const scopes: Record<Scope, { label: string, description: string }> = {
  'catarman-official': {
    label: 'Catarman official',
    description: 'Published by the Municipal Government of Catarman itself.',
  },
  'catarman-data': {
    label: 'About Catarman',
    description: 'Figures and records specifically about Catarman, from national agencies and public references.',
  },
  'national': {
    label: 'National rules',
    description: 'Laws and agency guidelines that apply everywhere in the Philippines. They are not specific to Catarman, so the local office may ask for more.',
  },
  'open': {
    label: 'Open data',
    description: 'Community-maintained map data.',
  },
}

export interface Source {
  name: string
  publisher: string
  url?: string
  scope: Scope
  /** What on this site relies on it. */
  usedFor: string
}

export const lastChecked = 'November 2026'

export const sources: Source[] = [
  // --- Catarman official
  { scope: 'catarman-official', name: 'Governance: departments and office heads', publisher: 'Municipality of Catarman E-Services', url: 'https://catarman.gov.ph/governance', usedFor: 'Names of the Mayor, Vice Mayor, and the heads of 22 offices, with their phone numbers and emails.' },
  { scope: 'catarman-official', name: 'Contact Us', publisher: 'Municipality of Catarman E-Services', url: 'https://catarman.gov.ph/contact', usedFor: 'Mobile numbers of municipal offices and the MDRRMO hotline.' },
  { scope: 'catarman-official', name: 'Service requirement checklists', publisher: 'Municipality of Catarman E-Services', url: 'https://catarman.gov.ph', usedFor: 'Requirements for civil registry certificates, business permits, cedula, building and electrical permits, zoning, and real property assessment, including the official PDF checklists and Assessor’s Office fees.' },
  { scope: 'catarman-official', name: 'About the Municipality of Catarman', publisher: 'Municipality of Catarman E-Services', url: 'https://catarman.gov.ph/about', usedFor: 'Number of barangays and general description of the municipality.' },

  // --- About Catarman
  { scope: 'catarman-data', name: 'Census of Population, 2015, 2020, and 2024', publisher: 'Philippine Statistics Authority', url: 'https://psa.gov.ph', usedFor: 'Catarman’s population, households, and census history. Figures were read from the Wikipedia and PhilAtlas pages below, which tabulate PSA data.' },
  { scope: 'catarman-data', name: 'Catarman, Northern Samar: barangay population table', publisher: 'PhilAtlas', url: 'https://www.philatlas.com/visayas/r08/northern-samar/catarman.html', usedFor: 'Population of each of the 55 barangays in 2020 and 2015.' },
  { scope: 'catarman-data', name: 'Catarman, Northern Samar', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Catarman,_Northern_Samar', usedFor: 'Land area, income class, poverty incidence, 2024 finance figures, list of barangays, history, and the Sangguniang Bayan members (citing the DILG masterlist of officials).' },
  { scope: 'catarman-data', name: 'Catarman 2025 local election results', publisher: 'Rappler', url: 'https://ph.rappler.com/elections/2025/local-race/northern-samar/catarman', usedFor: 'Cross-check of the Mayor, Vice Mayor, and the eight elected councilors, and their order by votes.' },

  // --- National rules
  { scope: 'national', name: 'Crisis assistance requirements', publisher: 'DSWD Field Office VIII (Eastern Visayas)', url: 'https://fo8.dswd.gov.ph/cis-assistance-requirements/', usedFor: 'Assistance to Individuals in Crisis.' },
  { scope: 'national', name: 'Revised implementing rules of the Solo Parents Welfare Act (RA 8972, as amended by RA 11861)', publisher: 'Department of Social Welfare and Development', url: 'https://lawyerly.ph/laws/view/l17768', usedFor: 'Solo Parent ID.' },
  { scope: 'national', name: 'Procedures in ID issuance to persons with disability; Administrative Order No. 001, s. 2021', publisher: 'National Council on Disability Affairs', url: 'https://ncda.gov.ph/?p=208', usedFor: 'PWD ID.' },
  { scope: 'national', name: 'Expanded Senior Citizens Act (RA 9994) and implementing rules', publisher: 'Republic of the Philippines', usedFor: 'Senior Citizen ID.' },
  { scope: 'national', name: 'Family Code of the Philippines, Articles 11 to 20', publisher: 'Republic of the Philippines', usedFor: 'Marriage License.' },
  { scope: 'national', name: 'RA 9048, as amended by RA 10172', publisher: 'Philippine Statistics Authority', url: 'https://psa.gov.ph/content/press-statement-republic-act-10172', usedFor: 'Correction of Clerical Error or Change of First Name.' },
  { scope: 'national', name: 'Local Government Code (RA 7160), Sections 250, 251, and 255', publisher: 'Republic of the Philippines', usedFor: 'Real Property Tax instalment dates, discounts, and interest.' },
  { scope: 'national', name: 'RSBSA frequently asked questions', publisher: 'Department of Agriculture', url: 'https://car.da.gov.ph/wp-content/uploads/2024/02/RSBSA-FAQs.pdf', usedFor: 'Farmer Registration.' },
  { scope: 'national', name: 'Fisherfolk Registration (FishR)', publisher: 'Bureau of Fisheries and Aquatic Resources', url: 'https://region5.bfar.da.gov.ph/fishr-and-boatr/', usedFor: 'Fisherfolk Registration.' },
  { scope: 'national', name: 'National Police Clearance System', publisher: 'Philippine National Police', url: 'https://pnpclearance.ph', usedFor: 'National Police Clearance.' },
  { scope: 'national', name: 'Fire Code of the Philippines (RA 9514) and implementing rules', publisher: 'Bureau of Fire Protection', usedFor: 'Fire Safety Inspection Certificate.' },
  { scope: 'national', name: 'Code on Sanitation of the Philippines (PD 856)', publisher: 'Department of Health', usedFor: 'Health Certificate.' },

  // --- Open data
  { scope: 'open', name: 'OpenStreetMap', publisher: '© OpenStreetMap contributors (ODbL)', url: 'https://www.openstreetmap.org/copyright', usedFor: 'Catarman’s outline and the approximate location of each barangay. These are community-mapped points, not official boundaries.' },
  { scope: 'open', name: 'Google Maps', publisher: 'Google', url: 'https://www.google.com/maps', usedFor: 'The background map shown on barangay and contact pages.' },
]

/** Things this site does not yet have a source for, stated plainly. */
export const gaps = [
  'Police and fire station hotlines for Catarman.',
  'Committee assignments of Sangguniang Bayan members, and the Liga ng mga Barangay and SK Federation presidents.',
  'Map locations of five barangays: Acacia, Casoy, Daganas, Jose P. Rizal, and Santol.',
  'Barangay population from the 2024 census. The 2020 figures are shown instead.',
  'Phone numbers for the Local Civil Registry, Accounting, and Nutrition Action offices.',
]

/** Plain-language guide to the labels and figures used across the site. */
export const howToRead = [
  'This is a community guide, not the municipal government’s website. The office concerned always has the final word.',
  '“Official checklist” means the requirements were copied from the municipal government’s own site, catarman.gov.ph.',
  '“Based on national rules” means Catarman has not published its own checklist, so the page uses a national law or agency guideline. The local office may ask for more.',
  'A service with neither label is general guidance only. Use it as a starting point.',
  '“N/A” means the detail is not published by our sources. It does not mean the office has no phone number or email.',
  'A fee is shown only where an official source publishes it. No fee shown does not mean the service is free.',
  'Population figures are census counts for the year stated beside them, not current estimates.',
  'Dots on the barangay maps mark an approximate centre. They are not official boundaries.',
]

export const glossary: { term: string, meaning: string }[] = [
  { term: 'LGU', meaning: 'Local government unit. Here it means the Municipal Government of Catarman.' },
  { term: 'Barangay', meaning: 'The smallest unit of local government. Catarman has 55.' },
  { term: 'Poblacion', meaning: 'The town proper. Fifteen of Catarman’s barangays are poblacion barangays.' },
  { term: 'Sangguniang Bayan (SB)', meaning: 'The municipal council, which passes ordinances and resolutions. The Vice Mayor presides.' },
  { term: 'Cedula', meaning: 'The Community Tax Certificate, issued by the Municipal Treasurer’s Office.' },
  { term: 'Amilyar', meaning: 'The yearly real property tax on land, buildings, and machinery.' },
  { term: 'Tax declaration', meaning: 'The Assessor’s record of a property and its assessed value, used to compute real property tax. It is not a land title.' },
  { term: 'Citizen’s Charter', meaning: 'The document every government office must publish listing its services, requirements, fees, and processing times.' },
  { term: 'PSA', meaning: 'Philippine Statistics Authority, which runs the census and keeps civil registry records.' },
  { term: 'BPLO', meaning: 'Business Permit and Licensing Office.' },
  { term: 'MSWDO', meaning: 'Municipal Social Welfare and Development Office.' },
  { term: 'MDRRMO', meaning: 'Municipal Disaster Risk Reduction and Management Office.' },
]

/** The order of preference used when deciding what to publish. */
export const selectionRules = [
  { rule: 'Use Catarman’s own published information first.', detail: 'Office heads, contacts, and 23 service checklists come straight from catarman.gov.ph.' },
  { rule: 'Where Catarman has published nothing, use national rules and say so.', detail: 'Twelve services rely on a national law or agency guideline, named on the page.' },
  { rule: 'Where there is no source at all, label it as general guidance.', detail: 'Ten services are marked this way.' },
  { rule: 'If a fact cannot be confirmed, leave it blank.', detail: 'Unknown phone numbers show “N/A”, and unmapped barangays show no pin.' },
]

/** Every place where the published source was adjusted by hand, and why. */
export const handEdits = [
  { what: 'Local Economic Enterprise Office phone number', why: 'The official governance page shows “-50%” in place of a number. The mobile number from the official contact page is used instead.' },
  { what: 'Business permit renewal checklist', why: 'The official list names the Fire Safety Inspection Certificate twice. It is shown once.' },
  { what: 'Cedula checklist headings', why: 'The official headings read “Corporation… Sole Propriety”. They are shown as “Sole proprietorship”.' },
  { what: 'How-to-apply steps for most official services', why: 'A short four-step summary written for this site, based on how the municipal e-services site works. Transfer of Ownership uses the official steps.' },
  { what: 'Catarman’s outline on the maps', why: 'The OpenStreetMap boundary includes municipal waters. The offshore part was removed so that only land is shown, and the north coastline was drawn in.' },
  { what: 'Barangay Cularima’s location', why: 'Matched to an OpenStreetMap point spelled “Colarema”.' },
  { what: 'Barangay Paticua’s location', why: 'OpenStreetMap has two points with this name. The one matching the map’s own “Paticua” label is used.' },
  { what: 'Sangguniang Bayan ex officio seats', why: 'Hidden until the Liga ng mga Barangay and SK Federation presidents can be confirmed.' },
]

export const notices = [
  { title: 'Not an official website.', text: 'BetterCatarman is run by volunteers and is not affiliated with, or endorsed by, the Municipal Government of Catarman. Official names and contact details are shown so residents can reach the right office.' },
  { title: 'Requirements and fees change.', text: 'Offices may update their requirements, fees, or staff at any time. What is shown here reflects the sources as they stood on the date below.' },
  { title: 'Found a mistake?', text: 'Corrections are welcome. Tell us what is wrong and where you saw the correct information, so it can be checked and fixed.' },
]
