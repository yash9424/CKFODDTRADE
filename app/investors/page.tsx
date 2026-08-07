import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { RoadmapTimeline } from '@/components/sections/RoadmapTimeline'
import { InvestorForm } from '@/components/forms/InvestorForm'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { roadmapDisclaimer } from '@/data/company'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Investors | Project Emerald',
  description:
    'Project Emerald is CK Foodstuff Trading LLC’s strategic growth initiative to expand procurement capacity, working capital, international logistics and distribution towards a target of 500 containers per month by Q4 2027.',
  alternates: { canonical: '/investors' },
}

const focusAreas = [
  {
    icon: 'handshake' as const,
    title: 'Procurement Capacity',
    detail:
      'Deeper supplier relationships and larger committed volumes across rice, spices and fresh produce.',
  },
  {
    icon: 'chart' as const,
    title: 'Working Capital',
    detail:
      'Funding the trade cycle so larger recurring supply programmes can be serviced with confidence.',
  },
  {
    icon: 'ship' as const,
    title: 'International Logistics',
    detail: 'Freight, documentation and cold-chain coordination scaled to a higher container count.',
  },
  {
    icon: 'warehouse' as const,
    title: 'Distribution',
    detail: 'Warehousing and onward distribution capability in destination markets.',
  },
]

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Investors' }]}
        eyebrow="Investors"
        art={images.investorsHero}
        size="lg"
        title={
          <>
            Project <span className="gold-text">Emerald</span>
          </>
        }
        lead="Building a scalable international food supply platform. Project Emerald represents CK Foodstuff Trading LLC’s strategic growth initiative designed to expand procurement capacity, working capital, international logistics and distribution."
        actions={
          <ButtonLink href="#investor-enquiry" variant="gold" size="lg">
            Request Investor Information
          </ButtonLink>
        }
      />

      {/* Growth vision */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Growth Vision"
            title="120–140 → 200 → 250 → 500 containers per month"
            titleClassName="text-[clamp(1.5rem,3.2vw,2.6rem)]"
            lead="A staged expansion of trading capacity, targeted at 500 containers per month by Q4 2027."
          />

          <div className="mt-14">
            <RoadmapTimeline light />
          </div>

          <Reveal delay={140} className="mt-16 border border-gold-500/30 bg-emerald-950/60 p-10 text-center sm:p-14">
            <p className="eyebrow text-gold-400">Q4 2027 Target</p>
            <p className="mt-6 font-display text-[clamp(3.5rem,11vw,8rem)] font-semibold leading-none tracking-[-0.04em] text-gold-500">
              500
            </p>
            <p className="mt-5 text-[13px] uppercase tracking-[0.2em] text-ivory/60">
              Containers / Month
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Where capital goes */}
      <Section tone="ivory">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Project Emerald"
            title="Four areas of expansion"
            lead="Project Emerald is a growth initiative, not a single transaction. Capital is directed at the constraints that limit container throughput."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {focusAreas.map((area, i) => (
              <Reveal
                key={area.title}
                delay={i * 80}
                className="group flex gap-6 border border-emerald-950/10 bg-white p-8 transition-all duration-500 hover:shadow-cardHover"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center border border-gold-500/35 text-gold-600 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-emerald-950">
                  <Icon name={area.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-[21px] font-semibold text-emerald-950">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-charcoal-light">
                    {area.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Disclosure position */}
      <Section tone="ivoryDeep" compact>
        <div className="container-ck">
          <Reveal className="mx-auto max-w-4xl border-l-2 border-gold-500 bg-white p-8 sm:p-12">
            <p className="eyebrow text-gold-700">Important Note on Disclosure</p>
            <p className="mt-6 text-[16px] leading-[1.8] text-charcoal-light">
              CK Foodstuff Trading LLC does not publish detailed investment return percentages on
              this website, and nothing on this page should be read as an offer of, or a suggestion
              of, guaranteed returns.
            </p>
            <p className="mt-5 text-[16px] leading-[1.8] text-charcoal-light">
              Detailed investment terms remain within private investor documentation and are
              provided only through an appropriate investor review and due-diligence process.
            </p>
            <p className="mt-5 text-[13px] italic leading-relaxed text-charcoal-muted">
              {roadmapDisclaimer}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Enquiry */}
      <Section tone="ivory" id="investor-enquiry">
        <div className="container-ck grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Investor Enquiry"
              title="Request investor information"
              lead="Tell us who you are and what you would like to review. Enquiries are handled directly by our board."
              className="max-w-none"
            />
            <Reveal delay={100} className="mt-9 space-y-4">
              {[
                'Reviewed by the Chairman & Managing Director',
                'Information shared under a formal due-diligence process',
                'No investment terms are published publicly',
              ].map((point) => (
                <p key={point} className="flex gap-3.5 text-[14.5px] text-charcoal-light">
                  <Icon
                    name="check"
                    className="mt-1 h-4 w-4 shrink-0 text-gold-600"
                    strokeWidth={2.2}
                  />
                  {point}
                </p>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal className="border border-emerald-950/10 bg-ivory-100 p-7 sm:p-10">
              <InvestorForm />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
