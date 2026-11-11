/**
 * Municipal finances of Catarman, 2011 to 2025.
 *
 * Rule: each year shows the figures stated in that year's own Commission on Audit (COA)
 * report. Later reports sometimes restate an earlier year; where they do, `note` says so.
 *
 * `source` records how each row was checked, on 11 November 2026:
 *  - 'summary'    read from that year's COA Executive Summary (Financial Highlights table)
 *  - 'report'     read from the financial statements in that year's full Annual Audit Report
 *  - 'comparison' read from the prior-year column of the following year's Executive Summary
 *  - 'wikidata'   NOT checked: recorded on Wikidata (item Q174886), which cites the COA report
 *
 * COA's own terms are used: "income" and "expenses".
 */
export interface FinanceYear {
  year: number
  income: number
  expenses: number
  liabilities: number
  assets: number
  source: 'summary' | 'report' | 'comparison' | 'wikidata'
  note?: string
}

export const financeYears: FinanceYear[] = [
  { year: 2025, income: 608572208.96, expenses: 490827853.75, liabilities: 361478549.35, assets: 1648134295.07, source: 'summary' },
  { year: 2024, income: 514092276.94, expenses: 471856912.98, liabilities: 514940665.43, assets: 1661145321.67, source: 'summary' },
  { year: 2023, income: 471920327.91, expenses: 479166197.52, liabilities: 536715666.30, assets: 1616615647.32, source: 'summary' },
  { year: 2022, income: 539797227.65, expenses: 457510225.75, liabilities: 334259775.36, assets: 1327187093.35, source: 'summary' },
  {
    year: 2021, income: 447398790.84, expenses: 391622060.35, liabilities: 136628899.60, assets: 1050109981.18, source: 'summary',
    note: 'The 2022 report restates 2021 assets as ₱1,050,486,472.64 and liabilities as ₱137,005,391.06.',
  },
  { year: 2020, income: 458309659.38, expenses: 422231532.05, liabilities: 158297181.89, assets: 962031188.68, source: 'summary' },
  { year: 2019, income: 398951325.56, expenses: 363610053.33, liabilities: 132816900.76, assets: 904446155.69, source: 'summary' },
  {
    year: 2018, income: 407414896.77, expenses: 332929511.84, liabilities: 155298530.14, assets: 762222883.90, source: 'report',
    note: 'Total revenue and current operating expenses from the 2018 financial statements. The 2019 report’s comparison column shows 2018 income as ₱408,266,116.77 and expenses as ₱356,835,327.61.',
  },
  { year: 2017, income: 537373740.53, expenses: 438764556.30, liabilities: 118644045.64, assets: 643117198.84, source: 'summary' },
  { year: 2016, income: 509320370.06, expenses: 466001169.41, liabilities: 105407380.69, assets: 504858774.38, source: 'summary' },
  {
    year: 2015, income: 295431127.83, expenses: 225165284.02, liabilities: 107909416.69, assets: 457231179.25, source: 'summary',
    note: 'The 2016 report restates 2015 income as ₱244,363,679.98 and expenses as ₱183,753,889.38.',
  },
  { year: 2014, income: 213394930.20, expenses: 173343867.53, liabilities: 82593164.65, assets: 415403857.90, source: 'summary' },
  { year: 2013, income: 185604934.56, expenses: 152281157.41, liabilities: 63039434.00, assets: 359327554.04, source: 'comparison' },
  { year: 2012, income: 169402083.89, expenses: 199363479.11, liabilities: 55701870.22, assets: 318488484.49, source: 'wikidata' },
  { year: 2011, income: 169406589.86, expenses: 130356809.64, liabilities: 55810908.99, assets: 286882408.20, source: 'wikidata' },
]

export const coaReportsUrl = 'https://www.coa.gov.ph/reports/annual-audit-reports/aar-local-government-units/'
export const financeVia = { label: 'Wikidata record for Catarman', url: 'https://www.wikidata.org/wiki/Q174886' }

/** From COA's Catarman Executive Summary 2025. */
export const audit2025 = {
  opinion: 'unmodified',
  equity: 1286655745.72,
  appropriations: 572254637.16,
  obligations: 393244342.16,
}
