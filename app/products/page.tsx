import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ProductShowcase } from '@/components/sections/ProductShowcase'
import { CtaBand } from '@/components/sections/CtaBand'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { productCategories } from '@/data/products'
import { containerDisclaimer } from '@/data/company'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Products | Rice, Spices, Fresh Produce & Dairy',
  description:
    'CK Foodstuff Trading LLC supplies premium rice, spices, fresh fruits, fresh vegetables and European milk powder at container scale to wholesalers, distributors, retailers, hospitality groups and institutional buyers.',
  alternates: { canonical: '/products' },
}

/** Every item that carries a stated monthly container opportunity. */
const plannedVolumes = productCategories.flatMap((category) =>
  category.items
    .filter((item) => item.containers)
    .map((item) => ({
      category: category.label,
      slug: category.slug,
      name: item.name,
      containers: item.containers!,
    })),
)

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
        eyebrow="Product Portfolio"
        art={images.productsHero}
        title={
          <>
            Food for markets.
            <br />
            Quality for partners.
            <br />
            <span className="gold-text">Supply without borders.</span>
          </>
        }
        lead="CK Foodstuff is developing a diversified portfolio of food commodities for international wholesale, distribution, retail, hospitality, foodservice and institutional markets."
        actions={
          <ButtonLink href="/request-a-quote" variant="gold" size="lg">
            Request a Quote
          </ButtonLink>
        }
      />

      <ProductShowcase withHeading={false} />

      {/* Planned volumes table */}
      <Section tone="ivoryDeep">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Planned Monthly Opportunities"
            title="Where our initial capacity sits"
            lead="The figures below are the monthly container opportunities identified by management across the current portfolio."
          />

          <Reveal className="mt-12 overflow-x-auto border border-emerald-950/10 bg-white">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-emerald-950/10 bg-ivory-200">
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wide2 text-emerald-950">
                    Product
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wide2 text-emerald-950">
                    Category
                  </th>
                  <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wide2 text-emerald-950">
                    Planned Containers / Month
                  </th>
                  <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wide2 text-emerald-950">
                    Enquire
                  </th>
                </tr>
              </thead>
              <tbody>
                {plannedVolumes.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-emerald-950/10 transition-colors last:border-0 hover:bg-ivory-100"
                  >
                    <td className="px-6 py-4 font-display text-[16px] font-semibold text-emerald-950">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-charcoal-light">{row.category}</td>
                    <td className="px-6 py-4 text-right font-display text-[16px] font-semibold text-gold-700">
                      {row.containers.replace(' Containers / Month', '')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`/request-a-quote?product=${encodeURIComponent(row.name)}`}
                        className="text-[11px] font-semibold uppercase tracking-wide2 text-emerald-800 transition-colors hover:text-gold-700"
                      >
                        Request →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <p className="mt-6 max-w-3xl text-[12.5px] italic leading-relaxed text-charcoal-muted">
            {containerDisclaimer}
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
