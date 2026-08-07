import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { SupplierForm } from '@/components/forms/SupplierForm'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { CtaBand } from '@/components/sections/CtaBand'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Become a Supplier | Producer & Exporter Registration',
  description:
    'Producers, farmers, mills, manufacturers, processors and exporters can register with CK Foodstuff Trading LLC. We continuously evaluate new international sourcing relationships.',
  alternates: { canonical: '/become-a-supplier' },
}

const whoWeSeek = [
  { icon: 'leaf' as const, label: 'Producers & Farmers' },
  { icon: 'factory' as const, label: 'Mills & Processors' },
  { icon: 'boxes' as const, label: 'Manufacturers' },
  { icon: 'ship' as const, label: 'Exporters' },
]

const whatWeLookFor = [
  {
    title: 'Consistent specification',
    detail:
      'Product that meets an agreed grade, moisture, purity and packaging standard shipment after shipment.',
  },
  {
    title: 'Documented capacity',
    detail:
      'Monthly production volume you can genuinely commit to, with visibility on seasonality.',
  },
  {
    title: 'Export readiness',
    detail:
      'Certifications, documentation and packing capability appropriate to the destination market.',
  },
  {
    title: 'Commercial transparency',
    detail: 'Clear pricing basis, Incoterm and payment expectations from the first conversation.',
  },
]

export default function BecomeSupplierPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Become a Supplier' }]}
        eyebrow="Supplier Registration"
        art={images.supplierHero}
        title={
          <>
            Grow with <span className="gold-text">CK Foodstuff</span>
          </>
        }
        lead="Are you a producer, farmer, mill, manufacturer, processor or exporter? CK Foodstuff Trading LLC continuously evaluates new international sourcing relationships."
      />

      <Section tone="ivory" compact>
        <div className="container-ck">
          <Reveal className="grid gap-px overflow-hidden border border-emerald-950/10 bg-emerald-950/10 sm:grid-cols-2 lg:grid-cols-4">
            {whoWeSeek.map((item) => (
              <div key={item.label} className="flex items-center gap-4 bg-ivory-100 p-7">
                <Icon name={item.icon} className="h-7 w-7 shrink-0 text-gold-600" strokeWidth={1.3} />
                <span className="font-display text-[17px] font-semibold text-emerald-950">
                  {item.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="emerald" className="grain">
        <div className="container-ck grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              light
              eyebrow="What We Look For"
              title="Serious producers. Repeatable supply."
              lead="Our operating model is built on recurring container-volume programmes, so supplier selection focuses on consistency rather than one-off availability."
              className="max-w-none"
            />
          </div>
          <div className="lg:col-span-7">
            {whatWeLookFor.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 80}
                className="flex gap-6 border-b border-ivory/10 py-7"
              >
                <span className="font-display text-[13px] font-semibold text-gold-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-semibold text-ivory">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-lg text-[14.5px] leading-[1.7] text-ivory/65">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="ivoryDeep">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Supplier Registration"
            title="Register your company"
            lead="Complete the form below and upload your company profile, product catalogue and certifications. Our procurement team reviews every submission."
          />
          <div className="mt-12 border border-emerald-950/10 bg-ivory-100 p-7 sm:p-12 lg:p-16">
            <SupplierForm />
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Already supplying?"
        title={
          <>
            Buying instead?
            <br />
            <span className="gold-text">Send us your requirement.</span>
          </>
        }
        lead="If you are looking to purchase rather than supply, our RFQ form routes straight to the commercial desk."
        art={images.sourcing}
      />
    </>
  )
}
