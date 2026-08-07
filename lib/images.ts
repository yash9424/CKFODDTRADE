/**
 * Central image map.
 *
 * Every page-level image slot resolves through here, so swapping a photograph
 * is a one-line edit rather than a hunt through components. Product imagery
 * lives alongside its copy in `data/products.ts`.
 *
 * `photos/*.jpg`  — supplied photography, imported via scripts/prepare-photos.mjs
 * `art/*.svg`     — generated brand artwork, used where no photograph exists yet
 */

const photo = (name: string) => `/images/photos/${name}.jpg`
const art = (name: string) => `/images/art/${name}.svg`

export const images = {
  /** Home page hero — container vessel, Dubai skyline, gantry cranes. */
  homeHero: photo('dubai-port-container-vessel'),

  /** Dubai headquarters panel on the home page. */
  dubai: photo('dubai-port-container-vessel'),

  /** Trade-network / leadership panel. */
  network: photo('jebel-ali-terminal-aerial'),

  /** Page heroes. */
  aboutHero: photo('dubai-port-container-vessel'),
  productsHero: photo('jebel-ali-terminal-aerial'),
  servicesHero: photo('dubai-terminal-dusk'),
  supplyChainHero: photo('jebel-ali-terminal-aerial'),
  supplierHero: photo('rice-farm-jute-sacks'),
  investorsHero: photo('jebel-ali-terminal-aerial'),
  contactHero: photo('dubai-terminal-dusk'),
  quoteHero: photo('dubai-terminal-dusk'),
  legalHero: photo('dubai-terminal-dusk'),

  /** Supporting panels. */
  logistics: photo('dubai-terminal-dusk'),
  sourcing: photo('rice-farm-jute-sacks'),
  port: photo('jebel-ali-terminal-aerial'),

  /** Default background for the closing call-to-action band. */
  ctaDefault: photo('dubai-terminal-dusk'),

  /** Promo column backgrounds inside the desktop mega menu. */
  megaProducts: photo('spices-flatlay-wood'),
  megaServices: photo('dubai-terminal-dusk'),

  /** No dairy photography supplied yet — generated brand artwork stands in. */
  dairyFallback: art('dairy-hero'),
} as const
