/**
 * Builds a numbered contact sheet per slot from scripts/.photo-candidates.json
 * so candidates can be eyeballed before any of them are committed to the site.
 *
 * Run with: node scripts/contact-sheet.mjs [slot]
 * Output:   scripts/.contact-sheets/<slot>.jpg
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'scripts', '.contact-sheets')
mkdirSync(OUT, { recursive: true })

const report = JSON.parse(
  readFileSync(join(ROOT, 'scripts', '.photo-candidates.json'), 'utf8'),
)

const only = process.argv[2]
const UA = 'ck-foodstuff-site/1.0 (contact: ckfoodstuff@gmail.com)'

const CELL_W = 420
const CELL_H = 280
const COLS = 3
const PER_SHEET = 6

/** Commons serves a scaled rendition through Special:FilePath. */
function thumbUrl(title, width) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title)}?width=${width}`
}

async function fetchThumb(title) {
  const res = await fetch(thumbUrl(title, CELL_W * 2), { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

function badge(index, caption) {
  const safe = caption.replace(/[<>&]/g, '').slice(0, 46)
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL_W}" height="${CELL_H}">
      <rect x="0" y="0" width="34" height="26" fill="#D4AF37"/>
      <text x="17" y="19" text-anchor="middle" font-family="Arial" font-size="15" font-weight="bold" fill="#03180F">${index}</text>
      <rect x="0" y="${CELL_H - 24}" width="${CELL_W}" height="24" fill="#03180F" fill-opacity="0.8"/>
      <text x="6" y="${CELL_H - 8}" font-family="Arial" font-size="12" fill="#FBF9F4">${safe}</text>
    </svg>`,
  )
}

for (const [slot, candidates] of Object.entries(report)) {
  if (only && slot !== only) continue
  const picks = candidates.slice(0, PER_SHEET)
  if (!picks.length) continue

  const cells = []
  for (let i = 0; i < picks.length; i++) {
    const c = picks[i]
    try {
      const buf = await fetchThumb(c.title)
      const tile = await sharp(buf)
        .resize(CELL_W, CELL_H, { fit: 'cover' })
        .composite([{ input: badge(i + 1, `${c.width}x${c.height} ${c.licence}`), top: 0, left: 0 }])
        .jpeg({ quality: 80 })
        .toBuffer()
      cells.push(tile)
      console.log(`  ${slot} #${i + 1} ok  ${c.title.slice(0, 60)}`)
    } catch (err) {
      console.warn(`  ${slot} #${i + 1} FAILED ${c.title.slice(0, 50)} — ${err.message}`)
      cells.push(
        await sharp({
          create: { width: CELL_W, height: CELL_H, channels: 3, background: '#222' },
        })
          .jpeg()
          .toBuffer(),
      )
    }
  }

  const rows = Math.ceil(cells.length / COLS)
  const sheet = await sharp({
    create: {
      width: CELL_W * COLS,
      height: CELL_H * rows,
      channels: 3,
      background: '#052A1D',
    },
  })
    .composite(
      cells.map((input, i) => ({
        input,
        left: (i % COLS) * CELL_W,
        top: Math.floor(i / COLS) * CELL_H,
      })),
    )
    .jpeg({ quality: 82 })
    .toBuffer()

  writeFileSync(join(OUT, `${slot}.jpg`), sheet)
  console.log(`${slot} -> scripts/.contact-sheets/${slot}.jpg`)
}
