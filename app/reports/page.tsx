import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { CtaBand } from '@/components/sections/CtaBand'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { images } from '@/lib/images'
import {
  capitalAllocation,
  capitalAllocationTotal,
  capitalNote,
  competitiveAdvantages,
  esgPillars,
  executiveSummary,
  governanceNote,
  growthMilestones,
  investorReporting,
  marketOpportunity,
  performanceFramework,
  reportDisclaimers,
  reportHighlights,
  reportMeta,
  restrictedNotice,
  riskManagement,
  volumeRows,
  volumeTotal,
  whyDubai,
  whyIndia,
} from '@/data/reports'

export const metadata: Metadata = {
  title: 'Company Report | Project Emerald Growth Overview',
  description:
    'CK Foodstuff Trading LLC company report: planned container volumes by product, growth roadmap to 500 containers per month by Q4 2027, capital deployment, performance framework, governance and risk management.',
  alternates: { canonical: '/reports' },
}

export default function ReportsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Report' }]}
        eyebrow="Project Emerald"
        art={images.investorsHero}
        title={
          <>
            Company <span className="gold-text">Report</span>
          </>
        }
        lead={reportMeta.basis}
        actions={
          <>
            <ButtonLink href="/investors#investor-enquiry" variant="gold" size="lg">
              Request Investor Information
            </ButtonLink>
            <ButtonLink href="#volumes" variant="outlineLight" size="lg">
              Jump to the Numbers
            </ButtonLink>
          </>
        }
      />

      {/* At a glance */}
      <Section tone="ivory" compact>
        <div className="container-ck">
          <SectionHeading eyebrow="At a Glance" title={reportMeta.subtitle} />

          <div className="mt-12 grid gap-px overflow-hidden border border-emerald-950/10 bg-emerald-950/10 sm:grid-cols-2 lg:grid-cols-3">
            {reportHighlights.map((item, i) => (
              <Reveal key={item.label} delay={i * 60} className="bg-white p-8">
                <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700">
                  {item.label}
                </p>
                <p className="mt-4 font-display text-[22px] font-semibold leading-snug text-emerald-950">
                  {item.value}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="prose-ck mt-12 max-w-3xl">
            {executiveSummary.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Planned volumes */}
      <Section tone="emerald" className="grain" id="volumes">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Report 01 — Planned Volumes"
            title="Product portfolio and monthly container opportunity"
            lead="The figures below are management’s planned monthly container opportunities per product for the initial operating period."
          />

          <Reveal className="mt-12 overflow-x-auto border border-ivory/15">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-ivory/15 bg-emerald-950/60">
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wide2 text-gold-400">
                    Product
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wide2 text-gold-400">
                    Category
                  </th>
                  <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wide2 text-gold-400">
                    Containers / Month
                  </th>
                </tr>
              </thead>
              <tbody>
                {volumeRows.map((row) => (
                  <tr
                    key={row.product}
                    className="border-b border-ivory/10 transition-colors last:border-0 hover:bg-emerald-900/40"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/products/${row.slug}`}
                        className="font-display text-[16px] font-semibold text-ivory transition-colors hover:text-gold-300"
                      >
                        {row.product}
                      </Link>
                      {row.planned && (
                        <span className="ml-3 border border-gold-500/40 px-2 py-0.5 text-[10px] uppercase tracking-wide2 text-gold-400">
                          Planned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-ivory/60">{row.category}</td>
                    <td className="px-6 py-4 text-right font-display text-[18px] font-semibold text-gold-400">
                      {row.containers}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gold-500/50 bg-emerald-950/70">
                  <td className="px-6 py-5 font-display text-[16px] font-semibold uppercase tracking-wide2 text-ivory">
                    Total planned opportunity
                  </td>
                  <td className="px-6 py-5 text-[13px] text-ivory/50">
                    {volumeRows.length} products
                  </td>
                  <td className="px-6 py-5 text-right font-display text-[28px] font-semibold text-gold-400">
                    {volumeTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </Reveal>

          <Reveal delay={100} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ivory/55">
            <span>
              Consolidated total of{' '}
              <span className="font-semibold text-gold-400">{volumeTotal} containers / month</span>{' '}
              sits within the stated initial planned capacity of 120–140.
            </span>
          </Reveal>
        </div>
      </Section>

      {/* Growth roadmap */}
      <Section tone="ivory">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Report 02 — Growth Milestones"
            title="Planned expansion of trading capacity"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {growthMilestones.map((milestone, i) => (
              <Reveal
                key={milestone.milestone}
                delay={i * 90}
                className="group relative border border-emerald-950/10 bg-white p-8 transition-all duration-500 hover:shadow-cardHover"
              >
                <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-charcoal-muted">
                  {milestone.milestone}
                </p>
                <p className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.2rem)] font-semibold leading-none tracking-[-0.03em] text-gold-600">
                  {milestone.target}
                </p>
                <p className="mt-4 text-[12.5px] uppercase tracking-[0.13em] text-charcoal-light">
                  {milestone.unit}
                </p>
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Capital deployment */}
      <Section tone="ivoryDeep">
        <div className="container-ck grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Report 03 — Capital Deployment"
              title="Indicative use of growth capital"
              lead={capitalNote}
              className="max-w-none"
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal className="border border-emerald-950/10 bg-white">
              {capitalAllocation.map((row, i) => (
                <div
                  key={row.use}
                  className="flex items-center gap-6 border-b border-emerald-950/10 px-7 py-5 last:border-0"
                >
                  <span className="w-8 shrink-0 font-display text-[13px] font-semibold text-gold-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-emerald-950">{row.use}</span>
                  <span className="hidden h-1.5 w-40 overflow-hidden bg-emerald-950/8 sm:block">
                    <span
                      className="block h-full bg-gold-500"
                      style={{ width: `${(row.share / 45) * 100}%` }}
                    />
                  </span>
                  <span className="w-14 shrink-0 text-right font-display text-[18px] font-semibold text-emerald-950">
                    {row.share}%
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between bg-emerald-950 px-7 py-5">
                <span className="text-[12px] font-semibold uppercase tracking-wide2 text-ivory">
                  Total
                </span>
                <span className="font-display text-[20px] font-semibold text-gold-400">
                  {capitalAllocationTotal}%
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Performance framework */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Report 04 — Performance Framework"
            title="What management measures"
            lead="Management’s objective is a financially sustainable trading platform with continuous growth in trading volume, profitability, cash flow and returns on invested capital."
          />

          <div className="mt-12 grid gap-px overflow-hidden border border-ivory/15 bg-ivory/15 sm:grid-cols-2 lg:grid-cols-3">
            {performanceFramework.map((row, i) => (
              <Reveal key={row.kpi} delay={i * 60} className="bg-emerald-950/60 p-8">
                <p className="font-display text-[19px] font-semibold text-ivory">{row.kpi}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-ivory/60">{row.objective}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Market opportunity */}
      <Section tone="ivory">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Report 05 — Market"
            title="Where the opportunity sits"
            lead="Demand for staple food commodities continues to grow through population growth, urbanization, tourism and food-security initiatives. CK Foodstuff focuses on essential commodities with recurring demand."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Reveal className="border border-emerald-950/10 bg-white p-8">
              <Icon name="chart" className="h-7 w-7 text-gold-600" />
              <h3 className="mt-6 font-display text-[21px] font-semibold text-emerald-950">
                Market Opportunity
              </h3>
              <ul className="mt-5 space-y-3">
                {marketOpportunity.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-charcoal-light">
                    <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={2.4} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} className="border border-emerald-950/10 bg-white p-8">
              <Icon name="building" className="h-7 w-7 text-gold-600" />
              <h3 className="mt-6 font-display text-[21px] font-semibold text-emerald-950">
                Why Dubai
              </h3>
              <ul className="mt-5 space-y-3">
                {whyDubai.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-charcoal-light">
                    <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={2.4} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160} className="border border-emerald-950/10 bg-white p-8">
              <Icon name="leaf" className="h-7 w-7 text-gold-600" />
              <h3 className="mt-6 font-display text-[21px] font-semibold text-emerald-950">
                Why India
              </h3>
              <p className="mt-5 text-[14px] leading-relaxed text-charcoal-light">{whyIndia}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Advantages + risk */}
      <Section tone="ivoryDeep">
        <div className="container-ck grid gap-14 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Report 06 — Competitive Position"
              title="Competitive advantages"
              className="max-w-none"
            />
            <div className="mt-10 border border-emerald-950/10 bg-white">
              {competitiveAdvantages.map((row) => (
                <div
                  key={row.strength}
                  className="flex flex-col gap-1 border-b border-emerald-950/10 px-7 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="font-display text-[16px] font-semibold text-emerald-950">
                    {row.strength}
                  </span>
                  <span className="text-[14px] text-charcoal-light sm:text-right">
                    {row.benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Report 07 — Risk"
              title="Risk management"
              className="max-w-none"
            />
            <div className="mt-10 border border-emerald-950/10 bg-white">
              {riskManagement.map((row) => (
                <div
                  key={row.area}
                  className="flex flex-col gap-1 border-b border-emerald-950/10 px-7 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="font-display text-[16px] font-semibold text-emerald-950">
                    {row.area}
                  </span>
                  <span className="text-[14px] text-charcoal-light sm:text-right">
                    {row.mitigation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Governance, reporting, ESG */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Report 08 — Governance"
            title="Governance, reporting and sustainability"
            lead={governanceNote}
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <Reveal className="border border-ivory/15 bg-emerald-950/60 p-8 lg:col-span-5">
              <p className="eyebrow text-gold-400">Investor Reporting</p>
              <ul className="mt-6 space-y-3.5">
                {investorReporting.map((item) => (
                  <li key={item} className="flex gap-3.5 text-[14.5px] text-ivory/75">
                    <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-500" strokeWidth={2.4} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="grid gap-5 lg:col-span-7">
              {esgPillars.map((pillar, i) => (
                <Reveal
                  key={pillar.pillar}
                  delay={i * 80}
                  className="border border-ivory/15 bg-emerald-950/60 p-7"
                >
                  <p className="font-display text-[19px] font-semibold text-ivory">
                    {pillar.pillar}
                  </p>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ivory/60">
                    {pillar.detail}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* What is withheld */}
      <Section tone="ivory">
        <div className="container-ck">
          <Reveal className="mx-auto max-w-4xl border-l-2 border-gold-500 bg-ivory-200 p-8 sm:p-12">
            <div className="flex items-center gap-4">
              <Icon name="shield" className="h-8 w-8 shrink-0 text-gold-700" />
              <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] font-semibold leading-snug text-emerald-950">
                {restrictedNotice.title}
              </h2>
            </div>

            {restrictedNotice.body.map((paragraph, i) => (
              <p key={i} className="mt-5 text-[16px] leading-[1.8] text-charcoal-light">
                {paragraph}
              </p>
            ))}

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {restrictedNotice.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border border-emerald-950/10 bg-white px-4 py-3 text-[13.5px] text-charcoal"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <ButtonLink href="/investors#investor-enquiry" variant="gold" size="md">
                Request Investor Information
              </ButtonLink>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 max-w-4xl space-y-3">
            {reportDisclaimers.map((disclaimer) => (
              <p key={disclaimer} className="text-[12.5px] italic leading-relaxed text-charcoal-muted">
                {disclaimer}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Report"
        title={
          <>
            Questions on the numbers?
            <br />
            <span className="gold-text">Talk to our team.</span>
          </>
        }
        lead="Our commercial desk handles buying enquiries; Project Emerald enquiries are handled directly by the board."
        primaryHref="/investors#investor-enquiry"
        primaryLabel="Request Investor Information"
        secondary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  )
}
