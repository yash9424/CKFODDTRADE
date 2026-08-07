import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/sections/PageHero'
import { Section, SectionHeading, Eyebrow } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { LetterBlock } from '@/components/sections/LetterBlock'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { WhyGrid } from '@/components/sections/WhyGrid'
import { StatsBand } from '@/components/sections/StatsBand'
import { CtaBand } from '@/components/sections/CtaBand'
import { NetworkMap } from '@/components/sections/NetworkMap'
import { ceoLetter, chairmanLetter } from '@/data/letters'
import { mission } from '@/data/company'
import { images } from '@/lib/images'

export const metadata: Metadata = {
  title: 'About Us | Dubai International Food Trading Company',
  description:
    'CK Foodstuff Trading LLC was established to connect quality food producers with growing international markets through reliable sourcing, professional procurement and efficient logistics. Dubai headquarters, Surat and Mumbai procurement.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        eyebrow="About CK Foodstuff"
        art={images.aboutHero}
        title={
          <>
            Building an International
            <br />
            <span className="gold-text">Food Supply Platform</span>
          </>
        }
        lead="A Dubai-headquartered international food trading, sourcing, import, export and distribution company, with procurement operations in Surat and Mumbai, India."
      />

      {/* Objective */}
      <Section tone="ivory">
        <div className="container-ck grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our Objective"
              title="Connecting quality food producers with growing international markets."
              className="max-w-none"
            />
            <Reveal delay={80} className="prose-ck mt-8 max-w-2xl">
              <p>
                CK Foodstuff Trading LLC was established with a clear objective: to connect quality
                food producers with growing international markets through reliable sourcing,
                professional procurement and efficient logistics.
              </p>
              <p>
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
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={images.sourcing}
                alt="Agricultural sourcing network supplying CK Foodstuff Trading LLC"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="eyebrow text-gold-400">Procurement Network</p>
                <p className="mt-3 font-display text-3xl font-semibold text-ivory">
                  Surat &amp; Mumbai
                </p>
                <p className="mt-2 text-[13px] text-ivory/65">
                  Supplier coordination · Quality · Export documentation
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <StatsBand />

      {/* Vision & Mission */}
      <Section tone="ivoryDeep">
        <div className="container-ck grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Our Vision</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.1] text-emerald-950">
              Connecting Producers.
              <br />
              Supplying Markets.
              <br />
              <span className="text-gold-700">Building Partnerships.</span>
            </h2>
            <Reveal delay={100} className="prose-ck mt-8">
              <p>
                Our vision is to develop CK Foodstuff Trading LLC into a recognized international
                food sourcing and distribution platform connecting quality producers with customers
                throughout the GCC and selected global markets.
              </p>
            </Reveal>
          </div>

          <div>
            <Eyebrow>Our Mission</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.1] text-emerald-950">
              Our mission is to:
            </h2>
            <ul className="mt-8">
              {mission.map((item, i) => (
                <Reveal
                  key={item}
                  delay={i * 60}
                  as="li"
                  className="group flex items-start gap-4 border-b border-emerald-950/10 py-4"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border border-gold-600/45 text-gold-700 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-emerald-950">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="text-[15.5px] leading-snug text-charcoal">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Letters */}
      <LetterBlock letter={ceoLetter} tone="ivory" />
      <LetterBlock letter={chairmanLetter} tone="emerald" />

      {/* Management team */}
      <Section tone="ivory" id="team">
        <div className="container-ck">
          <SectionHeading
            eyebrow="Management Team"
            title="The people behind CK Foodstuff"
            lead="Leadership across procurement, international sales, operations and financial control."
          />
          <div className="mt-14">
            <TeamGrid />
          </div>
        </div>
      </Section>

      {/* Why CK */}
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
          <div className="mt-16">
            <NetworkMap />
          </div>
        </div>
      </Section>

      <CtaBand art={images.aboutHero} />
    </>
  )
}
