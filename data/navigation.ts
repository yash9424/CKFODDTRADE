export type NavChild = { label: string; href: string; blurb?: string }
export type NavItem = {
  label: string
  href: string
  children?: NavChild[]
  columnTitle?: string
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    columnTitle: 'Product Portfolio',
    children: [
      { label: 'Rice', href: '/products/rice', blurb: 'Sona Masoori · 1101 Basmati · 1102' },
      { label: 'Spices', href: '/products/spices', blurb: 'Cumin · Pepper · Cinnamon · Cardamom' },
      { label: 'Fresh Fruits', href: '/products/fresh-fruits', blurb: 'Pomegranates · Grapes · Seasonal' },
      { label: 'Fresh Vegetables', href: '/products/fresh-vegetables', blurb: 'Carrots · Onions · Seasonal produce' },
      { label: 'Dairy Products', href: '/products/dairy', blurb: 'European premium milk powder' },
    ],
  },
  {
    label: 'Our Services',
    href: '/services',
    columnTitle: 'Supply-Chain Solutions',
    children: [
      { label: 'Global Sourcing', href: '/services#global-sourcing', blurb: 'Producer identification to specification' },
      { label: 'Procurement', href: '/services#procurement', blurb: 'Negotiation and shipment planning' },
      { label: 'Import & Export', href: '/services#import-export', blurb: 'Origin to destination trading' },
      { label: 'Quality Coordination', href: '/services#quality-coordination', blurb: 'Specifications and documentation' },
      { label: 'Logistics', href: '/services#logistics', blurb: 'Freight, warehousing, delivery' },
      { label: 'Wholesale Distribution', href: '/services#wholesale-distribution', blurb: 'Recurring container-scale supply' },
    ],
  },
  { label: 'Supply Chain', href: '/supply-chain' },
  { label: 'Become a Supplier', href: '/become-a-supplier' },
  { label: 'Investors', href: '/investors' },
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
