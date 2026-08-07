import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from '@/components/ui/Reveal'

export type Crumb = { label: string; href?: string }

/**
 * Standard interior-page hero: full-bleed emerald artwork, breadcrumb,
 * eyebrow, display headline and optional actions.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  art,
  crumbs,
  actions,
  align = 'left',
  size = 'md',
  overlay = 'from-emerald-950/90 via-emerald-950/70 to-emerald-950/45',
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  art: string
  crumbs?: Crumb[]
  actions?: ReactNode
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  overlay?: string
}) {
  const heights = {
    sm: 'pt-40 pb-16 sm:pt-48 sm:pb-20',
    md: 'pt-44 pb-20 sm:pt-52 sm:pb-28',
    lg: 'pt-48 pb-24 sm:pt-60 sm:pb-32',
  }

  return (
    <section className="grain relative isolate overflow-hidden bg-emerald-950">
      <Image
        src={art}
        alt=""
        fill
        priority
        sizes="100vw"
        className="animate-slow-zoom object-cover opacity-90"
      />
      <div className={cn('absolute inset-0 bg-gradient-to-r', overlay)} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-emerald-950 to-transparent" />

      <div className={cn('container-ck relative', heights[size])}>
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
          {crumbs && (
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol
                  className={cn(
                    'flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide2 text-ivory/50',
                    align === 'center' && 'justify-center',
                  )}
                >
                  {crumbs.map((crumb, i) => (
                    <li key={crumb.label} className="flex items-center gap-2">
                      {crumb.href ? (
                        <Link href={crumb.href} className="transition-colors hover:text-gold-300">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-gold-300">{crumb.label}</span>
                      )}
                      {i < crumbs.length - 1 && <span className="text-ivory/25">/</span>}
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          )}

          {eyebrow && (
            <Reveal delay={60}>
              <p
                className={cn(
                  'eyebrow rule-gold mt-8 text-gold-300',
                  align === 'center' && 'inline-flex',
                )}
              >
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-[clamp(2.3rem,5.6vw,4.6rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-ivory">
              {title}
            </h1>
          </Reveal>

          {lead && (
            <Reveal delay={200}>
              <div
                className={cn(
                  'mt-7 max-w-2xl text-[17px] leading-[1.75] text-ivory/70',
                  align === 'center' && 'mx-auto',
                )}
              >
                {lead}
              </div>
            </Reveal>
          )}

          {actions && (
            <Reveal delay={280}>
              <div
                className={cn(
                  'mt-10 flex flex-wrap gap-3',
                  align === 'center' && 'justify-center',
                )}
              >
                {actions}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
