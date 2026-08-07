import { roadmap, roadmapDisclaimer } from '@/data/company'
import { CountUp } from '@/components/ui/CountUp'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Growth roadmap: 120–140 → 200 → 250 → 500 containers per month.
 * Each milestone counts up and the connecting rail fills behind it.
 */
export function RoadmapTimeline({ light = true }: { light?: boolean }) {
  const rail = light ? 'bg-ivory/10' : 'bg-emerald-950/10'
  const cardBg = light
    ? 'bg-emerald-950/55 border-ivory/10 hover:border-gold-500/50'
    : 'bg-white border-emerald-950/10 hover:border-gold-500/60'
  const phase = light ? 'text-ivory/55' : 'text-charcoal-muted'
  const unit = light ? 'text-ivory/60' : 'text-charcoal-light'

  return (
    <div>
      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <span
          className={`absolute left-0 right-0 top-[86px] hidden h-px lg:block ${rail}`}
          aria-hidden="true"
        />

        {roadmap.map((milestone, i) => (
          <Reveal
            key={milestone.phase}
            delay={i * 110}
            className={`group relative border p-8 transition-all duration-500 ${cardBg}`}
          >
            <div className="flex items-center justify-between">
              <p className={`text-[11px] font-semibold uppercase tracking-eyebrow ${phase}`}>
                {milestone.phase}
              </p>
              <span className="font-display text-[13px] text-gold-500/60">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <p className="mt-7 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.03em] text-gold-500">
              {i === 0 ? (
                <CountUp to={milestone.countTo} prefix="120–" />
              ) : (
                <CountUp to={milestone.countTo} />
              )}
            </p>
            <p className={`mt-4 text-[12.5px] uppercase tracking-[0.13em] ${unit}`}>
              {milestone.unit}
            </p>

            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-700 group-hover:scale-x-100" />
          </Reveal>
        ))}
      </div>

      <p
        className={`mt-8 max-w-3xl text-[12.5px] italic leading-relaxed ${
          light ? 'text-ivory/40' : 'text-charcoal-muted'
        }`}
      >
        {roadmapDisclaimer}
      </p>
    </div>
  )
}
