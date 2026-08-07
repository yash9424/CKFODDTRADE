/**
 * Searches Wikimedia Commons for high-resolution photography for the site's
 * hero slots and writes the candidates to a report for review.
 *
 * Licence policy — only licences that are safe on a commercial site and allow
 * cropping are accepted:
 *   CC0 / Public Domain  no attribution required
 *   CC BY (any version)  attribution required, recorded in PHOTO-CREDITS.md
 * Rejected: BY-SA (adaptations must inherit the licence), BY-NC (not
 * commercial), BY-ND (no cropping).
 *
 * Run with: node scripts/find-photos.mjs
 * Output:   scripts/.photo-candidates.json
 */

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const UA = 'ck-foodstuff-site/1.0 (contact: ckfoodstuff@gmail.com)'
const MIN_WIDTH = 1900

/** Each slot lists query variants, best first. */
const SLOTS = {
  'dubai-port': [
    'Jebel Ali port container terminal',
    'Port Rashid Dubai ship',
    'Dubai container port',
  ],
  'dubai-skyline': ['Dubai skyline', 'Dubai marina skyline', 'Dubai city view'],
  'container-terminal': [
    'container terminal aerial',
    'container port gantry crane',
    'container terminal stacks',
  ],
  'container-ship': ['container ship loading port', 'container vessel cranes'],
  warehouse: ['warehouse pallets logistics', 'distribution centre warehouse'],
  'rice-field': ['rice paddy field India', 'paddy field harvest', 'rice terraces field'],
  'rice-grains': ['basmati rice grains', 'rice grains', 'rice sacks market'],
  spices: ['spice market India', 'spices assortment bowls', 'spice bazaar stall'],
  pomegranate: ['pomegranate fruit', 'pomegranate harvest'],
  grapes: ['table grapes vineyard', 'grape harvest bunches'],
  vegetables: ['carrots harvest', 'vegetable market crates'],
  dairy: ['dairy cows pasture Netherlands', 'dairy farm cattle Europe', 'milk powder'],
  agriculture: ['agriculture field India farmer', 'farmland aerial harvest'],
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Accepts CC0 / public domain / plain CC BY. Rejects SA, NC and ND. */
function licenceOk(short) {
  if (!short) return false
  const s = short.toUpperCase()
  if (/\b(SA|NC|ND)\b/.test(s) || s.includes('-SA') || s.includes('-NC') || s.includes('-ND')) {
    return false
  }
  return s.startsWith('CC0') || s.includes('PUBLIC DOMAIN') || /^CC BY(\s|$)/.test(s)
}

/** extmetadata values are HTML fragments; reduce to plain text. */
function plain(html) {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function search(query) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json' +
    `&generator=search&gsrsearch=${encodeURIComponent(query + ' filetype:bitmap')}` +
    '&gsrnamespace=6&gsrlimit=40&prop=imageinfo&iiprop=url|size|extmetadata'

  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) {
    console.warn(`  ! ${query} -> HTTP ${res.status}`)
    return []
  }
  const data = await res.json()
  return Object.values(data?.query?.pages ?? {})
}

const report = {}

for (const [slot, queries] of Object.entries(SLOTS)) {
  const seen = new Set()
  const candidates = []

  for (const query of queries) {
    for (const page of await search(query)) {
      const info = page.imageinfo?.[0]
      if (!info) continue
      const meta = info.extmetadata ?? {}
      const licence = meta.LicenseShortName?.value

      if (!licenceOk(licence)) continue
      if (!info.width || info.width < MIN_WIDTH) continue
      if (seen.has(page.title)) continue
      seen.add(page.title)

      candidates.push({
        title: page.title.replace(/^File:/, ''),
        query,
        width: info.width,
        height: info.height,
        aspect: +(info.width / info.height).toFixed(2),
        licence,
        creator: plain(meta.Artist?.value).slice(0, 90),
        credit: plain(meta.Credit?.value).slice(0, 90),
        landing: info.descriptionurl,
        url: info.url,
      })
    }
    await sleep(250) // be polite to the API
  }

  // Hero slots are full-bleed and landscape: favour wide, large originals.
  candidates.sort((a, b) => {
    const score = (c) => c.width * (c.aspect >= 1.4 && c.aspect <= 2.4 ? 1.6 : 1)
    return score(b) - score(a)
  })

  report[slot] = candidates.slice(0, 10)
  console.log(`${slot.padEnd(20)} ${String(candidates.length).padStart(3)} usable`)
}

writeFileSync(
  join(ROOT, 'scripts', '.photo-candidates.json'),
  JSON.stringify(report, null, 2),
  'utf8',
)
console.log('\nWrote scripts/.photo-candidates.json')
