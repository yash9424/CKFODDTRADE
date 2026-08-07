import { containerDisclaimer, keyNumbers } from '@/data/company'
import { CountUp } from '@/components/ui/CountUp'
import { Reveal } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Section'

/**
 * Animated corporate statistics band. Numeric stats count up on first view;
 * word stats (Dubai, Multiple Categories) render as display type.
 */
export function StatsBand() {
  return (
    <section className="grain relative overflow-hidden bg-emerald-deep py-20 text-ivory sm:py-24">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-ck relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow light>Key Company Numbers</Eyebrow>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-tight text-ivory">
              Built in Dubai. Sourced from India.
              <br />
              <span className="text-gold-400">Supplied worldwide.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-ivory/55">
            An integrated commercial bridge between producers, exporters and international buyers —
            operating at container scale from day one.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {keyNumbers.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 70}
              className="group relative bg-emerald-950/60 p-8 transition-colors duration-500 hover:bg-emerald-900/70 sm:p-10"
            >
              <span className="absolute left-0 top-0 h-full w-px scale-y-0 bg-gold-500 transition-transform duration-500 group-hover:scale-y-100" />
              <p className="font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-none tracking-[-0.02em] text-gold-400">
                {stat.countTo ? (
                  <CountUp to={stat.countTo} prefix={stat.prefix} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </p>
              <p className="mt-5 max-w-[22ch] text-[13px] uppercase leading-relaxed tracking-[0.13em] text-ivory/60">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-[12.5px] italic leading-relaxed text-ivory/40">
          {containerDisclaimer}
        </p>
      </div>
    </section>
  )
}
