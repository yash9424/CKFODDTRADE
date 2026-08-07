/**
 * Central image map.
 *
 * Every page-level image slot resolves through here, so swapping a photograph
 * is a one-line edit rather than a hunt through components. Product imagery
 * lives alongside its copy in `data/products.ts`.
 *
 * Sources:
 *   photos/*.jpg  supplied photography (imported by scripts/prepare-photos.mjs)
 *                 plus high-resolution hero photography sourced from Wikimedia
 *                 Commons (scripts/fetch-hero-photos.mjs). Licences and the
 *                 required CC BY attributions are recorded in PHOTO-CREDITS.md.
 *   art/*.svg     generated brand artwork (scripts/generate-art.mjs)
 */

const photo = (name: string) => `/images/photos/${name}.jpg`

export const images = {
  /** Home page hero — container terminal panorama, 3600px wide. */
  homeHero: photo('container-terminal-panorama'),

  /** Dubai headquarters panel. */
  dubai: photo('dubai-skyline-night'),

  /** Trade-network / leadership panel. */
  network: photo('container-terminal-panorama'),

  /** Page heroes. */
  aboutHero: photo('dubai-skyline-dusk'),
  productsHero: photo('container-yard'),
  servicesHero: photo('container-terminal-night'),
  supplyChainHero: photo('container-terminal-panorama'),
  supplierHero: photo('rice-harvest-field'),
  investorsHero: photo('container-yard'),
  contactHero: photo('dubai-skyline-night'),
  quoteHero: photo('container-terminal-night'),
  legalHero: photo('dubai-skyline-night'),

  /** Supporting panels. */
  logistics: photo('container-terminal-night'),
  sourcing: photo('rice-harvest-field'),
  port: photo('container-terminal-panorama'),

  /** Default background for the closing call-to-action band. */
  ctaDefault: photo('container-terminal-night'),

  /** Promo column backgrounds inside the desktop mega menu. */
  megaProducts: photo('spices-flatlay-wood'),
  megaServices: photo('container-terminal-night'),
} as const
