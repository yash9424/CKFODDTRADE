/**
 * Builds the trade-network map from real geography.
 *
 * Source data is Natural Earth 1:110m country boundaries (via the `world-atlas`
 * package), projected with d3-geo and framed on the region CK Foodstuff
 * actually trades in — Europe, Africa, the Middle East and Asia. Every city
 * sits at its real latitude/longitude and every trade lane is a true
 * great-circle route sampled through the same projection.
 *
 * Outputs:
 *   public/images/art/world-land.svg  land geometry (large, cached once)
 *   data/worldMap.ts                  overlay data (small, inlined per page)
 *
 * Run with: node scripts/generate-worldmap.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { geoNaturalEarth1, geoPath, geoInterpolate, geoDistance, geoGraticule } from 'd3-geo'
import { merge, mesh } from 'topojson-client'

const require = createRequire(import.meta.url)
const topo = require('world-atlas/countries-110m.json')

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** The region CK trades in: the Atlantic across to South-East Asia. */
const FRAME = { west: -25, south: -36, east: 140, north: 64 }
const WIDTH = 1200
const PAD = 14

/* ------------------------------------------------------------------ */
/* projection                                                           */
/* ------------------------------------------------------------------ */
const CENTER_LON = (FRAME.west + FRAME.east) / 2

/**
 * Measure the frame by sampling rather than by fitting a GeoJSON polygon:
 * d3 reads a spherical polygon's winding order to decide which side is
 * "inside", and a naive corner ring gets read as the whole globe — which
 * silently fits the projection to the planet instead of the region.
 */
function measureFrame() {
  const probe = geoNaturalEarth1().rotate([-CENTER_LON, 0]).scale(1).translate([0, 0])
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity

  for (let lon = FRAME.west; lon <= FRAME.east; lon += 0.5) {
    for (let lat = FRAME.south; lat <= FRAME.north; lat += 0.5) {
      const p = probe([lon, lat])
      if (!p) continue
      x0 = Math.min(x0, p[0])
      x1 = Math.max(x1, p[0])
      y0 = Math.min(y0, p[1])
      y1 = Math.max(y1, p[1])
    }
  }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 }
}

const box = measureFrame()
const HEIGHT = Math.round((WIDTH * box.h) / box.w)
const k = Math.min((WIDTH - PAD * 2) / box.w, (HEIGHT - PAD * 2) / box.h)

const projection = geoNaturalEarth1()
  .rotate([-CENTER_LON, 0])
  .scale(k)
  .translate([WIDTH / 2 - (k * (box.x0 + box.x1)) / 2, HEIGHT / 2 - (k * (box.y0 + box.y1)) / 2])
  .clipExtent([
    [0, 0],
    [WIDTH, HEIGHT],
  ])

/**
 * geoPath emits full float precision, which balloons the path string. At this
 * scale a tenth of a pixel is invisible, so round through a custom context.
 */
function roundingContext(decimals = 1) {
  const f = 10 ** decimals
  const r = (n) => Math.round(n * f) / f
  let out = ''
  return {
    toString() {
      const s = out
      out = ''
      return s
    },
    moveTo(x, y) {
      out += `M${r(x)},${r(y)}`
    },
    lineTo(x, y) {
      out += `L${r(x)},${r(y)}`
    },
    closePath() {
      out += 'Z'
    },
    arc() {
      /* polygon geometry only */
    },
  }
}

const context = roundingContext(1)
const path = geoPath(projection, context)
const toPath = (geometry) => {
  path(geometry)
  return context.toString()
}

/* ------------------------------------------------------------------ */
/* land                                                                 */
/* ------------------------------------------------------------------ */
/** UAE, India and the GCC states — drawn a shade brighter than the rest. */
const HIGHLIGHT_IDS = new Set([
  '784', // United Arab Emirates
  '356', // India
  '682', // Saudi Arabia
  '634', // Qatar
  '414', // Kuwait
  '512', // Oman
])

const landPath = toPath(merge(topo, topo.objects.countries.geometries))
const highlightPath = toPath(
  merge(
    topo,
    topo.objects.countries.geometries.filter((g) => HIGHLIGHT_IDS.has(String(g.id))),
  ),
)
// Interior borders only; the coastline already comes from the land outline.
const bordersPath = toPath(mesh(topo, topo.objects.countries, (a, b) => a !== b))

// Meridians and parallels every 15 degrees, curving with the projection the
// way they do on a real map rather than sitting as a flat rectangular grid.
const graticulePath = toPath(geoGraticule().step([15, 15])())

/* ------------------------------------------------------------------ */
/* places — real coordinates                                            */
/* ------------------------------------------------------------------ */
const PLACES = {
  dubai: { lon: 55.2708, lat: 25.2048 },
  surat: { lon: 72.8311, lat: 21.1702 },
  mumbai: { lon: 72.8777, lat: 19.076 },
  europe: { lon: 4.4777, lat: 51.9244 }, // Rotterdam — European dairy gateway
  gcc: { lon: 46.6753, lat: 24.7136 }, // Riyadh
  africa: { lon: 39.6682, lat: -4.0435 }, // Mombasa
  asia: { lon: 103.8198, lat: 1.3521 }, // Singapore
}

const round = (n) => Math.round(n * 10) / 10
const points = Object.fromEntries(
  Object.entries(PLACES).map(([key, place]) => {
    const [x, y] = projection([place.lon, place.lat])
    return [key, { x: round(x), y: round(y), lon: place.lon, lat: place.lat }]
  }),
)

/* ------------------------------------------------------------------ */
/* trade lanes — true great circles, sampled and projected              */
/* ------------------------------------------------------------------ */
const LANES = [
  ['surat', 'dubai', 'inbound'],
  ['mumbai', 'dubai', 'inbound'],
  ['dubai', 'gcc', 'outbound'],
  ['dubai', 'europe', 'outbound'],
  ['dubai', 'africa', 'outbound'],
  ['dubai', 'asia', 'outbound'],
]

function greatCirclePath(from, to) {
  const a = [PLACES[from].lon, PLACES[from].lat]
  const b = [PLACES[to].lon, PLACES[to].lat]
  const interpolate = geoInterpolate(a, b)
  const degrees = (geoDistance(a, b) * 180) / Math.PI
  const steps = Math.max(20, Math.round(degrees * 1.5))

  const coords = []
  for (let i = 0; i <= steps; i++) {
    const [x, y] = projection(interpolate(i / steps))
    coords.push(`${round(x)},${round(y)}`)
  }
  return { d: `M${coords.join('L')}`, degrees: Math.round(degrees) }
}

const lanes = LANES.map(([from, to, kind]) => {
  const { d, degrees } = greatCirclePath(from, to)
  return { id: `${from}-${to}`, from, to, kind, arcDegrees: degrees, d }
})

/* ------------------------------------------------------------------ */
/* emit                                                                 */
/* ------------------------------------------------------------------ */

// The land geometry is large and never changes, so it ships as a standalone
// SVG the browser caches once, rather than being inlined into every page that
// renders the map. The overlay stays in TS because it is small and animates.
const landSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Map of Europe, Africa, the Middle East and Asia">
  <path d="${graticulePath}" fill="none" stroke="#2FA274" stroke-width="0.5" stroke-opacity="0.16"/>
  <path d="${landPath}" fill="#0C3F2D" stroke="#1E7051" stroke-width="0.7" stroke-linejoin="round"/>
  <path d="${bordersPath}" fill="none" stroke="#1E7051" stroke-width="0.5" stroke-opacity="0.5"/>
  <path d="${highlightPath}" fill="#18774F" stroke="#39B183" stroke-width="0.8" stroke-linejoin="round"/>
</svg>
`

mkdirSync(join(ROOT, 'public', 'images', 'art'), { recursive: true })
writeFileSync(join(ROOT, 'public', 'images', 'art', 'world-land.svg'), landSvg, 'utf8')

const out = `// GENERATED FILE — do not edit by hand.
// Rebuild with: node scripts/generate-worldmap.mjs
//
// Companion to /public/images/art/world-land.svg, which carries the land
// geometry (Natural Earth 1:110m via world-atlas, projected with d3-geo
// geoNaturalEarth1 and framed on Europe / Africa / Middle East / Asia).
// Both share the viewBox below, so the overlay aligns pixel-for-pixel.
// City coordinates are real; trade lanes are true great-circle routes.

export const mapSize = { width: ${WIDTH}, height: ${HEIGHT} }

/** Static land layer, drawn underneath the overlay. */
export const landLayer = '/images/art/world-land.svg'

export type MapPoint = { x: number; y: number; lon: number; lat: number }

export const points = ${JSON.stringify(points, null, 2)} as const

export type PlaceKey = keyof typeof points

export type Lane = {
  id: string
  from: PlaceKey
  to: PlaceKey
  kind: 'inbound' | 'outbound'
  /** Great-circle length in degrees of arc — used to pace the dash animation. */
  arcDegrees: number
  d: string
}

export const lanes: Lane[] = ${JSON.stringify(lanes, null, 2)}
`

writeFileSync(join(ROOT, 'data', 'worldMap.ts'), out, 'utf8')

console.log('Generated:')
console.log(`  public/images/art/world-land.svg   ${Math.round(landSvg.length / 1024)}KB`)
console.log(`  data/worldMap.ts                   ${Math.round(out.length / 1024)}KB`)
console.log(`  viewBox ${WIDTH} x ${HEIGHT}  (aspect ${(WIDTH / HEIGHT).toFixed(2)})`)
console.log('  nodes:')
for (const [key, p] of Object.entries(points)) {
  console.log(`    ${key.padEnd(7)} ${String(p.x).padStart(6)}, ${String(p.y).padStart(6)}`)
}
const dist = (a, b) => Math.hypot(points[a].x - points[b].x, points[a].y - points[b].y)
console.log('  label-collision check (px apart):')
console.log(`    dubai-gcc     ${dist('dubai', 'gcc').toFixed(1)}`)
console.log(`    surat-mumbai  ${dist('surat', 'mumbai').toFixed(1)}`)
console.log(`    dubai-surat   ${dist('dubai', 'surat').toFixed(1)}`)
