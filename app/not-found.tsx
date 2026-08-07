import Image from 'next/image'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { productCategories } from '@/data/products'
import { images } from '@/lib/images'

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-screen items-center overflow-hidden bg-emerald-950 py-40">
      <Image
        src={images.port}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-950/50" />

      <div className="container-ck relative">
        <p className="eyebrow rule-gold text-gold-300">Error 404</p>
        <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5.4vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ivory">
          This shipment took a wrong turn.
        </h1>
        <p className="mt-7 max-w-xl text-[16.5px] leading-[1.75] text-ivory/70">
          The page you were looking for is not here. Head back to the homepage, or jump straight to
          a product category or a quotation request.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="gold" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/request-a-quote" variant="outlineLight" size="lg">
            Request a Quote
          </ButtonLink>
        </div>

        <div className="mt-14 border-t border-ivory/10 pt-8">
          <p className="eyebrow text-gold-400">Product Portfolio</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {productCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/${category.slug}`}
                  className="link-underline text-[15px] text-ivory/75 transition-colors hover:text-gold-300"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
