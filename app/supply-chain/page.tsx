import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/sections/PageHero'
import { SupplyChainFlow } from '@/components/sections/SupplyChainFlow'
import { NetworkMap } from '@/components/sections/NetworkMap'
import { CtaBand } from '@/components/sections/CtaBand'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { locations } from '@/data/company'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Supply Chain | From Source to Destination',
  description:
    'How CK Foodstuff Trading LLC coordinates the international food supply chain: producer, procurement in Surat and Mumbai, quality coordination, packing and documentation, shipping, Dubai and destination ports, warehousing and distribution.',
  alternates: { canonical: '/supply-chain' },
}

const pillars = [
  {
    icon: 'shield' as const,
    title: 'Specification control',
    detail:
      'Grades, moisture, purity, packaging and labelling are agreed in writing and coordinated against the contract before shipment.',
  },
  {
    icon: 'doc' as const,
    title: 'Documentation discipline',
    detail:
      'Shipping documentation is prepared through our Mumbai export desk so clearance at destination is not held up by paperwork.',
  },
  {
    icon: 'route' as const,
    title: 'Freight coordination',
    detail:
      'Booking, container loading, vessel scheduling and port handling are coordinated through our logistics network.',
  },
  {
    icon: 'warehouse' as const,
    title: 'Onward distribution',
    detail:
      'Storage, order consolidation and delivery into wholesalers, distributors, retailers and institutions.',
  },
]

export default function SupplyChainPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Supply Chain' }]}
        eyebrow="Our Supply Chain"
        art={images.supplyChainHero}
        title={
          <>
            From source
            <br />
            <span className="gold-text">to destination.</span>
          </>
        }
        lead="Our objective is to simplify international food procurement by coordinating the commercial supply chain from sourcing through delivery — one accountable partner across eight stages."
        actions={
          <ButtonLink href="/request-a-quote" variant="gold" size="lg">
            Request a Quote
          </ButtonLink>
        }
      />

      {/* The eight stages */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="The Chain"
            title="Eight coordinated stages"
            lead="Each stage has a named owner inside CK Foodstuff, so a shipment never falls between two intermediaries."
          />
          <div className="mt-16">
            <SupplyChainFlow light />
          </div>
        </div>
      </Section>

      {/* Pillars */}
      <Section tone="ivory">
        <div className="container-ck">
          <SectionHeading
            eyebrow="How We Control It"
            title="Where trade deals usually break — and how we hold them together"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={i * 80}
                className="group flex gap-6 border border-emerald-950/10 bg-white p-8 transition-all duration-500 hover:shadow-cardHover"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center border border-gold-500/35 text-gold-600 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-emerald-950">
                  <Icon name={pillar.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-[21px] font-semibold text-emerald-950">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-charcoal-light">
                    {pillar.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Global network */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Global Network"
            title="India → Dubai → GCC / International Markets"
            lead="Procurement close to origin, a commercial and logistics hub in Dubai, and distribution into the GCC and selected international markets."
          />
          <div className="mt-14">
            <NetworkMap />
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {locations.map((location, i) => (
              <Reveal
                key={location.city}
                delay={i * 90}
                className="border border-ivory/10 bg-emerald-950/55 p-8"
              >
                <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-400">
                  {location.role}
                </p>
                <h3 className="mt-5 font-display text-[24px] font-semibold text-ivory">
                  {location.city}
                </h3>
                <p className="mt-1.5 text-[13px] text-ivory/50">{location.country}</p>
                <p className="mt-5 text-[14px] leading-relaxed text-ivory/65">{location.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Logistics imagery band */}
      <Section tone="ivoryDeep" compact>
        <div className="container-ck grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={images.logistics}
                alt="Container terminal operations coordinated by CK Foodstuff Trading LLC"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Container-Scale Trade"
              title="Designed for professional B2B volume"
              className="max-w-none"
            />
            <Reveal delay={80} className="prose-ck mt-7 max-w-xl">
              <p>
                Our operating model is designed for container-volume transactions and recurring
                supply programmes rather than one-off spot trades. That shapes everything: how we
                select suppliers, how we structure documentation, and how we plan shipments across a
                month rather than a week.
              </p>
              <p>
                Initial planned capacity sits at 120–140 containers per month, with a management
                target of 500 containers per month by Q4 2027.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/investors" variant="outline" size="md">
                See the Growth Roadmap
              </ButtonLink>
              <ButtonLink href="/products" variant="ghost" size="md">
                Browse Products
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand art={images.supplyChainHero} />
    </>
  )
}
