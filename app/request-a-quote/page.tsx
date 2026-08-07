import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHero } from '@/components/sections/PageHero'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { site, whatsappLink } from '@/lib/site'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Request a Quote | International Food Sourcing',
  description:
    'Send CK Foodstuff Trading LLC your product, origin requirement, grade, quantity, packaging and destination port. Our Dubai commercial team will respond with availability, specifications and commercial terms.',
  alternates: { canonical: '/request-a-quote' },
}

const steps = [
  {
    icon: 'doc' as const,
    title: 'You send the specification',
    detail: 'Product, grade, quantity, packaging, destination port and required delivery date.',
  },
  {
    icon: 'globe' as const,
    title: 'We source and price it',
    detail:
      'Our procurement network in Surat and Mumbai checks availability against your specification.',
  },
  {
    icon: 'handshake' as const,
    title: 'You receive commercial terms',
    detail: 'Availability, specification confirmation, Incoterm, packaging and shipment planning.',
  },
]

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Request a Quote' }]}
        eyebrow="Request a Quote"
        art={images.quoteHero}
        title={
          <>
            Tell us what you need.
            <br />
            <span className="gold-text">Let’s build the supply.</span>
          </>
        }
        lead="A professional RFQ gets a professional answer. The more detail you provide on grade, packaging and destination, the faster our commercial team can come back with firm terms."
      />

      {/* How it works */}
      <Section tone="ivory" compact>
        <div className="container-ck grid gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 80}
              className="flex gap-5 border-l-2 border-gold-500/40 pl-6"
            >
              <div>
                <span className="flex items-center gap-3">
                  <Icon name={step.icon} className="h-6 w-6 text-gold-600" />
                  <span className="font-display text-[12px] font-semibold text-gold-700">
                    STEP {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <h2 className="mt-4 font-display text-[19px] font-semibold text-emerald-950">
                  {step.title}
                </h2>
                <p className="mt-2.5 text-[14px] leading-relaxed text-charcoal-light">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The RFQ */}
      <Section tone="ivoryDeep" className="pt-0">
        <div className="container-ck">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-12">
              <div className="border border-emerald-950/10 bg-ivory-100 p-7 sm:p-12 lg:p-16">
                <Suspense
                  fallback={
                    <p className="py-10 text-center text-[14px] text-charcoal-muted">
                      Loading the request form…
                    </p>
                  }
                >
                  <QuoteForm />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Direct contact rail */}
          <Reveal className="mt-10 grid gap-px overflow-hidden border border-emerald-950/10 bg-emerald-950/10 sm:grid-cols-3">
            <a
              href={`tel:${site.phoneHref}`}
              className="group flex items-center gap-4 bg-white p-7 transition-colors hover:bg-ivory-200"
            >
              <Icon name="phone" className="h-6 w-6 text-gold-600" />
              <span>
                <span className="block text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                  Call our desk
                </span>
                <span className="mt-1 block font-display text-[17px] font-semibold text-emerald-950">
                  {site.phone}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 bg-white p-7 transition-colors hover:bg-ivory-200"
            >
              <Icon name="mail" className="h-6 w-6 text-gold-600" />
              <span>
                <span className="block text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                  Email us
                </span>
                <span className="mt-1 block font-display text-[17px] font-semibold text-emerald-950">
                  {site.email}
                </span>
              </span>
            </a>
            <a
              href={whatsappLink('Hello CK Foodstuff, I would like to request a quotation.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white p-7 transition-colors hover:bg-ivory-200"
            >
              <Icon name="whatsapp" className="h-6 w-6 text-gold-600" />
              <span>
                <span className="block text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                  Fastest response
                </span>
                <span className="mt-1 block font-display text-[17px] font-semibold text-emerald-950">
                  WhatsApp Us
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
