import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AudienceGrid } from '@/components/sections/AudienceGrid'
import { ProcessRibbon } from '@/components/sections/ProcessRibbon'
import { CtaBand } from '@/components/sections/CtaBand'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Global Food Sourcing & Procurement | Our Services',
  description:
    'Global sourcing, procurement, import and export, quality coordination, international logistics, wholesale distribution and institutional supply from CK Foodstuff Trading LLC, Dubai.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Services' }]}
        eyebrow="What We Do"
        art={images.servicesHero}
        title={
          <>
            One partner.
            <br />
            <span className="gold-text">Multiple supply-chain solutions.</span>
          </>
        }
        lead="CK Foodstuff coordinates the full commercial journey — identifying producers at origin, negotiating and planning shipments, coordinating quality and documentation, and delivering into destination markets."
        actions={
          <ButtonLink href="/request-a-quote" variant="gold" size="lg">
            Request a Quote
          </ButtonLink>
        }
      />

      <Section tone="ivory">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Our Services"
            title="Seven capabilities, one commercial relationship"
            lead="Each service is designed to remove a point of friction from international food procurement."
          />
          <div className="mt-14">
            <ServicesGrid anchors />
          </div>
        </div>
      </Section>

      {/* Procurement process */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Procurement Process"
            title="Producer → Procurement → QC → Export → Shipping → Distribution → Customer"
            titleClassName="text-[clamp(1.4rem,2.8vw,2.2rem)]"
            lead="A single coordinated process rather than a chain of disconnected intermediaries."
          />
          <div className="mt-12">
            <ProcessRibbon light />
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Specification first',
                detail:
                  'Nothing is sourced until the grade, packaging and destination requirements are written down.',
              },
              {
                title: 'Supplier selection',
                detail:
                  'Producers are assessed on capacity, consistency, certification and export readiness.',
              },
              {
                title: 'Documented shipment',
                detail:
                  'Packing, labelling and shipping documentation prepared against the contract.',
              },
              {
                title: 'Delivered coordination',
                detail:
                  'Freight, port handling, warehousing and onward distribution tracked to the customer.',
              },
            ].map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 80}
                className="border-t-2 border-gold-500/40 pt-6"
              >
                <h3 className="font-display text-[19px] font-semibold text-ivory">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ivory/60">{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Who we serve */}
      <Section tone="ivoryDeep">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Built for Professional Buyers"
            lead="Container and bulk-volume supply for organisations that buy on specification and buy again."
          />
          <div className="mt-14">
            <AudienceGrid />
          </div>
        </div>
      </Section>

      <CtaBand art={images.servicesHero} />
    </>
  )
}
