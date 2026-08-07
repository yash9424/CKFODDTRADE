/**
 * Downloads the selected Wikimedia Commons photography for the site's hero
 * slots, resizes it for full-bleed use, and writes PHOTO-CREDITS.md.
 *
 * The originals here are 4K–15K wide, which is the point: the previous hero
 * images were 850–900px and visibly soft when stretched across a screen.
 *
 * Every entry is CC0, Public Domain or CC BY — licences that permit commercial
 * use and cropping. CC BY requires visible attribution; see PHOTO-CREDITS.md.
 *
 * Run with: node scripts/fetch-hero-photos.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'images', 'photos')
mkdirSync(OUT, { recursive: true })

const UA = 'ck-foodstuff-site/1.0 (contact: ckfoodstuff@gmail.com)'

/** Long edge to store. Heroes run full-bleed, so 2560 covers 2x on most screens. */
const MAX_EDGE = 2560

const SELECTED = [
  {
    name: 'container-terminal-panorama',
    commons: 'Keppel Container Terminal, Singapore - 20120525.jpg',
    licence: 'CC BY 2.0',
    creator: 'Noel Reynolds',
    landing:
      'https://commons.wikimedia.org/wiki/File:Keppel_Container_Terminal,_Singapore_-_20120525.jpg',
    subject: 'Container terminal panorama',
    usedFor: 'Home hero, Products hero',
    // Extremely wide original (2.67:1); keep the width rather than the height.
    maxEdge: 3600,
  },
  {
    name: 'container-terminal-night',
    commons: 'Loading containers (21904865481).jpg',
    licence: 'CC BY 2.0',
    creator: 'Marcel Sala',
    landing: 'https://commons.wikimedia.org/wiki/File:Loading_containers_(21904865481).jpg',
    subject: 'Gantry cranes loading containers at night',
    usedFor: 'Services hero, Request a Quote hero, CTA bands, logistics panel',
  },
  {
    name: 'dubai-skyline-night',
    commons: 'Dubai skyline unsplash.jpg',
    licence: 'CC0',
    creator: 'Robert Bock',
    landing: 'https://commons.wikimedia.org/wiki/File:Dubai_skyline_unsplash.jpg',
    subject: 'Dubai skyline at night across the water',
    usedFor: 'Contact hero, legal hero, headquarters panel',
  },
  {
    name: 'dubai-skyline-dusk',
    commons: 'Burj Khalifa (worlds tallest building) and the Dubai skyline (25781049892).jpg',
    licence: 'CC BY 2.0',
    creator: 'imran shahabuddin',
    landing:
      'https://commons.wikimedia.org/wiki/File:Burj_Khalifa_(worlds_tallest_building)_and_the_Dubai_skyline_(25781049892).jpg',
    subject: 'Burj Khalifa and the Dubai skyline at dusk',
    usedFor: 'About hero',
  },
  {
    name: 'container-yard',
    commons: 'Zhangjiagang win hanverky container terminal port 2024-04.jpg',
    licence: 'CC BY 4.0',
    creator: 'Pierre Marshall',
    landing:
      'https://commons.wikimedia.org/wiki/File:Zhangjiagang_win_hanverky_container_terminal_port_2024-04.jpg',
    subject: 'Stacked containers in a terminal yard',
    usedFor: 'Investors hero, Supply Chain hero',
  },
  {
    name: 'rice-harvest-field',
    commons: 'Harvesting paddy.jpg',
    licence: 'CC BY 4.0',
    creator: 'Zaheed Sarwer Khan',
    landing: 'https://commons.wikimedia.org/wiki/File:Harvesting_paddy.jpg',
    subject: 'Paddy harvest in the field',
    usedFor: 'Become a Supplier hero, sourcing panel',
  },
  {
    name: 'dairy-pasture',
    commons: 'Cattle Posing for a Group Photo Haft Farm Augusta Township Michigan.JPG',
    licence: 'CC BY 3.0',
    creator: 'Dwight Burdette',
    landing:
      'https://commons.wikimedia.org/wiki/File:Cattle_Posing_for_a_Group_Photo_Haft_Farm_Augusta_Township_Michigan.JPG',
    subject: 'Dairy cattle in pasture',
    usedFor: 'Dairy category hero and card',
  },
]

function filePath(title) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title)}`
}

const results = []

for (const item of SELECTED) {
  const max = item.maxEdge ?? MAX_EDGE
  // Ask Commons to do the downscale server-side; pulling a 15k original is
  // wasteful and the thumbnailer output is already high quality.
  const url = `${filePath(item.commons)}?width=${max}`

  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) {
    console.error(`  ! ${item.name} -> HTTP ${res.status}`)
    continue
  }

  const buf = Buffer.from(await res.arrayBuffer())
  const to = join(OUT, `${item.name}.jpg`)

  const info = await sharp(buf)
    .resize({ width: max, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(to)

  results.push({ ...item, width: info.width, height: info.height, bytes: info.size })
  console.log(
    `  ${item.name}.jpg`.padEnd(38),
    `${info.width}x${info.height}`.padEnd(12),
    `${String(Math.round(info.size / 1024)).padStart(4)}KB`,
    item.licence,
  )
}

/* ------------------------------------------------------------------ */
/* credits                                                              */
/* ------------------------------------------------------------------ */
const attributed = results.filter((r) => r.licence.startsWith('CC BY'))
const free = results.filter((r) => !r.licence.startsWith('CC BY'))

const credits = `# Photo credits

Photography sourced from Wikimedia Commons for the hero sections of this site.
Only licences permitting **commercial use and cropping** were used — CC0,
Public Domain and CC BY. ShareAlike, NonCommercial and NoDerivatives images
were excluded.

Client-supplied photography in \`public/images/photos/\` (rice, spices, fresh
produce, and the Dubai port shots taken by CK Foodstuff) is not listed here and
carries no attribution requirement.

## Attribution required (CC BY)

Under CC BY you must credit the author, name the licence and link back to the
source. The simplest compliant option is a credits line in the website footer
or a \`/legal/photo-credits\` page.

${attributed
  .map(
    (r) => `### ${r.name}.jpg
- **Subject:** ${r.subject}
- **Used for:** ${r.usedFor}
- **Author:** ${r.creator}
- **Licence:** ${r.licence}
- **Source:** ${r.landing}
`,
  )
  .join('\n')}
## No attribution required

${free
  .map(
    (r) => `### ${r.name}.jpg
- **Subject:** ${r.subject}
- **Used for:** ${r.usedFor}
- **Author:** ${r.creator} (credited voluntarily)
- **Licence:** ${r.licence}
- **Source:** ${r.landing}
`,
  )
  .join('\n')}
## Suggested credit line

> Photography: ${attributed.map((r) => `${r.creator} (${r.licence})`).join(', ')} via Wikimedia Commons.

## Re-running

\`node scripts/fetch-hero-photos.mjs\` re-downloads and regenerates this file.
`

writeFileSync(join(ROOT, 'PHOTO-CREDITS.md'), credits, 'utf8')

console.log(`\n${results.length} photographs fetched.`)
console.log(`PHOTO-CREDITS.md written — ${attributed.length} require attribution.`)
