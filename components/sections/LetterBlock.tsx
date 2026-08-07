import type { Letter } from '@/data/letters'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

/**
 * Signed executive letter. Portrait column holds a gold monogram plate (swap
 * for a photograph by replacing the <span> with next/image); the letter itself
 * runs in a narrow measure for readability.
 */
export function LetterBlock({ letter, tone = 'ivory' }: { letter: Letter; tone?: 'ivory' | 'emerald' }) {
  const light = tone === 'emerald'

  return (
    <div
      id={letter.slug}
      className={cn(
        'grain relative overflow-hidden',
        light ? 'bg-emerald-deep text-ivory' : 'bg-ivory-200',
      )}
    >
      <div className="container-ck grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        {/* Signature column */}
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <p className={cn('eyebrow rule-gold', light ? 'text-gold-300' : 'text-gold-700')}>
              {letter.eyebrow}
            </p>

            <div
              className={cn(
                'relative mt-8 aspect-[4/5] w-full max-w-[19rem] overflow-hidden border',
                light ? 'border-ivory/15 bg-emerald-950/60' : 'border-emerald-950/10 bg-white',
              )}
            >
              <div className="absolute inset-0 grid place-items-center">
                <span
                  className={cn(
                    'font-display text-[clamp(3.5rem,9vw,5.5rem)] font-semibold leading-none',
                    light ? 'text-gold-500/35' : 'text-gold-500/45',
                  )}
                >
                  {letter.initials}
                </span>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-gold-sheen" />
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 p-6',
                  light ? 'bg-gradient-to-t from-emerald-950' : 'bg-gradient-to-t from-white',
                )}
              >
                <p
                  className={cn(
                    'font-display text-[19px] font-semibold leading-tight',
                    light ? 'text-ivory' : 'text-emerald-950',
                  )}
                >
                  {letter.name}
                </p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide2 text-gold-600">
                  {letter.role}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Letter body */}
        <div className="lg:col-span-8">
          <Reveal>
            <p
              className={cn(
                'font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-snug tracking-[-0.015em]',
                light ? 'text-ivory' : 'text-emerald-950',
              )}
            >
              {letter.salutation}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {letter.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={Math.min(i * 40, 200)}>
                <p
                  className={cn(
                    'max-w-2xl text-[16.5px] leading-[1.8]',
                    light ? 'text-ivory/70' : 'text-charcoal-light',
                  )}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {letter.chain && (
            <Reveal className="mt-12">
              {letter.chainIntro && (
                <p
                  className={cn(
                    'max-w-2xl text-[16.5px] leading-[1.8]',
                    light ? 'text-ivory/70' : 'text-charcoal-light',
                  )}
                >
                  {letter.chainIntro}
                </p>
              )}
              <ol className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-3">
                {letter.chain.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span
                      className={cn(
                        'border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide2',
                        light
                          ? 'border-gold-500/35 text-gold-300'
                          : 'border-gold-600/40 bg-white text-gold-800',
                      )}
                    >
                      {step}
                    </span>
                    {i < letter.chain!.length - 1 && (
                      <span className="text-gold-500" aria-hidden="true">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          {letter.pillars && (
            <Reveal className="mt-12">
              {letter.pillarsIntro && (
                <p
                  className={cn(
                    'max-w-2xl text-[16.5px] leading-[1.8]',
                    light ? 'text-ivory/70' : 'text-charcoal-light',
                  )}
                >
                  {letter.pillarsIntro}
                </p>
              )}
              <ul
                className={cn(
                  'mt-7 grid gap-px overflow-hidden border sm:grid-cols-2',
                  light ? 'border-ivory/15 bg-ivory/15' : 'border-emerald-950/10 bg-emerald-950/10',
                )}
              >
                {letter.pillars.map((pillar) => (
                  <li
                    key={pillar}
                    className={cn(
                      'px-7 py-6 font-display text-[20px] font-semibold',
                      light ? 'bg-emerald-950/60 text-gold-400' : 'bg-white text-emerald-950',
                    )}
                  >
                    {pillar}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {letter.closing && (
            <div className="mt-12 space-y-5">
              {letter.closing.map((paragraph, i) => (
                <Reveal key={i} delay={i * 50}>
                  <p
                    className={cn(
                      'max-w-2xl text-[16.5px] leading-[1.8]',
                      light ? 'text-ivory/70' : 'text-charcoal-light',
                    )}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          )}

          {letter.bigStatement && (
            <Reveal className="mt-12">
              {letter.bigStatementIntro && (
                <p className="eyebrow text-gold-600">{letter.bigStatementIntro}</p>
              )}
              <p
                className={cn(
                  'mt-5 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold uppercase leading-[1.15] tracking-[-0.01em]',
                  light ? 'text-ivory' : 'text-emerald-950',
                )}
              >
                {letter.bigStatement}
              </p>
              <p
                className={cn(
                  'mt-8 max-w-2xl text-[16.5px] leading-[1.8]',
                  light ? 'text-ivory/70' : 'text-charcoal-light',
                )}
              >
                I invite you to discover CK Foodstuff Trading LLC and become part of the
                international network we are building.
              </p>
            </Reveal>
          )}

          <Reveal className="mt-12">
            <div
              className={cn(
                'inline-block border-t-2 pt-5',
                light ? 'border-gold-500/60' : 'border-gold-600/60',
              )}
            >
              <p
                className={cn(
                  'font-display text-[20px] font-semibold',
                  light ? 'text-ivory' : 'text-emerald-950',
                )}
              >
                {letter.name}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-wide2 text-gold-600">
                {letter.role}
              </p>
              <p
                className={cn(
                  'mt-1 text-[12px] uppercase tracking-wide2',
                  light ? 'text-ivory/45' : 'text-charcoal-muted',
                )}
              >
                CK Foodstuff Trading LLC
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
