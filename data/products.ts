export type ProductItem = {
  name: string
  slug: string
  /** Planned monthly container opportunity, when the brief states one. */
  containers?: string
  description: string
  /** Extra spec bullets shown on the category page. */
  notes?: string[]
  art: string
}

export type ProductCategory = {
  slug: 'rice' | 'spices' | 'fresh-fruits' | 'fresh-vegetables' | 'dairy'
  label: string
  navLabel: string
  eyebrow: string
  headline: string[]
  intro: string
  /** Short teaser used on the home page + products hub grid. */
  summary: string
  art: string
  heroArt: string
  items: ProductItem[]
  additionalTitle?: string
  additionalNote?: string
  additional?: string[]
  ctaLabel: string
  seoTitle: string
  seoDescription: string
  photography: string[]
}

export const productCategories: ProductCategory[] = [
  {
    slug: 'rice',
    label: 'Premium Rice',
    navLabel: 'Rice',
    eyebrow: 'Product Portfolio / 01',
    headline: ['From India’s Fields', 'to International Markets'],
    intro:
      'Premium Indian rice sourced for wholesalers, distributors, supermarkets, hospitality groups and institutional buyers. Product specifications, packaging and commercial quantities can be discussed according to buyer requirements.',
    summary:
      'Sona Masoori, 1101 Basmati and 1102 rice sourced at container scale for wholesale, retail, hospitality and institutional buyers.',
    art: '/images/photos/rice-export-sack-50kg.jpg',
    heroArt: '/images/photos/rice-export-port-loading.jpg',
    ctaLabel: 'Request a Rice Quotation',
    seoTitle: 'Rice Supplier & Exporter Dubai',
    seoDescription:
      'Sona Masoori, 1101 Basmati and 1102 rice sourced from India and supplied at container scale to wholesalers, distributors and institutional buyers across the UAE, GCC and international markets.',
    items: [
      {
        name: 'Sona Masoori Rice',
        slug: 'sona-masoori-rice',
        containers: '64 Containers / Month',
        description:
          'Premium Indian Sona Masoori rice sourced for wholesalers, distributors, supermarkets, hospitality groups and institutional buyers.',
        notes: [
          'Specifications, packaging and commercial quantities discussed to buyer requirement',
          'Suited to recurring monthly supply programmes',
        ],
        art: '/images/photos/rice-basmati-warehouse-sacks.jpg',
      },
      {
        name: '1101 Basmati Rice',
        slug: '1101-basmati-rice',
        containers: '12 Containers / Month',
        description:
          'Premium long-grain aromatic rice suitable for wholesale, distribution, retail, hospitality and foodservice markets.',
        notes: ['Long-grain aromatic profile', 'Retail and foodservice packaging options'],
        art: '/images/photos/rice-basmati-grains-spoon.jpg',
      },
      {
        name: '1102 Rice',
        slug: '1102-rice',
        containers: '12 Containers / Month',
        description: 'Quality rice sourced for regional and international commercial markets.',
        notes: ['Regional and international commercial grades', 'Bulk and packed formats'],
        art: '/images/photos/rice-export-sack-50kg.jpg',
      },
    ],
    photography: [
      'Long rice grains',
      'Rice fields',
      'Premium rice in wooden bowls',
      'Export-quality rice bags',
      'Rice processing',
      'Palletized export shipments',
    ],
  },
  {
    slug: 'spices',
    label: 'Premium Spices',
    navLabel: 'Spices',
    eyebrow: 'Product Portfolio / 02',
    headline: ['The Flavours', 'of the World'],
    intro:
      'CK Foodstuff is developing an international spice sourcing division serving wholesalers, distributors, retailers, food processors, hospitality groups and institutional buyers. Sourced with quality. Supplied with confidence.',
    summary:
      'An international spice sourcing division covering cumin, pepper, cinnamon, cloves, cardamom, turmeric, coriander and chilli.',
    art: '/images/photos/spices-bowls-tray.jpg',
    heroArt: '/images/photos/spices-flatlay-wood.jpg',
    ctaLabel: 'Request a Spice Quotation',
    seoTitle: 'Spice Supplier & International Trader Dubai',
    seoDescription:
      'Cumin, black pepper, cinnamon, cloves, cardamom, turmeric, coriander and red chilli sourced to buyer specification, grade, packaging and destination port by CK Foodstuff Trading LLC, Dubai.',
    items: [
      {
        name: 'Cumin Seeds',
        slug: 'cumin-seeds',
        containers: '8 Containers / Month',
        description:
          'Carefully sourced cumin seeds for international wholesale, food processing, retail and hospitality markets.',
        art: '/images/photos/spices-slate-spoons.jpg',
      },
      {
        name: 'Black Pepper',
        slug: 'black-pepper',
        description:
          'Premium black pepper sourced according to buyer requirements, origin, grade, packaging and commercial volume.',
        art: '/images/photos/spices-bowls-tray.jpg',
      },
      {
        name: 'Cinnamon',
        slug: 'cinnamon',
        description:
          'Selected cinnamon for international wholesale, retail, foodservice and processing applications.',
        art: '/images/photos/cinnamon-star-anise.jpg',
      },
      {
        name: 'Cloves',
        slug: 'cloves',
        description:
          'Premium whole cloves sourced for spice distributors, wholesalers, food processors and hospitality customers.',
        art: '/images/photos/spices-flatlay-wood.jpg',
      },
      {
        name: 'Cardamom',
        slug: 'cardamom',
        description:
          'Premium cardamom for wholesale, hospitality, food manufacturing and international spice markets.',
        art: '/images/photos/spices-dark-slate.jpg',
      },
      {
        name: 'Turmeric',
        slug: 'turmeric',
        description:
          'Quality turmeric supplied according to required specifications and commercial quantities.',
        art: '/images/photos/turmeric-bowls.jpg',
      },
      {
        name: 'Coriander Seeds',
        slug: 'coriander-seeds',
        description: 'Selected coriander seeds for wholesale and food-processing markets.',
        art: '/images/photos/spices-slate-spoons.jpg',
      },
      {
        name: 'Red Chilli',
        slug: 'red-chilli',
        description:
          'Whole dried red chilli and selected chilli products subject to buyer specifications and sourcing availability.',
        art: '/images/photos/spices-dark-slate.jpg',
      },
    ],
    additionalTitle: 'Additional Spices',
    additionalNote: 'CK Foodstuff can develop sourcing opportunities for:',
    additional: [
      'Fennel Seeds',
      'Fenugreek',
      'Mustard Seeds',
      'Bay Leaves',
      'Nutmeg',
      'Star Anise',
      'Ginger',
      'Garlic',
      'Chilli Powder',
      'Turmeric Powder',
      'Coriander Powder',
      'Selected Spice Blends',
    ],
    photography: [
      'Cumin',
      'Black Pepper',
      'Cinnamon',
      'Cloves',
      'Cardamom',
      'Turmeric',
      'Red Chilli',
      'Star Anise',
    ],
  },
  {
    slug: 'fresh-fruits',
    label: 'Fresh Fruits',
    navLabel: 'Fresh Fruits',
    eyebrow: 'Product Portfolio / 03',
    headline: ['Fresh From Source.', 'Ready for International Markets.'],
    intro:
      'CK Foodstuff connects international buyers with selected fresh produce through coordinated sourcing, packaging and logistics.',
    summary:
      'Pomegranates, grapes and seasonal fruit connected to international buyers through coordinated sourcing, packing and cold-chain logistics.',
    art: '/images/photos/grapes-punnets-pallet.jpg',
    heroArt: '/images/photos/pomegranates-export-box.jpg',
    ctaLabel: 'Request a Fresh Produce Quotation',
    seoTitle: 'Fresh Fruit & Vegetable Supplier Dubai',
    seoDescription:
      'Fresh pomegranates, grapes and seasonal fruit sourced, packed and shipped by CK Foodstuff Trading LLC for wholesalers, distributors and supermarkets across the UAE, GCC and international markets.',
    items: [
      {
        name: 'Pomegranates',
        slug: 'pomegranates',
        containers: '8 Containers / Month',
        description:
          'Fresh pomegranates for wholesalers, distributors, supermarkets and international fruit markets.',
        art: '/images/photos/pomegranates-export-box.jpg',
      },
      {
        name: 'Grapes',
        slug: 'grapes',
        containers: '8 Containers / Month',
        description:
          'Fresh grapes supplied according to seasonal availability, product specifications and destination requirements.',
        art: '/images/photos/grapes-export-carton.jpg',
      },
    ],
    additionalTitle: 'Additional Fruits',
    additionalNote: 'Subject to season, customer demand and confirmed sourcing:',
    additional: [
      'Mangoes',
      'Bananas',
      'Oranges',
      'Lemons',
      'Apples',
      'Watermelon',
      'Papaya',
      'Other Seasonal Fruits',
    ],
    photography: [
      'Premium pomegranates',
      'Fresh grapes',
      'Fruit orchards',
      'Export crates',
      'Professional packing facilities',
      'Refrigerated fresh-produce logistics',
    ],
  },
  {
    slug: 'fresh-vegetables',
    label: 'Fresh Vegetables',
    navLabel: 'Fresh Vegetables',
    eyebrow: 'Product Portfolio / 04',
    headline: ['Fresh Produce.', 'Reliable Sourcing.'],
    intro:
      'Fresh vegetables sourced for wholesale, distribution, retail and hospitality markets, coordinated from field to destination port.',
    summary:
      'Carrots, onions, potatoes and seasonal vegetables sourced for wholesale, distribution, retail and hospitality markets.',
    art: '/images/photos/carrots-export-crates.jpg',
    heroArt: '/images/photos/carrots-export-crates.jpg',
    ctaLabel: 'Request a Fresh Produce Quotation',
    seoTitle: 'Fresh Vegetable Supplier & Exporter Dubai',
    seoDescription:
      'Carrots, onions, potatoes, tomatoes and seasonal vegetables sourced and supplied by CK Foodstuff Trading LLC for wholesale, distribution, retail and hospitality buyers.',
    items: [
      {
        name: 'Carrots',
        slug: 'carrots',
        containers: '8 Containers / Month',
        description:
          'Fresh carrots sourced for wholesale, distribution, retail and hospitality markets.',
        art: '/images/photos/carrots-export-crates.jpg',
      },
    ],
    additionalTitle: 'Additional Vegetables',
    additionalNote: 'Subject to season and sourcing availability:',
    additional: [
      'Onions',
      'Potatoes',
      'Tomatoes',
      'Green Chillies',
      'Garlic',
      'Ginger',
      'Okra',
      'Cabbage',
      'Cauliflower',
      'Capsicum',
      'Cucumber',
      'Seasonal Vegetables',
    ],
    photography: [
      'Carrots',
      'Onions',
      'Potatoes',
      'Green chilli',
      'Garlic',
      'Ginger',
      'Mixed fresh produce',
    ],
  },
  {
    slug: 'dairy',
    label: 'Dairy Products',
    navLabel: 'Dairy Products',
    eyebrow: 'Product Portfolio / 05',
    headline: ['European', 'Dairy Sourcing'],
    intro:
      'CK Foodstuff is developing European sourcing relationships for premium milk powder as part of the Company’s international product diversification strategy. The dairy category is intended to serve wholesalers, distributors, food manufacturers and institutional customers.',
    summary:
      'European sourcing relationships under development for premium milk powder serving wholesalers, manufacturers and institutional customers.',
    art: '/images/photos/dairy-pasture.jpg',
    heroArt: '/images/photos/dairy-pasture.jpg',
    ctaLabel: 'Request Milk Powder Information',
    seoTitle: 'Milk Powder Trading & Sourcing Dubai',
    seoDescription:
      'Premium European milk powder sourcing under development by CK Foodstuff Trading LLC, Dubai, for wholesalers, distributors, food manufacturers and institutional customers.',
    items: [
      {
        name: 'Premium European Milk Powder',
        slug: 'milk-powder',
        containers: 'Approximately 12 Containers / Month',
        description:
          'Premium European milk powder sourced for wholesalers, distributors, food manufacturers and institutional customers as part of the Company’s product diversification strategy.',
        notes: [
          'Initial identified commercial opportunity',
          'European sourcing relationships under development',
        ],
        art: '/images/photos/dairy-pasture.jpg',
      },
    ],
    photography: [
      'Neutral premium milk powder imagery',
      'European dairy farms',
      'Dairy production',
      'Powder texture close-ups',
      'Professional unbranded bulk packaging',
    ],
  },
]

export function getCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug)
}

/** Options for the RFQ product dropdown, in the order given in the brief. */
export const rfqProducts = [
  'Sona Masoori Rice',
  '1101 Basmati Rice',
  '1102 Rice',
  'Cumin Seeds',
  'Black Pepper',
  'Cinnamon',
  'Cloves',
  'Cardamom',
  'Turmeric',
  'Coriander Seeds',
  'Red Chilli',
  'Other Spices',
  'Pomegranates',
  'Grapes',
  'Carrots',
  'Other Fresh Produce',
  'Milk Powder',
  'Other Product',
]
