import Image from 'next/image'
import Link from 'next/link'
import { HomeHero } from '@/components/home/HomeHero'
import { StatsBand } from '@/components/sections/StatsBand'
import { ProductShowcase } from '@/components/sections/ProductShowcase'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { SupplyChainFlow } from '@/components/sections/SupplyChainFlow'
import { AudienceGrid } from '@/components/sections/AudienceGrid'
import { WhyGrid } from '@/components/sections/WhyGrid'
import { RoadmapTimeline } from '@/components/sections/RoadmapTimeline'
import { CtaBand } from '@/components/sections/CtaBand'
import { NetworkMap } from '@/components/sections/NetworkMap'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading, Eyebrow } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'
import { mission } from '@/data/company'
import { images } from '@/lib/images'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsBand />

      {/* ---------------- About ---------------- */}
      <Section tone="ivory" id="about">
        <div className="container-ck grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About CK Foodstuff"
              title="Building an International Food Supply Platform"
              className="max-w-none"
            />
            <Reveal delay={80} className="prose-ck mt-8 max-w-2xl">
              <p className="border-l-2 border-gold-500 pl-6 font-display text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-snug text-emerald-900">
                CK Foodstuff Trading LLC was established with a clear objective: to connect quality
                food producers with growing international markets through reliable sourcing,
                professional procurement and efficient logistics.
              </p>
              <p className="mt-8">
                Our Dubai headquarters coordinates international sales, strategic partnerships,
                customer relationships, business development and trading activities.
              </p>
              <p>
                Our procurement operations in Surat and Mumbai provide access to important
                agricultural production, processing and export networks in India.
              </p>
              <p>
                This combination enables CK Foodstuff to develop an integrated commercial bridge
                between producers, exporters and international buyers.
              </p>
            </Reveal>
            <Reveal delay={160} className="mt-10">
              <ButtonLink href="/about" variant="outline" size="md">
                More About Us
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={images.dubai}
                alt="Dubai — international headquarters of CK Foodstuff Trading LLC"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="eyebrow text-gold-400">Headquarters</p>
                <p className="mt-3 font-display text-3xl font-semibold text-ivory">Dubai, UAE</p>
                <p className="mt-2 text-[13px] text-ivory/65">
                  Bur Dubai · Bank Street · Al Abbas 2 Building
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Vision & Mission ---------------- */}
      <Section tone="emerald" className="grain">
        <div className="container-ck grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow light>Our Vision</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.1] text-ivory">
              Connecting Producers.
              <br />
              Supplying Markets.
              <br />
              <span className="text-gold-400">Building Partnerships.</span>
            </h2>
            <Reveal delay={100}>
              <p className="mt-8 max-w-lg text-[16px] leading-[1.8] text-ivory/70">
                Our vision is to develop CK Foodstuff Trading LLC into a recognized international
                food sourcing and distribution platform connecting quality producers with customers
                throughout the GCC and selected global markets.
              </p>
            </Reveal>
            <Reveal delay={160} className="mt-10 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center border border-gold-500/40 text-gold-500">
                <Icon name="compass" className="h-6 w-6" />
              </span>
              <p className="max-w-[18rem] text-[13px] uppercase leading-relaxed tracking-wide2 text-ivory/50">
                A recognized international food sourcing and distribution platform
              </p>
            </Reveal>
          </div>

          <div>
            <Eyebrow light>Our Mission</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.1] text-ivory">
              Our mission is to:
            </h2>
            <ul className="mt-8">
              {mission.map((item, i) => (
                <Reveal
                  key={item}
                  delay={i * 60}
                  as="li"
                  className="group flex items-start gap-4 border-b border-ivory/10 py-4"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border border-gold-500/40 text-gold-500 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-emerald-950">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="text-[15.5px] leading-snug text-ivory/80">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ProductShowcase />

      {/* ---------------- What We Do ---------------- */}
      <Section tone="ivoryDeep" id="services">
        <div className="container-ck">
          <SectionHeading
            eyebrow="What We Do"
            title={
              <>
                One partner.
                <br />
                <span className="text-gold-700">Multiple supply-chain solutions.</span>
              </>
            }
            lead="From identifying producers at origin to delivering into destination markets, CK Foodstuff coordinates the full commercial chain through a single relationship."
          />
          <div className="mt-14">
            <ServicesGrid />
          </div>
          <Reveal delay={120} className="mt-12">
            <ButtonLink href="/services" variant="outline" size="md">
              View All Services
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Supply Chain ---------------- */}
      <Section tone="emerald" className="grain" id="supply-chain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Our Supply Chain"
            title="From Source to Destination"
            lead="Our objective is to simplify international food procurement by coordinating the commercial supply chain from sourcing through delivery."
          />
          <div className="mt-16">
            <SupplyChainFlow light />
          </div>
          <Reveal delay={140} className="mt-16">
            <NetworkMap />
          </Reveal>
          <Reveal delay={160} className="mt-12">
            <ButtonLink href="/supply-chain" variant="outlineLight" size="md">
              Explore the Supply Chain
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Who We Serve ---------------- */}
      <Section tone="ivory">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Built for Professional Buyers"
            lead="CK Foodstuff is structured for B2B and container-volume trade — recurring supply programmes rather than one-off transactions."
          />
          <div className="mt-14">
            <AudienceGrid />
          </div>
        </div>
      </Section>

      {/* ---------------- Why CK ---------------- */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Why CK Foodstuff?"
            title="Your International Food Supply Partner"
          />
          <div className="mt-14">
            <WhyGrid light />
          </div>
        </div>
      </Section>

      {/* ---------------- Leadership teaser ---------------- */}
      <Section tone="ivoryDeep">
        <div className="container-ck grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                src={images.network}
                alt="CK Foodstuff international trade network"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-emerald-950/35" />
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:pl-6">
            <SectionHeading
              eyebrow="From Our Leadership"
              title="A trusted bridge between quality food producers and international markets."
              className="max-w-none"
            />
            <Reveal delay={100} className="prose-ck mt-8 max-w-2xl">
              <p>
                “International food trading is built on something more valuable than any individual
                transaction: trust. Our vision is to build a platform where producers, suppliers and
                customers can establish strong, transparent and sustainable commercial
                relationships.”
              </p>
            </Reveal>
            <Reveal delay={160} className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
              <div>
                <p className="font-display text-[18px] font-semibold text-emerald-950">
                  Rolando Lazar
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide2 text-gold-700">
                  Chairman &amp; Managing Director
                </p>
              </div>
              <div>
                <p className="font-display text-[18px] font-semibold text-emerald-950">
                  Chirag Kumar Trivedi
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide2 text-gold-700">
                  Chief Executive Officer
                </p>
              </div>
            </Reveal>
            <Reveal delay={220} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/about#chairman" variant="outline" size="md">
                Read the Letters
              </ButtonLink>
              <Link
                href="/about#team"
                className="link-underline self-center text-[11px] font-semibold uppercase tracking-wide2 text-emerald-800"
              >
                Management Team
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------- Growth roadmap ---------------- */}
      <Section tone="emerald" className="grain">
        <div className="container-ck">
          <SectionHeading
            light
            eyebrow="Growth Roadmap"
            title="Building for Scale"
            lead="A staged expansion of procurement capacity, working capital, logistics and distribution."
          />
          <div className="mt-14">
            <RoadmapTimeline light />
          </div>
          <Reveal delay={140} className="mt-10">
            <ButtonLink href="/investors" variant="outlineLight" size="md">
              Project Emerald — Investors
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
