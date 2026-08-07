import { differentiators } from '@/data/company'
import { Reveal } from '@/components/ui/Reveal'

/** "Why CK Foodstuff" — numbered, rule-separated list in two columns. */
export function WhyGrid({ light = true }: { light?: boolean }) {
  const border = light ? 'border-ivory/10' : 'border-emerald-950/10'
  const title = light ? 'text-ivory' : 'text-emerald-950'
  const body = light ? 'text-ivory/60' : 'text-charcoal-light'

  return (
    <div className="grid gap-x-14 lg:grid-cols-2">
      {differentiators.map((item, i) => (
        <Reveal
          key={item.title}
          delay={(i % 2) * 80 + Math.floor(i / 2) * 60}
          className={`group flex gap-6 border-b py-8 ${border}`}
        >
          <span className="mt-1 font-display text-[13px] font-semibold tracking-wide2 text-gold-500">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3
              className={`font-display text-[21px] font-semibold leading-snug transition-colors duration-300 group-hover:text-gold-500 ${title}`}
            >
              {item.title}
            </h3>
            <p className={`mt-3 max-w-md text-[14.5px] leading-[1.7] ${body}`}>
              {item.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
