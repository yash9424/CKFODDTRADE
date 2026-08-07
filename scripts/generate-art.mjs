/**
 * Generates the brand artwork used across the site into /public/images/art.
 *
 * Every image slot on the site points at one of these files. They are designed
 * as premium emerald/gold compositions so the site ships complete, and they are
 * a drop-in swap target: replace `/public/images/art/<name>.svg` with a
 * `<name>.jpg` photograph and update the single `art:` path in /data.
 *
 * Run with:  node scripts/generate-art.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'art')
mkdirSync(OUT, { recursive: true })

/* ------------------------------------------------------------------ */
/* deterministic randomness so regenerating never churns the artwork    */
/* ------------------------------------------------------------------ */
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}
const r2 = (rand, a, b) => a + rand() * (b - a)

/* ------------------------------------------------------------------ */
/* palettes                                                             */
/* ------------------------------------------------------------------ */
const P = {
  rice: { bg: ['#04231A', '#073B29', '#0A5238'], ink: '#F3E5BE', accent: '#D4AF37', soft: '#EDE7D9' },
  spices: { bg: ['#1A0E06', '#2E1608', '#4A2410'], ink: '#E8A13C', accent: '#D4AF37', soft: '#C05A24' },
  fruits: { bg: ['#2A0716', '#4A0E24', '#6B1533'], ink: '#F0A9BE', accent: '#D4AF37', soft: '#B8203F' },
  veg: { bg: ['#04231A', '#0A4A2E', '#12855A'], ink: '#E8B14C', accent: '#D4AF37', soft: '#6FC3A0' },
  dairy: { bg: ['#0E2A22', '#20463C', '#3C6357'], ink: '#FBF9F4', accent: '#D4AF37', soft: '#EDE7D9' },
  port: { bg: ['#03180F', '#052A1D', '#0A5238'], ink: '#A9DCC5', accent: '#D4AF37', soft: '#12855A' },
  gold: { bg: ['#03180F', '#073B29', '#0D6A48'], ink: '#F3E5BE', accent: '#D4AF37', soft: '#6FC3A0' },
}

/* ------------------------------------------------------------------ */
/* shared svg fragments                                                 */
/* ------------------------------------------------------------------ */
function defs(id, p) {
  return `
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.bg[0]}"/>
      <stop offset="55%" stop-color="${p.bg[1]}"/>
      <stop offset="100%" stop-color="${p.bg[2]}"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="0.72" cy="0.28" r="0.75">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="${p.accent}" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig-${id}" cx="0.5" cy="0.5" r="0.78">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
    </radialGradient>
    <linearGradient id="sheen-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#A9851E"/>
      <stop offset="45%" stop-color="#D4AF37"/>
      <stop offset="58%" stop-color="#F3E5BE"/>
      <stop offset="75%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#A9851E"/>
    </linearGradient>
    <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="7"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <filter id="soft-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
  </defs>`
}

function shell(id, w, h, p, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" preserveAspectRatio="xMidYMid slice">
${defs(id, p)}
  <rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
${body}
  <rect width="${w}" height="${h}" fill="url(#vig-${id})"/>
  <rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="0.13" style="mix-blend-mode:overlay"/>
</svg>
`
}

/* ------------------------------------------------------------------ */
/* motif builders                                                       */
/* ------------------------------------------------------------------ */

/** Long tapered grains scattered across the lower two-thirds. */
function grains(id, w, h, p, seed, count = 150, len = 70) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, -40, w + 40)
    const y = r2(rand, h * 0.18, h + 30)
    const depth = (y - h * 0.18) / h
    const s = 0.45 + depth * 1.05
    const a = r2(rand, -80, 80)
    const op = 0.16 + depth * 0.6
    const rx = (len / 2) * s
    const ry = 6.5 * s
    out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${
      i % 7 === 0 ? p.accent : p.ink
    }" opacity="${op.toFixed(2)}" transform="rotate(${a.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`
  }
  return out + `</g>`
}

/** Dense small seeds (cumin, coriander, mustard). */
function seeds(id, w, h, p, seed, count = 320) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, -20, w + 20)
    const y = r2(rand, h * 0.12, h + 20)
    const depth = (y - h * 0.12) / h
    const s = 0.5 + depth * 1.2
    const a = r2(rand, 0, 180)
    out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(13 * s).toFixed(1)}" ry="${(3.6 * s).toFixed(
      1,
    )}" fill="${i % 6 === 0 ? p.accent : p.ink}" opacity="${(0.18 + depth * 0.55).toFixed(
      2,
    )}" transform="rotate(${a.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`
  }
  return out + `</g>`
}

/** Round berries / peppercorns / clusters. */
function berries(id, w, h, p, seed, count = 90, rad = 26) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, -30, w + 30)
    const y = r2(rand, h * 0.2, h + 40)
    const depth = (y - h * 0.2) / h
    const rr = rad * (0.45 + depth)
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="${
      i % 8 === 0 ? p.accent : p.ink
    }" opacity="${(0.14 + depth * 0.5).toFixed(2)}"/>`
    out += `<circle cx="${(x - rr * 0.28).toFixed(1)}" cy="${(y - rr * 0.3).toFixed(1)}" r="${(rr * 0.24).toFixed(
      1,
    )}" fill="#FFFFFF" opacity="${(0.06 + depth * 0.16).toFixed(2)}"/>`
  }
  return out + `</g>`
}

/** Rolled bark quills for cinnamon. */
function quills(id, w, h, p, seed, count = 26) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, -60, w)
    const y = r2(rand, h * 0.15, h)
    const depth = (y - h * 0.15) / h
    const len = r2(rand, 120, 300) * (0.5 + depth)
    const thick = r2(rand, 16, 34) * (0.5 + depth)
    const a = r2(rand, -35, 35)
    const op = (0.16 + depth * 0.5).toFixed(2)
    out += `<g transform="rotate(${a.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" opacity="${op}">
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${len.toFixed(1)}" height="${thick.toFixed(
      1,
    )}" rx="${(thick / 2).toFixed(1)}" fill="${i % 5 === 0 ? p.accent : p.ink}"/>
      <ellipse cx="${x.toFixed(1)}" cy="${(y + thick / 2).toFixed(1)}" rx="${(thick * 0.3).toFixed(
      1,
    )}" ry="${(thick / 2).toFixed(1)}" fill="${p.soft}" opacity="0.7"/>
    </g>`
  }
  return out + `</g>`
}

/** Clove nails. */
function cloves(id, w, h, p, seed, count = 60) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, 0, w)
    const y = r2(rand, h * 0.15, h)
    const depth = (y - h * 0.15) / h
    const s = 0.45 + depth
    const a = r2(rand, 0, 360)
    const op = (0.18 + depth * 0.5).toFixed(2)
    const c = i % 6 === 0 ? p.accent : p.ink
    out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)}) scale(${s.toFixed(
      2,
    )})" opacity="${op}" fill="${c}">
      <rect x="-3.5" y="-4" width="7" height="46" rx="3.5"/>
      <circle cx="-8" cy="-8" r="6"/><circle cx="8" cy="-8" r="6"/><circle cx="0" cy="-16" r="6.5"/>
    </g>`
  }
  return out + `</g>`
}

/** Cardamom pods — pointed ellipses with a seam. */
function pods(id, w, h, p, seed, count = 50) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, 0, w)
    const y = r2(rand, h * 0.15, h)
    const depth = (y - h * 0.15) / h
    const s = 0.5 + depth * 1.1
    const a = r2(rand, 0, 360)
    const op = (0.18 + depth * 0.5).toFixed(2)
    out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)}) scale(${s.toFixed(
      2,
    )})" opacity="${op}">
      <path d="M0 -34 C 20 -18, 20 18, 0 34 C -20 18, -20 -18, 0 -34 Z" fill="${
        i % 5 === 0 ? p.accent : p.ink
      }"/>
      <path d="M0 -28 V 28" stroke="${p.bg[0]}" stroke-width="2.5" opacity="0.5"/>
    </g>`
  }
  return out + `</g>`
}

/** Dried chilli pods. */
function chillies(id, w, h, p, seed, count = 34) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, 0, w)
    const y = r2(rand, h * 0.12, h)
    const depth = (y - h * 0.12) / h
    const s = 0.5 + depth * 1.2
    const a = r2(rand, 0, 360)
    const op = (0.2 + depth * 0.55).toFixed(2)
    out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)}) scale(${s.toFixed(
      2,
    )})" opacity="${op}">
      <path d="M-6 -60 C 34 -30, 40 30, 4 74 C 0 60, -14 44, -18 20 C -22 -6, -16 -40, -6 -60 Z" fill="${
        i % 6 === 0 ? p.accent : p.soft
      }"/>
      <path d="M-6 -60 l -16 -16 l 22 4 z" fill="${p.ink}" opacity="0.85"/>
    </g>`
  }
  return out + `</g>`
}

/** Powder mounds — turmeric / milk powder. */
function mounds(id, w, h, p, seed, count = 5) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const cx = r2(rand, w * 0.08, w * 0.92)
    const base = r2(rand, h * 0.68, h * 1.02)
    const rw = r2(rand, w * 0.13, w * 0.3)
    const rh = rw * r2(rand, 0.42, 0.62)
    out += `<path d="M ${(cx - rw).toFixed(1)} ${base.toFixed(1)} Q ${cx.toFixed(1)} ${(base - rh * 2).toFixed(
      1,
    )} ${(cx + rw).toFixed(1)} ${base.toFixed(1)} Z" fill="${i % 2 ? p.accent : p.ink}" opacity="${(
      0.2 +
      i * 0.08
    ).toFixed(2)}"/>
    <ellipse cx="${cx.toFixed(1)}" cy="${base.toFixed(1)}" rx="${rw.toFixed(1)}" ry="${(rh * 0.22).toFixed(
      1,
    )}" fill="${i % 2 ? p.accent : p.ink}" opacity="${(0.14 + i * 0.06).toFixed(2)}"/>`
  }
  // airborne powder haze
  out += `<ellipse cx="${w * 0.5}" cy="${h * 0.72}" rx="${w * 0.46}" ry="${h * 0.2}" fill="${
    p.ink
  }" opacity="0.1" filter="url(#soft-${id})"/>`
  return out + `</g>`
}

/** Perspective field rows receding to a horizon. */
function fieldRows(id, w, h, p, hz = 0.42, rows = 34) {
  let out = `<g opacity="0.5">`
  const vpx = w * 0.5
  const hy = h * hz
  for (let i = 0; i <= rows; i++) {
    const t = i / rows
    const x = -w * 1.4 + t * w * 3.8
    out += `<path d="M ${vpx} ${hy} L ${x.toFixed(1)} ${h + 10}" stroke="${p.ink}" stroke-width="${(
      1 +
      t * 0.2
    ).toFixed(1)}" opacity="${(0.05 + Math.abs(0.5 - t) * 0.12).toFixed(2)}"/>`
  }
  for (let i = 1; i <= 12; i++) {
    const t = Math.pow(i / 12, 2.1)
    const y = hy + t * (h - hy)
    out += `<line x1="0" y1="${y.toFixed(1)}" x2="${w}" y2="${y.toFixed(1)}" stroke="${
      p.ink
    }" stroke-width="1" opacity="${(0.04 + t * 0.1).toFixed(2)}"/>`
  }
  out += `<line x1="0" y1="${hy}" x2="${w}" y2="${hy}" stroke="${p.accent}" stroke-width="1.5" opacity="0.35"/>`
  return out + `</g>`
}

/** Stacked shipping containers. */
function containers(id, w, h, p, seed, baseY = 0.78) {
  const rand = rng(seed)
  let out = `<g>`
  const by = h * baseY
  const cw = w * 0.085
  const ch = cw * 0.42
  for (let col = 0; col < 13; col++) {
    const stack = Math.floor(r2(rand, 1, 5))
    const x = -cw + col * cw * 1.06
    for (let s = 0; s < stack; s++) {
      const y = by - (s + 1) * (ch + 3)
      const c = s % 3 === 0 ? p.accent : s % 3 === 1 ? p.soft : p.ink
      out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cw.toFixed(1)}" height="${ch.toFixed(
        1,
      )}" fill="${c}" opacity="${(0.2 + s * 0.09).toFixed(2)}"/>`
      out += `<g stroke="${p.bg[0]}" stroke-width="1" opacity="0.32">`
      for (let k = 1; k < 7; k++) {
        const lx = x + (cw / 7) * k
        out += `<line x1="${lx.toFixed(1)}" y1="${y.toFixed(1)}" x2="${lx.toFixed(1)}" y2="${(y + ch).toFixed(1)}"/>`
      }
      out += `</g>`
    }
  }
  return out + `</g>`
}

/** Gantry cranes on the skyline. */
function cranes(id, w, h, p, baseY = 0.78) {
  const by = h * baseY
  let out = `<g stroke="${p.accent}" stroke-width="3" fill="none" opacity="0.42">`
  const positions = [0.12, 0.4, 0.68, 0.9]
  positions.forEach((px, i) => {
    const x = w * px
    const tall = h * (0.3 + (i % 2) * 0.07)
    out += `<path d="M ${x - 90} ${by} V ${by - tall} H ${x + 150} M ${x + 150} ${by - tall} l 70 34
      M ${x + 60} ${by} V ${by - tall}
      M ${x - 90} ${by - tall} l -60 30
      M ${x + 20} ${by - tall} v 60 M ${x + 110} ${by - tall} v 92"/>`
  })
  return out + `</g>`
}

/** Container vessel silhouette on water. */
function vessel(id, w, h, p, y = 0.66, scale = 1) {
  const cy = h * y
  const sw = w * 0.62 * scale
  const x = w * 0.2
  let out = `<g opacity="0.55">`
  out += `<path d="M ${x} ${cy} h ${sw} l -${sw * 0.1} ${h * 0.075} h -${sw * 0.8} Z" fill="${p.ink}" opacity="0.5"/>`
  // deck stacks
  for (let i = 0; i < 16; i++) {
    const bx = x + sw * 0.06 + i * (sw * 0.055)
    const bh = h * (0.03 + ((i * 7) % 5) * 0.011)
    out += `<rect x="${bx.toFixed(1)}" y="${(cy - bh).toFixed(1)}" width="${(sw * 0.046).toFixed(
      1,
    )}" height="${bh.toFixed(1)}" fill="${i % 4 === 0 ? p.accent : p.soft}" opacity="0.55"/>`
  }
  out += `<rect x="${(x + sw * 0.86).toFixed(1)}" y="${(cy - h * 0.085).toFixed(1)}" width="${(
    sw * 0.07
  ).toFixed(1)}" height="${(h * 0.085).toFixed(1)}" fill="${p.ink}" opacity="0.6"/>`
  out += `</g>`
  // water sheen
  out += `<rect x="0" y="${(cy + h * 0.075).toFixed(1)}" width="${w}" height="${(
    h -
    cy -
    h * 0.075
  ).toFixed(1)}" fill="${p.bg[0]}" opacity="0.45"/>`
  for (let i = 0; i < 26; i++) {
    const wy = cy + h * 0.085 + i * ((h - cy) / 26)
    out += `<line x1="${(w * 0.04 * (i % 4)).toFixed(1)}" y1="${wy.toFixed(1)}" x2="${(
      w * (0.3 + (i % 5) * 0.14)
    ).toFixed(1)}" y2="${wy.toFixed(1)}" stroke="${p.accent}" stroke-width="1.4" opacity="${(
      0.16 -
      i * 0.005
    ).toFixed(3)}"/>`
  }
  return out
}

/** Dubai-flavoured skyline silhouette. */
function skyline(id, w, h, p, baseY = 0.72) {
  const by = h * baseY
  let out = `<g fill="${p.ink}" opacity="0.16">`
  const towers = [
    [0.03, 0.16, 0.05], [0.09, 0.26, 0.04], [0.14, 0.13, 0.06], [0.21, 0.34, 0.045],
    [0.27, 0.2, 0.05], [0.33, 0.46, 0.035], [0.38, 0.24, 0.055], [0.45, 0.3, 0.04],
    [0.52, 0.18, 0.06], [0.59, 0.4, 0.038], [0.65, 0.22, 0.05], [0.72, 0.29, 0.045],
    [0.79, 0.17, 0.055], [0.86, 0.35, 0.04], [0.93, 0.21, 0.05],
  ]
  towers.forEach(([px, ph, pw]) => {
    const x = w * px
    const th = h * ph
    const tw = w * pw
    out += `<rect x="${x.toFixed(1)}" y="${(by - th).toFixed(1)}" width="${tw.toFixed(1)}" height="${th.toFixed(1)}"/>`
  })
  out += `</g>`
  // the tall spire, gold-lit
  const sx = w * 0.335
  out += `<path d="M ${sx} ${by} L ${sx + w * 0.017} ${by - h * 0.62} L ${sx + w * 0.034} ${by} Z" fill="${
    p.accent
  }" opacity="0.2"/>`
  return out
}

/** Orchard / vine trellis rows. */
function vines(id, w, h, p, seed) {
  const rand = rng(seed)
  let out = `<g opacity="0.4" stroke="${p.ink}" fill="none">`
  for (let i = 0; i < 7; i++) {
    const y = h * (0.3 + i * 0.11)
    out += `<path d="M 0 ${y.toFixed(1)} Q ${w * 0.25} ${(y - 26).toFixed(1)} ${w * 0.5} ${y.toFixed(
      1,
    )} T ${w} ${y.toFixed(1)}" stroke-width="${(1 + i * 0.4).toFixed(1)}" opacity="${(0.12 + i * 0.05).toFixed(2)}"/>`
  }
  out += `</g>`
  // hanging bunches
  for (let i = 0; i < 30; i++) {
    const x = r2(rand, 0, w)
    const y = r2(rand, h * 0.3, h * 0.92)
    const s = r2(rand, 0.4, 1.3)
    out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})" opacity="${r2(
      rand,
      0.16,
      0.5,
    ).toFixed(2)}" fill="${i % 6 === 0 ? p.accent : p.ink}">`
    ;[[0, 0], [-15, 8], [15, 8], [0, 18], [-14, 28], [14, 28], [0, 38], [0, 56], [-9, 47], [9, 47]].forEach(
      ([dx, dy]) => {
        out += `<circle cx="${dx}" cy="${dy}" r="10"/>`
      },
    )
    out += `</g>`
  }
  return out
}

/** Pomegranate forms. */
function pomegranates(id, w, h, p, seed, count = 16) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, 0, w)
    const y = r2(rand, h * 0.25, h * 1.05)
    const depth = (y - h * 0.25) / h
    const s = 0.5 + depth * 1.5
    const op = (0.2 + depth * 0.55).toFixed(2)
    out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(
      2,
    )})" opacity="${op}">
      <circle cx="0" cy="0" r="60" fill="${i % 5 === 0 ? p.accent : p.soft}"/>
      <path d="M0 -58 l -9 -22 l 9 8 l 9 -8 z" fill="${p.ink}" opacity="0.9"/>
      <circle cx="-20" cy="-20" r="14" fill="#FFFFFF" opacity="0.1"/>
    </g>`
  }
  return out + `</g>`
}

/** Tapered carrot forms with fronds. */
function carrots(id, w, h, p, seed, count = 16) {
  const rand = rng(seed)
  let out = `<g>`
  for (let i = 0; i < count; i++) {
    const x = r2(rand, 0, w)
    const y = r2(rand, h * 0.2, h)
    const depth = (y - h * 0.2) / h
    const s = 0.45 + depth * 1.2
    const a = r2(rand, -60, 60)
    const op = (0.2 + depth * 0.5).toFixed(2)
    out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)}) scale(${s.toFixed(
      2,
    )})" opacity="${op}">
      <path d="M-22 -70 L 22 -70 L 0 80 Z" fill="${i % 5 === 0 ? p.accent : p.ink}"/>
      <g stroke="${p.soft}" stroke-width="5" fill="none" opacity="0.85">
        <path d="M0 -70 C -14 -100, -34 -108, -44 -118"/>
        <path d="M0 -70 C 0 -104, 4 -114, 6 -128"/>
        <path d="M0 -70 C 16 -98, 34 -106, 46 -116"/>
      </g>
      <g stroke="${p.bg[0]}" stroke-width="2.5" opacity="0.3">
        <path d="M-16 -34 L 16 -34"/><path d="M-11 0 L 11 0"/><path d="M-6 36 L 6 36"/>
      </g>
    </g>`
  }
  return out + `</g>`
}

/** Milk-drop / dairy motif. */
function dairyMotif(id, w, h, p, seed) {
  const rand = rng(seed)
  let out = mounds(id, w, h, p, seed, 4)
  out += `<g>`
  for (let i = 0; i < 12; i++) {
    const x = r2(rand, w * 0.05, w * 0.95)
    const y = r2(rand, h * 0.12, h * 0.55)
    const s = r2(rand, 0.4, 1.2)
    out += `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})"
      d="M0 -46 C 26 -14, 34 4, 34 16 A 34 34 0 0 1 -34 16 C -34 4, -26 -14, 0 -46 Z"
      fill="${i % 4 === 0 ? p.accent : p.ink}" opacity="${r2(rand, 0.1, 0.3).toFixed(2)}"/>`
  }
  return out + `</g>`
}

/** Dotted great-circle trade routes over a soft globe arc. */
function tradeRoutes(id, w, h, p) {
  let out = `<g fill="none" stroke="${p.accent}" stroke-linecap="round">`
  const arcs = [
    [0.08, 0.72, 0.5, 0.3, 0.92, 0.62],
    [0.12, 0.5, 0.48, 0.16, 0.88, 0.4],
    [0.2, 0.86, 0.55, 0.52, 0.95, 0.8],
  ]
  arcs.forEach(([x1, y1, cx, cy, x2, y2], i) => {
    out += `<path d="M ${w * x1} ${h * y1} Q ${w * cx} ${h * cy} ${w * x2} ${h * y2}"
      stroke-width="${2 + i * 0.5}" opacity="${0.5 - i * 0.12}" stroke-dasharray="2 16"/>`
  })
  out += `</g>`
  const nodes = [
    [0.08, 0.72], [0.5, 0.3], [0.92, 0.62], [0.2, 0.86], [0.88, 0.4],
  ]
  nodes.forEach(([nx, ny], i) => {
    out += `<circle cx="${w * nx}" cy="${h * ny}" r="${i === 1 ? 11 : 7}" fill="${p.accent}" opacity="0.8"/>
    <circle cx="${w * nx}" cy="${h * ny}" r="${i === 1 ? 26 : 18}" fill="none" stroke="${
      p.accent
    }" stroke-width="1.5" opacity="0.35"/>`
  })
  return out
}

/* ------------------------------------------------------------------ */
/* compositions                                                         */
/* ------------------------------------------------------------------ */
const HERO_W = 1920
const HERO_H = 1080
const CARD_W = 1200
const CARD_H = 900
const TILE = 900

const compositions = {
  /* ---------- hero / global ---------- */
  'hero-main': [HERO_W, HERO_H, P.port, (id, w, h, p) =>
    skyline(id, w, h, p, 0.6) + cranes(id, w, h, p, 0.74) + containers(id, w, h, p, 11, 0.9) +
    vessel(id, w, h, p, 0.74, 0.9) + tradeRoutes(id, w, h, p)],

  'logistics': [CARD_W, CARD_H, P.port, (id, w, h, p) =>
    cranes(id, w, h, p, 0.72) + containers(id, w, h, p, 23, 0.88) + vessel(id, w, h, p, 0.7, 1)],

  'port': [HERO_W, HERO_H, P.port, (id, w, h, p) =>
    cranes(id, w, h, p, 0.7) + containers(id, w, h, p, 31, 0.86) + vessel(id, w, h, p, 0.66, 1.05)],

  'dubai': [CARD_W, CARD_H, P.gold, (id, w, h, p) =>
    skyline(id, w, h, p, 0.82) + tradeRoutes(id, w, h, p)],

  'sourcing': [CARD_W, CARD_H, P.veg, (id, w, h, p) =>
    fieldRows(id, w, h, p, 0.38) + grains(id, w, h, p, 41, 90, 56)],

  'network': [HERO_W, HERO_H, P.gold, (id, w, h, p) =>
    tradeRoutes(id, w, h, p) + skyline(id, w, h, p, 0.88)],

  'investors': [HERO_W, HERO_H, P.gold, (id, w, h, p) =>
    tradeRoutes(id, w, h, p) + containers(id, w, h, p, 57, 0.94) + skyline(id, w, h, p, 0.74)],

  'about': [HERO_W, HERO_H, P.port, (id, w, h, p) =>
    skyline(id, w, h, p, 0.68) + tradeRoutes(id, w, h, p) + containers(id, w, h, p, 63, 0.92)],

  'supply-chain': [HERO_W, HERO_H, P.port, (id, w, h, p) =>
    fieldRows(id, w, h, p, 0.3) + containers(id, w, h, p, 71, 0.88) + cranes(id, w, h, p, 0.7)],

  'contact': [HERO_W, HERO_H, P.gold, (id, w, h, p) => skyline(id, w, h, p, 0.8) + tradeRoutes(id, w, h, p)],

  'supplier': [HERO_W, HERO_H, P.veg, (id, w, h, p) =>
    fieldRows(id, w, h, p, 0.34) + grains(id, w, h, p, 83, 110, 60)],

  'quote': [HERO_W, HERO_H, P.port, (id, w, h, p) =>
    containers(id, w, h, p, 91, 0.9) + tradeRoutes(id, w, h, p)],

  /* ---------- rice ---------- */
  'rice-hero': [HERO_W, HERO_H, P.rice, (id, w, h, p) =>
    fieldRows(id, w, h, p, 0.36) + grains(id, w, h, p, 101, 210, 78)],
  rice: [CARD_W, CARD_H, P.rice, (id, w, h, p) => grains(id, w, h, p, 103, 170, 74)],
  'rice-sona': [TILE, TILE, P.rice, (id, w, h, p) => grains(id, w, h, p, 107, 150, 58)],
  'rice-basmati': [TILE, TILE, P.rice, (id, w, h, p) => grains(id, w, h, p, 109, 120, 96)],
  'rice-1102': [TILE, TILE, P.rice, (id, w, h, p) => grains(id, w, h, p, 113, 140, 66)],

  /* ---------- spices ---------- */
  'spices-hero': [HERO_W, HERO_H, P.spices, (id, w, h, p) =>
    mounds(id, w, h, p, 127, 6) + seeds(id, w, h, p, 131, 260) + cloves(id, w, h, p, 137, 30)],
  spices: [CARD_W, CARD_H, P.spices, (id, w, h, p) => mounds(id, w, h, p, 139, 5) + seeds(id, w, h, p, 149, 200)],
  'spice-cumin': [TILE, TILE, P.spices, (id, w, h, p) => seeds(id, w, h, p, 151, 340)],
  'spice-pepper': [TILE, TILE, P.spices, (id, w, h, p) => berries(id, w, h, p, 157, 110, 24)],
  'spice-cinnamon': [TILE, TILE, P.spices, (id, w, h, p) => quills(id, w, h, p, 163, 22)],
  'spice-cloves': [TILE, TILE, P.spices, (id, w, h, p) => cloves(id, w, h, p, 167, 64)],
  'spice-cardamom': [TILE, TILE, P.spices, (id, w, h, p) => pods(id, w, h, p, 173, 46)],
  'spice-turmeric': [TILE, TILE, P.spices, (id, w, h, p) => mounds(id, w, h, p, 179, 5)],
  'spice-coriander': [TILE, TILE, P.spices, (id, w, h, p) => berries(id, w, h, p, 181, 130, 20)],
  'spice-chilli': [TILE, TILE, P.spices, (id, w, h, p) => chillies(id, w, h, p, 191, 30)],

  /* ---------- fruits ---------- */
  'fruits-hero': [HERO_W, HERO_H, P.fruits, (id, w, h, p) =>
    vines(id, w, h, p, 193) + pomegranates(id, w, h, p, 197, 12)],
  fruits: [CARD_W, CARD_H, P.fruits, (id, w, h, p) => pomegranates(id, w, h, p, 199, 12) + vines(id, w, h, p, 211)],
  'fruit-pomegranate': [TILE, TILE, P.fruits, (id, w, h, p) => pomegranates(id, w, h, p, 223, 14)],
  'fruit-grapes': [TILE, TILE, P.fruits, (id, w, h, p) => vines(id, w, h, p, 227)],

  /* ---------- vegetables ---------- */
  'vegetables-hero': [HERO_W, HERO_H, P.veg, (id, w, h, p) =>
    fieldRows(id, w, h, p, 0.34) + carrots(id, w, h, p, 229, 18)],
  vegetables: [CARD_W, CARD_H, P.veg, (id, w, h, p) => carrots(id, w, h, p, 233, 14) + fieldRows(id, w, h, p, 0.3)],
  'veg-carrot': [TILE, TILE, P.veg, (id, w, h, p) => carrots(id, w, h, p, 239, 15)],

  /* ---------- dairy ---------- */
  'dairy-hero': [HERO_W, HERO_H, P.dairy, (id, w, h, p) => dairyMotif(id, w, h, p, 241)],
  dairy: [CARD_W, CARD_H, P.dairy, (id, w, h, p) => dairyMotif(id, w, h, p, 251)],
  'dairy-powder': [TILE, TILE, P.dairy, (id, w, h, p) => dairyMotif(id, w, h, p, 257)],
}

let count = 0
for (const [name, [w, h, palette, build]] of Object.entries(compositions)) {
  const id = name.replace(/[^a-z0-9]/gi, '')
  const svg = shell(id, w, h, palette, build(id, w, h, palette))
  writeFileSync(join(OUT, `${name}.svg`), svg, 'utf8')
  count++
}

console.log(`Generated ${count} artwork files into public/images/art`)
