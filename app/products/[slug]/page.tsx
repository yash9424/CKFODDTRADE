import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { ProcessRibbon } from '@/components/sections/ProcessRibbon'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { getCategory, productCategories } from '@/data/products'
import { containerDisclaimer } from '@/data/company'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: { canonical: `/products/${category.slug}` },
    openGraph: {
      title: `${category.seoTitle} | CK Foodstuff Trading LLC`,
      description: category.seoDescription,
      images: [{ url: category.heroArt }],
    },
  }
}

export default async function ProductCategoryPage({ params }: Params) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const others = productCategories.filter((c) => c.slug !== category.slug)
  const hasVolumes = category.items.some((item) => item.containers)

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category.navLabel },
        ]}
        eyebrow={category.eyebrow}
        art={category.heroArt}
        title={
          <>
            {category.headline[0]}
            <br />
            <span className="gold-text">{category.headline[1]}</span>
          </>
        }
        lead={category.intro}
        actions={
          <>
            <ButtonLink href="/request-a-quote" variant="gold" size="lg">
              {category.ctaLabel}
            </ButtonLink>
            <ButtonLink href="/products" variant="outlineLight" size="lg">
              All Products
            </ButtonLink>
          </>
        }
      />

      {/* Items */}
      <Section tone="ivory">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Current Portfolio"
            title={`${category.label} we are sourcing`}
            lead="Specifications, packaging and commercial quantities are agreed per buyer. Send us your requirement and we will confirm availability and terms."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item, i) => (
              <Reveal
                key={item.slug}
                delay={i * 70}
                className="group flex flex-col overflow-hidden border border-emerald-950/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950">
                  <Image
                    src={item.art}
                    alt={`${item.name} sourced by CK Foodstuff Trading LLC`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  {item.containers && (
                    <span className="absolute left-0 top-5 bg-gold-500 px-4 py-2 text-[10.5px] font-semibold uppercase tracking-wide2 text-emerald-950">
                      {item.containers}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-[22px] font-semibold leading-snug text-emerald-950">
                    {item.name}
                  </h3>
                  <p className="mt-3.5 text-[14.5px] leading-[1.7] text-charcoal-light">
                    {item.description}
                  </p>

                  {item.notes && (
                    <ul className="mt-5 space-y-2.5">
                      {item.notes.map((note) => (
                        <li key={note} className="flex gap-3 text-[13px] text-charcoal-muted">
                          <Icon
                            name="check"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600"
                            strokeWidth={2.4}
                          />
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={`/request-a-quote?product=${encodeURIComponent(item.name)}`}
                    className="link-underline mt-auto pt-7 text-[11px] font-semibold uppercase tracking-wide2 text-emerald-800"
                  >
                    Request {item.name} Quotation
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 8h13M9 3l5 5-5 5" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {hasVolumes && (
            <p className="mt-9 max-w-3xl text-[12.5px] italic leading-relaxed text-charcoal-muted">
              {containerDisclaimer}
            </p>
          )}
        </div>
      </Section>

      {/* Additional range */}
      {category.additional && (
        <Section tone="emerald" className="grain" compact>
          <div className="container-ck grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                light
                eyebrow="Extended Range"
                title={category.additionalTitle ?? 'Additional Products'}
                lead={category.additionalNote}
                className="max-w-none"
              />
            </div>
            <div className="lg:col-span-8">
              <Reveal className="flex flex-wrap gap-2.5">
                {category.additional.map((item) => (
                  <span
                    key={item}
                    className="border border-ivory/15 px-5 py-3 text-[13.5px] text-ivory/80 transition-colors duration-300 hover:border-gold-500 hover:text-gold-300"
                  >
                    {item}
                  </span>
                ))}
              </Reveal>
              <Reveal delay={120} className="mt-10">
                <ButtonLink href="/request-a-quote" variant="gold" size="md">
                  Enquire About These Products
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Section>
      )}

      {/* What to send us */}
      <Section tone="ivoryDeep" compact>
        <div className="container-ck grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={`Buying ${category.navLabel.toLowerCase()} in bulk?`}
              title="Send us your requirement"
              className="max-w-none"
            />
            <Reveal delay={80}>
              <p className="mt-6 text-[16px] leading-[1.75] text-charcoal-light">Send us your:</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {[
                  'Product',
                  'Origin Requirement',
                  'Grade',
                  'Quantity',
                  'Packaging',
                  'Destination Port',
                ].map((field) => (
                  <li
                    key={field}
                    className="border border-emerald-950/10 bg-white px-4 py-2.5 text-[12.5px] font-medium text-emerald-950"
                  >
                    {field}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={140} className="mt-9">
              <ButtonLink href="/request-a-quote" variant="gold" size="lg">
                {category.ctaLabel}
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="How the order runs"
              title="Sourcing to delivery"
              className="max-w-none"
              titleClassName="text-[clamp(1.4rem,2.6vw,2rem)]"
            />
            <div className="mt-8">
              <ProcessRibbon />
            </div>
            <Reveal delay={120} className="mt-8 border-l-2 border-gold-500 pl-6">
              <p className="text-[14px] leading-relaxed text-charcoal-light">
                Product specifications, packaging requirements and relevant documentation are
                coordinated according to contractual requirements before shipment.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Other categories */}
      <Section tone="ivory" compact>
        <div className="container-ck">
          <SectionHeading eyebrow="Also in the portfolio" title="Explore other categories" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 70}>
                <Link
                  href={`/products/${other.slug}`}
                  className="group relative flex min-h-[15rem] flex-col justify-end overflow-hidden bg-emerald-950 p-6"
                >
                  <Image
                    src={other.art}
                    alt={other.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/50 to-transparent" />
                  <div className="relative">
                    <h3 className="font-display text-[20px] font-semibold text-ivory">
                      {other.label}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-wide2 text-gold-300">
                      View
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 8h13M9 3l5 5-5 5" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Photography guidance for whoever swaps in real assets */}
      <CtaBand
        art={category.heroArt}
        primaryLabel={category.ctaLabel}
        title={
          <>
            Ready to move volume?
            <br />
            <span className="gold-text">Let’s talk specifications.</span>
          </>
        }
      />
    </>
  )
}
