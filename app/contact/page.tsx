import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/forms/ContactForm'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { locations } from '@/data/company'
import { addressLines, site, whatsappLink } from '@/lib/site'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Contact CK Foodstuff Trading LLC Dubai',
  description:
    'Contact CK Foodstuff Trading LLC — Office B01, Al Abbas 2 Building, Bank Street, Bur Dubai, Dubai, UAE. Telephone +971 56 620 2044. Purchase enquiries, supply partnerships and strategic cooperation.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Contact"
        art={images.contactHero}
        title={
          <>
            Let’s do <span className="gold-text">business.</span>
          </>
        }
        lead="Whether you are looking to purchase food commodities, develop a supply partnership, introduce new products or explore strategic cooperation, our team welcomes your inquiry."
        actions={
          <>
            <ButtonLink href="/request-a-quote" variant="gold" size="lg">
              Request a Quote
            </ButtonLink>
            <ButtonLink href={whatsappLink()} variant="outlineLight" size="lg" arrow={false}>
              WhatsApp Us
            </ButtonLink>
            <ButtonLink href="/become-a-supplier" variant="outlineLight" size="lg">
              Become a Supplier
            </ButtonLink>
          </>
        }
      />

      {/* Headquarters + direct channels */}
      <Section tone="ivory">
        <div className="container-ck grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Dubai Headquarters"
              title="CK Foodstuff Trading LLC"
              className="max-w-none"
            />

            <Reveal delay={80} className="mt-8">
              <address className="space-y-1 text-[16px] not-italic leading-relaxed text-charcoal-light">
                {addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </Reveal>

            <Reveal delay={140} className="mt-9 space-y-4">
              <a
                href={`tel:${site.phoneHref}`}
                className="group flex items-center gap-4 border border-emerald-950/10 bg-white p-5 transition-all duration-300 hover:border-gold-500 hover:shadow-card"
              >
                <Icon name="phone" className="h-6 w-6 text-gold-600" />
                <span>
                  <span className="block text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                    Telephone
                  </span>
                  <span className="mt-1 block font-display text-[19px] font-semibold text-emerald-950">
                    {site.phone}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 border border-emerald-950/10 bg-white p-5 transition-all duration-300 hover:border-gold-500 hover:shadow-card"
              >
                <Icon name="mail" className="h-6 w-6 text-gold-600" />
                <span>
                  <span className="block text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                    Email
                  </span>
                  <span className="mt-1 block font-display text-[19px] font-semibold text-emerald-950">
                    {site.email}
                  </span>
                </span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-emerald-950/10 bg-white p-5 transition-all duration-300 hover:border-gold-500 hover:shadow-card"
              >
                <Icon name="whatsapp" className="h-6 w-6 text-[#25D366]" />
                <span>
                  <span className="block text-[11px] uppercase tracking-wide2 text-charcoal-muted">
                    WhatsApp
                  </span>
                  <span className="mt-1 block font-display text-[19px] font-semibold text-emerald-950">
                    Message our desk
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={200} className="mt-9 border-l-2 border-gold-500 pl-6">
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700">
                Business hours
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-light">
                Sunday – Thursday, 09:00 – 18:00 Gulf Standard Time (GMT+4).
                <br />
                International enquiries are answered outside these hours wherever possible.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal className="border border-emerald-950/10 bg-ivory-100 p-7 sm:p-10">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Locations */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Our Locations"
            title="Dubai headquarters. India procurement network."
            lead="A commercial desk in one of the world’s major trading hubs, backed by procurement and export coordination close to origin."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {locations.map((location, i) => (
              <Reveal
                key={location.city}
                delay={i * 90}
                className="group flex flex-col border border-ivory/10 bg-emerald-950/55 p-8 transition-colors duration-500 hover:border-gold-500/50"
              >
                <div className="flex items-start justify-between">
                  <Icon name="pin" className="h-7 w-7 text-gold-500" strokeWidth={1.3} />
                  <span className="text-[11px] uppercase tracking-wide2 text-ivory/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[26px] font-semibold text-ivory">
                  {location.city}
                </h3>
                <p className="mt-1.5 text-[13px] text-ivory/50">{location.country}</p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide2 text-gold-400">
                  {location.role}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-ivory/65">{location.detail}</p>

                {location.address && (
                  <address className="mt-6 space-y-0.5 border-t border-ivory/10 pt-6 text-[13.5px] not-italic leading-relaxed text-ivory/55">
                    {location.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
