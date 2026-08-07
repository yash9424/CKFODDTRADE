import { productCategories } from './products'
import { images } from '@/lib/images'

export type NavChild = {
  label: string
  href: string
  blurb?: string
  /** Thumbnail shown beside the link in the desktop mega panel. */
  image?: string
  /** Icon name, used where a category has no photograph of its own. */
  icon?: string
}

export type NavItem = {
  label: string
  href: string
  children?: NavChild[]
  columnTitle?: string
  /** Background photograph for the mega panel's promo column. */
  panelImage?: string
  /** One line of copy under the promo column heading. */
  panelBlurb?: string
}

/** Short strapline per product category, keyed by slug. */
const productBlurbs: Record<string, string> = {
  rice: 'Sona Masoori · 1101 Basmati · 1102',
  spices: 'Cumin · Pepper · Cinnamon · Cardamom',
  'fresh-fruits': 'Pomegranates · Grapes · Seasonal',
  'fresh-vegetables': 'Carrots · Onions · Seasonal produce',
  dairy: 'European premium milk powder',
}

/** Thumbnails come straight from the product data so they never drift. */
const productChildren: NavChild[] = productCategories.map((category) => ({
  label: category.navLabel,
  href: `/products/${category.slug}`,
  blurb: productBlurbs[category.slug],
  image: category.art,
}))

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    columnTitle: 'Product Portfolio',
    panelImage: images.megaProducts,
    panelBlurb:
      'Rice, spices, fresh produce and dairy sourced at container scale for international buyers.',
    children: productChildren,
  },
  {
    label: 'Our Services',
    href: '/services',
    columnTitle: 'Supply-Chain Solutions',
    panelImage: images.megaServices,
    panelBlurb:
      'From identifying producers at origin to delivering into destination markets — through one relationship.',
    children: [
      { label: 'Global Sourcing', href: '/services#global-sourcing', blurb: 'Producer identification to specification', icon: 'globe' },
      { label: 'Procurement', href: '/services#procurement', blurb: 'Negotiation and shipment planning', icon: 'handshake' },
      { label: 'Import & Export', href: '/services#import-export', blurb: 'Origin to destination trading', icon: 'ship' },
      { label: 'Quality Coordination', href: '/services#quality-coordination', blurb: 'Specifications and documentation', icon: 'shield' },
      { label: 'Logistics', href: '/services#logistics', blurb: 'Freight, warehousing, delivery', icon: 'route' },
      { label: 'Wholesale Distribution', href: '/services#wholesale-distribution', blurb: 'Recurring container-scale supply', icon: 'warehouse' },
    ],
  },
  { label: 'Supply Chain', href: '/supply-chain' },
  { label: 'Become a Supplier', href: '/become-a-supplier' },
  { label: 'Investors', href: '/investors' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const footerNav = {
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'Supply Chain', href: '/supply-chain' },
    { label: 'Become a Supplier', href: '/become-a-supplier' },
    { label: 'Investors', href: '/investors' },
    { label: 'Contact', href: '/contact' },
  ],
  productLinks: [
    { label: 'Rice', href: '/products/rice' },
    { label: 'Spices', href: '/products/spices' },
    { label: 'Fresh Fruits', href: '/products/fresh-fruits' },
    { label: 'Fresh Vegetables', href: '/products/fresh-vegetables' },
    { label: 'Dairy', href: '/products/dairy' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Terms & Conditions', href: '/legal/terms-and-conditions' },
    { label: 'Cookie Policy', href: '/legal/cookie-policy' },
    { label: 'Disclaimer', href: '/legal/disclaimer' },
  ],
}
