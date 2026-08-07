# Imagery

Two sources feed every image slot on the site:

- **`photos/`** — the supplied photography. Imported from
  `/assets/source-photos` by `node scripts/prepare-photos.mjs`, which renames
  each file after its subject, trims letterbox bars and re-encodes as a
  progressive JPEG.
- **`art/`** — generated brand artwork (`node scripts/generate-art.mjs`). Now
  used only where no photograph exists yet.

Slots resolve through two files, so a swap is always a one-line edit:

| What | Where |
| --- | --- |
| Page heroes, CTA bands, supporting panels | `lib/images.ts` |
| Category and product imagery | `data/products.ts` (`art`, `heroArt`, `items[].art`) |

---

## What is currently live

### Dubai &amp; logistics
| File | Subject | Used for |
| --- | --- | --- |
| `dubai-port-container-vessel.jpg` | Container ship at a Dubai terminal with the Burj Al Arab behind | **Home hero**, About hero, HQ panel, OG image |
| `dubai-terminal-dusk.jpg` | Gantry cranes loading a container vessel at dusk | Services hero, Contact hero, RFQ hero, legal hero, CTA bands |
| `jebel-ali-terminal-aerial.jpg` | Aerial of a container terminal | Products hero, Supply Chain hero, Investors hero, network panel, 404 |

### Rice
| File | Subject | Used for |
| --- | --- | --- |
| `rice-export-port-loading.jpg` | Rice sacks on the quay, vessel loading behind | Rice category hero |
| `rice-export-sack-50kg.jpg` | 50kg export-quality jute sack on a pallet | Rice category card, 1102 Rice |
| `rice-basmati-warehouse-sacks.jpg` | Open basmati sacks in a warehouse | Sona Masoori Rice |
| `rice-basmati-grains-spoon.jpg` | Long-grain rice with a wooden spoon | 1101 Basmati Rice |
| `rice-farm-jute-sacks.jpg` | Filled jute sacks at the farm | Sourcing panel, Become a Supplier hero |

### Spices
| File | Subject | Used for |
| --- | --- | --- |
| `spices-flatlay-wood.jpg` | Full spice flat-lay on rustic wood | Spices hero, Cloves |
| `spices-bowls-tray.jpg` | Spice bowls and tray, dark wood | Spices category card, Black Pepper |
| `spices-slate-spoons.jpg` | Spoons and bowls on slate | Cumin Seeds, Coriander Seeds |
| `spices-dark-slate.jpg` | Powders and whole spices on dark slate | Cardamom, Red Chilli |
| `turmeric-bowls.jpg` | Turmeric powder in bowls | Turmeric |
| `cinnamon-star-anise.jpg` | Cinnamon quills and star anise | Cinnamon |

### Fresh produce
| File | Subject | Used for |
| --- | --- | --- |
| `pomegranates-export-box.jpg` | Pomegranates in an export carton | Fresh Fruits hero, Pomegranates |
| `grapes-punnets-pallet.jpg` | Palletised grape punnets | Fresh Fruits category card |
| `grapes-export-carton.jpg` | Grape punnets in an export carton | Grapes |
| `carrots-export-crates.jpg` | Carrots in export crates | Fresh Vegetables hero, category card, Carrots |

---

## Known gaps — worth commissioning

1. **Dairy has no photography.** `/products/dairy` still uses the generated
   `art/dairy-hero.svg`, `art/dairy.svg` and `art/dairy-powder.svg`. Needed:
   European dairy farms, milk powder texture, professional dairy production,
   neutral **unbranded** bulk packaging. Per the brief, do not use another
   manufacturer's branded product bags.

2. **Third-party branding is visible in the fruit shots.**
   `pomegranates-export-box.jpg` carries "Kaybee" stickers, and both grape
   photographs show "ND Exports" and "Grape Kart" cartons. Publishing them
   presents another company's branded packaging on CK Foodstuff's site. Either
   confirm these are CK consignments and that the brand owners are content, or
   replace them with unbranded packing shots. This is the same rule the brief
   states explicitly for dairy.

3. **Hero resolution.** `dubai-terminal-dusk.jpg` (900×600),
   `jebel-ali-terminal-aerial.jpg` (850×650), `carrots-export-crates.jpg`
   (840×630) and `pomegranates-export-box.jpg` (728×1024) are used full-bleed
   and are upscaled on large displays. The dark emerald overlay hides most of
   it, but 1920px-wide originals would sharpen those heroes noticeably.

4. **Six spices share composite photographs.** Cumin, pepper, cloves,
   cardamom, coriander and chilli are each shown in a group shot rather than a
   dedicated close-up, so a few tiles repeat an image. Single-spice macro shots
   on a dark ground would give each product its own tile.

5. **No executive portraits.** `components/sections/LetterBlock.tsx` renders a
   gold monogram plate where a photograph belongs — replace that `<span>` with
   a `next/image` when portraits are available.

---

## Adding or replacing a photograph

1. Drop the original into `/assets/source-photos/` (kept out of `public/`, so
   originals are never served or deployed).
2. Add a `'source filename': 'published-name'` entry to `MAP` in
   `scripts/prepare-photos.mjs`.
3. Run `node scripts/prepare-photos.mjs`.
4. Point the slot at it in `lib/images.ts` or `data/products.ts`.

Recommended originals: JPEG, sRGB, ~2000px on the long edge. Heroes read best
at 16:9 or wider; product tiles at 4:3 or square.
