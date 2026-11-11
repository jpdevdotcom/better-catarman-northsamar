import type { Component } from 'vue'
import {
  Briefcase, Building2, Calculator, FileText, HandHeart, HardHat, HeartPulse, Landmark, Leaf, Palmtree,
  Receipt, Shield, ShieldAlert, Sprout, Store, Users, Utensils, Wallet, Warehouse,
} from '@lucide/vue'

/**
 * Government directory for Catarman.
 *
 * Sources (retrieved Nov 2026):
 *  - Office heads, phone numbers and emails: the municipal government's own site,
 *    https://catarman.gov.ph/governance and https://catarman.gov.ph/contact
 *  - Sangguniang Bayan members: DILG masterlist as cited on Wikipedia, cross-checked
 *    against the 2025 election results. The official site does not list them.
 *
 * Anything set to `null` (or an empty list) is not published by those sources and is
 * shown on the site as "N/A".
 */

export interface Official {
  role: string
  name: string
  note?: string
  phones: string[]
  email: string | null
}

export const executive: Official[] = [
  {
    role: 'Municipal Mayor',
    name: 'Hon. Dianne E. Rosales',
    note: 'Chief executive of the municipality',
    phones: ['(055) 500-0712', '0915-836-8555'],
    email: 'lgu.catarman@gmail.com',
  },
  {
    role: 'Municipal Vice Mayor',
    name: 'Hon. Francisco C. Rosales Jr.',
    note: 'Presiding officer of the Sangguniang Bayan',
    phones: ['(055) 500-0635'],
    email: 'ovmcatarman@gmail.com',
  },
]

export const representative = { role: 'Representative, 1st District of Northern Samar', name: 'Hon. Niko Raul S. Daza' }

export interface Councilor {
  name: string | null
  role: string
  /** Committee chairmanships, once confirmed. */
  committees: string | null
}

/** Eight elected members (2025–2028 term), in order of votes received. */
export const councilors: Councilor[] = [
  'Hon. Nerissa O. Daclag',
  'Hon. Sandy C. Balite',
  'Hon. Fernando G. Carpio',
  'Hon. Maricor G. Mendador',
  'Hon. Jennifer D. Salutan',
  'Hon. Julian G. Custorio',
  'Hon. Ernesto S. Patilan Jr.',
  'Hon. Ramon C. Tiberio',
].map(name => ({ name, role: 'SB Member', committees: null }))

/** Seats held by virtue of another office. Names not yet confirmed. */
export const exOfficio: Councilor[] = [
  { name: null, role: 'Liga ng mga Barangay President', committees: null },
  { name: null, role: 'SK Federation President', committees: null },
]

export interface Office {
  name: string
  short: string
  handles: string
  icon: Component
  head: string | null
  phones: string[]
  email: string | null
  /** Slug of the related service category, if any. */
  services?: string
}

export const offices: Office[] = [
  { name: 'Office of the Municipal Mayor', short: 'MO', handles: 'Executive direction, mayor’s clearance, public assistance', icon: Landmark, head: 'Dianne E. Rosales', phones: ['(055) 500-0712', '0915-836-8555'], email: 'lgu.catarman@gmail.com' },
  { name: 'Office of the Vice Mayor', short: 'OVM', handles: 'Sangguniang Bayan sessions, ordinances, resolutions', icon: Users, head: 'Francisco C. Rosales Jr.', phones: ['(055) 500-0635'], email: 'ovmcatarman@gmail.com' },
  { name: 'Business Permit and Licensing Office', short: 'BPLO', handles: 'Business permits, renewals, closures', icon: Store, head: 'Teodilyn Leaño', phones: ['0920-295-0169'], email: 'bplo.lgucatarman@gmail.com', services: 'business' },
  { name: 'Local Civil Registry Office', short: 'LCRO', handles: 'Birth, marriage, and death certificates; corrections', icon: FileText, head: 'Darwin B. Beros', phones: [], email: null, services: 'certificates' },
  { name: 'Municipal Treasurer’s Office', short: 'MTO', handles: 'Tax payments, real property tax, cedula, clearances', icon: Receipt, head: 'Marietta D. Pabello', phones: ['(055) 500-1453', '0916-632-4293'], email: 'mto.lgu.catarman@gmail.com', services: 'tax-payments' },
  { name: 'Municipal Assessor’s Office', short: 'MASSO', handles: 'Property appraisal and assessment, tax declarations', icon: Building2, head: 'Joselito M. Laniwan', phones: ['(055) 500-2042', '0956-839-3140'], email: 'massocatarmanns@gmail.com', services: 'tax-payments' },
  { name: 'Municipal Accounting Office', short: 'MACCO', handles: 'Financial records, disbursements, accounting', icon: Calculator, head: 'Arniza V. Osido', phones: [], email: 'municipalityofcatarman@gmail.com' },
  { name: 'Municipal Budget Office', short: 'MBO', handles: 'Budget preparation, appropriations, fiscal management', icon: Wallet, head: 'Samuel King D. Uy', phones: ['(055) 500-2120', '0917-632-4409'], email: 'mbocatarman@gmail.com' },
  { name: 'Municipal Planning and Development Office', short: 'MPDO', handles: 'Development planning, zoning, project monitoring', icon: Briefcase, head: 'Engr. Maricar G. Galit-Lim', phones: ['(055) 500-1192', '0927-894-7484'], email: 'mpdocatarmannsamar@gmail.com', services: 'infrastructure' },
  { name: 'Municipal Engineering Office', short: 'MEO', handles: 'Building and occupancy permits, public works', icon: HardHat, head: 'Engr. Carlito O. Danque', phones: ['(055) 500-0713', '0956-306-0373'], email: 'engineering.lgucatarman@gmail.com', services: 'infrastructure' },
  { name: 'Municipal Health Office', short: 'MHO', handles: 'Check-ups, immunization, health certificates', icon: HeartPulse, head: 'Dr. Myrna C. Trongcoso', phones: ['(055) 500-9615', '0998-864-0155'], email: 'mho.lgu.catarman@gmail.com', services: 'health' },
  { name: 'Municipal Nutrition Action Office', short: 'MNAO', handles: 'Nutrition programs for mothers and children', icon: Utensils, head: 'Dr. Blessie Dana C. Noroña', phones: [], email: 'nutritionlgucatarman@gmail.com', services: 'health' },
  { name: 'Municipal Social Welfare and Development Office', short: 'MSWDO', handles: 'PWD and solo parent IDs, senior citizens, crisis assistance', icon: HandHeart, head: 'Irmina O. Delorino', phones: ['0928-479-4710'], email: 'minnielldurens@yahoo.com', services: 'social-services' },
  { name: 'Municipal Agriculture Office', short: 'MAO', handles: 'Farmer and fisherfolk registration, farm inputs', icon: Sprout, head: 'Merlyn A. Ambos', phones: ['0956-064-6632'], email: 'maolgucatarman@gmail.com', services: 'agriculture' },
  { name: 'Municipal Environment and Natural Resources Office', short: 'MENRO', handles: 'Waste management, tree-cutting endorsements', icon: Leaf, head: 'Engr. Jay-Ar B. Lim', phones: ['(055) 500-1735', '0915-984-2836'], email: 'menrocatarman@gmail.com', services: 'environment' },
  { name: 'Municipal Disaster Risk Reduction and Management Office', short: 'MDRRMO', handles: 'Disaster preparedness, emergency response', icon: ShieldAlert, head: 'Emerald E. Guevara', phones: ['0906-357-0985', '0949-141-3810'], email: 'catarman.mdrrmo@yahoo.com', services: 'public-safety' },
  { name: 'Municipal Public Order and Safety Office', short: 'MPOSO', handles: 'Public order, traffic, and community safety', icon: Shield, head: 'Atty. Harold M. Horcasitas', phones: ['0977-414-0224'], email: 'mposocatarman2023@gmail.com', services: 'public-safety' },
  { name: 'Municipal Human Resource Management and Development Office', short: 'MHRMDO', handles: 'Recruitment, personnel services, employee records', icon: Users, head: 'Joel D. Arogante', phones: ['(055) 500-1224', '0915-538-5532'], email: 'mhrmdocatarman@gmail.com' },
  { name: 'Municipal Public Employment Service Office', short: 'PESO', handles: 'Job placement, employment assistance, career guidance', icon: Briefcase, head: 'Arielyn L. Fernandez', phones: ['(055) 500-0712'], email: 'lgucatarman.peso@gmail.com' },
  { name: 'Local Economic Enterprise Office', short: 'LEEO', handles: 'Public market and other municipal enterprises', icon: Warehouse, head: 'Arlan D. Ong', phones: ['0917-657-3352'], email: 'lee.lgu.catarman@gmail.com' },
  { name: 'Municipal Tourism Office', short: 'MTOU', handles: 'Tourism promotion, events, visitor information', icon: Palmtree, head: 'Randy C. Tobiaso', phones: ['0915-406-1346'], email: 'turismosacatarman@gmail.com' },
  { name: 'Municipal Youth Development Office', short: 'MYDO', handles: 'Youth programs and Sangguniang Kabataan support', icon: Users, head: 'Maynard Erl John T. Alvarez', phones: ['0995-237-7440'], email: 'lydocatarman@gmail.com' },
]
