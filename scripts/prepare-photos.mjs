/**
 * One-off importer for supplied photography.
 *
 * Reads the raw camera/WhatsApp originals in /assets/source-photos (kept out
 * of /public so they are never served), trims any solid
 * letterbox bars, resizes to a sane ceiling, re-encodes as progressive JPEG,
 * and writes them to /public/images/photos under descriptive kebab-case names
 * that match how each shot is used on the site.
 *
 * Run with:  node scripts/prepare-photos.mjs
 * Safe to re-run — it overwrites its own output and leaves the sources alone.
 */

import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'assets', 'source-photos')
const OUT = join(ROOT, 'public', 'images', 'photos')

/** source filename -> published name. Descriptive of the subject, not the timestamp. */
const MAP = {
  // --- Dubai / logistics -------------------------------------------------
  'WhatsApp Image 2026-08-07 at 4.30.03 PM (4).jpeg': 'dubai-port-container-vessel',
  'WhatsApp Image 2026-08-07 at 4.30.04 PM.jpeg': 'dubai-terminal-dusk',
  'WhatsApp Image 2026-08-07 at 4.30.03 PM (5).jpeg': 'jebel-ali-terminal-aerial',

  // --- Rice --------------------------------------------------------------
  'WhatsApp Image 2026-08-07 at 4.30.01 PM (2).jpeg': 'rice-export-port-loading',
  'WhatsApp Image 2026-08-07 at 4.30.01 PM.jpeg': 'rice-export-sack-50kg',
  'WhatsApp Image 2026-08-07 at 4.30.01 PM (3).jpeg': 'rice-basmati-warehouse-sacks',
  'WhatsApp Image 2026-08-07 at 4.30.01 PM (1).jpeg': 'rice-basmati-grains-spoon',
  'WhatsApp Image 2026-08-07 at 4.30.01 PM (4).jpeg': 'rice-farm-jute-sacks',

  // --- Spices ------------------------------------------------------------
  'WhatsApp Image 2026-08-07 at 4.30.02 PM.jpeg': 'spices-flatlay-wood',
  'WhatsApp Image 2026-08-07 at 4.30.02 PM (1).jpeg': 'spices-bowls-tray',
  'WhatsApp Image 2026-08-07 at 4.30.02 PM (5).jpeg': 'spices-dark-slate',
  'WhatsApp Image 2026-08-07 at 4.30.02 PM (3).jpeg': 'spices-slate-spoons',
  'WhatsApp Image 2026-08-07 at 4.30.02 PM (2).jpeg': 'turmeric-bowls',
  'WhatsApp Image 2026-08-07 at 4.30.02 PM (4).jpeg': 'cinnamon-star-anise',

  // --- Fresh produce -----------------------------------------------------
  'WhatsApp Image 2026-08-07 at 4.30.03 PM.jpeg': 'carrots-export-crates',
  'WhatsApp Image 2026-08-07 at 4.30.03 PM (1).jpeg': 'pomegranates-export-box',
  'WhatsApp Image 2026-08-07 at 4.30.03 PM (2).jpeg': 'grapes-export-carton',
  'WhatsApp Image 2026-08-07 at 4.30.03 PM (3).jpeg': 'grapes-punnets-pallet',
}

mkdirSync(OUT, { recursive: true })

/**
 * Finds solid letterbox/pillarbox bars so they can be cropped away. The
 * supplied set includes screenshots padded to a 1200x630 canvas — some with
 * black bars, some with white — so a bar is detected as "uniform tone at
 * either extreme" rather than "dark".
 */
async function findContentBox(image, meta) {
  const { data, info } = await image
    .clone()
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const FLATNESS = 6 // max std-dev for a line to count as a solid bar
  const DARK = 20
  const LIGHT = 236

  const isBar = (values) => {
    const n = values.length
    let sum = 0
    for (const v of values) sum += v
    const mean = sum / n
    if (mean > DARK && mean < LIGHT) return false
    let variance = 0
    for (const v of values) variance += (v - mean) ** 2
    return Math.sqrt(variance / n) <= FLATNESS
  }

  const row = (y) => {
    const out = new Array(width)
    for (let x = 0; x < width; x++) out[x] = data[(y * width + x) * channels]
    return out
  }
  const col = (x) => {
    const out = new Array(height)
    for (let y = 0; y < height; y++) out[y] = data[(y * width + x) * channels]
    return out
  }

  const rowIsBar = (y) => isBar(row(y))
  const colIsBar = (x) => isBar(col(x))

  let top = 0
  while (top < height - 1 && rowIsBar(top)) top++
  let bottom = height - 1
  while (bottom > top && rowIsBar(bottom)) bottom--
  let left = 0
  while (left < width - 1 && colIsBar(left)) left++
  let right = width - 1
  while (right > left && colIsBar(right)) right--

  const box = { left, top, width: right - left + 1, height: bottom - top + 1 }
  const trimmed = box.width !== meta.width || box.height !== meta.height
  return { box, trimmed }
}

const MAX_EDGE = 2000

let processed = 0
for (const [source, name] of Object.entries(MAP)) {
  const from = join(SRC, source)
  if (!existsSync(from)) {
    console.warn(`  ! missing source: ${source}`)
    continue
  }

  const input = sharp(from)
  const meta = await input.metadata()
  const { box, trimmed } = await findContentBox(input, meta)

  let pipeline = sharp(from)
  if (trimmed) pipeline = pipeline.extract(box)

  const longEdge = Math.max(box.width, box.height)
  if (longEdge > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: box.width >= box.height ? MAX_EDGE : undefined,
      height: box.height > box.width ? MAX_EDGE : undefined,
      withoutEnlargement: true,
    })
  }

  const to = join(OUT, `${name}.jpg`)
  await pipeline
    .jpeg({ quality: 82, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(to)

  const out = statSync(to)
  const note = trimmed
    ? `trimmed ${meta.width}x${meta.height} -> ${box.width}x${box.height}`
    : `${meta.width}x${meta.height}`
  console.log(
    `  ${name}.jpg`.padEnd(40),
    `${String(Math.round(out.size / 1024)).padStart(4)}KB`,
    note,
  )
  processed++
}

const unmapped = readdirSync(SRC).filter(
  (f) => /\.(jpe?g|png|webp)$/i.test(f) && !MAP[f],
)
if (unmapped.length) {
  console.log('\n  Unmapped source files (left untouched):')
  unmapped.forEach((f) => console.log(`   - ${f}`))
}

console.log(`\nPrepared ${processed} photographs into public/images/photos`)
