import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { getLegalDoc, legalDocs } from '@/data/legal'
import { site } from '@/lib/site'
import { images } from '@/lib/images'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const doc = getLegalDoc(slug)
  if (!doc) return {}

  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/legal/${doc.slug}` },
    robots: { index: true, follow: true },
  }
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params
  const doc = getLegalDoc(slug)
  if (!doc) notFound()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: doc.title }]}
        eyebrow="Legal"
        art={images.legalHero}
        size="sm"
        title={doc.title}
        lead={doc.description}
      />

      <Section tone="ivory">
        <div className="container-ck grid gap-14 lg:grid-cols-12">
          {/* Contents rail */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow rule-gold text-gold-700">Legal Documents</p>
              <ul className="mt-6 space-y-3">
                {legalDocs.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/legal/${other.slug}`}
                      className={`text-[14px] transition-colors ${
                        other.slug === doc.slug
                          ? 'font-semibold text-emerald-900'
                          : 'text-charcoal-light hover:text-emerald-800'
                      }`}
                    >
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-emerald-950/10 pt-6 text-[13px] leading-relaxed text-charcoal-muted">
                <p className="font-semibold text-emerald-950">{site.name}</p>
                <p className="mt-2">Last updated {doc.updated}</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 inline-block text-emerald-800 transition-colors hover:text-gold-700"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </aside>

          <article className="lg:col-span-9 lg:pl-8">
            <Reveal>
              <p className="max-w-3xl text-[17px] leading-[1.8] text-charcoal-light">{doc.intro}</p>
            </Reveal>

            {doc.sections.map((section, i) => (
              <Reveal key={section.heading} delay={40} className="mt-12">
                <h2 className="flex items-baseline gap-4 font-display text-[clamp(1.3rem,2.4vw,1.75rem)] font-semibold text-emerald-950">
                  <span className="text-[13px] font-semibold text-gold-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4 border-l border-emerald-950/10 pl-6">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="max-w-3xl text-[15.5px] leading-[1.8] text-charcoal-light">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal className="mt-14 border-t border-emerald-950/10 pt-8">
              <p className="text-[13px] text-charcoal-muted">
                Questions about this document? Contact us at{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="text-emerald-800 underline underline-offset-4 hover:text-gold-700"
                >
                  {site.email}
                </a>{' '}
                or{' '}
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-emerald-800 underline underline-offset-4 hover:text-gold-700"
                >
                  {site.phone}
                </a>
                .
              </p>
            </Reveal>
          </article>
        </div>
      </Section>
    </>
  )
}
