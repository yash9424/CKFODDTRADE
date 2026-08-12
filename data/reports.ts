import { containerDisclaimer, roadmapDisclaimer } from './company'
import { productCategories } from './products'

/**
 * Company report data.
 *
 * Sourced from the Project Emerald Executive Investment Memorandum and
 * cross-checked against the product data the rest of the site renders, so a
 * figure can never drift between a product page and the report.
 *
 * DELIBERATELY EXCLUDED — the memorandum is marked confidential and contains
 * target monthly profit-participation percentages and a capital repayment
 * schedule. The brief requires that the public site publish no investor return
 * percentages and no suggestion of guaranteed returns; those terms are released
 * only through the investor review and due-diligence process. See
 * `restrictedNotice` below, which is what renders in their place.
 */

/** Pulls the leading number out of strings like "Approximately 12 Containers / Month". */
function containersPerMonth(label: string | undefined): number {
  const match = label?.match(/(\d+)/)
  return match ? Number(match[1]) : 0
}

export const reportMeta = {
  title: 'Company Report',
  subtitle: 'Project Emerald — Strategic Growth Overview',
  basis:
    'Prepared from CK Foodstuff Trading LLC management information. Figures represent management’s planned trading capacity for the initial operating period and its stated growth objectives.',
}

/* ------------------------------------------------------------------ */
/* at a glance                                                          */
/* ------------------------------------------------------------------ */
export const reportHighlights = [
  { label: 'Head Office', value: 'Bur Dubai, UAE' },
  { label: 'Procurement', value: 'Surat & Mumbai, India' },
  { label: 'Capital Raise', value: 'USD 10 Million' },
  { label: 'Initial Capacity', value: '120–140 Containers / Month' },
  { label: 'Q4 2027 Target', value: '500 Containers / Month' },
  { label: 'Products', value: 'Rice · Spices · Fresh Produce · Milk Powder' },
]

export const executiveSummary = [
  'CK Foodstuff Trading LLC is an international food sourcing, procurement, import, export, logistics and distribution company headquartered in Dubai. The Company is seeking USD 10 million in strategic growth capital to expand inventory, working capital, logistics, warehousing and commercial operations.',
  'Project Emerald represents the Company’s first strategic growth capital round. Management believes the proposed investment will strengthen procurement, inventory, logistics, working capital and commercial expansion while supporting disciplined long-term growth.',
]

/* ------------------------------------------------------------------ */
/* planned volumes — derived from the product data                      */
/* ------------------------------------------------------------------ */
export type VolumeRow = {
  product: string
  category: string
  slug: string
  stated: string
  containers: number
  planned: boolean
}

export const volumeRows: VolumeRow[] = productCategories.flatMap((category) =>
  category.items
    .filter((item) => item.containers)
    .map((item) => ({
      product: item.name,
      category: category.label,
      slug: category.slug,
      stated: item.containers!,
      containers: containersPerMonth(item.containers),
      planned: /approx/i.test(item.containers!) || category.slug === 'dairy',
    })),
)

export const volumeTotal = volumeRows.reduce((sum, row) => sum + row.containers, 0)

/* ------------------------------------------------------------------ */
/* growth milestones                                                    */
/* ------------------------------------------------------------------ */
export const growthMilestones = [
  { milestone: 'Launch', target: '120–140', unit: 'Containers / Month' },
  { milestone: 'After 4 Months', target: '200', unit: 'Containers / Month' },
  { milestone: 'Q1 2027', target: '250', unit: 'Containers / Month' },
  { milestone: 'Q4 2027', target: '500', unit: 'Containers / Month' },
]

/* ------------------------------------------------------------------ */
/* capital deployment                                                   */
/* ------------------------------------------------------------------ */
export const capitalAllocation = [
  { use: 'Inventory Procurement', share: 45 },
  { use: 'Working Capital', share: 20 },
  { use: 'Trade Finance', share: 10 },
  { use: 'Logistics & Warehousing', share: 10 },
  { use: 'Sales & Business Development', share: 8 },
  { use: 'Strategic Reserve', share: 5 },
  { use: 'Technology & Reporting', share: 2 },
]

export const capitalAllocationTotal = capitalAllocation.reduce((sum, r) => sum + r.share, 0)

export const capitalNote =
  'The USD 10 million strategic growth capital is intended to support inventory procurement, working capital, trade finance, logistics, warehousing, technology, sales expansion and strategic reserves. Allocation is indicative.'

/* ------------------------------------------------------------------ */
/* performance framework                                                */
/* ------------------------------------------------------------------ */
export const performanceFramework = [
  { kpi: 'Revenue Growth', objective: 'Continuous year-on-year expansion' },
  { kpi: 'Gross Profit', objective: 'Improve procurement efficiency' },
  { kpi: 'EBITDA', objective: 'Sustainable operating profitability' },
  { kpi: 'Cash Flow', objective: 'Maintain healthy liquidity' },
  { kpi: 'Inventory Turnover', objective: 'Optimize stock rotation' },
  { kpi: 'Return on Invested Capital', objective: 'Long-term value creation' },
]

/* ------------------------------------------------------------------ */
/* market, advantages, risk, ESG                                        */
/* ------------------------------------------------------------------ */
export const marketOpportunity = [
  'Growing GCC demand for imported food',
  'Reliable supply chain partnerships',
  'Expansion into dairy imports',
  'Diversified customer segments across wholesalers, retailers, hospitality and institutions',
]

export const whyDubai = [
  'Strategic location between Asia, Europe and Africa',
  'World-class ports and airports',
  'Business-friendly environment',
  'Access to international banking and trade finance',
]

export const whyIndia =
  'Procurement operations in Surat and Mumbai provide direct access to agricultural producers, export infrastructure, quality control and competitive sourcing.'

export const competitiveAdvantages = [
  { strength: 'Dubai Headquarters', benefit: 'Global trade connectivity' },
  { strength: 'India Procurement', benefit: 'Direct sourcing and quality control' },
  { strength: 'Diversified Products', benefit: 'Reduced dependence on one commodity' },
  { strength: 'Scalable Platform', benefit: 'Supports long-term growth' },
  { strength: 'Experienced Leadership', benefit: 'Execution and strategic development' },
]

export const riskManagement = [
  { area: 'Supplier Risk', mitigation: 'Diversified supplier base' },
  { area: 'Logistics', mitigation: 'Multiple freight partners' },
  { area: 'Foreign Exchange', mitigation: 'Financial monitoring' },
  { area: 'Customer Credit', mitigation: 'Commercial assessment' },
  { area: 'Regulatory', mitigation: 'Compliance procedures' },
]

export const esgPillars = [
  { pillar: 'Environmental', detail: 'Responsible sourcing and efficient logistics.' },
  { pillar: 'Social', detail: 'Long-term supplier and customer relationships.' },
  {
    pillar: 'Governance',
    detail: 'Transparency, ethics, compliance and financial accountability.',
  },
]

/* ------------------------------------------------------------------ */
/* governance & reporting                                               */
/* ------------------------------------------------------------------ */
export const investorReporting = [
  'Monthly operational reports',
  'Monthly financial summaries',
  'Trading volume updates',
  'Management commentary',
  'Quarterly business reviews',
  'Annual financial statements',
]

export const governanceNote =
  'The Company intends to maintain transparent governance through clearly defined responsibilities, financial oversight, internal controls, compliance procedures and regular communication with investors.'

/* ------------------------------------------------------------------ */
/* what is withheld, and why                                            */
/* ------------------------------------------------------------------ */
export const restrictedNotice = {
  title: 'Investment terms are not published here',
  body: [
    'Target profit participation, the capital commitment period and the capital repayment framework form part of the confidential Project Emerald Investment Memorandum.',
    'They are released only to qualified investors under a formal investor review and due-diligence process. Nothing on this page is an offer of securities, an invitation to invest, or a promise of any return.',
  ],
  items: [
    'Target profit participation schedule',
    'Capital commitment period',
    'Capital repayment framework',
    'Definitive investment agreement terms',
  ],
}

export const reportDisclaimers = [containerDisclaimer, roadmapDisclaimer]
