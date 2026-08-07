import Image from 'next/image'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { images } from '@/lib/images'

const categories = ['Rice', 'Spices', 'Fresh Fruits', 'Fresh Vegetables', 'Dairy']

export function HomeHero() {
  return (
    <section className="grain relative isolate flex min-h-[92vh] items-end overflow-hidden bg-emerald-950 pb-14 pt-40 sm:min-h-screen sm:pb-16 sm:pt-48">
      <Image
        src={images.homeHero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="animate-slow-zoom object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-950/40" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-emerald-950 to-transparent" />

      <div className="container-ck relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow rule-gold text-gold-300">CK Foodstuff Trading LLC</p>
            </Reveal>

            <h1 className="mt-7 font-display text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-ivory">
              <Reveal delay={80} as="span" className="block">
                Global Sourcing.
              </Reveal>
              <Reveal delay={180} as="span" className="block">
                Reliable Supply.
              </Reveal>
              <Reveal delay={280} as="span" className="block gold-text">
                Trusted Partnerships.
              </Reveal>
            </h1>

            <Reveal delay={380}>
              <p className="mt-8 max-w-2xl text-[clamp(1.05rem,1.7vw,1.3rem)] font-medium leading-snug text-gold-200">
                Connecting Quality Food Producers with International Markets
              </p>
            </Reveal>

            <Reveal delay={460}>
              <div className="mt-8 max-w-2xl space-y-4 text-[15.5px] leading-[1.75] text-ivory/70">
                <p>
                  CK Foodstuff Trading LLC is a Dubai-headquartered international food trading,
                  sourcing, import, export and distribution company.
                </p>
                <p>
                  We connect trusted producers and suppliers with wholesalers, distributors,
                  supermarkets, hospitality groups, food processors and institutional buyers across
                  the UAE, GCC and selected international markets.
                </p>
                <p className="hidden sm:block">
                  From our headquarters in Dubai and procurement operations in Surat and Mumbai,
                  India, we are developing a scalable international food supply platform built
                  around quality, reliability, competitive sourcing and long-term commercial
                  partnerships.
                </p>
              </div>
            </Reveal>

            <Reveal delay={560}>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/request-a-quote" variant="gold" size="lg">
                  Request a Quote
                </ButtonLink>
                <ButtonLink href="/products" variant="outlineLight" size="lg">
                  Explore Our Products
                </ButtonLink>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                <Link
                  href="/request-a-quote?intent=buyer"
                  className="link-underline text-[11px] font-semibold uppercase tracking-wide2 text-ivory/70 transition-colors hover:text-gold-300"
                >
                  Become a Buyer
                </Link>
                <Link
                  href="/become-a-supplier"
                  className="link-underline text-[11px] font-semibold uppercase tracking-wide2 text-ivory/70 transition-colors hover:text-gold-300"
                >
                  Become a Supplier
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Category rail */}
          <Reveal delay={640} className="lg:col-span-5">
            <div className="border-l-2 border-gold-500/50 pl-7">
              <p className="eyebrow text-gold-400">What We Supply</p>
              <ul className="mt-6 space-y-0">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="group flex items-center justify-between border-b border-ivory/10 py-3.5"
                  >
                    <span className="font-display text-[19px] font-semibold text-ivory/85 transition-colors duration-300 group-hover:text-gold-300">
                      {category}
                    </span>
                    <span className="h-px w-8 bg-gold-500/50 transition-all duration-300 group-hover:w-14" />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] leading-relaxed text-ivory/50">
                Source · Procure · Import · Export · Coordinate Logistics · Distribute
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
