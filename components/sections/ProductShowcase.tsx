import Image from 'next/image'
import Link from 'next/link'
import { productCategories } from '@/data/products'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeading } from '@/components/ui/Section'

/**
 * Editorial product grid: one tall lead card (rice) plus a stacked column.
 * Used on the home page and, without the heading, on the products hub.
 */
export function ProductShowcase({ withHeading = true }: { withHeading?: boolean }) {
  const [lead, ...rest] = productCategories

  return (
    <Section tone="ivory" id="products">
      <div className="container-ck">
        {withHeading && (
          <SectionHeading
            eyebrow="Product Portfolio"
            title={
              <>
                Food for markets. Quality for partners.
                <br />
                <span className="text-gold-700">Supply without borders.</span>
              </>
            }
            lead="CK Foodstuff is developing a diversified portfolio of food commodities for international wholesale, distribution, retail, hospitality, foodservice and institutional markets."
            className="max-w-4xl"
          />
        )}

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <CategoryCard category={lead} tall />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {rest.map((category, i) => (
              <Reveal key={category.slug} delay={80 + i * 70}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function CategoryCard({
  category,
  tall = false,
}: {
  category: (typeof productCategories)[number]
  tall?: boolean
}) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className={`group relative flex h-full flex-col justify-end overflow-hidden bg-emerald-950 ${
        tall ? 'min-h-[26rem] lg:min-h-[42rem]' : 'min-h-[19rem]'
      }`}
    >
      <Image
        src={category.art}
        alt={`${category.label} — CK Foodstuff Trading LLC`}
        fill
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/55 to-emerald-950/10" />
      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100" />

      <div className="relative p-7 sm:p-8">
        <p className="eyebrow text-gold-400">{category.eyebrow}</p>
        <h3
          className={`mt-4 font-display font-semibold leading-tight text-ivory ${
            tall ? 'text-[clamp(1.7rem,3vw,2.4rem)]' : 'text-2xl'
          }`}
        >
          {category.label}
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ivory/65">
          {category.summary}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide2 text-gold-300">
          Explore {category.navLabel}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          >
            <path d="M1 8h13M9 3l5 5-5 5" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
