/**
 * What the Commission on Audit observed in its audit of the Municipality of Catarman for
 * calendar year 2025.
 *
 * Source: "Catarman Executive Summary 2025", Commission on Audit, read in full on
 * 11 November 2026 from the copy published on coa.gov.ph.
 *
 * Rules followed here, so that nothing is misstated:
 *  - `observation` is COA's own wording, copied word for word. Do not edit or shorten it.
 *  - `title` is a neutral label written for this site. It only names the subject.
 *  - `recommendations` are shortened from COA's text. They keep COA's meaning and add nothing.
 *  - No person is named. COA addresses offices and positions, and so does this file.
 *  - COA's wording sometimes says a practice was "contrary to" a law or circular. That is an
 *    audit assessment, not a ruling on anyone's liability, and the page says so.
 */

export const auditSource = {
  title: 'Catarman Executive Summary 2025',
  publisher: 'Commission on Audit',
  url: 'https://www.coa.gov.ph/reports/annual-audit-reports/aar-local-government-units/',
  where: '2025 › Region VIII (Eastern Visayas) › Municipalities › Northern Samar',
  read: '11 November 2026',
  year: 2025,
}

/** Overall results stated in the summary, shown before the observations for balance. */
export const auditOverview = [
  {
    label: 'Audit opinion',
    value: 'Unmodified',
    detail: 'The auditor rendered an unmodified opinion on the combined financial statements for the year ended December 31, 2025.',
  },
  {
    label: 'Suspensions, disallowances, and charges',
    value: 'None unsettled',
    detail: 'All notices issued by COA were settled by management in 2025, leaving no unsettled amount as of December 31, 2025.',
  },
  {
    label: 'Earlier recommendations',
    value: '39 of 53 implemented',
    detail: 'Of 53 recommendations from prior years’ audits, 39 were fully implemented and 14 were not acted upon by management.',
  },
]

export interface AuditObservation {
  title: string
  /** COA's wording, verbatim. */
  observation: string
  /** Who COA addressed its recommendation to. */
  addressedTo: string
  /** COA's recommendations, shortened. */
  recommendations: string[]
}

export const auditObservations: AuditObservation[] = [
  {
    title: 'Records of the 20% Development Fund',
    observation: 'Recording and monitoring of the 20% Development Fund is not supported with reliable and consistent budgetary registries which precluded the timely and accurate determination of the available cash and budgetary balances of the funded PPAs, thus affected the planning and/or alignment of disbursements with actual obligations contrary to Republic Act 7160 and DBM-DOF-DILG Joint Memorandum Circular (JMC) No. 2.',
    addressedTo: 'The Local Chief Executive, to direct the Local Budget Officer and other officials concerned',
    recommendations: [
      'Record appropriations and their obligations properly and on time, with regular reconciliations and reviews to find and correct discrepancies.',
      'Review previous years’ transactions, identify the specific programs or sources of the balances under the fund, and correct the records or recommend to the Sangguniang Bayan the reappropriation of unexpended or unencumbered amounts.',
    ],
  },
  {
    title: 'Records of the disaster risk reduction and management fund',
    observation: 'Absence of reliable and updated financial records of the MDRRM Fund resulted in the inability to monitor the status of appropriations, utilization and balances of the fund, thus, unexpended Prior Years’ QRF and MF-MOOE were not readily identified, reconciled nor incorporated in the current year’s LDRRMIF which could have caused the low utilization of the fund and improper alignment of expenditures with the Investment Plan of the LGU, contrary to COA Circular No. 2012-002.',
    addressedTo: 'The Local Chief Executive, through the Local Disaster Risk Reduction and Management Council',
    recommendations: [
      'Have the disaster office, Accountant, and Budget Officer reconcile their records to validate unexpended prior-year amounts, for inclusion in the current year’s plan after identifying amounts due for reversion to the General Fund.',
      'Have the offices involved in disaster response, such as the Municipal Health Office, the disaster office, and social welfare, coordinate closely before the budget is finalized.',
      'Set up a monitoring and evaluation framework to regularly assess responsiveness, utilization rate, and impact, and review whether unimplemented programs or capital outlays can be realigned.',
      'Reconcile and adjust records and reports so they show accurate appropriations, utilization, and balances each reporting period, including liability and cash accounts for the fund.',
    ],
  },
  {
    title: 'Documentation and controls over the Special Health Fund',
    observation: 'Deficiencies in documentation and controls over the utilization of Special Health Fund particularly on the payment of incentives to medical practitioners and procurement of medicines increased the risk of payment without verifiable services rendered and unestablished receipt and/or dispensation of medicines due to inadequate monitoring and validation of the program’s implementation contrary to PHIC Circular No. 2022-0023 and COA Circular No. 2023-002.',
    addressedTo: 'The Local Chief Executive, to require the implementing office through the Local Health Board',
    recommendations: [
      'Comply strictly with PhilHealth Circular No. 2022-0023 in implementing the Konsulta program, particularly monitoring and transparency mechanisms and tracking of fund use and service delivery.',
      'Secure the Local Health Board’s approval of procurement plans, budget, and program implementation before funds are used.',
      'Support all incentive payments with approved guidelines, a basis for computation, and verifiable accomplishments or actual services rendered.',
      'Keep complete documentation on the procurement of medicines, supplies, equipment, and services, including delivery and issuance of the items.',
      'Set up systems to segregate, reconcile, and track disbursements by funding source, to prevent duplicate payments.',
    ],
  },
  {
    title: 'Implementation of the DOLE Kabuhayan (livelihood) Program',
    observation: 'The DOLE’s Kabuhayan Program was implemented by the LGU without an established Project Mechanisms, thus monitoring and accountability arrangements were not clearly defined which resulted to difficulty in pinpointing responsibility and accountability on the procured and distributed kits totaling ₱4,995,630.00 contrary to Section 2 of P.D. 1445 and its Memorandum of Agreement.',
    addressedTo: 'The Municipal Mayor, to require the PESO Manager',
    recommendations: [
      'Set a clear distribution schedule and strengthen coordination among the offices involved so that livelihood kits reach qualified beneficiaries promptly, with deliveries properly documented, including inspection and acknowledgment receipts.',
      'Sign agreements with beneficiaries that define responsibilities, obligations, and conditions for the use and care of project resources.',
      'Set up monitoring and documentation to track how the kits are used and whether beneficiaries can sustain the livelihood, with periodic on-site validation.',
      'Verify and reconcile procurement and delivery records at once to determine the extent of undelivered kits, and have the Bids and Awards Committee coordinate with the supplier to complete deliveries or apply the remedies under RA 12009.',
      'Give the Accounting Office copies of the distribution and utilization records so the supplies are recorded properly.',
    ],
  },
  {
    title: 'Procurement controls',
    observation: 'Significant procurement control weaknesses, such as, insufficient documentation, supplier-aligned deliverables, unsubstantiated deliveries, and absence of market scoping precluded the enforcement of contract provisions and, inconsistent compliance with the prescribed procurement standards, contrary to the IRR of RA 12009, thus, undermined the integrity of the overall procurement system.',
    addressedTo: 'The Head of the Procuring Entity, to direct the Bids and Awards Committee and end-users; and the Local Chief Executive',
    recommendations: [
      'Comply strictly with procurement planning requirements under RA 12009, particularly documented needs assessment, quantity justifications, and verifiable cost estimates, with technical specifications that are clear, performance-based, and not supplier-driven.',
      'Enforce contract terms strictly, including penalties for non-delivery or partial delivery, and make sure contracts state terms such as the expected delivery date and point of delivery.',
      'Have all deliveries accepted first by the Municipal Treasurer or Property Officer before issue to the end-user, with the Acceptance and Inspection Report stating the actual quantity and specifications received.',
      'Have the Property Officer and Municipal Accountant review the procurement concerned to determine the days of delay on undelivered goods, and compute and impose liquidated damages accordingly.',
    ],
  },
]

/** Abbreviations that appear in COA's wording. */
export const auditTerms: { term: string, meaning: string }[] = [
  { term: 'PPAs', meaning: 'Programs, projects, and activities' },
  { term: 'MDRRM Fund', meaning: 'Municipal Disaster Risk Reduction and Management Fund' },
  { term: 'QRF', meaning: 'Quick Response Fund' },
  { term: 'MF-MOOE', meaning: 'Mitigation Fund, Maintenance and Other Operating Expenses' },
  { term: 'LDRRMIF / LDRRMFIP', meaning: 'Local Disaster Risk Reduction and Management Fund Investment Plan' },
  { term: 'LGU', meaning: 'Local government unit' },
  { term: 'PHIC', meaning: 'Philippine Health Insurance Corporation (PhilHealth)' },
  { term: 'DOLE', meaning: 'Department of Labor and Employment' },
  { term: 'PESO', meaning: 'Public Employment Service Office' },
  { term: 'RA 12009', meaning: 'New Government Procurement Act' },
  { term: 'P.D. 1445', meaning: 'Government Auditing Code of the Philippines' },
  { term: 'IRR', meaning: 'Implementing rules and regulations' },
  { term: 'LCE', meaning: 'Local Chief Executive (the Mayor)' },
  { term: 'ATL', meaning: 'Audit Team Leader' },
  { term: 'BAC', meaning: 'Bids and Awards Committee' },
  { term: 'MHO', meaning: 'Municipal Health Office or Officer' },
  { term: 'MPDO', meaning: 'Municipal Planning and Development Office' },
  { term: 'MDRRMF', meaning: 'Municipal Disaster Risk Reduction and Management Fund' },
  { term: 'STF', meaning: 'Special Trust Fund' },
  { term: 'AIP', meaning: 'Annual Investment Program' },
  { term: 'MOA', meaning: 'Memorandum of Agreement' },
  { term: 'PO', meaning: 'Purchase Order' },
  { term: 'HCI', meaning: 'Health care institution' },
]
