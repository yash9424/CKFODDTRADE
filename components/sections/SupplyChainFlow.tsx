import { supplyChainSteps } from '@/data/company'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Animated supply-chain infographic. Renders as a vertical spine on small
 * screens and a numbered horizontal track from lg upwards; each node reveals
 * in sequence as the section scrolls into view.
 */
export function SupplyChainFlow({ light = true }: { light?: boolean }) {
  const line = light ? 'bg-ivory/15' : 'bg-emerald-950/10'
  const nodeBg = light ? 'bg-emerald-950/70' : 'bg-white'
  const title = light ? 'text-ivory' : 'text-emerald-950'
  const body = light ? 'text-ivory/60' : 'text-charcoal-light'

  return (
    <div className="relative">
      {/* ---------- mobile / tablet: vertical spine ---------- */}
      <ol className="relative lg:hidden">
        <span className={`absolute bottom-6 left-[27px] top-6 w-px ${line}`} aria-hidden="true" />
        {supplyChainSteps.map((step, i) => (
          <Reveal key={step.title} delay={i * 90} as="li" className="relative flex gap-6 pb-9">
            <span
              className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center border border-gold-500/45 ${nodeBg} font-display text-[15px] font-semibold text-gold-400`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="pt-2">
              <h3 className={`font-display text-lg font-semibold ${title}`}>{step.title}</h3>
              {step.location && (
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide2 text-gold-400">
                  {step.location}
                </p>
              )}
              <p className={`mt-2 max-w-sm text-[14px] leading-relaxed ${body}`}>{step.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      {/* ---------- desktop: horizontal track, two rows of four ---------- */}
      <div className="hidden lg:block">
        {[supplyChainSteps.slice(0, 4), supplyChainSteps.slice(4)].map((row, rowIndex) => (
          <ol key={rowIndex} className={`relative grid grid-cols-4 ${rowIndex === 1 ? 'mt-16' : ''}`}>
            <span className={`absolute left-0 right-0 top-7 h-px ${line}`} aria-hidden="true" />
            {row.map((step, i) => {
              const index = rowIndex * 4 + i
              return (
                <Reveal
                  key={step.title}
                  delay={index * 100}
                  as="li"
                  className="group relative px-5 first:pl-0 last:pr-0"
                >
                  <span
                    className={`relative z-10 grid h-14 w-14 place-items-center border border-gold-500/45 ${nodeBg} font-display text-[15px] font-semibold text-gold-400 transition-all duration-500 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-emerald-950`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className={`mt-6 font-display text-[19px] font-semibold leading-snug ${title}`}>
                    {step.title}
                  </h3>
                  {step.location && (
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide2 text-gold-400">
                      {step.location}
                    </p>
                  )}
                  <p className={`mt-3 max-w-[26ch] text-[13.5px] leading-relaxed ${body}`}>
                    {step.detail}
                  </p>
                </Reveal>
              )
            })}
          </ol>
        ))}
      </div>
    </div>
  )
}
