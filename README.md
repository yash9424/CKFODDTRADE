# CK Foodstuff Trading LLC — Official Website

International food trading, global sourcing, import &amp; export, procurement,
logistics and distribution. Dubai headquarters, procurement network in Surat
and Mumbai.

Built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS**.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the production build
```

Copy `.env.example` to `.env.local` and fill in what you need — the site runs
fine with none of it set.

---

## Brand system

Defined once in `tailwind.config.ts` and `app/globals.css`.

| Role | Token | Value |
| --- | --- | --- |
| Primary corporate | `emerald-950` … `emerald-500` | `#03180F` → `#12855A` |
| Premium gold | `gold-500` | `#D4AF37` (with a `bg-gold-sheen` gradient for headline accents) |
| Background | `ivory`, `ivory-200` | `#FBF9F4`, `#F6F2E9` |
| Body text | `charcoal`, `charcoal-light` | `#2E3130`, `#565B59` |

Typography: **Fraunces** (display headlines) + **Inter** (body), loaded via
`next/font` so there is no layout shift and no external font request.

Reusable classes: `.container-ck`, `.eyebrow`, `.rule-gold`, `.gold-text`,
`.grain`, `.prose-ck`, `.link-underline`, `.reveal`.

Motion: every section entrance runs through `components/ui/Reveal.tsx`
(IntersectionObserver + CSS transition), statistics animate via
`components/ui/CountUp.tsx`. Both respect `prefers-reduced-motion`, and a
`<noscript>` rule in the layout keeps all content visible without JavaScript.

---

## Site map

| Route | Page |
| --- | --- |
| `/` | Home — hero, key numbers, about, vision &amp; mission, products, what we do, supply chain + network map, who we serve, why CK, leadership, growth roadmap, CTA |
| `/about` | About, key numbers, vision &amp; mission, CEO letter, Chairman letter, management team, why CK, network map |
| `/products` | Portfolio hub + planned monthly container opportunities table |
| `/products/rice` | Sona Masoori, 1101 Basmati, 1102 |
| `/products/spices` | Cumin, pepper, cinnamon, cloves, cardamom, turmeric, coriander, chilli + extended range |
| `/products/fresh-fruits` | Pomegranates, grapes + seasonal range |
| `/products/fresh-vegetables` | Carrots + seasonal range |
| `/products/dairy` | European milk powder |
| `/services` | Seven services (deep-linkable anchors), procurement process, who we serve |
| `/supply-chain` | Eight-stage flow, control pillars, global network map, locations |
| `/become-a-supplier` | Supplier proposition + registration form with document upload |
| `/investors` | Project Emerald, growth roadmap, disclosure position, investor enquiry form |
| `/reports` | Company Report — planned volumes, growth milestones, capital deployment, performance framework, market, competitive position, risk, governance |
| `/contact` | HQ details, contact form, all three locations |
| `/request-a-quote` | Full RFQ system |
| `/legal/{privacy-policy,terms-and-conditions,cookie-policy,disclaimer}` | Legal |
| `/sitemap.xml`, `/robots.txt` | Generated from the content data |

**Request a Quote** is the strongest CTA throughout: permanent gold button in
the header, a CTA band at the foot of every page, a mobile sticky button, and
per-product deep links (`/request-a-quote?product=Cumin%20Seeds` preselects the
dropdown). WhatsApp floats bottom-right on every page.

---

## Editing content

Almost all copy lives in `/data` — you rarely need to touch a component.

| File | Contains |
| --- | --- |
| `data/products.ts` | All five categories, every product, container volumes, SEO titles/descriptions, photography notes, RFQ dropdown options |
| `data/company.ts` | Key numbers, disclaimers, mission, services, supply-chain stages, audiences, differentiators, team, roadmap, locations |
| `data/letters.ts` | CEO and Chairman letters |
| `data/navigation.ts` | Header menu, mega-menu blurbs, footer columns |
| `data/legal.ts` | The four legal documents |
| `lib/site.ts` | Company name, address, phone, WhatsApp number, email, canonical URL |

Adding a product to a category = one object in `data/products.ts`. It appears on
the category page, in the planned-volumes table and (if you add it to
`rfqProducts`) in the RFQ dropdown.

### Container-figure disclaimers

The brief requires that planned volumes are never read as guarantees. The
disclaimer text lives once in `data/company.ts` (`containerDisclaimer`,
`roadmapDisclaimer`) and is rendered under the statistics band, the roadmap,
the products table, every category page with stated volumes, and in the footer.
The investors page additionally states that no return percentages are published
and that terms are shared only through a due-diligence process.

---

## Company Report (`/reports`)

Built from the **Project Emerald Executive Investment Memorandum**, with the
numbers cross-checked against `data/products.ts` so the report can never drift
from the product pages. The consolidated planned volume (132 containers/month
across 8 products) is computed at build time, not hard-coded.

**What is deliberately withheld.** The memorandum is marked confidential and
contains target monthly profit-participation percentages, the capital
commitment period and a capital repayment schedule. The brief requires that the
public site publish no investor return percentages and no suggestion of
guaranteed returns, so those figures are **not** on the page. In their place
`restrictedNotice` in `data/reports.ts` renders a gated block routing to the
investor enquiry form, alongside an explicit statement that nothing on the page
is an offer of securities or a promise of any return.

If those terms are ever to be published, that is a legal/compliance decision —
publicly advertising investment returns can constitute a regulated financial
promotion.

---

## Forms

Four endpoints, all server-side validated, all honeypot-protected:

| Form | Endpoint | Reference prefix |
| --- | --- | --- |
| RFQ | `POST /api/quote` | `CKQ-` |
| Supplier registration | `POST /api/supplier` | `CKS-` |
| Contact | `POST /api/contact` | `CKC-` |
| Investor enquiry | `POST /api/investor` | `CKI-` |

Validation lives in `lib/validate.ts` (required fields, email format, length
caps, file-size caps, unknown keys dropped). The RFQ additionally requires a
quantity in either metric tons or containers.

### Where submissions go

`lib/submissions.ts` fans each submission out to three sinks, and a failure in
one never blocks the others:

1. **Always** — appended to `data/submissions.jsonl` and logged to the server
   console. Nothing is lost before a provider is configured.
   (This file is gitignored; it contains customer PII.)
2. **`FORM_WEBHOOK_URL`** — POSTs the submission as JSON. Point it at Zapier,
   Make, n8n or a CRM.
3. **`RESEND_API_KEY`** — emails a formatted summary to `NOTIFY_EMAIL`
   (defaults to `ckfoodstuff@gmail.com`).

Uploaded documents (company profile, catalogue, certifications, RFQ
specification) are validated and their metadata is recorded and included in the
notification. **File bytes are not currently persisted** — wire up S3, Vercel
Blob or a Drive folder in `lib/submissions.ts` if you need the documents
themselves stored rather than emailed.

---

## Imagery

Supplied photography lives in `public/images/photos/`, named after its subject.
Originals stay in `/assets/source-photos` (outside `public/`, so they are never
served) and are imported by `node scripts/prepare-photos.mjs`, which renames,
trims letterbox bars and re-encodes them.

Slots resolve through `lib/images.ts` (page heroes, CTA bands, panels) and
`data/products.ts` (category and product imagery), so any swap is a one-line
edit.

### Trade-network map

`components/sections/NetworkMap.tsx` (home, About, Supply Chain) draws real
geography, not decoration. `node scripts/generate-worldmap.mjs` takes Natural
Earth 1:110m country boundaries from the `world-atlas` package, projects them
with d3-geo (`geoNaturalEarth1`, framed on Europe / Africa / Middle East /
Asia) and emits two files:

- `public/images/art/world-land.svg` — land, interior borders and a projected
  graticule; a cached static layer so the ~60KB of path data is fetched once
  rather than inlined into all three pages
- `data/worldMap.ts` — the small overlay: viewBox, projected city coordinates
  and great-circle trade lanes

Both share a viewBox, so the layers align exactly. Every city sits at its true
latitude/longitude and every lane is a real great-circle route. To move or add
a location, edit `PLACES` / `LANES` in the script and re-run it.

Dairy is the one category with no photography yet and still uses the generated
brand artwork in `public/images/art/` (`node scripts/generate-art.mjs`,
deterministic). [`public/images/README.md`](public/images/README.md) lists every
slot, what is live in it, and the remaining photography gaps — including a
branding note on the supplied fruit shots that needs a decision before launch.

---

## SEO

- Per-page `title` / `description` using the exact titles from the brief, via a
  `%s | CK Foodstuff Trading LLC` template.
- Canonical URLs, Open Graph and Twitter cards.
- `Organization` JSON-LD in the root layout.
- `sitemap.xml` and `robots.txt` generated from the content data, so new
  products and pages appear automatically.

Set `NEXT_PUBLIC_SITE_URL` to the live domain before launch — canonicals, the
sitemap and OG URLs all derive from it.

---

## Deployment

Deploys as-is to Vercel (zero config) or any Node host:

```bash
npm run build && npm start
```

Note for read-only/serverless filesystems: the `data/submissions.jsonl` write is
best-effort and failures are caught, so configure `FORM_WEBHOOK_URL` or
`RESEND_API_KEY` in production so enquiries are delivered somewhere durable.
