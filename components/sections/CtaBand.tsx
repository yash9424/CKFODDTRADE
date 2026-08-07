import Image from 'next/image'
import type { ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { whatsappLink } from '@/lib/site'
import { images } from '@/lib/images'

/**
 * The site's strongest commercial call-to-action. Repeated at the foot of
 * every page so "Request a Quote" is never more than a scroll away.
 */
export function CtaBand({
  eyebrow = 'Request a Quote',
  title,
  lead,
  primaryHref = '/request-a-quote',
  primaryLabel = 'Request a Quotation',
  secondary,
  art = images.ctaDefault,
}: {
  eyebrow?: string
  title?: ReactNode
  lead?: ReactNode
  primaryHref?: string
  primaryLabel?: string
  secondary?: { href: string; label: string }
  art?: string
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-emerald-950">
      <Image src={art} alt="" fill sizes="100vw" className="object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/55" />

      <div className="container-ck relative py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow rule-gold text-gold-300">{eyebrow}</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ivory">
                {title ?? (
                  <>
                    Tell us what you need.
                    <br />
                    <span className="gold-text">Let’s build the supply.</span>
                  </>
                )}
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.75] text-ivory/70">
                {lead ??
                  'Send us your product, origin requirement, grade, quantity, packaging and destination port. Our commercial team will respond with availability, specifications and commercial terms.'}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href={primaryHref} variant="gold" size="lg">
                {primaryLabel}
              </ButtonLink>
              <ButtonLink
                href={secondary?.href ?? whatsappLink()}
                variant="outlineLight"
                size="lg"
                arrow={!secondary}
              >
                {secondary?.label ?? 'WhatsApp Us'}
              </ButtonLink>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-ivory/10 bg-ivory/10 text-center">
              {[
                ['Dubai', 'Headquarters'],
                ['Surat', 'Procurement'],
                ['Mumbai', 'Export & Logistics'],
              ].map(([city, role]) => (
                <div key={city} className="bg-emerald-950/70 px-3 py-5">
                  <p className="font-display text-[15px] font-semibold text-gold-400">{city}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-wide2 text-ivory/50">
                    {role}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
