import type { Component } from 'vue'
import {
  Building2, FileText, GraduationCap, HandHeart, HardHat, HeartPulse, Leaf, Map, Receipt, ShieldAlert, Sprout, Store,
} from '@lucide/vue'

/**
 * Service directory.
 *
 * Services with an `official` block are taken from the municipal government's own
 * e-services site, https://catarman.gov.ph (retrieved Nov 2026): requirement checklists,
 * fees, and the links to apply online and download the official checklist.
 *
 * Services without it are general guidance based on usual national requirements and
 * are labelled that way on the site. Confirm them with the office concerned.
 */

const GOV = 'https://catarman.gov.ph'

export interface Requirement {
  text: string
  /** Where the document is obtained, when the official checklist says so. */
  where?: string
  /** Sub-items, e.g. the accepted kinds of ID. */
  sub?: string[]
}

export interface RequirementGroup {
  /** Who or what case the group applies to. Omitted when there is only one list. */
  title?: string
  items: Requirement[]
}

export interface Service {
  slug: string
  name: string
  description: string
  office: string
  /** Matches `short` in data/government.ts, to show the office's contact details. */
  officeShort?: string
  groups: RequirementGroup[]
  /** Label for the requirement list; defaults to "Requirements checklist". */
  listLabel?: string
  fee?: { amount: string, basis: string }
  notes?: string[]
  steps?: string[]
  /** For services without an official Catarman checklist: the national rules the details come from. */
  sources?: { label: string, url?: string }[]
  official?: {
    /** Page on catarman.gov.ph where the application is filed online. */
    page: string
    checklists: { label: string, url: string }[]
  }
}

export interface Category {
  slug: string
  title: string
  short: string
  description: string
  icon: Component
  services: Service[]
}

/** Shorthand for a requirement. */
const r = (text: string, where?: string, sub?: string[]): Requirement => ({ text, where, sub })
/** Shorthand for plain requirements. */
const list = (...items: string[]): RequirementGroup[] => [{ items: items.map(t => r(t)) }]
const pdf = (path: string) => encodeURI(`${GOV}/files/requirements/${path}.pdf`)

const E_SERVICE_STEPS = [
  'Prepare every document on the checklist that applies to you.',
  'Apply online through the municipal e-services site, or bring your documents to the office.',
  'Pay the fees assessed for your application.',
  'Track your application online, then claim your document once it is released.',
]

/** IDs the Municipal Treasurer’s Office lists as accepted, from its official cedula checklist. */
const TREASURER_IDS = ['Passport', 'UMID', 'Driver’s license', 'Senior citizen ID', 'COMELEC or voter’s ID, or COMELEC registration form']

/** Government-issued photo IDs commonly accepted across agencies. */
const COMMON_IDS = [
  'PhilSys National ID (card or digital)',
  'Passport',
  'Driver’s license',
  'UMID, SSS, or GSIS ID',
  'PRC ID',
  'Voter’s ID or voter’s certification',
  'Postal ID',
  'Senior citizen ID or PWD ID',
  'PhilHealth ID',
]
const ANY_ID = (text = 'One valid government-issued ID with your photo, such as') => r(text, undefined, COMMON_IDS)

const FEE_BASIS = 'Processing and certification fee under the municipal revenue ordinance (Art. 22, Sec. 113), as listed on catarman.gov.ph.'

// Requirement rows shared by most Assessor's Office requests.
const LETTER = r('Letter request, or walk in', 'Client')
const VALID_ID = r('Valid ID with picture', 'Client')
const UPDATED_ASSESSMENT = r('Updated Assessment of Real Property', 'Municipal Assessor’s Office')
const UPDATED_RECEIPT = r('Updated official receipt of payment of the Assessment of Real Property', 'Municipal Treasurer’s Office')
const ASSESSOR_STANDARD: RequirementGroup[] = [{ items: [LETTER, UPDATED_ASSESSMENT, UPDATED_RECEIPT, VALID_ID] }]

const assessor = (
  slug: string, name: string, description: string, groups: RequirementGroup[], amount: string, page: string, file: string,
  extra: Partial<Service> = {},
): Service => ({
  slug,
  name,
  description,
  office: 'Municipal Assessor’s Office',
  officeShort: 'MASSO',
  groups,
  fee: { amount, basis: FEE_BASIS },
  steps: E_SERVICE_STEPS,
  official: { page: `${GOV}/assessor/${page}/6`, checklists: [{ label: 'Official checklist (PDF)', url: pdf(`assessor/${file}`) }] },
  ...extra,
})

export const categories: Category[] = [
  {
    slug: 'certificates',
    title: 'Certificates & Vital Records',
    short: 'Certificates',
    description: 'Birth, marriage, and death certificates, and other civil registry documents.',
    icon: FileText,
    services: [
      {
        slug: 'civil-registry-certificates',
        name: 'Birth, Marriage & Death Certificates',
        description: 'Request a copy of a birth, marriage, or death record registered in Catarman.',
        office: 'Local Civil Registry Office',
        officeShort: 'LCRO',
        listLabel: 'Information to prepare',
        groups: [
          { title: 'For a birth certificate', items: [r('First name and last name'), r('Date of birth')] },
          { title: 'For a marriage certificate', items: [r('Wife’s first name and last name'), r('Husband’s first name and last name'), r('Date of marriage')] },
          { title: 'For a death certificate', items: [r('First name and last name'), r('Date of death')] },
          {
            title: 'If you are requesting for someone else',
            items: [r('Your relationship with the document owner'), r('Proof of relationship'), r('Authorization letter, if you are not a parent or sibling')],
          },
        ],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/civilRegistry/3`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('civilRegistry/Issuance of Civil Registry Certificates') }] },
      },
      {
        slug: 'marriage-license',
        name: 'Marriage License',
        description: 'Apply for a marriage license before getting married. File where either of you lives.',
        office: 'Local Civil Registry Office',
        officeShort: 'LCRO',
        groups: [
          {
            title: 'Both applicants',
            items: [
              r('Application for Marriage License form', 'Local Civil Registry Office'),
              r('PSA birth certificate', 'PSA', ['If you have none, a baptismal certificate may be accepted']),
              r('Certificate of No Marriage (CENOMAR)', 'PSA'),
              ANY_ID(),
              r('Community Tax Certificate (cedula)', 'Municipal Treasurer’s Office'),
              r('Certificate of attendance at pre-marriage counseling and family planning seminar'),
            ],
          },
          { title: 'If you are 18 to 20 years old', items: [r('Parental consent: a notarized affidavit, or your parent or guardian appearing in person')] },
          { title: 'If you are 21 to 24 years old', items: [r('Parental advice in writing', undefined, ['Without it, the license is released only after three months'])] },
          {
            title: 'If you were married before',
            items: [
              r('Death certificate of your late spouse, if widowed'),
              r('Court decree of annulment or nullity with certificate of finality, if annulled'),
            ],
          },
          { title: 'If one of you is a foreign national', items: [r('Certificate of legal capacity to marry', 'Their embassy or consulate'), r('Passport')] },
        ],
        notes: [
          'The application is posted for 10 consecutive days before the license is issued.',
          'A marriage license is valid for 120 days and can be used anywhere in the Philippines.',
        ],
        steps: [
          'Both of you go to the Local Civil Registry Office with your documents and fill in the application.',
          'Attend the pre-marriage counseling and family planning seminar.',
          'Wait out the 10-day posting period.',
          'Pay the fee and claim your marriage license.',
        ],
        sources: [
          { label: 'Family Code of the Philippines, Articles 11 to 20' },
          { label: 'PSA Helpline guide to getting married', url: 'https://psahelpline.ph/blogs/love-and-the-law-your-complete-guide-to-getting-married-in-the-philippines' },
        ],
      },
      {
        slug: 'correction-of-clerical-error',
        name: 'Correction of Clerical Error or Change of First Name',
        description: 'File a petition to fix a typographical error, change a first name, or correct the day or month of birth or sex in a civil registry record, without going to court (RA 9048 and RA 10172).',
        office: 'Local Civil Registry Office',
        officeShort: 'LCRO',
        groups: [
          {
            title: 'All petitions',
            items: [
              r('Petition form, to be notarized', 'Local Civil Registry Office'),
              r('Certified copy of the record to be corrected', 'PSA or Local Civil Registry Office'),
              r('At least two public or private documents showing the correct entry', undefined, [
                'Baptismal certificate', 'School records', 'Voter’s record', 'SSS, GSIS, or PhilHealth records', 'Medical records', 'Marriage certificate, if applicable',
              ]),
              ANY_ID('Valid ID of the petitioner, such as'),
            ],
          },
          {
            title: 'To change a first name, or correct the day or month of birth or sex',
            items: [
              r('NBI clearance'),
              r('Police clearance'),
              r('Certification from your employer that you have no pending case, or an affidavit of non-employment'),
              r('Proof of publication in a newspaper of general circulation, once a week for two consecutive weeks'),
            ],
          },
          {
            title: 'To correct the entry for sex',
            items: [r('Medical certification from an accredited government physician that you have not undergone sex change or sex transplant')],
          },
        ],
        notes: [
          'You must be of legal age and have a direct, personal interest in the record.',
          'The implementing rules set the filing fee at ₱1,000 for clerical errors and ₱3,000 for a change of first name or a correction of day or month of birth or sex. Indigent petitioners are exempt. Confirm the amount with the office.',
        ],
        sources: [
          { label: 'Republic Act 9048, as amended by Republic Act 10172' },
          { label: 'PSA statement on RA 10172', url: 'https://psa.gov.ph/content/press-statement-republic-act-10172' },
        ],
      },
    ],
  },
  {
    slug: 'business',
    title: 'Business, Trade & Investment',
    short: 'Business Permits',
    description: 'New business permits, renewals, closures, and permit records.',
    icon: Store,
    services: [
      {
        slug: 'business-permit',
        name: 'Business Permit (New or Renewal)',
        description: 'Get a Mayor’s Permit to operate a new business in Catarman, or renew an existing one. Renewals are due every January.',
        office: 'Business Permit and Licensing Office',
        officeShort: 'BPLO',
        groups: [
          {
            title: 'For a new business permit',
            items: [
              r('Unified Application Form for New Business Permit'),
              r('Articles of Incorporation or CDA Articles of Cooperation, whichever applies'),
              r('Barangay Business Certificate with computerized vicinity or sketch map', 'Barangay where the business is located'),
              r('Community Tax Certificate (cedula) for the present year'),
              r('PhilHealth Clearance'),
              r('Certificate of Occupancy', 'Municipal Engineering Office'),
              r('Lease contract, if the place is rented'),
              r('Health Certificate', 'Sanitary Office'),
              r('Environmental Certificate', 'MENRO'),
              r('Fire Safety Inspection Certificate', 'Bureau of Fire Protection'),
            ],
          },
          {
            title: 'For renewal',
            items: [
              r('Unified Application Form for Renewal of Business Permit'),
              r('Previous business permit or license, with the official receipts of payment'),
              r('Barangay Business Clearance'),
              r('Community Tax Certificate (cedula) for the present year'),
              r('Gross sales or gross receipts declaration'),
              r('PhilHealth Clearance'),
              r('BIR Certificate of Registration (Form 2303)'),
              r('Health Certificate', 'Sanitary Office'),
              r('Environmental Certificate', 'MENRO'),
              r('Fire Safety Inspection Certificate', 'Bureau of Fire Protection'),
            ],
          },
        ],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/business/businessPermit/4`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('bplo/Issuance of Business Permit') }] },
      },
      {
        slug: 'retirement-of-business',
        name: 'Retirement of Business',
        description: 'Formally close a business so that taxes and fees stop accruing.',
        office: 'Business Permit and Licensing Office',
        officeShort: 'BPLO',
        groups: [{
          items: [
            r('Cancellation of DTI registration name', undefined, ['Not required if the business has other branches using the same DTI registration']),
            r('Certificate of Closure', 'Barangay'),
            r('Letter request to the Mayor, through the BPLO Chief, stating the reason for closing'),
            r('Business permit, to be surrendered'),
            r('Business plate, to be surrendered'),
          ],
        }],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/business/businessRetirement/4`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('bplo/Retirement of Business') }] },
      },
      {
        slug: 'certified-true-copy-of-business-permit',
        name: 'Certified True Copy of Business Permit',
        description: 'Get an official copy of your business permit for legal or administrative use.',
        office: 'Business Permit and Licensing Office',
        officeShort: 'BPLO',
        groups: list('Business permit'),
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/business/certifiedBusiness/4`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('bplo/Certified True Copy of Business Permit') }] },
      },
      {
        slug: 'amendment-of-record',
        name: 'Amendment of Business Record',
        description: 'Update your business permit record when details of your business change.',
        office: 'Business Permit and Licensing Office',
        officeShort: 'BPLO',
        groups: list('Business permit'),
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/business/amendmentBusiness/4`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('bplo/Amendment of Record') }] },
      },
    ],
  },
  {
    slug: 'tax-payments',
    title: 'Taxation & Payments',
    short: 'Tax Payments',
    description: 'Cedula, real property tax, and tax clearances.',
    icon: Receipt,
    services: [
      {
        slug: 'cedula',
        name: 'Cedula (Community Tax Certificate)',
        description: 'A cedula is issued to individuals and businesses, and is commonly required for permits, notarized documents, and other transactions.',
        office: 'Municipal Treasurer’s Office',
        officeShort: 'MTO',
        groups: [
          {
            title: 'Everyone',
            items: [r('Valid ID', undefined, ['Passport', 'UMID', 'Driver’s license', 'Senior citizen ID', 'COMELEC or voter’s ID, or COMELEC registration form'])],
          },
          { title: 'Individual, employed', items: [r('Proof of gross income, or Income Tax Return (ITR)')] },
          { title: 'Individual, unemployed', items: [r('Personal declaration')] },
          { title: 'Sole proprietorship, new business', items: [r('Capitalization')] },
          { title: 'Sole proprietorship, existing business', items: [r('Certificate of gross income')] },
          { title: 'Corporation, new business', items: [r('SEC registration')] },
          { title: 'Corporation, existing business', items: [r('Gross sales, General Information Sheet (GIS), or Audited Financial Statements (AFS)')] },
        ],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/cedula/2`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('cedula/Issuance of Community Tax Certificate') }] },
      },
      {
        slug: 'real-property-tax',
        name: 'Real Property Tax (Amilyar)',
        description: 'Pay the annual tax on land, buildings, and machinery.',
        office: 'Municipal Treasurer’s Office',
        officeShort: 'MTO',
        groups: [{
          items: [
            r('Latest tax declaration, or the official receipt from your last payment'),
            r('Valid ID', undefined, TREASURER_IDS),
          ],
        }],
        notes: [
          'You can pay the whole year at once or in four instalments, due on or before March 31, June 30, September 30, and December 31.',
          'Paying early or on time may earn a discount of up to 20%, as set by local ordinance.',
          'Unpaid tax earns interest of 2% a month, up to 36 months.',
          'The ID list is the one the Treasurer’s Office publishes for cedula applications.',
        ],
        sources: [{ label: 'Local Government Code (RA 7160), Sections 250, 251, and 255' }],
      },
      {
        slug: 'tax-clearance',
        name: 'Tax Clearance',
        description: 'Certification that you have no unpaid real property or business taxes.',
        office: 'Municipal Treasurer’s Office',
        officeShort: 'MTO',
        groups: [
          {
            title: 'Everyone',
            items: [
              r('Valid ID', undefined, TREASURER_IDS),
              r('Authorization letter and the owner’s ID, if you are requesting for someone else'),
            ],
          },
          {
            title: 'For a real property tax clearance',
            items: [r('Official receipts of real property tax paid up to the current year'), r('Tax declaration of the property')],
          },
          { title: 'For a business tax clearance', items: [r('Official receipts of business taxes paid for the current year'), r('Current business permit')] },
        ],
        notes: ['The ID list is the one the Treasurer’s Office publishes for cedula applications.'],
      },
    ],
  },
  {
    slug: 'property',
    title: 'Real Property Assessment',
    short: 'Property Assessment',
    description: 'Tax declarations, transfer of ownership, appraisals, and property certifications.',
    icon: Building2,
    services: [
      assessor(
        'transfer-of-ownership', 'Transfer of Ownership of Real Property',
        'Update the tax declaration to the new owner after a sale, donation, or inheritance.',
        [{
          items: [
            r('Letter request of the owner or authorized representative', 'Client', ['A representative needs a notarized Special Power of Attorney']),
            r('Mode of conveyance: one certified true copy and one photocopy', 'Register of Deeds', ['Deed of Sale', 'Deed of Donation', 'Extrajudicial Settlement']),
            r('Original or Transfer Certificate of Title: one certified true copy and one photocopy', 'Register of Deeds'),
            r('Certificate Authorizing Registration (CAR): one original or certified true copy, and one photocopy', 'BIR'),
            r('Updated Real Property Tax official receipt (original)', 'Municipal Treasurer’s Office'),
            r('Real Property Tax Clearance', 'Municipal Treasurer’s Office'),
            r('Transfer Tax official receipt: original, or a certified true copy', 'Provincial Treasurer’s Office or Register of Deeds'),
            r('Approved Subdivision Map: two copies (sepia, or blueprint if not available)', 'DENR'),
            VALID_ID,
          ],
        }],
        'Php 1,500.72', 'transferOfOwnership', 'Transfer of Ownership of Real Property (TC)',
        {
          steps: [
            'Prepare the documents on the checklist.',
            'Pay the transfer tax. The amount depends on the property’s value or selling price.',
            'Get the Certificate Authorizing Registration (CAR) from the BIR, confirming the taxes on the transaction are paid.',
            'Have the Deed of Sale or Deed of Donation notarized.',
            'Register the transfer with the Register of Deeds and pay its registration fees.',
            'Submit the documents to the Municipal Assessor’s Office, online or in person, to update the tax declaration.',
          ],
          notes: ['For inheritance, disputes, or unusual cases, consider getting legal assistance so the transfer is done correctly.'],
        },
      ),
      assessor(
        'assessment-of-new-building', 'Appraisal & Assessment of a New Building',
        'Declare a newly built structure so it is appraised and recorded for tax purposes.',
        [{
          items: [
            LETTER,
            r('Building Permit', 'Municipal Engineering Office'),
            r('Floor plan', 'Municipal Engineering Office'),
            r('Bill of materials', 'Municipal Engineering Office'),
            r('Certificate of Occupancy', 'Municipal Engineering Office'),
            VALID_ID,
          ],
        }],
        'Php 1,071.75', 'newDeclarationOfPropertyBuilding', 'Appraisal & Assessment of New Buildings (DC)',
        { notes: ['If a document is not available, submit an affidavit of undertaking that you will secure it.', 'An inspection of the property may be required.'] },
      ),
      assessor(
        'assessment-of-new-machinery', 'Appraisal & Assessment of New Machinery',
        'Declare newly installed machinery so it is appraised and recorded for tax purposes.',
        [{
          items: [
            LETTER,
            r('Original official receipts of the following, when applicable', undefined, ['Actual cost', 'Freight', 'Customs duties and taxes', 'Brokerage, arrastre, and handling', 'Installation']),
          ],
        }],
        'Php 1,071.75', 'newDeclarationOfPropertyMachineries', 'Appraisal & Assessment of New Machineries (DC)',
        { notes: ['If the receipts are not available, submit a sworn declaration.'] },
      ),
      assessor(
        'subdivision-or-consolidation', 'Subdivision or Consolidation of Property',
        'Have a lot’s tax declaration split into several lots, or several lots merged into one.',
        [
          { items: [LETTER, UPDATED_ASSESSMENT, UPDATED_RECEIPT, VALID_ID] },
          { title: 'If the subdivision or consolidation map is approved', items: [r('Two copies of the approved map (sepia or blueprint)')] },
          { title: 'If the map is not yet approved', items: [r('Two copies of the survey plan signed by a licensed Geodetic Engineer')] },
        ],
        'Php 1,063.69', 'subdivisionAndConsolidation', 'Subdivision (SD) _ Consolidation (CS)',
      ),
      assessor(
        'reassessment', 'Reassessment of Property',
        'Have a property’s assessed value reviewed after a physical change, an error in the assessment, or partial destruction.',
        ASSESSOR_STANDARD, 'Php 810.67', 'reassessment', 'Reassessment (DP) _ (PC) _ (DT)',
      ),
      assessor(
        'reclassification', 'Reclassification of Property',
        'Change a property’s classification based on its actual use or location.',
        ASSESSOR_STANDARD, 'Php 1,077.37', 'reclassification', 'Reclassification (RC)',
      ),
      assessor(
        'certified-true-copy-of-tax-declaration', 'Certified True Copy of Tax Declaration',
        'Get an officially verified copy of a property’s assessment or tax declaration.',
        ASSESSOR_STANDARD, 'Php 199.07', 'ctcOfAssessmentOfRealProperty', 'Certified True Copy',
      ),
      assessor(
        'certification-of-property-holdings', 'Certification of Property Holdings / No Landholding',
        'Official confirmation of the real property a person or entity owns, or that they own none.',
        [
          { title: 'No landholding', items: [LETTER, VALID_ID] },
          { title: 'Landholding, for BIR estate tax', items: [LETTER, UPDATED_ASSESSMENT, UPDATED_RECEIPT, VALID_ID] },
          { title: 'Landholding, for DAR aggregate landholding', items: [LETTER, r('DAR Certification'), UPDATED_ASSESSMENT, UPDATED_RECEIPT, VALID_ID] },
          { title: 'Landholding, for DAR clearance', items: [LETTER, r('One copy of the notarized Deed of Absolute Sale')] },
          { title: 'Landholding, for court and other quasi-judicial purposes', items: [LETTER, r('Court order (subpoena)')] },
        ],
        'Php 162.38', 'certificationOfRealPropertyHoldings', 'Certification of Real Property Holdings _ No Land Holding',
      ),
      assessor(
        'certification-of-history', 'History of Tax Declaration',
        'Certification tracing the issuances and cancellations of a property’s tax declaration.',
        ASSESSOR_STANDARD, 'Php 261.09', 'certificationOfHistoryAssuance', 'Certification Of History',
      ),
      assessor(
        'certification-of-improvement', 'Certification of Improvement / No Improvement',
        'Official confirmation that a property has, or does not have, buildings or other improvements on it.',
        ASSESSOR_STANDARD, 'Php 156.72', 'certificationOfImprovement', 'Certification Of Improvement _ No Improvement',
      ),
    ],
  },
  {
    slug: 'infrastructure',
    title: 'Building & Construction',
    short: 'Building Permits',
    description: 'Building, occupancy, and electrical permits.',
    icon: HardHat,
    services: [
      {
        slug: 'building-permit',
        name: 'Building Permit',
        description: 'Required before constructing, renovating, or demolishing a structure.',
        office: 'Office of the Building Official, Municipal Engineering Office',
        officeShort: 'MEO',
        groups: [{
          items: [
            r('Unified Application Form for Building Permit'),
            r('Locational Clearance', 'Zoning Office'),
            r('Fire Safety Evaluation Clearance', 'Bureau of Fire Protection website'),
            r('Proof of ownership or right to use the lot', undefined, ['Original or Transfer Certificate of Title', 'Deed of Absolute Sale', 'Lot locational plan from the LRA', 'Contract of lease', 'Others, for special cases']),
            r('Survey plans, signed and sealed', undefined, [
              'Architectural', 'Civil / structural', 'Electrical', 'Mechanical', 'Sanitary', 'Plumbing', 'Electronics', 'Geodetic', 'Fire protection plan, if applicable',
            ]),
            r('Valid licenses (PRC ID) of all professionals involved'),
            r('Estimated value of the building or structure, as declared by the owner'),
            r('Construction Safety and Health Program'),
            r('Affidavit of Undertaking'),
            r('Soil test'),
            r('Sign permit documents, if applicable'),
          ],
        }],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/building/buildingPermit/5`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('obo/Issuance of Building Permit') }] },
      },
      {
        slug: 'certificate-of-occupancy',
        name: 'Certificate of Occupancy',
        description: 'Required before a newly built structure can be used.',
        office: 'Office of the Building Official, Municipal Engineering Office',
        officeShort: 'MEO',
        groups: [{
          items: [
            r('Unified Application Form'),
            r('As-built plans and specifications, signed and sealed by each professional discipline'),
            r('Daily construction works logbook'),
            r('Certificate of Completion, notarized'),
            r('Contract of lease'),
            r('Proof of ownership of the lot', undefined, ['Original or Transfer Certificate of Title', 'Deed of Absolute Sale', 'Lot locational plan from the LRA']),
            r('Fire Safety Inspection Certificate', 'Bureau of Fire Protection website'),
          ],
        }],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/building/certificateOfOccupancy/5`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('obo/Certificate of Occupancy') }] },
      },
      {
        slug: 'electrical-permit',
        name: 'Electrical Permit',
        description: 'Required for electrical installations and connections in a building.',
        office: 'Office of the Building Official, Municipal Engineering Office',
        officeShort: 'MEO',
        groups: [{
          items: [
            r('Application Form for Electrical Permit'),
            r('Certificate of Final Electrical Inspection'),
            r('Electrical plans and specifications'),
            r('Special fixtures and equipment'),
            r('Contract of lease'),
            r('Proof of ownership of the lot', undefined, ['Original or Transfer Certificate of Title', 'Deed of Absolute Sale', 'Lot locational plan from the LRA']),
            r('Fire Safety Inspection Certificate', 'Bureau of Fire Protection website'),
          ],
        }],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/building/electricalPermit/5`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('obo/Application for Electrical Permit') }] },
      },
    ],
  },
  {
    slug: 'zoning',
    title: 'Zoning & Land Use',
    short: 'Zoning',
    description: 'Locational clearances, zoning certifications, and subdivision approvals.',
    icon: Map,
    services: [
      {
        slug: 'locational-clearance',
        name: 'Locational Clearance',
        description: 'Confirms that a proposed development or construction project follows the zoning and land-use rules of its location.',
        office: 'Zoning Office, Municipal Planning and Development Office',
        officeShort: 'MPDO',
        groups: [
          {
            title: 'All applications',
            items: [
              r('Locational Clearance Application Form, accomplished and notarized'),
              r('Bill of materials', undefined, ['Reflects the total construction cost of the project', 'Signed and sealed by an authorized professional', 'Conformed by the applicant']),
              r('Five (5) sets of building plans, signed and sealed by an Architect or Civil Engineer'),
              r('Vicinity map with technical description and lot coordinates'),
              r('Site development plan'),
            ],
          },
          {
            title: 'Proof of right over land, if the property is in your name',
            items: [r('Certified true copy of the OCT or TCT'), r('Tax declaration'), r('Current tax receipt, or Non-Tax Delinquency Certificate')],
          },
          {
            title: 'Proof of right over land, if the property is not in your name',
            items: [
              r('Notarized deed of sale or deed of donation'),
              r('Contract of lease, MOA, or usufruct agreement'),
              r('Affidavit of consent or authorization to use the land, whichever applies'),
              r('Certified true copy of the Transfer Certificate of Title'),
              r('Certified true copy of the tax declaration'),
              r('Current tax receipt, or Non-Tax Delinquency Certificate'),
              r('Barangay or Assessor’s certification, if the lot is not titled'),
              r('CENRO certification, if the lot is not titled'),
            ],
          },
          {
            title: 'Construction, expansion, or renovation (as applicable)',
            items: [
              r('Road right-of-way clearance', 'DPWH or Provincial Engineer’s Office'),
              r('Watershed clearance (protected or non-protected area)', 'DENR'),
              r('Waterway clearance', 'DENR'),
              r('Clearance, conversion order, or exemption, if the site is agricultural', 'DAR'),
              r('Environmental Compliance Certificate or Certificate of Non-Coverage'),
            ],
          },
          {
            title: 'Cell site or tower',
            items: [
              r('Environmental Compliance Certificate, if the site is in an environmentally critical area', 'DENR'),
              r('Land use conversion, if the site is agricultural land', 'DAR'),
              r('Special Use Agreement, if the site is a protected area'),
              r('Certification from DPWH or NORSAMELCO, if applicable'),
              r('Height Clearance Permit', 'CAAP', ['Not needed if the site is outside the CAAP critical area and the structure is below 50 meters above ground']),
              r('Written consent, if the project is within a subdivision', undefined, [
                'Approval of the homeowners’ association and all members whose properties abut the site',
                'If there is no association: consent or affidavit of non-objection from most occupants and owners within a radius equal to the project’s height',
              ]),
              r('Written consent, if the project is on a building', undefined, [
                'Consent of the owner or developer',
                'Approval of the governing board, including tenants of the topmost floor, and consent of the owner and most tenants of adjoining buildings',
              ]),
            ],
          },
          {
            title: 'Poultry, piggery, rice mill, funeral parlor, slaughterhouse, or cockpit',
            items: [
              r('Environmental Compliance Certificate or Certificate of Non-Coverage', 'DENR–EMB'),
              r('Conversion Order or Exemption Clearance', 'DAR'),
              r('Site clearance on the suitability of the location (PD 856)', 'Local Health Officer or Municipal Veterinarian'),
              r('Barangay clearance'),
              r('Barangay resolution or affidavit of no objection from adjacent occupants'),
            ],
          },
        ],
        notes: [
          'More requirements may be asked for after inspection and evaluation of your documents.',
          'All documents must be no more than 3 months old when you file.',
        ],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/zoning/locationalClearance/7`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('zoning/Issuance of Locational Clearance') }] },
      },
      {
        slug: 'zoning-certification',
        name: 'Zoning Certification (Lot)',
        description: 'Certifies how a lot is classified under the local zoning ordinance.',
        office: 'Zoning Office, Municipal Planning and Development Office',
        officeShort: 'MPDO',
        groups: [{
          items: [
            r('Letter request'),
            r('Lot plan or survey plan', undefined, ['Showing a 500-meter radius from the property', 'Signed and sealed by a licensed Geodetic Engineer']),
            r('Location map or site development plan, showing the nearest landmark and lot coordinates'),
            r('Proof of right over land', undefined, ['Certified true copy of the Transfer Certificate of Title', 'Certified true copy of the tax declaration', 'Current tax receipt, or Non-Tax Delinquency Certificate']),
          ],
        }],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/zoning/zoningCertification/7`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('zoning/Issuance of Zoning Certification (Lot)') }] },
      },
      {
        slug: 'subdivision-approval',
        name: 'Subdivision Project Approval',
        description: 'Approval of a subdivision project, in two stages: Preliminary Approval and Locational Clearance (PALC), then the Development Permit.',
        office: 'Zoning Office, Municipal Planning and Development Office',
        officeShort: 'MPDO',
        groups: [
          {
            title: 'Stage 1: Preliminary Approval and Locational Clearance (PALC)',
            items: [
              r('PALC Application Form, duly accomplished'),
              r('Four (4) sets of the following, signed by a licensed Architect or Engineer', undefined, [
                'Site development plan (schematic) showing the proposed layout and all existing trees 0.30 meter or more in diameter',
                'Vicinity map with at least a 2-kilometer radius, showing nearby community facilities and utilities',
                'Survey plan of the lot or lots as described in the title',
                'Ground and floor plans (condominiums and townhouses only)',
              ]),
              r('Certified true copy of the title or titles'),
              r('Latest Real Property Tax receipt'),
              r('Certified true copy of the tax declaration'),
              r('Current tax receipt, or Non-Tax Delinquency Certificate'),
              r('Certified true copy of the Environmental Compliance Certificate or Certificate of Non-Coverage'),
              r('Zoning Certificate'),
              r('Conversion clearance', 'DAR'),
              r('Permit to cut trees'),
              r('Authorization letter, if the applicant is not the project owner'),
              r('Deed of sale, affidavit of consent, or contract of lease, if applicable'),
              r('Barangay Council resolution endorsing the subdivision project'),
              r('Sangguniang Bayan resolution endorsing preliminary approval'),
            ],
          },
          {
            title: 'Stage 2: Final Approval and Development Permit',
            items: [
              r('Development Permit Application Form, duly accomplished'),
              r('All the PALC requirements above'),
              r('One (1) set, signed and sealed by a licensed Geodetic Engineer', undefined, ['Topographic plan', 'Vicinity map', 'Survey plan']),
              r('For condominiums and townhouses, signed by a licensed Architect or Engineer', undefined, [
                'Final floor and ground plans', 'Elevation plans (front, rear, and both sides)', 'Section plans (cross and longitudinal)', 'Building specifications, bill of materials, and estimate',
              ]),
              r('Two (2) copies each of the land development plans, signed by a licensed Architect or Engineer', undefined, [
                'Final subdivision development plan', 'Road design (geometric and structural)', 'Storm drainage and sewer system plans', 'Water system layout and detail plans',
                'Site grading plan', 'Power distribution line and details', 'Landscape design for parks and playgrounds', 'Specifications, bill of materials, and cost estimates',
              ]),
              r('Project study covering land development cost, financing, marketability, cash flow, and timetable', undefined, [
                'Audited financial statements for the last three years', 'Project profile and work program', 'Income Tax Returns for the last three years',
                'SEC Certificate of Registration', 'Articles of Incorporation or Partnership', 'Corporation by-laws and amendments',
                'For corporations three years old or younger: statement of capitalization, sources of income, and cash flow',
              ]),
              r('Water distribution system plan, with certificate of service coverage from the water provider or an NWRB-approved permit to drill'),
              r('Electrical plan certified by a Professional Electrical Engineer'),
              r('Certification from the power franchise holder that electricity is available in the area'),
              r('Right to use, or deed of sale of, right-of-way for the access road and utilities, when applicable'),
              r('Traffic Impact Assessment'),
              r('List of the licensed professionals who signed the plans', undefined, ['Full name', 'Professional license number, with issue and expiry dates', 'Professional Tax Receipt and date of issue', 'Taxpayer’s Identification Number (TIN)']),
              r('Sangguniang Bayan resolution endorsing the project'),
            ],
          },
        ],
        notes: [
          'More requirements may be asked for after inspection and evaluation of your documents.',
          'All documents must be no more than 3 months old when you file.',
        ],
        steps: E_SERVICE_STEPS,
        official: {
          page: `${GOV}/zoning/subdivision/7`,
          checklists: [
            { label: 'PALC checklist (PDF)', url: pdf('zoning/Preliminary Approval And Locational Clearance (PALC) For Subdivision') },
            { label: 'Development Permit checklist (PDF)', url: pdf('zoning/Final Approval _ Development Permit For Subdivision') },
          ],
        },
      },
      {
        slug: 'special-projects',
        name: 'Special Projects: Location Standards',
        description: 'Poultry and piggery farms, cockpits, slaughterhouses, and funeral homes must meet these location standards to get a permit.',
        office: 'Zoning Office, Municipal Planning and Development Office',
        officeShort: 'MPDO',
        listLabel: 'Location standards',
        groups: [
          {
            title: 'Poultry and piggery',
            items: [
              r('Located in an agri-industrial or agricultural zone, outside urban areas'),
              r('At least 25 meters from sources of ground and surface drinking water'),
              r('Piggery: 500 meters from major roads and highways. Poultry: 200 meters'),
              r('Medium and large farms: at least 1,000 meters from built-up areas. Small poultry farms: at least 500 meters'),
            ],
          },
          {
            title: 'Cockpit',
            items: [
              r('One cockpit per municipality for every 100,000 population'),
              r('200 to 500 meters from the national highway'),
              r('At least 200 meters from residential or commercial areas, schools, churches, and other public buildings'),
            ],
          },
          {
            title: 'Slaughterhouse or abattoir',
            items: [
              r('200 meters from residential areas, schools, churches, places of assembly, and central public offices'),
              r('25 meters from markets and food establishments'),
            ],
          },
          {
            title: 'Funeral home',
            items: [
              r('200 meters from abattoirs, schools, and hospitals'),
              r('50 meters from the market'),
              r('25 meters from restaurants, food centers, and other food establishments'),
              r('Minimum land area by category', undefined, [
                'Category I (with chapels and embalming facilities): 600 sq. m',
                'Category II (with chapels, no embalming facilities): 420 sq. m',
                'Category III (funeral services only): 280 sq. m',
              ]),
            ],
          },
        ],
        notes: [
          'These projects may also need an Environmental Compliance Certificate or Certificate of Non-Coverage, a barangay clearance, an affidavit of no objection from adjacent occupants, and Sangguniang Bayan resolutions.',
        ],
        steps: E_SERVICE_STEPS,
        official: { page: `${GOV}/zoning/projects/7`, checklists: [{ label: 'Official checklist (PDF)', url: pdf('zoning/Special Project Permit') }] },
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
        slug: 'senior-citizen-id',
        name: 'Senior Citizen ID',
        description: 'ID for Filipino residents aged 60 and above, used for the 20% discount, VAT exemption, and other benefits.',
        office: 'Office for Senior Citizens Affairs, through the MSWDO',
        officeShort: 'MSWDO',
        groups: [{
          items: [
            r('Application form', 'Office for Senior Citizens Affairs'),
            r('Proof of age and citizenship: any one of', undefined, [
              'PSA birth certificate', 'Passport', 'PhilSys National ID', 'Driver’s license', 'Any other government ID showing your date of birth',
            ]),
            r('Barangay certificate of residency', 'Your barangay hall'),
            r('Recent 1x1 ID photos'),
          ],
        }],
        notes: [
          'If you have no document proving your age, a notarized affidavit of two disinterested persons may be accepted.',
          'The first ID is free under the Expanded Senior Citizens Act.',
        ],
        sources: [{ label: 'Expanded Senior Citizens Act (RA 9994) and its implementing rules' }],
      },
      {
        slug: 'pwd-id',
        name: 'PWD ID',
        description: 'ID for persons with disability, used for the 20% discount, VAT exemption, and other benefits.',
        office: 'Municipal Social Welfare and Development Office',
        officeShort: 'MSWDO',
        groups: [
          {
            title: 'Everyone',
            items: [
              r('PWD registration form, filled in', 'MSWDO'),
              r('Two recent 1x1 ID photos, with your name and signature or thumbmark on the back'),
              ANY_ID('One valid ID, or a barangay certification of residency. Accepted IDs include'),
            ],
          },
          { title: 'Apparent (visible) disability', items: [r('Medical certificate from a licensed physician', undefined, ['For students, a school assessment signed by the principal may be accepted'])] },
          { title: 'Non-apparent disability', items: [r('Certificate of Disability from a qualified specialist')] },
          { title: 'For renewal', items: [r('Your expired PWD ID')] },
        ],
        sources: [
          { label: 'NCDA procedures for issuing PWD IDs', url: 'https://ncda.gov.ph/?p=208' },
          { label: 'NCDA Administrative Order No. 001, series of 2021', url: 'https://ncda.gov.ph/?p=11230' },
        ],
      },
      {
        slug: 'solo-parent-id',
        name: 'Solo Parent ID',
        description: 'ID and benefits for solo parents under the Expanded Solo Parents Welfare Act. The requirements depend on why you are a solo parent.',
        office: 'Municipal Social Welfare and Development Office',
        officeShort: 'MSWDO',
        groups: [
          {
            title: 'Everyone',
            items: [
              r('Birth certificates of your children'),
              r('Sworn affidavit that you have sole parental care and support of the child, and are not living with a partner'),
              r('Affidavit of a barangay official confirming you live there and have care of the child', 'Your barangay hall'),
            ],
          },
          { title: 'Spouse has died', items: [r('Marriage certificate'), r('Death certificate of your spouse')] },
          {
            title: 'Separated, legally or in fact',
            items: [r('Marriage certificate'), r('Court decree of legal separation, or an affidavit of two disinterested persons if separated in fact')],
          },
          { title: 'Marriage annulled, declared void, or divorced abroad', items: [r('Marriage certificate annotated with the annulment or nullity'), r('Court decree, or judicial recognition of the foreign divorce')] },
          {
            title: 'Abandoned by spouse',
            items: [r('Marriage certificate, or your own affidavit'), r('Affidavit of two disinterested persons on the abandonment'), r('Police or barangay record of the abandonment')],
          },
          { title: 'Unmarried parent', items: [r('Certificate of No Marriage (CENOMAR)', 'PSA')] },
          {
            title: 'Spouse or family member of an OFW',
            items: [
              r('Marriage certificate, or proof of your relationship to the OFW'),
              r('Overseas employment contract'),
              r('Copy of the passport with stamps showing 12 continuous months of work abroad, or a Bureau of Immigration certification'),
              r('Proof of income'),
            ],
          },
          {
            title: 'Spouse is detained or serving a sentence',
            items: [r('Marriage certificate'), r('Certificate of detention or of serving a sentence of at least three months, or the court’s commitment order')],
          },
          {
            title: 'Spouse is physically or mentally incapacitated',
            items: [r('Marriage certificate, or affidavit of cohabitation'), r('Medical records issued within the last three months, or the spouse’s valid PWD ID')],
          },
          { title: 'Legal guardian, adoptive parent, or foster parent', items: [r('Court guardianship decision, adoption decree or order, or foster parent license')] },
          {
            title: 'Relative caring for the child',
            items: [
              r('Proof of your relationship to the child'),
              r('Death certificate, certificate of incapacity, or proof of at least six months’ absence of the parents or guardian'),
            ],
          },
          { title: 'Pregnant solo parent', items: [r('Medical record of the pregnancy', undefined, ['Children’s birth certificates are not needed'])] },
          { title: 'Child born as a result of rape', items: [r('Complaint affidavit'), r('Medical record of the incident')] },
        ],
        notes: [
          'The Solo Parent ID is valid for one year and is renewed yearly after a social worker’s assessment.',
          'For the monthly subsidy and discounts, you may also need an affidavit of no employment, an Income Tax Return, and proof of income or a certificate of indigency.',
        ],
        sources: [
          { label: 'Revised implementing rules of the Solo Parents Welfare Act (RA 8972, as amended by RA 11861), Section 13', url: 'https://lawyerly.ph/laws/view/l17768' },
        ],
      },
      {
        slug: 'crisis-assistance',
        name: 'Assistance to Individuals in Crisis',
        description: 'Medical, burial, educational, food, and other emergency help for residents in difficult situations.',
        office: 'Municipal Social Welfare and Development Office',
        officeShort: 'MSWDO',
        groups: [
          {
            title: 'Everyone',
            items: [
              ANY_ID('Valid ID: bring the original and two photocopies. Accepted IDs include'),
              r('Authorization letter and a copy of the beneficiary’s ID, if you are applying for someone who is not your immediate family'),
            ],
          },
          { title: 'Medical: hospital bill', items: [r('Medical abstract or medical certificate'), r('Updated hospital bill')] },
          { title: 'Medical: medicines', items: [r('Medical abstract or medical certificate'), r('Doctor’s prescription')] },
          {
            title: 'Medical: laboratory tests or procedures',
            items: [r('Medical abstract or medical certificate'), r('Doctor’s laboratory request'), r('Hospital charge slip or quotation')],
          },
          { title: 'Burial', items: [r('Death certificate, or temporary death certificate'), r('Funeral service contract')] },
          { title: 'Educational', items: [r('Any school document showing the student is enrolled')] },
          { title: 'Transportation', items: [r('Medical abstract, referral letter to another hospital, death certificate, or other proof of why travel is needed')] },
          {
            title: 'Food or other cash assistance',
            items: [r('A document showing the need', undefined, ['Barangay certificate of residency, indigency, or need', 'Police blotter', 'Fire incident report from the BFP', 'Disaster Assistance Family Access Card'])],
          },
          { title: 'If you need more than ₱10,000', items: [r('Social Case Study Report', 'MSWDO')] },
        ],
        notes: [
          'Medical documents must be issued within the last three months.',
          'Check that names are spelled correctly and that medical documents show the doctor’s full name, signature, and license number.',
          'This list is the DSWD’s for Eastern Visayas. The MSWDO’s own municipal assistance may ask for slightly different documents.',
        ],
        sources: [{ label: 'DSWD Field Office VIII: crisis assistance requirements', url: 'https://fo8.dswd.gov.ph/cis-assistance-requirements/' }],
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
        slug: 'medical-consultation',
        name: 'Medical Consultation',
        description: 'Free primary care check-ups at the Rural Health Unit and barangay health stations.',
        office: 'Municipal Health Office',
        officeShort: 'MHO',
        groups: [{
          items: [
            r('Any ID, if you have one'),
            r('Your individual treatment record or previous prescriptions, if you have been seen before'),
            r('PhilHealth ID or number, if you are a member'),
          ],
        }],
      },
      {
        slug: 'immunization',
        name: 'Immunization',
        description: 'Routine vaccines for infants and children, and other vaccination programs.',
        office: 'Municipal Health Office',
        officeShort: 'MHO',
        groups: list('Child’s immunization card or mother-and-baby booklet'),
      },
      {
        slug: 'health-certificate',
        name: 'Health Certificate',
        description: 'Required for food handlers and workers in certain establishments, and for business permits.',
        office: 'Municipal Health Office',
        officeShort: 'MHO',
        groups: [{
          items: [
            r('Laboratory results, as required for your kind of work', undefined, ['Stool examination', 'Chest X-ray', 'Urinalysis']),
            r('Community Tax Certificate (cedula)', 'Municipal Treasurer’s Office'),
            ANY_ID(),
            r('Recent 1x1 ID photo'),
          ],
        }],
        notes: ['A health certificate is usually renewed every year. Ask the Sanitary Office which laboratory tests apply to your work.'],
        sources: [{ label: 'Code on Sanitation of the Philippines (PD 856)' }],
      },
      {
        slug: 'maternal-and-child-care',
        name: 'Maternal & Child Care',
        description: 'Prenatal check-ups, family planning, and nutrition services.',
        office: 'Municipal Health Office',
        officeShort: 'MHO',
        groups: list('Mother-and-baby booklet, if available'),
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
        slug: 'farmer-registration',
        name: 'Farmer Registration (RSBSA)',
        description: 'Register in the Registry System for Basic Sectors in Agriculture to qualify for government farm programs.',
        office: 'Municipal Agriculture Office',
        officeShort: 'MAO',
        groups: [{
          items: [
            r('RSBSA enrollment form, filled in', 'Municipal Agriculture Office'),
            ANY_ID('Photocopy of one valid government ID, such as'),
            r('2x2 ID photo'),
            r('Proof of ownership, tenancy, or lease of the farm'),
          ],
        }],
        notes: [
          'Registration is free. You must be a Filipino aged 18 or older who farms, fishes, or works on a farm.',
          'You will receive a stub with your RSBSA control number as proof of registration.',
        ],
        sources: [{ label: 'Department of Agriculture: RSBSA frequently asked questions', url: 'https://car.da.gov.ph/wp-content/uploads/2024/02/RSBSA-FAQs.pdf' }],
      },
      {
        slug: 'fisherfolk-registration',
        name: 'Fisherfolk Registration (FishR)',
        description: 'Register as a municipal fisherfolk, and register fishing boats and gear.',
        office: 'Municipal Agriculture Office',
        officeShort: 'MAO',
        groups: [{
          items: [
            r('Fisherfolk registration form, filled in', 'Municipal Agriculture Office'),
            ANY_ID(),
            r('Barangay certificate of residency', 'Your barangay hall'),
            r('2x2 ID photo'),
          ],
        }],
        notes: ['Registration is free. It covers anyone who fishes in municipal waters or works in related fishing activities.'],
        sources: [{ label: 'BFAR: Fisherfolk Registration (FishR)', url: 'https://region5.bfar.da.gov.ph/fishr-and-boatr/' }],
      },
      {
        slug: 'seeds-and-farm-inputs',
        name: 'Seeds, Seedlings & Farm Inputs',
        description: 'Request available seeds, seedlings, fertilizer, and technical advice.',
        office: 'Municipal Agriculture Office',
        officeShort: 'MAO',
        groups: list('RSBSA registration', 'Letter of request'),
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
        slug: 'scholarship',
        name: 'Scholarship & Educational Assistance',
        description: 'Financial support for qualified students residing in Catarman, subject to program availability.',
        office: 'Office of the Municipal Mayor',
        officeShort: 'MO',
        groups: list('Certificate of enrollment or registration', 'Latest grades', 'Barangay certificate of residency and indigency'),
      },
      {
        slug: 'schools',
        name: 'Schools in Catarman',
        description: 'Catarman is home to the University of Eastern Philippines, Catarman National High School, and many other public and private schools.',
        office: 'DepEd Northern Samar Division, or the school itself',
        groups: list('Contact the school directly for admission requirements'),
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
        slug: 'emergency-response',
        name: 'Emergency Response',
        description: 'Rescue and response during typhoons, floods, fires, and accidents. For life-threatening emergencies, call 911.',
        office: 'Municipal Disaster Risk Reduction and Management Office',
        officeShort: 'MDRRMO',
        groups: list('None. Call for help right away'),
      },
      {
        slug: 'police-clearance',
        name: 'National Police Clearance',
        description: 'Clearance for employment, travel, and other legal purposes. You register and pay online, then appear in person once.',
        office: 'Catarman Municipal Police Station',
        groups: [{
          items: [
            r('Two valid government-issued IDs, original and unexpired, such as', undefined, [
              'PhilSys National ID', 'Passport', 'Driver’s license', 'UMID or SSS ID', 'PRC ID', 'Voter’s ID', 'Postal ID',
            ]),
            r('Reference number from your online registration'),
            r('Proof of payment'),
            r('An active email address and mobile number, for the online registration'),
          ],
        }],
        fee: { amount: '₱150', basis: 'Standard national fee, plus a small online transaction charge. Confirm on the official portal before paying.' },
        notes: [
          'A national police clearance is valid for six months.',
          'If you have only one ID, bring a PSA birth certificate with it.',
        ],
        steps: [
          'Register on the National Police Clearance System at pnpclearance.ph.',
          'Set an appointment at the police station and pay the fee online.',
          'Go to the station on your appointment date with your two IDs, reference number, and proof of payment.',
          'Have your photo, fingerprints, and signature taken, then claim your clearance.',
        ],
        sources: [{ label: 'PNP National Police Clearance System', url: 'https://pnpclearance.ph' }],
      },
      {
        slug: 'fire-safety-inspection-certificate',
        name: 'Fire Safety Inspection Certificate',
        description: 'Issued by the Bureau of Fire Protection after inspecting a building. Required for business permits and certificates of occupancy.',
        office: 'Bureau of Fire Protection, Catarman',
        groups: [
          {
            title: 'For a new business permit',
            items: [
              r('Endorsement or assessment of fees', 'Business Permit and Licensing Office'),
              r('Certificate of Occupancy'),
              r('Fire Safety Inspection Certificate issued for occupancy, if you have one'),
              r('Fire insurance policy, if any'),
            ],
          },
          {
            title: 'For business permit renewal',
            items: [
              r('Endorsement or assessment of fees', 'Business Permit and Licensing Office'),
              r('Last year’s Fire Safety Inspection Certificate'),
              r('Fire insurance policy, if any'),
            ],
          },
          { title: 'For a certificate of occupancy', items: [r('Endorsement from the Office of the Building Official'), r('Certificate of Completion'), r('Fire Safety Evaluation Clearance and as-built plans')] },
        ],
        notes: ['A certificate issued for a business permit is valid for one year.', 'The BFP inspects the premises before issuing the certificate, and Fire Code fees are paid first.'],
        sources: [{ label: 'Fire Code of the Philippines (RA 9514) and its implementing rules' }],
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
        slug: 'solid-waste-collection',
        name: 'Solid Waste Collection',
        description: 'Garbage collection schedules and segregation rules for households and businesses.',
        office: 'Municipal Environment and Natural Resources Office',
        officeShort: 'MENRO',
        groups: list('Segregate waste at source (biodegradable, recyclable, residual)'),
      },
      {
        slug: 'tree-cutting-endorsement',
        name: 'Tree-Cutting Endorsement',
        description: 'Local endorsement needed before applying for a DENR tree-cutting permit.',
        office: 'Municipal Environment and Natural Resources Office',
        officeShort: 'MENRO',
        groups: list('Letter of request', 'Proof of land ownership', 'Barangay certification', 'Photos of the trees concerned'),
      },
    ],
  },
]

/** Every service with its category, for search and lookups. */
export const allServices = categories.flatMap(c => c.services.map(s => ({ ...s, category: c })))

/** Flat text of a service's requirements, used by search. */
export const requirementText = (s: Service) =>
  s.groups.flatMap(g => [g.title ?? '', ...g.items.flatMap(i => [i.text, i.where ?? '', ...(i.sub ?? [])])]).join(' ')
