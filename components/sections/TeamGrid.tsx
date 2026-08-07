import { team } from '@/data/company'
import { Reveal } from '@/components/ui/Reveal'

export function TeamGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member, i) => (
        <Reveal
          key={member.name}
          delay={i * 70}
          className="group relative flex flex-col border border-emerald-950/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-cardHover"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center border border-gold-500/40 bg-ivory-200 font-display text-[19px] font-semibold text-gold-700 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-emerald-950">
              {member.initials}
            </span>
            <div>
              <h3 className="font-display text-[19px] font-semibold leading-tight text-emerald-950">
                {member.name}
              </h3>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide2 text-gold-700">
                {member.role}
              </p>
            </div>
          </div>
          <p className="mt-6 text-[14px] leading-[1.7] text-charcoal-light">
            {member.description}
          </p>
          <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100" />
        </Reveal>
      ))}
    </div>
  )
}
