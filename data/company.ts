export type Stat = {
  value: string
  label: string
  sublabel?: string
  /** Numeric target for the count-up animation; omitted for word-based stats. */
  countTo?: number
  prefix?: string
  suffix?: string
}

export const keyNumbers: Stat[] = [
  { value: 'Dubai', label: 'International Headquarters' },
  { value: 'Surat & Mumbai', label: 'India Procurement Network' },
  {
    value: '120–140',
    label: 'Initial Planned Containers / Month',
    countTo: 140,
    prefix: '120–',
  },
  {
    value: '500',
    label: 'Target Containers / Month by Q4 2027',
    countTo: 500,
  },
  {
    value: 'Multiple Categories',
    label: 'Rice • Spices • Fruits • Vegetables • Dairy',
  },
  {
    value: 'International Markets',
    label: 'UAE • GCC • Asia • Africa • Europe',
  },
]

export const containerDisclaimer =
  'Container figures represent management’s planned trading opportunities and growth targets and should not be interpreted as guaranteed future volumes.'

export const roadmapDisclaimer =
  'These figures represent management’s planned trading capacity and growth objectives and are not guaranteed future trading volumes.'

export const mission = [
  'Source quality food products',
  'Build long-term supplier relationships',
  'Maintain professional procurement standards',
  'Coordinate reliable international logistics',
  'Deliver competitive commercial solutions',
  'Build long-term customer relationships',
  'Create sustainable value for our business partners',
]

export type Service = {
  id: string
  title: string
  description: string
  icon: string
  index: string
}

export const services: Service[] = [
  {
    id: 'global-sourcing',
    index: '01',
    title: 'Global Sourcing',
    icon: 'globe',
    description:
      'We identify suitable producers and suppliers according to customer specifications, required volumes, packaging, destination and commercial requirements.',
  },
  {
    id: 'procurement',
    index: '02',
    title: 'Procurement',
    icon: 'handshake',
    description:
      'Our procurement network supports supplier selection, commercial negotiations, production coordination and shipment planning.',
  },
  {
    id: 'import-export',
    index: '03',
    title: 'Import & Export',
    icon: 'ship',
    description:
      'CK Foodstuff coordinates international food trading between producing countries and destination markets.',
  },
  {
    id: 'quality-coordination',
    index: '04',
    title: 'Quality Coordination',
    icon: 'shield',
    description:
      'Product specifications, packaging requirements and relevant documentation are coordinated according to contractual requirements before shipment.',
  },
  {
    id: 'logistics',
    index: '05',
    title: 'International Logistics',
    icon: 'route',
    description:
      'We coordinate freight, shipping documentation, warehousing and delivery through our logistics network.',
  },
  {
    id: 'wholesale-distribution',
    index: '06',
    title: 'Wholesale Distribution',
    icon: 'warehouse',
    description:
      'We develop recurring commercial supply relationships with wholesalers, distributors and large-volume buyers.',
  },
  {
    id: 'institutional-supply',
    index: '07',
    title: 'Institutional Supply',
    icon: 'building',
    description:
      'CK Foodstuff seeks opportunities to serve hospitality groups, catering businesses, food processors, institutions and qualified contract procurement channels.',
  },
]

export const supplyChainSteps = [
  {
    title: 'Producer / Farm',
    detail: 'Growers, mills, processors and manufacturers at origin.',
  },
  {
    title: 'CK Procurement',
    detail: 'Supplier selection, negotiation and production coordination.',
    location: 'Surat • Mumbai',
  },
  {
    title: 'Quality Coordination',
    detail: 'Specifications, grades and packaging confirmed against contract.',
  },
  {
    title: 'Packing & Documentation',
    detail: 'Export packing, labelling and shipping documentation prepared.',
  },
  {
    title: 'International Shipping',
    detail: 'Freight booking, container loading and vessel departure.',
  },
  {
    title: 'Dubai / Destination Port',
    detail: 'Arrival, clearance coordination and port handling.',
  },
  {
    title: 'Warehousing & Distribution',
    detail: 'Storage, order consolidation and onward distribution.',
  },
  {
    title: 'Customer',
    detail: 'Delivery to wholesaler, distributor, retailer or institution.',
  },
]

export const chairmanChain = [
  'Sourcing',
  'Procurement',
  'Quality Coordination',
  'Logistics',
  'International Trade',
  'Distribution',
  'Customer Delivery',
]

export const audiences = [
  {
    title: 'Wholesalers',
    description: 'Container and bulk-volume supply for regional distribution.',
    icon: 'boxes',
  },
  {
    title: 'Importers & Distributors',
    description: 'International sourcing and recurring commercial supply programs.',
    icon: 'ship',
  },
  {
    title: 'Supermarkets & Retailers',
    description: 'Food products sourced according to required specifications and packaging.',
    icon: 'cart',
  },
  {
    title: 'Hotels & Hospitality',
    description: 'Reliable sourcing solutions for hospitality and foodservice operations.',
    icon: 'bell',
  },
  {
    title: 'Restaurants & Catering',
    description:
      'Commercial supply of rice, spices, fruits, vegetables and other food products.',
    icon: 'chef',
  },
  {
    title: 'Food Processors',
    description: 'Bulk agricultural commodities and food ingredients.',
    icon: 'factory',
  },
  {
    title: 'Institutional Buyers',
    description: 'Structured supply solutions for larger procurement requirements.',
    icon: 'building',
  },
]

export const differentiators = [
  {
    title: 'Dubai Headquarters',
    description:
      'Strategically positioned in one of the world’s important international trading and logistics hubs.',
  },
  {
    title: 'India Procurement Network',
    description:
      'Our procurement presence in Surat and Mumbai provides closer access to producers, exporters and agricultural supply networks.',
  },
  {
    title: 'Diversified Product Portfolio',
    description:
      'Rice, spices, fruits, vegetables and planned dairy products through one commercial relationship.',
  },
  {
    title: 'Container-Scale Business',
    description:
      'Our operating model is designed for professional B2B and container-volume transactions.',
  },
  {
    title: 'Procurement Focus',
    description:
      'Supplier selection, negotiation, specifications and procurement coordination form the foundation of our operating model.',
  },
  {
    title: 'International Logistics',
    description: 'We coordinate supply-chain requirements from origin through destination.',
  },
  {
    title: 'Long-Term Partnerships',
    description:
      'Our objective is to develop recurring commercial relationships rather than simply complete individual transactions.',
  },
]

export const team = [
  {
    name: 'Chirag Kumar Trivedi',
    role: 'Chief Executive Officer',
    description:
      'Corporate leadership, procurement strategy, supplier relationships, operational execution and business growth.',
    initials: 'CT',
  },
  {
    name: 'Rolando Lazar',
    role: 'Chairman & Managing Director',
    description:
      'International expansion, strategic partnerships, investor relations and global business development.',
    initials: 'RL',
  },
  {
    name: 'Lalkar Singh',
    role: 'Head of Procurement',
    description:
      'Sourcing, supplier management, procurement negotiations and quality coordination.',
    initials: 'LS',
  },
  {
    name: 'Arjun Singh',
    role: 'Gulf Head of Sales',
    description: 'GCC sales development, distributor relationships and key accounts.',
    initials: 'AS',
  },
  {
    name: 'Dhaval Darji & Team',
    role: 'Operations',
    description: 'Shipping, logistics, documentation, warehousing and fulfilment.',
    initials: 'DD',
  },
  {
    name: 'Ramu Chella & Team',
    role: 'Chartered Accounting',
    description:
      'Accounting, taxation, compliance, financial reporting and financial controls.',
    initials: 'RC',
  },
]

export const roadmap = [
  {
    phase: 'Initial Operations',
    value: '120–140',
    unit: 'Containers / Month',
    countTo: 140,
  },
  { phase: 'Expansion Target', value: '200', unit: 'Containers / Month', countTo: 200 },
  { phase: 'Q1 2027 Target', value: '250', unit: 'Containers / Month', countTo: 250 },
  { phase: 'Q4 2027 Target', value: '500', unit: 'Containers / Month', countTo: 500 },
]

export const locations = [
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    role: 'International Headquarters',
    detail: 'International sales, strategic partnerships, trading and business development.',
    address: [
      'Office B01',
      'Al Abbas 2 Building',
      'Bank Street',
      'Bur Dubai',
      'Dubai',
      'United Arab Emirates',
    ],
  },
  {
    city: 'Surat',
    country: 'Gujarat, India',
    role: 'Procurement Office',
    detail: 'Procurement • Supplier Coordination • Quality Coordination',
  },
  {
    city: 'Mumbai',
    country: 'Maharashtra, India',
    role: 'Export Coordination',
    detail: 'Export Coordination • Shipping • Documentation • Logistics',
  },
]
