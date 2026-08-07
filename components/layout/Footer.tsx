import Link from 'next/link'
import { footerNav } from '@/data/navigation'
import { addressLines, site, whatsappLink } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="grain relative overflow-hidden bg-emerald-deep text-ivory">
      {/* Final brand statement */}
      <div className="relative border-b border-ivory/10">
        <div className="container-ck py-20 text-center sm:py-24">
          <p className="eyebrow text-gold-400">CK Foodstuff Trading LLC</p>
          <h2 className="mx-auto mt-7 max-w-4xl font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory">
            Global Sourcing. Reliable Supply.
            <br />
            <span className="gold-text">Trusted Partnerships.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] uppercase tracking-[0.14em] text-ivory/60">
            From source to market — connecting quality food producers with international buyers
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">
            <span>Dubai</span>
            <span className="text-ivory/25">•</span>
            <span>Surat</span>
            <span className="text-ivory/25">•</span>
            <span>Mumbai</span>
            <span className="mx-2 h-4 w-px bg-ivory/20" />
            <span className="text-ivory/60">UAE • GCC • International Markets</span>
          </div>
        </div>
      </div>

      <div className="container-ck grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-sm text-[13px] uppercase tracking-[0.13em] text-gold-300/90">
            Global Sourcing • International Trading • Food Distribution
          </p>

          <address className="mt-7 space-y-0.5 text-[14px] not-italic leading-relaxed text-ivory/65">
            {addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>

          <div className="mt-7 space-y-3">
            <a
              href={`tel:${site.phoneHref}`}
              className="group flex items-center gap-3 text-[15px] text-ivory transition-colors hover:text-gold-300"
            >
              <Icon name="phone" className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-3 text-[15px] text-ivory transition-colors hover:text-gold-300"
            >
              <Icon name="mail" className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
              {site.email}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request-a-quote"
              className="bg-gold-500 px-6 py-3 text-[11px] font-semibold uppercase tracking-wide2 text-emerald-950 transition-colors hover:bg-gold-400"
            >
              Request a Quote
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ivory/25 px-6 py-3 text-[11px] font-semibold uppercase tracking-wide2 text-ivory transition-colors hover:border-gold-500 hover:text-gold-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:pl-10">
          <FooterColumn title="Quick Links" links={footerNav.quickLinks} />
          <FooterColumn title="Products" links={footerNav.productLinks} />
          <div>
            <FooterColumn title="Legal" links={footerNav.legal} />
            <div className="mt-10">
              <p className="eyebrow text-gold-400">India Network</p>
              <ul className="mt-5 space-y-4 text-[13px] leading-relaxed text-ivory/60">
                <li>
                  <span className="block font-semibold text-ivory/90">Surat, Gujarat</span>
                  Procurement • Supplier &amp; Quality Coordination
                </li>
                <li>
                  <span className="block font-semibold text-ivory/90">Mumbai, Maharashtra</span>
                  Export Coordination • Shipping • Documentation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-ck flex flex-col gap-4 py-7 text-[12px] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} CK Foodstuff Trading LLC. All rights reserved.
          </p>
          <p className="max-w-xl sm:text-right">
            Container figures shown across this website represent management’s planned trading
            opportunities and growth targets and are not guaranteed future volumes.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="eyebrow text-gold-400">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[14px] text-ivory/65 transition-colors duration-300 hover:text-gold-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
